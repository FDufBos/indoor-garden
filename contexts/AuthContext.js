import { createContext, useEffect, useState, useContext } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  updateProfile,
  updateEmail,
} from "firebase/auth";

import { fetchIDs, fetchPlants } from "../data/firestore";

import {
  collection,
  getDocs,
  getDoc,
  doc,
  addDoc,
  deleteDoc,
  setDoc,
  query,
  orderBy,
} from "firebase/firestore";

import Router from "next/router";

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { auth, db, storage } from "../utils/firebaseUtils";

const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
  const [firestorePlants, setFirestorePlants] = useState([]);
  const [documentIDs, setDocumentIDs] = useState([]);

  const [user, setUser] = useState("");
  const [name, setName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [userDocument, setUserDocument] = useState("");
  const [codex, setCodex] = useState(null);

  function signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }
  function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }
  function logOut() {
    setPhotoURL("");
    setUserDocument("");
    setUser("");
    Router.push("/");
    return signOut(auth);
  }

  function updateUserPassword(password) {
    return updatePassword(user, password);
  }

  async function uploadProfilePic(file, user, setLoading) {
    const fileRef = ref(storage, "profilepics/" + user.uid);
    setLoading(true);
    const snapshot = await uploadBytes(fileRef, file);
    const photoURL = await getDownloadURL(fileRef);
    //save photoURL to local storage
    localStorage.setItem("photoURL", photoURL);
    updateProfile(user, { photoURL });
    setLoading(false);
  }

  async function getUserDocument(user) {
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);
    const docData = docSnap.data();

    if (docSnap.exists()) {
      console.log("docSnap Exists!");
      setUserDocument(docData);
    } else {
      console.log("No such document!");
    }
  }

  async function getthreeUserIDs() {
    function getRandomInt(max) {
      return Math.floor(Math.random() * max);
    }
    //create reference for the user collection
    const userCollection = collection(db, "users");
    const uidList = [];
    //get the first 3 users

    for (let i = 0; i < 3; i++) {
      const docSnap = await getDocs(userCollection);
      const docData = docSnap.docs.map((doc) => doc.data());
      const x = getRandomInt(docData.length - 1);
      console.log(x);
      uidList.push(docData[x].uid);
    }
    console.log(uidList);
  }

  const fetchCodex = async () => {
    const q = query(collection(db, "plants"), orderBy("commonName"));
    const codexSnapshot = await getDocs(q);
    const codexList = codexSnapshot.docs.map((doc) => doc.data());
    setCodex(codexList);
    // return codexList;
  };

  async function timeSinceLastWatered(plant) {
    return Math.floor(
      (Date.now() - plant.timeLastWatered.toDate()) / (1000 * 60 * 60 * 24)
    );
  }

  const forgotPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  }

  useEffect(() => {
    console.log("useEffect @ AuthContext");
    fetchCodex();
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      // console.log(currentUser);
      //function to set user document
      if (currentUser) {
        const docRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(docRef);
        const docData = docSnap.data();

        setPhotoURL(currentUser.photoURL);

        if (docSnap.exists()) {
          // console.log("docSnap Exists!");
          setUserDocument(docData);
        } else {
          console.log("No such document!");
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
    <userAuthContext.Provider
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
        timeSinceLastWatered,
        updateUserPassword,
        forgotPassword,
      }}
    >
      {children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}
