const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

exports.sendOrderUpdateNotification = functions.database.ref('orders/{uid}/{id}').onUpdate((change, event) => {
  const uuid = event.params.uid;

  const ref = admin.database().ref(`users/${uuid}/token`);
  return ref.once('value', (snapshot) => {
    const payload = {
      notification: {
        title: 'Order Status Updated',
        body: 'Tap here to check status of order',
        icon: 'https://l-test-5c357.firebaseapp.com/img/icons/android-chrome-192x192.png',
        click_action: 'https://l-test-5c357.firebaseapp.com',
      },
    };

    admin.messaging().sendToDevice(snapshot.val(), payload);
  }, (errorObject) => {
    console.log(`The read failed: ${errorObject.code}`);
  });
});

exports.cancelOrder = functions.https.onCall((data, context) => {
  const oid = data.key;
  const { uid } = context.auth;
  const ref = admin.database().ref(`orders/${uid}/${oid}`);
  return ref.once('value').then((snap) => {
    const order = snap.val();
    if (order && order.status === 'Pending') {
      return ref.remove().then(() => 'Order Cancelled');
    }
    return 'Cancellation not allowed';
  });
});
