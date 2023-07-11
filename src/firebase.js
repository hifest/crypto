import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
const firebaseConfig = {
    apiKey: "AIzaSyDz0qFpFcFniQD1oDDSVHhWhwPBDkuExvM",
    authDomain: "cryptoexchange-a853a.firebaseapp.com",
    projectId: "cryptoexchange-a853a",
    storageBucket: "cryptoexchange-a853a.appspot.com",
    messagingSenderId: "818337308580",
    appId: "1:818337308580:web:8233d082d4db48797d6b31",
    measurementId: "G-W3XM1F7M2N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export  const auth = getAuth(app);
const database = getDatabase(app);