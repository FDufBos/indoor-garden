import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";

import { db } from "../utils/firebaseUtils";

// CREATE

export const addPlant = async (plant, user): Promise<void> => {
  await addDoc(collection(db, `users/${user}/garden`), plant);
};

export const addToCodex = async (botanicalName, plant): Promise<void> => {
  await setDoc(doc(db, "plants", botanicalName), plant);
};

// READ

export const fetchPlants = async (user): Promise<DocumentData[]> => {
  const q = query(
    collection(db, `users/${user}/garden`),
    orderBy("timeCreated")
  );
  const plantsSanpshot = await getDocs(q);
  const plantsList = plantsSanpshot.docs.map((doc) => doc.data());
  return plantsList;
};

export const fetchIDs = async (user): Promise<string[]> => {
  const q = query(
    collection(db, `users/${user}/garden`),
    orderBy("timeCreated")
  );

  const plantsSanpshot = await getDocs(q);
  const idList = plantsSanpshot.docs.map((doc) => doc.id);
  return idList;
};

export const fetchPlant = async (
  nickname,
  user
): Promise<DocumentData | undefined> => {
  const plantSnapshot = await getDoc(doc(db, `users/${user}/garden`, nickname));
  if (user) {
    if (plantSnapshot.exists()) {
      return plantSnapshot.data();
    }

    // TODO: Error handling
    // console.log("Frome firestore.ts: Plant doesn't exist");
  }
  return undefined;
};

// READ CODEX
// fetch codex from plant collection
// export const fetchCodex = async () => {
//   const q = query(collection(db, "plants"), orderBy("commonName"));
//   const codexSnapshot = await getDocs(q);
//   const codexList = codexSnapshot.docs.map((doc) => doc.data());
//   return codexList;
// }

// DELETE PLANT
export const deletePlant = async (plant, user): Promise<void> => {
  await deleteDoc(doc(db, `users/${user}/garden`, plant));
};
