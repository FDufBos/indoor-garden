// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// Firebase SDKs Here
// https://firebase.google.com/docs/web/setup#available-libraries
import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  doc,
  addDoc,
  setDoc,
  deleteDoc,
  serverTimestamp,
  orderBy,
  query,
  limit,
} from "firebase/firestore";

import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDKv_lZfpfFkdjtqJptVwv-talUnYrMUbo",
  authDomain: "indoor-garden-b4585.firebaseapp.com",
  projectId: "indoor-garden-b4585",
  storageBucket: "indoor-garden-b4585.appspot.com",
  messagingSenderId: "1093253453203",
  appId: "1:1093253453203:web:d34b9fe7e402b010d9c466",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

const auth = getAuth();

//collection ref
const usersCollection = collection(db, "users");

//CREATE

export const addPlant = async (plant, user) => {
  await addDoc(collection(db, `users/${user}/garden`), plant);
};

//READ

export const fetchPlants = async (user) => {
  const plantsSanpshot = await getDocs(collection(db, `users/${user}/garden`));
  const plantsList = plantsSanpshot.docs.map((doc) => doc.data());
  return plantsList;
};

export const fetchIDs = async (user) => {
  const plantsSanpshot = await getDocs(collection(db, `users/${user}/garden`));
  const idList = plantsSanpshot.docs.map((doc) => doc.id);
  return idList;
};

export const fetchPlant = async (nickname, user) => {
  const plantSnapshot = await getDoc(doc(db, `users/${user}/garden`, nickname));
  if (plantSnapshot.exists()) {
    return plantSnapshot.data();
  } else {
    console.log("Plant doesn't exist");
  }
};

//DELETE PLANT
export const deletePlant = async (plant, user) => {
  console.log(plant)
  console.log(user)
  await deleteDoc(doc(db, `users/${user}/garden`, plant));
};

//🔒🔒🔒🔒🔒🔒🔒 AUTH 🔒🔒🔒🔒🔒🔒🔒🔒🔒

//👶 CREATE NEW USER 👶

export const createUser = async (
  email: string,
  password: string,
  name: string
) => {
  await createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      // Signed in
      const user = userCredential.user;
      //update display name

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        authProvider: "Username and Password",
        email,
        name: name,
        timeCreated: serverTimestamp(),
      });
    })
    .then(async () => {
      await sendEmailVerification(auth.currentUser);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
      // ..
    });
};

//🧑 SIGN IN WITH EMAIL AND PASSWORD 🧑
export const signIn = async (email: string, password: string) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log(user);
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
    });
};

//🚪 SIGN OUT 🚪
export const logOut = async () => {
  signOut(auth)
    .then(() => {})
    .catch((error) => {
      // An error happened.
    });
};
