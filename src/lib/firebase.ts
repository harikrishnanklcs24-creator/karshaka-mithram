import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyAsNCb_vyXR4jHH5dmZ9i2RPjSk-qecPgk",
    authDomain: "karshaka-mithram.firebaseapp.com",
    projectId: "karshaka-mithram",
    storageBucket: "karshaka-mithram.firebasestorage.app",
    messagingSenderId: "247226610101",
    appId: "1:247226610101:web:f1062ddf6889a4d32d29fc",
    measurementId: "G-2PFQH1HJC1"
};

const app = initializeApp(firebaseConfig);
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
