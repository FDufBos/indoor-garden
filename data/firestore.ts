// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// Firebase SDKs Here
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore, collection, getDocs, getDoc, doc, addDoc } from "firebase/firestore";

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

//collection ref
const colRef = collection(db, "plants");


//CREATE

export const addPlant = async (plant) => {
  await addDoc((colRef), plant);
}

//READ

export const fetchPlants = async () => {
  const plantsSanpshot = await getDocs(collection(db, "plants"));
  const plantsList = plantsSanpshot.docs.map((doc) => doc.data());
  return plantsList;
};

export const fetchIDs = async () => {
  const plantsSanpshot = await getDocs(collection(db, "plants"));
  const idList = plantsSanpshot.docs.map((doc) => doc.id);
  return idList;
}

export const fetchPlant = async (nickname) => {
  const plantSnapshot = await getDoc(doc(db, 'plants', nickname));
  if (plantSnapshot.exists()) {
      return plantSnapshot.data();
  } else {
      console.log("Plant doesn't exist");
  }
};
