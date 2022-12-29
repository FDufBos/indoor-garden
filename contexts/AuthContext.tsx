import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updatePassword,
  updateProfile,
  User,
  UserCredential,
} from "firebase/auth";
import {
  collection,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import Router from "next/router";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";

import { fetchIDs, fetchPlants } from "../data/firestore";
import { auth, db, storage } from "../utils/firebaseUtils";

const UserAuthContext = createContext(undefined);

export const UserAuthContextProvider: React.FC<PropsWithChildren<{}>> = ({
  children,
}) => {
  const [firestorePlants, setFirestorePlants] = useState([]);
  const [documentIDs, setDocumentIDs] = useState([]);

  const [user, setUser] = useState<User>();
  const [name, setName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [userDocument, setUserDocument] = useState<DocumentData>();
  const [codex, setCodex] = useState(null);
  const [orderPlantsBy, setOrderPlantsBy] = useState("nickname");
  const [hiddenAnimation, setHiddenAnimation] = useState("hidden");

  const signUp = (email, password): Promise<UserCredential> =>
    createUserWithEmailAndPassword(auth, email, password);

  const logIn = (email, password): Promise<UserCredential> =>
    signInWithEmailAndPassword(auth, email, password);

  const logOut = (): Promise<void> => {
    setPhotoURL("");
    setUserDocument(undefined);
    setUser(undefined);
    Router.push("/");
    return signOut(auth);
  };

  const updateUserPassword = (password): Promise<void> =>
    updatePassword(user, password);

  const uploadProfilePic = async (file, user, setLoading): Promise<void> => {
    const fileRef = ref(storage, `profilepics/${user.uid}`);
    setLoading(true);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const snapshot = await uploadBytes(fileRef, file);
    const photoURL = await getDownloadURL(fileRef);
    // save photoURL to local storage
    localStorage.setItem("photoURL", photoURL);
    updateProfile(user, { photoURL });
    setLoading(false);
  };

  /**
   *
   */
  const getUserDocument = async (user: User): Promise<void> => {
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);
    const docData = docSnap.data();

    if (docSnap.exists()) {
      setUserDocument(docData);
    } else {
      throw Error("No such document!");
    }
  };

  const getthreeUserIDs = async (): Promise<void> => {
    const getRandomInt = (max: number): number =>
      Math.floor(Math.random() * max);
    // create reference for the user collection
    const userCollection = collection(db, "users");
    const uidList = [];

    // get the first 3 users
    await Promise.resolve(
      Array(3).map(async () => {
        const docSnap = await getDocs(userCollection);
        const docData = docSnap.docs.map((doc) => doc.data());
        const x = getRandomInt(docData.length - 1);
        uidList.push(docData[x].uid);
      })
    );
  };

  const fetchCodex = async (): Promise<void> => {
    const q = query(collection(db, "plants"), orderBy("commonName"));
    const codexSnapshot = await getDocs(q);
    const codexList = codexSnapshot.docs.map((doc) => doc.data());
    setCodex(codexList);
    // return codexList;
  };

  const forgotPassword = (email): Promise<void> =>
    sendPasswordResetEmail(auth, email);

  useEffect(() => {
    fetchCodex();
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      // console.log(currentUser);
      // function to set user document
      if (currentUser) {
        const docRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(docRef);
        const docData = docSnap.data();

        setPhotoURL(currentUser.photoURL);

        if (docSnap.exists()) {
          // console.log("docSnap Exists!");
          setUserDocument(docData);
        }

        fetchPlants(currentUser.uid).then((data) => {
          setFirestorePlants(data);
          // console.log("fetchPlants @ AuthContext useEffect");
        });
        fetchIDs(currentUser.uid).then((data) => {
          setDocumentIDs(data);
        });
      }
    });

    return () => {
      unsubscribe();
    };
  }, [setFirestorePlants, setDocumentIDs]);

  return (
    <UserAuthContext.Provider
      value={{
        user,
        userDocument,
        setUserDocument,
        signUp,
        logIn,
        logOut,
        uploadProfilePic,
        photoURL,
        setPhotoURL,
        name,
        setName,
        getUserDocument,
        codex,
        setCodex,
        firestorePlants,
        setFirestorePlants,
        documentIDs,
        setDocumentIDs,
        getthreeUserIDs,
        updateUserPassword,
        forgotPassword,
        setOrderPlantsBy,
        orderPlantsBy,
        hiddenAnimation,
        setHiddenAnimation,
      }}
    >
      {children}
    </UserAuthContext.Provider>
  );
};

// TODO: Need to setup types for this context
export const useUserAuth = (): any => useContext(UserAuthContext);
