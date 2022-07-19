// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { useState } from "react";
// Firebase SDKs Here
// https://firebase.google.com/docs/web/setup#available-libraries
import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  doc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";

import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyDKv_lZfpfFkdjtqJptVwv-talUnYrMUbo",
  authDomain: "indoor-garden-b4585.firebaseapp.com",
  projectId: "indoor-garden-b4585",
  storageBucket: "indoor-garden-b4585.appspot.com",
  messagingSenderId: "1093253453203",
  appId: "1:1093253453203:web:d34b9fe7e402b010d9c466",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

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

export const getUserNameFromFirebase = async (user) => {
  const userSnapshot = await getDoc(doc(db, "users", user));
  if (userSnapshot.exists()) {
    return userSnapshot.data().name;
  } else {
    console.log(
      "User doesn't exist || This is being called from getUserNameFromFirebase"
    );
  }
};

//DELETE PLANT
export const deletePlant = async (plant, user) => {
  console.log(plant);
  console.log(user);
  await deleteDoc(doc(db, `users/${user}/garden`, plant));
};
