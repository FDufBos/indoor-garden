import { initializeApp } from "firebase/app";
import { connectAuthEmulator, getAuth } from "firebase/auth";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";
import { connectStorageEmulator, getStorage } from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDKv_lZfpfFkdjtqJptVwv-talUnYrMUbo",
  authDomain: "indoor-garden-b4585.firebaseapp.com",
  projectId: "indoor-garden-b4585",
  storageBucket: "indoor-garden-b4585.appspot.com",
  messagingSenderId: "1093253453203",
  appId: "1:1093253453203:web:d34b9fe7e402b010d9c466",
};

const app = initializeApp(firebaseConfig);

// const appCheck = initializeAppCheck(app, {
//   provider: new ReCaptchaV3Provider("6LcM5DMhAAAAABMKraBQ_kXP5SaG46dILmzjXCOP"),
//   isTokenAutoRefreshEnabled: true,
// });

const db = getFirestore(app);

const auth = getAuth(app);
const storage = getStorage(app);

// connect emulators, if in dev
if (process.env.NODE_ENV === "development") {
  const host = "localhost";
  connectAuthEmulator(auth, `http://${host}:9099`);
  connectFirestoreEmulator(db, host, 8080);
  connectStorageEmulator(storage, host, 9199);
}

export { auth, db, storage };

export default app;
