import {FirebaseAuth, FirebaseDB, FirebasePersistence} from "../../firebase";

const AuthAPIService = {
    getCurrentUser() {
        return new Promise((resolve) => {
            FirebaseAuth.onAuthStateChanged((user) => {
                resolve(user);
            });
        });
    },
    register(email, password) {
        return new Promise((resolve, reject) => {
            return FirebaseAuth.createUserWithEmailAndPassword(email, password).then((response) => {
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
            FirebaseAuth.setPersistence(FirebasePersistence.LOCAL).then(() => {
                return FirebaseAuth.signInWithEmailAndPassword(email, password).then((response) => {
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
            FirebaseAuth.signInWithPopup(provider).then((response) => {
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
        return FirebaseAuth.signOut();
    },
    resetPassword(email) {
        return FirebaseAuth.sendPasswordResetEmail(email);
    },
    updatePassword(password) {
        return FirebaseAuth.currentUser.updatePassword(password);
    }
};

export default AuthAPIService;
