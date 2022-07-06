// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, initializeFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_API_KEY,
//   authDomain: import.meta.env.AUTH_DOMAIN,
//   projectId: import.meta.env.PROJECT_ID,
//   storageBucket: import.meta.env.STORAGE_BUCKET,
//   messagingSenderId: import.meta.env.MESSAGING_SENDER_ID,
//   appId: import.meta.env.APP_ID,
//   measurementId: import.meta.env.MEASUREMENT_ID,
// };
const firebaseConfig = {
  apiKey: "AIzaSyBtHDhVJE-R_9tedffekgmmAHa3_y4gyw8",
  authDomain: "covid-management-318b1.firebaseapp.com",
  projectId: "covid-management-318b1",
  storageBucket: "covid-management-318b1.appspot.com",
  messagingSenderId: "713507975067",
  appId: "1:713507975067:web:5cd298fa3cb3dfb668fb3e",
  measurementId: "G-VS5250W2W7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore();
// export const db = initializeFirestore(app, {
//   experimentalAutoDetectLongPolling: true,
//   useFetchStreams: false,
// });
