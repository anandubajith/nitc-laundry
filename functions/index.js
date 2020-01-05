const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
exports.sendOrderUpdateNotification = functions.database.ref('orders/{uid}/{id}').onUpdate((change, event) => {
  const uuid = event.params.uid;

  const ref = admin.database().ref(`users/${uuid}/token`);
  return ref.once('value', (snapshot) => {
    const payload = {
      notification: {
        title: 'Order Status Updated',
        body: 'Tap here to check status of order',
        badge: 'https://l-test-5c357.firebaseapp.com/img/icons/android-chrome-192x192.png',
      },
    };

    admin.messaging().sendToDevice(snapshot.val(), payload);
  }, (errorObject) => {
    console.log(`The read failed: ${errorObject.code}`);
  });
});
