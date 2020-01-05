
import Vue from 'vue';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/messaging';
import Buefy from 'buefy';
// import 'firebase/analytics';
import { rtdbPlugin } from 'vuefire';
import 'buefy/dist/buefy.css';

import App from './App.vue';
import router from './router';


Vue.config.productionTip = false;


firebase.initializeApp({
  apiKey: 'AIzaSyBGRre0H5qgB_gsykdwACUPJO92KRlm0qU',
  authDomain: 'l-test-5c357.firebaseapp.com',
  databaseURL: 'https://l-test-5c357.firebaseio.com',
  projectId: 'l-test-5c357',
  storageBucket: 'l-test-5c357.appspot.com',
  messagingSenderId: '992971184548',
  appId: '1:992971184548:web:aef355f6258991f6cf4931',
});
// firebase.analytics();

Vue.use(rtdbPlugin);
Vue.use(Buefy);

let app = '';
firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    /* eslint-disable no-new */
    app = new Vue({
      router,
      render: h => h(App),
    }).$mount('#app');
  }
});

firebase.messaging().onMessage((payload) => {
  app.$buefy.toast.open(`<b>${payload.notification.title}</b>: ${payload.notification.body}`);
});
