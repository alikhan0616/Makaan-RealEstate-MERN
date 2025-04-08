// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-22f5d.firebaseapp.com",
  projectId: "mern-estate-22f5d",
  storageBucket: "mern-estate-22f5d.firebasestorage.app",
  messagingSenderId: "309481692160",
  appId: "1:309481692160:web:af65070b3bd900dc678ce5"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);