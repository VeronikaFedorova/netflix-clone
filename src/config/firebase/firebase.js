import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyBotnLsI7QKwylUmgaSxSDqR71TkK_abSk",
  authDomain: "netflix-clone-dce5c.firebaseapp.com",
  projectId: "netflix-clone-dce5c",
  storageBucket: "netflix-clone-dce5c.appspot.com",
  messagingSenderId: "781570511015",
  appId: "1:781570511015:web:1e9d3a1bef1912f44c8b82",
  measurementId: "G-6Y27BHF7D1",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { auth };
export default db;
