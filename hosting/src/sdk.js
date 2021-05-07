import firebase from "firebase/app";
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

const app = firebase.initializeApp(firebaseConfig);

const firebaseFunctions = app.functions();
firebaseFunctions.useEmulator('localhost', 5001);

export async function helloWorld(): Promise<void> {
    const res = await firebaseFunctions.httpsCallable('helloWorld')({});
    console.log(res);
}
