import { initializeApp } from "firebase/app";
import {
  getFirestore,
  initializeFirestore,
  CACHE_SIZE_UNLIMITED,
  enableIndexedDbPersistence,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check"
// import { getPerformance } from "firebase/performance";

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

const appCheck = initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider("6LcM5DMhAAAAABMKraBQ_kXP5SaG46dILmzjXCOP"),
  isTokenAutoRefreshEnabled: true,
});


const db = getFirestore(app, {
  cacheSize: CACHE_SIZE_UNLIMITED,
});

// const db = getFirestore(app, {
//   cacheSize: CACHE_SIZE_UNLIMITED,
// });
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage, appCheck };

export default app;
