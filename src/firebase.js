import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyA3_2V6Sd5Pid8rmx4d3fR1cJ7blk-pyb8",
  authDomain: "instagram-clone-mdr21.firebaseapp.com",
  projectId: "instagram-clone-mdr21",
  storageBucket: "instagram-clone-mdr21.appspot.com",
  messagingSenderId: "264021071335",
  appId: "1:264021071335:web:afce43bcae15dd88829942"
});

const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const storage = firebaseApp.storage();

export {db, auth, storage};