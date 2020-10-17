import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';

const config = {
    apiKey: "AIzaSyCU5NNhFFH124U3qgxxw1M5Q7VwkLGXvuU",
    authDomain: "persistum.firebaseapp.com",
    databaseURL: "https://persistum.firebaseio.com",
    projectId: "persistum",
    storageBucket: "persistum.appspot.com",
    messagingSenderId: "279016196581",
    appId: "1:279016196581:web:e0c15821deff75577e870c",
    measurementId: "G-MSNH908EVH"
};

export const Firebase = firebase.initializeApp(config);
export const FirebaseAuth = Firebase.auth();
export const FirebaseDB = Firebase.firestore();
export const FirebaseGoogleAuthProvider = new firebase.auth.GoogleAuthProvider();
export const FirebaseFacebookAuthProvider = new firebase.auth.FacebookAuthProvider();
export const FirebasePersistence = firebase.auth.Auth.Persistence;
