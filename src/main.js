
import Vue from 'vue';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/messaging';
import Buefy from 'buefy';
// import 'firebase/analytics';
import { rtdbPlugin } from 'vuefire';

import { library } from '@fortawesome/fontawesome-svg-core';

import {
  faCheck, faShoppingCart, faPlus, faMinus, faAngleLeft, faAngleRight, faPencilAlt,
  faTrash, faWater, faEnvelope, faLock, faCalendar, faSave, faExclamationCircle,
  faEye, faEyeSlash, faCaretDown, faCaretUp,
} from '@fortawesome/free-solid-svg-icons';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import router from './router';
import App from './App.vue';


Vue.config.productionTip = false;

library.add(faCheck, faPlus, faMinus, faTrash, faWater, faGoogle, faExclamationCircle,
  faEnvelope, faLock, faAngleLeft, faAngleRight, faCalendar, faSave, faPencilAlt,
  faEye, faEyeSlash, faCaretDown, faShoppingCart, faCaretUp);

Vue.component('vue-fontawesome', FontAwesomeIcon);

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
Vue.use(Buefy, {
  defaultIconComponent: 'vue-fontawesome',
  defaultIconPack: 'fas',
});

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
if (firebase.messaging.isSupported()) {
  firebase.messaging().onMessage((payload) => {
    // firebase.analytics().logEvent('notification_received_in_page');
    app.$buefy.toast.open(`<b>${payload.notification.title}</b><br> ${payload.notification.body}`);
  });
}
