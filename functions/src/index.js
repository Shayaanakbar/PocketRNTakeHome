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

// firebase trigger add activity. if/else statement if user is authenticated then continue
exports.addActivity = functions.https.onCall(( uid, data, context) => {
  console.log("uid", uid);
  console.log("data", data)
  if(!context.auth){
    throw new functions.https.HttpsError(
        'unauthenticated',
        'only authenticated users can add requests'
    );
  }
  return admin.firestore().collection(`users/${uid}/activities`).add({
    date: uid.data.date,
    duration: uid.data.duration,
    name: uid.data.name,
    type: uid.data.type
  })
});

