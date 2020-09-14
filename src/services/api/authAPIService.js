import {Firebase, FirebaseDB} from "../../firebase";
import * as firebase from "firebase";

const firebaseAuth = Firebase.auth();

const AuthAPIService = {
    getCurrentUser() {
        return new Promise((resolve) => {
            firebaseAuth.onAuthStateChanged((user) => {
                resolve(user);
            });
        });
    },
    register(email, password) {
        return new Promise((resolve, reject) => {
            return firebaseAuth.createUserWithEmailAndPassword(email, password).then((response) => {
                const user = response.user;
                FirebaseDB.collection('accounts').doc(user.uid).set({userId: user.uid}).then();
                resolve(response);
            }, (error) => {
                reject(error);
            });
        });
    },
    login(email, password) {
        return new Promise((resolve, reject) => {
            firebaseAuth.setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(() => {
                return firebaseAuth.signInWithEmailAndPassword(email, password).then((response) => {
                    resolve(response);
                });
            }).catch((error) => {
                console.log('firebase set persistence failed', error);
                reject(error);
            });
        });
    },
    loginWithProvider(provider) {
        return new Promise((resolve) => {
            firebaseAuth.signInWithPopup(provider).then((response) => {
                const user = response.user;
                FirebaseDB.collection('accounts').doc(user.uid).set({userId: user.uid}).then();
                resolve(response);
            }).catch((error) => {
                console.log('provider auth error', error);
                alert(error.message)
            });
        });
    },
    logout() {
        return firebaseAuth.signOut();
    },
    resetPassword(email) {
        return firebaseAuth.sendPasswordResetEmail(email);
    },
    updatePassword(password) {
        return firebaseAuth.currentUser.updatePassword(password);
    }
};

export default AuthAPIService;
