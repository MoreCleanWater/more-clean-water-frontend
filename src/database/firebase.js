import firebase from "firebase/app";
import "firebase/storage";
import "firebase/database";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCUFjz6GWSpfjTNMrB3DTMcCY1RfUg2qzY",
  authDomain: "awarenesscontent.firebaseapp.com",
  projectId: "awarenesscontent",
  storageBucket: "awarenesscontent.appspot.com",
  messagingSenderId: "485810474234",
  appId: "1:485810474234:web:1cc85ab2cf326a26164d43",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const database = firebase.database().ref("/article");

const storage = firebase.storage();

const auth = firebase.auth();

export { database, storage, auth, firebase as default };
