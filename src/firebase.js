import * as app from "firebase";

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

export const Firebase = app.initializeApp(config);
export const FirebaseDB = Firebase.firestore();
