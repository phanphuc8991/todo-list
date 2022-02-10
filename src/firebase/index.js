import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDqbeRBE6PyVhxEBQRXUuJ52adBbBSB0vM",
  authDomain: "todo-app-52d39.firebaseapp.com",
  projectId: "todo-app-52d39",
  storageBucket: "todo-app-52d39.appspot.com",
  messagingSenderId: "401137016658",
  appId: "1:401137016658:web:f1b04e0d0c9c13b608248b",
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db;
