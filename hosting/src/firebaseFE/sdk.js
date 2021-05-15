import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database';
import 'firebase/functions';



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
class Firebase {
    constructor() {
        this.app = firebase.initializeApp(firebaseConfig);
        this.auth = this.app.auth();
        this.db = this.app.database();
        this.firebaseFunctions = this.app.functions();
        this.firebaseFunctions.useEmulator('localhost', 5001);
    }
}

// Sign In registration (new)
export function doSignInWithEmailAndPassword(user, email, password) {
    const res = firebase.app.functions().httpsCallable('newUsersSignup')({
        email: user.email,
        password: user.password
    })
    return res
}

// add activity (new)
export function addActivity (uid, activity) {
    console.log("hitting here")
    const res = firebase.app.functions().httpsCallable('addActivity')({

    })
}


export {Firebase};
