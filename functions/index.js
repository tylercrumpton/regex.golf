var functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello from Firebase!");
});

exports.testFunc = functions.auth.user().onCreate(event => {

  const user = event.data; // The Firebase user.

  const email = user.email; // The email of the user.
  const displayName = user.displayName; // The display name of the user.

  const userId = user.uid;

  console.log(JSON.stringify(userId));

  admin.database().ref("/userData").push({userId: {"name": "Tyler"}}).then(snapshot => {return true;})
});
