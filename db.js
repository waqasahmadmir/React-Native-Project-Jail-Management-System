import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCgzf1Tog7yP3c4z3hph5ZLillFHb1BQjA",
    authDomain: "project-e1491.firebaseapp.com",
    projectId: "project-e1491",
    storageBucket: "project-e1491.appspot.com",
    messagingSenderId: "966618091125",
    appId: "1:966618091125:web:3581ce46e15f80822bb23c",
    measurementId: "G-63YDHJZEEV"
  };

  const db = initializeApp(firebaseConfig);
  export default db;