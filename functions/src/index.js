const functions = require("firebase-functions");
const admin = require('firebase-admin');
admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

// Hello world request check firebase functions are working
exports.helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});

// firebase auth trigger (new user signup)
exports.newUsersSignup = functions.auth.user().onCreate(user => {
  return admin.firestore().collection('users').doc(user.uid).set({
    email: user.email,
    password: user.passwordHash
  })
});

// firebase auth trigger (new user delete)
exports.userDeleted = functions.auth.user().onDelete(user => {
  const doc = admin.firestore().collection('users').doc(user.uid);
  return doc.delete();
})

// firebase trigger add requests. if/else statement if user is authenticated
exports.addRequest = functions.https.onCall((data, context) => {
  if(!context.auth){
    throw new functions.https.HttpsError(
        'unauthenticated',
        'only authenticated users can add requests'
    );
  }
  if(data.text.length > 30){
    throw new functions.https.HttpsError(
        'invalid-argument',
        'request must be no more than 30 characters long'
    );
  }
  return admin.firestore().collection('requests').add({
    text: data.text,
    activities: data.activities,
    date: data.date,
    duration: data.duration,
    name: data.name
  })
});

