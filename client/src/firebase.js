// Importing functions from firebase/app and firestore
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// importing getAuth
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAAfmZZW5oHvWQ28Gea6FZrQ8fVI86sTdE",
  authDomain: "myntraclone-983ef.firebaseapp.com",
  projectId: "myntraclone-983ef",
  storageBucket: "myntraclone-983ef.appspot.com",
  messagingSenderId: "59714769311",
  appId: "1:59714769311:web:302f3e5b2e7f8ee6c4edaa",
  measurementId: "G-KM9KHPFZWR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// initializing db
const db = getFirestore(app);

// initializing auth
const auth = getAuth(app);

// exporting db and auth
export { db, auth };

// exporting the app
export default app;
