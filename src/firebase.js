import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDZX48val0VJiZsQXb882PhMsE31aQoByY",
  authDomain: "movie-ave.firebaseapp.com",
  projectId: "movie-ave",
  storageBucket: "movie-ave.appspot.com",
  messagingSenderId: "927142221530",
  appId: "1:927142221530:web:0939e0ccf98916996c77e3",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const database = firebase.database();

export { firebase, auth, database };
export default db;
