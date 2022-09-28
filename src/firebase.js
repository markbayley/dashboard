import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyDSOaMBz5ZiC6D13672JFCeemHCQ0uy3iQ",
  authDomain: "tutorial-a28cc.firebaseapp.com",
  projectId: "tutorial-a28cc",
  storageBucket: "tutorial-a28cc.appspot.com",
  messagingSenderId: "338894274904",
  appId: "1:338894274904:web:745e3e479f3781488ea52d"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
