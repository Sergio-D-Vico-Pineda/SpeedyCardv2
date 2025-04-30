// Import the functions you need from the SDKs you need
import { getFirestore } from 'firebase/firestore';
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import firebaseConfig from "./firebase";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

let auth;

if (typeof window !== "undefined") {
    // Web: use default getAuth
    auth = getAuth(app);
} else {
    // Native: use initializeAuth with getReactNativePersistence
    const { getReactNativePersistence, initializeAuth } = require("firebase/auth");
    const AsyncStorage = require('@react-native-async-storage/async-storage').default;
    auth = initializeAuth(app, {
        persistence: getReactNativePersistence(AsyncStorage),
    });
}

export {
    app,
    auth,
    db,
}
