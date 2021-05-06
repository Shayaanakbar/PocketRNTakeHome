import firebase from "firebase/app";
import 'firebase/functions';

const firebaseConfig = {
    apiKey: "API_KEY",
    authDomain: "pocketrn-d6a55.firebaseapp.com",
    projectId: "pocketrn-d6a55",
    storageBucket: "pocketrn-d6a55.appspot.com",
    messagingSenderId: "SENDER_ID",
    appId: "APP_ID",
    measurementId: "G-MEASUREMENT_ID"
};

const app = firebase.initializeApp(firebaseConfig);

const firebaseFunctions = app.functions();
firebaseFunctions.useEmulator('localhost', 5001);

export async function helloWorld(): Promise<void> {
    const res = await firebaseFunctions.httpsCallable('helloWorld')({});
    console.log(res);
}
