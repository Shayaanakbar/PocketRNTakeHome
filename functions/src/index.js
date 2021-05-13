const functions = require("firebase-functions");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

// Hello world request check firebase functions are working
exports.helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});

// firebase auth trigger (new user signup)
exports.newUsersSignup = functions.auth.user().onCreate(user => {
  console.log('user created', user.email, user.uid)
});

// firebase auth trigger (new user delete)
exports.userDeleted = functions.auth.user().onDelete(user => {
  console.log('user deleted', user.email, user.uid);
})
