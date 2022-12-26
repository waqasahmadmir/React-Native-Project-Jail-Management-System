// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCgzf1Tog7yP3c4z3hph5ZLillFHb1BQjA",
  authDomain: "project-e1491.firebaseapp.com",
  databaseURL: "https://project-e1491-default-rtdb.firebaseio.com",
  projectId: "project-e1491",
  storageBucket: "project-e1491.appspot.com",
  messagingSenderId: "966618091125",
  appId: "1:966618091125:web:3581ce46e15f80822bb23c",
  measurementId: "G-63YDHJZEEV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db=getDatabase(app)