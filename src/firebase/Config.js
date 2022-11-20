import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'


 export const firebaseConfig = {
    apiKey: "AIzaSyAmEulNKLKveW6taPktmzmBewmARTQaGvo",
    authDomain: "eshop-22dee.firebaseapp.com",
    projectId: "eshop-22dee",
    storageBucket: "eshop-22dee.appspot.com",
    messagingSenderId: "663187400500",
    appId: "1:663187400500:web:34b653fc781df476bbe761"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db =getFirestore(app)
export const storage =getStorage(app)

export default app