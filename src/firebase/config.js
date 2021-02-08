import firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCMBrxTb_TaYrzzkQ9ck9VmTYHw4vmRyf8",
    authDomain: "firegram-ecd03.firebaseapp.com",
    databaseURL: "https://firegram-ecd03.firebaseio.com",
    projectId: "firegram-ecd03",
    storageBucket: "firegram-ecd03.appspot.com",
    messagingSenderId: "68874508842",
    appId: "1:68874508842:web:b4222637ea17d2becc0153",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const projectStorage = firebase.storage();
const projectFirestore = firebase.firestore();
const auth = firebase.auth;
const timestamp = firebase.firestore.FieldValue.serverTimestamp;
const webTimestamp = firebase.firestore.Timestamp;
const arrayUnion = firebase.firestore.FieldValue.arrayUnion;
const arrayRemove = firebase.firestore.FieldValue.arrayRemove;

export {
    projectStorage,
    projectFirestore,
    auth,
    timestamp,
    webTimestamp,
    arrayUnion,
    arrayRemove,
};
