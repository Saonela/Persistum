import {Firebase, FirebaseDB} from "../../firebase";

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
        return new Promise((resolve) => {
            return firebaseAuth.createUserWithEmailAndPassword(email, password).then((response) => {
                const user = response.user;
                FirebaseDB.collection('accounts').doc(user.uid).set({userId: user.uid}).then();
                resolve(response);
            });
        });
    },
    login(email, password) {
        return firebaseAuth.signInWithEmailAndPassword(email, password);
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
