// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; 

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCnP0r8A2CY2TKgFV9wrFaF7p294KpdEZs",
  authDomain: "keep-fa78b.firebaseapp.com",
  projectId: "keep-fa78b",
  storageBucket: "keep-fa78b.appspot.com",
  messagingSenderId: "179440507541",
  appId: "1:179440507541:web:cd49b569cb4bb310f1999c"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app); 
