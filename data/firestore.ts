import { db } from "../utils/firebaseUtils";

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
  limit,
} from "firebase/firestore";

//CREATE

export const addPlant = async (plant, user) => {
  await addDoc(collection(db, `users/${user}/garden`), plant);
};

export const addToCodex = async (botanicalName, plant) => {
  await setDoc(doc(db, "plants", botanicalName), plant);
};

//READ

export const fetchPlants = async (user) => {
  const q = query(collection(db, `users/${user}/garden`), orderBy("timeCreated"));
  const plantsSanpshot = await getDocs(q);
  const plantsList = plantsSanpshot.docs.map((doc) => doc.data());
  return plantsList;
};

export const fetchIDs = async (user) => {
  const q = query(collection(db, `users/${user}/garden`), orderBy("timeCreated"));

  const plantsSanpshot = await getDocs(q);
  const idList = plantsSanpshot.docs.map((doc) => doc.id);
  return idList;
};

export const fetchPlant = async (nickname, user) => {
  const plantSnapshot = await getDoc(doc(db, `users/${user}/garden`, nickname));
  if (user) {
    if (plantSnapshot.exists()) {
      return plantSnapshot.data();
    } else {
      console.log("Frome firestore.ts: Plant doesn't exist");
    }
  }
};

//READ CODEX
//fetch codex from plant collection
// export const fetchCodex = async () => {
//   const q = query(collection(db, "plants"), orderBy("commonName"));
//   const codexSnapshot = await getDocs(q);
//   const codexList = codexSnapshot.docs.map((doc) => doc.data());
//   return codexList;
// }

//DELETE PLANT
export const deletePlant = async (plant, user) => {
  await deleteDoc(doc(db, `users/${user}/garden`, plant));
};
