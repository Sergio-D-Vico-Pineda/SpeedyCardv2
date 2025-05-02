// Import the functions you need from the SDKs you need
import { getFirestore } from 'firebase/firestore';
import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import { Platform } from "react-native";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import firebaseConfig from "./firebase";

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth =
    Platform.OS === 'web' ? getAuth(app) : initializeAuth(app, {
        persistence: getReactNativePersistence(ReactNativeAsyncStorage)
    });

const db = getFirestore(app);
// const analytics = getAnalytics(app);

export {
    app,
    auth,
    db,
}