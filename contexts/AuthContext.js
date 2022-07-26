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

import {
  getFirestore,
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

  function sendPasswordResetEmail(email) {
    return sendPasswordResetEmail(auth, email);
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

  const fetchCodex = async () => {
    const q = query(collection(db, "plants"), orderBy("commonName"));
    const codexSnapshot = await getDocs(q);
    const codexList = codexSnapshot.docs.map((doc) => doc.data());
    setCodex(codexList);
    // return codexList;
  };



  useEffect(() => {

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
      }
    });

    return () => {
      unsubscribe();
    };
  // }, [codex]);
}, []);

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
      }}
    >
      {children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}
