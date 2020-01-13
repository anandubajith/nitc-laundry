<template>
    <section class="section home">
        <div class="container">
            <div class="columns profile is-multiline">
                <div class="column is-narrow-tablet">
                    <img :src="photo" class="photo" alt="Profile Photo" />
                </div>
                <div class="column is-vertical-center">
                    <div class="profile-block">
                        <h4 class="is-size-3">{{ userData.name }}</h4>
                        <h4 class="is-size-4">{{ userData.phone }}</h4>
                        <p>{{ userData.hostel + ' hostel'}} - {{ userData.room }}</p>
                        <p>{{ userData.roll }}</p>
                        <p style="margin-top:10px" class="buttons">
                            <b-button :icon-right="notificationsActive ? 'check':'window-close'"
                                    :type="notificationsActive ? 'is-success': 'is-danger'"
                                    @click="enableNotifications">
                                Notifications
                            </b-button>
                            <b-button tag="router-link" type="is-info" to="/register">
                              Edit Info
                            </b-button>
                        </p>
                    </div>
                </div>
            </div>
            <hr />
            <div class="has-text-centered">
                <b-button tag="router-link" to="/order/new"
                    icon-left="shopping-cart" size="is-large" type="is-link">
                    Place Order
                </b-button>
            </div>
            <hr />
            <div>
                <h4 class="is-size-4 title">Past Orders</h4>
                <div class="orders" v-if="orders.length">
                    <Order v-for="(order, key) in orders" :order="order" :key="key" />
                </div>
                <div v-else>
                    <h4 class="is-size-4">Place an Order to get started</h4>
                </div>
            </div>
        </div>
    </section>
</template>

<style>
.photo {
    width: 200px;
    border-radius: 100%;
}

@media screen and (max-width: 600px) {
    .profile {
        text-align: center;
    }
    .profile-block {
        margin: auto;
    }
    .photo {
        width: 120px;
    }
}
</style>

<script>
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/messaging';
import Order from '../components/Order.vue';

export default {
  name: 'DashboardCA',
  data() {
    return {
      orders: [],
      photo: firebase.auth().currentUser.photoURL,
      uid: firebase.auth().currentUser.uid,
      success: false,
      userData: {},
      name: '',
      notificationsActive: firebase.messaging.isSupported && Notification.permission === 'granted',
    };
  },
  components: {
    Order,
  },
  firebase() {
    const userId = firebase.auth().currentUser.uid;
    return {
      userData: firebase.database().ref(`users/${userId}`),
      orders: firebase
        .database()
        .ref(`orders/${userId}`)
        .orderByChild('createdAt')
        .limitToLast(10),
    };
  },
  beforeMount() {
    if (firebase.messaging.isSupported) {
      firebase.messaging().onTokenRefresh(() => {
        firebase.messaging().getToken().then((refreshedToken) => {
          this.storeToken(refreshedToken);
          this.$buefy.toast.open('Token refreshed');
        }).catch(() => {
          this.$buefy.toast.open('Unable to retrieve refreshed token ');
        });
      });
    }
  },
  beforeUpdate() {
    if (Object.entries(this.userData).length < 4) {
      // This user is unregistered, prompt them to register
      this.$router.push('/register');
    }
  },
  computed: {},
  methods: {
    enableNotifications() {
      if (firebase.messaging.isSupported) {
        Notification.requestPermission()
          .then((permission) => {
            if (permission === 'granted') {
              return firebase.messaging().getToken();
            }
            this.notificationsActive = false;
            return null;
          })
          .then(token => this.storeToken(token));
      } else {
        this.$buefy.toast.open({
          message: 'Notifications are not supported in this browser',
          type: 'is-danger',
        });
      }
    },
    storeToken(token) {
      if (token === null) {
        this.$buefy.toast.open('Unable to get permission to notify.');
        return;
      }
      firebase.database()
        .ref(`users/${this.uid}`)
        .update({ token })
        .then(() => {
          this.$buefy.toast.open('Notifications active');
        });
    },
  },
};
</script>
