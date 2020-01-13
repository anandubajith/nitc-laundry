// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/7.6.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.6.1/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.
firebase.initializeApp({
  apiKey: 'AIzaSyBGRre0H5qgB_gsykdwACUPJO92KRlm0qU',
  authDomain: 'l-test-5c357.firebaseapp.com',
  databaseURL: 'https://l-test-5c357.firebaseio.com',
  projectId: 'l-test-5c357',
  storageBucket: 'l-test-5c357.appspot.com',
  messagingSenderId: '992971184548',
  appId: '1:992971184548:web:aef355f6258991f6cf4931',
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
if (firebase.messaging.isSupported()) {
  const messaging = firebase.messaging();
}
