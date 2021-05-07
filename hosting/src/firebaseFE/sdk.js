import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/functions';

var firebaseConfig = {
    apiKey: "AIzaSyDXKtXLurv4d4ndBpw4s83oQhjirfBGJzY",
    authDomain: "pocketrn-d6a55.firebaseapp.com",
    databaseURL: "https://pocketrn-d6a55-default-rtdb.firebaseio.com",
    projectId: "pocketrn-d6a55",
    storageBucket: "pocketrn-d6a55.appspot.com",
    messagingSenderId: "278432241734",
    appId: "1:278432241734:web:b21775ca72e9833875d247",
    measurementId: "G-JP4BQHY4MR"
};

class Firebase {
    constructor() {
        app.initializeApp(firebaseConfig);
        this.auth = app.auth();
        // this.db = app.database(); Later add database
    }

    /*** Authentication  ***/
    doCreateUserWithEmailAndPassword = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email, password);

    doSignInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);

    doSignOut = () =>
        this.auth.signOut();

    doPasswordReset = email =>
        this.auth.sendPasswordResetEmail(email);
}

export default Firebase;
