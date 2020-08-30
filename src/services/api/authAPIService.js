import {Firebase} from "../../firebase";

const firebaseAuth = Firebase.auth();

const AuthAPIService = {
    register(email, password) {
        return firebaseAuth.createUserWithEmailAndPassword(email, password);
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
