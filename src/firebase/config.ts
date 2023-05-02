import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBWZrU4LpYG3BkovZvsxtmbjSgtFJ8LkEs",
  authDomain: "project-management-51b58.firebaseapp.com",
  projectId: "project-management-51b58",
  storageBucket: "project-management-51b58.appspot.com",
  messagingSenderId: "583808120796",
  appId: "1:583808120796:web:f0145b36500df9cb220119",
};

// init firebase
firebase.initializeApp(firebaseConfig);

// init services - interaction with firestore database
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();
const projectStorage = firebase.storage();

// timeStamp
const timestamp = firebase.firestore.Timestamp;

export { projectFirestore, projectAuth, projectStorage, timestamp };
