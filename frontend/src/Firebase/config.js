import {initializeApp} from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import {getAuth} from 'firebase/auth'
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCiJg5wB6s05wxZVNDB1N1000r1uCU_hAs",
    authDomain: "cusat-busbuddy.firebaseapp.com",
    projectId: "cusat-busbuddy",
    storageBucket: "cusat-busbuddy.appspot.com",
    messagingSenderId: "928954941565",
    appId: "1:928954941565:web:54c340c2fb6608d92b7114",
    measurementId: "G-ZHZHF5ES1P"
  };

  export const Firebase = initializeApp(firebaseConfig);
  
  export const db = getFirestore(Firebase)
  export const auth = getAuth(Firebase)
  export const storage=getStorage(Firebase)
  
