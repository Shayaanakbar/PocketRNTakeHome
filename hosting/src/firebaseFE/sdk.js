import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database';
import 'firebase/functions;



// Firebase Configuration. Retrieved this from Firebase console
let firebaseConfig = {
    apiKey: "AIzaSyDXKtXLurv4d4ndBpw4s83oQhjirfBGJzY",
    authDomain: "pocketrn-d6a55.firebaseapp.com",
    databaseURL: "https://pocketrn-d6a55-default-rtdb.firebaseio.com",
    projectId: "pocketrn-d6a55",
    storageBucket: "pocketrn-d6a55.appspot.com",
    messagingSenderId: "278432241734",
    appId: "1:278432241734:web:b21775ca72e9833875d247",
    measurementId: "G-JP4BQHY4MR"
};

// initialize firebase
const app = firebase.initializeApp(firebaseConfig);

// initialize firebase db
export const db = firebase.firestore();

// render firebase Functions to use with Callable functions
const firebaseFunctions = app.functions();
firebaseFunctions.useEmulator('localhost', 5001);

// new
export function helloWorld() {
    const res = firebaseFunctions.httpsCallable('helloWorld')({});
    console.log(res)
}

// Sign In registration (new)
export function doSignInWithEmailAndPassword(user, email, password) {
    const res = firebaseFunctions.httpsCallable('newUsersSignup')({
        email: user.email,
        password: user.password
    })
}

// add activity (new)
export function addActivity (uid, activity) {
    const res = firebaseFunctions.httpsCallable('addActivity')({

    })
}

class Firebase {
    constructor() {
        app.initializeApp(firebaseConfig);
        this.auth = app.auth();
        this.db = app.database();
    }

    /*** Authentication  ***/

    doSignInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);

    doPasswordReset = email =>
        this.auth.sendPasswordResetEmail(email);

    /*** Database ***/
    user = uid => this.db.ref(`users/${uid}`);
    users = () => this.db.ref('users');

    addActivity = (uid, activity) => {
        const ref = this.db.ref().child(`users/${uid}/activities`)
        ref.push(activity);
    }

    updateActivity = (uid, activity, activityKey) => {
        const ref = this.db.ref().child(`users/${uid}/activities/${activityKey}`);
        ref.update(activity);
    }
}

export default Firebase;
