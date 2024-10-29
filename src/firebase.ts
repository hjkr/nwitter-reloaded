// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCmoUSqxTcHzHPJubCzVSOknpV3tPHyH08",
  authDomain: "nwitter-reloaded-75671.firebaseapp.com",
  projectId: "nwitter-reloaded-75671",
  storageBucket: "nwitter-reloaded-75671.appspot.com",
  messagingSenderId: "320552550036",
  appId: "1:320552550036:web:6462bbb6d771ff6082fe81",
  measurementId: "G-H07HXPD6V6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);

export const storage = getStorage(app);
export const db = getFirestore(app);
