import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
export const firebaseConfig = {
  apiKey: "AIzaSyADPCew9nwVU9Nn2zQ5Za_8NXbhX5caFXQ",
  authDomain: "test-9f7d7.firebaseapp.com",
  projectId: "test-9f7d7",
  storageBucket: "test-9f7d7.appspot.com",
  messagingSenderId: "1041999814532",
  appId: "1:1041999814532:web:0d5a3fce4fa60d3a2987d1",
  measurementId: "G-KPP5ZFGL6L",
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
