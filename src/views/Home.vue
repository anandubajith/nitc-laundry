<template>
  <section class="section home">
    <div class="container">
      <div class="stats">
        <img class="profile" :src="photo" alt />
        <div class="">
           <h2 class="is-size-4">{{ userData.name }}</h2>
          <!-- <a class="logout button" href="#" @click="logout()">Logout</a> -->
        </div>
    </div>
    <div>
      <!-- Should have option to build the order -->
      <!-- WHen the order is submitted Store that in UserObject [ Pending orders ] -->
      <!-- Then move it to /orders [ only admin write ] -->
          Branch: {{ userData.branch }} <br>
          Email: {{ userData.email }} <br>
          Hoste: {{ userData.hostel }} <br>
          Phone: {{ userData.phone }} <br>
          Room: {{ userData.room }}<br>
          Year: {{ userData.year }}
        </div>
      <div>
            <b-button type="is-primary" tag="router-link" to="/order/new">Place order</b-button>
            &nbsp;
            <b-button type="is-info" tag="router-link" to="/register">Edit Info</b-button>
      </div>
<hr>
        <div>
          <h4 class="is-size-4">Past Orders</h4>
          <hr>
          <ul>
            <Order v-for="(order, key) in orders" :order="order" :key="key" />
          </ul>
    </div>
    </div>
  </section>
</template>
<style>

</style>
<script>
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import Order from '../components/Order.vue';

export default {
  name: 'DashboardCA',
  data() {
    return {
      orders: {},
      photo: firebase.auth().currentUser.photoURL,
      uid: firebase.auth().currentUser.uid,
      success: false,
      position: 0,
      userData: {},
      notification: {},
      leaderboard: [],
      tasks: {},
      selectedTask: '',
      data: [
        'Shirt',
        'Pants',
        'A',
        'Other',

      ],
      name: '',
      count: 0,
    };
  },
  components: {
    Order,
  },
  firebase() {
    const userId = firebase.auth().currentUser.uid;
    return {
      userData: firebase.database().ref(`ambassadors/${userId}`),
      orders: firebase.database().ref(`orders/${userId}`),
    };
  },
  beforeUpdate() {
    if (Object.entries(this.userData).length < 4) {
      // This user is unregistered, prompt them to register
      this.$router.push('/register');
    }
  },
  computed: {
    filteredDataArray() {
      return this.data.filter(option => option
        .toString()
        .toLowerCase()
        .indexOf(this.name.toLowerCase()) >= 0);
    },

  },
  watch: {
    leaderboard(current) {
      if (current.length) {
        for (let i = 0; i < current.length; i += 1) {
          if (current[i].id === this.uid) {
            this.position = i + 1;
            return;
          }
        }
      }
      this.position = 0;
    },
  },
  methods: {
    onCopy() {
      // eslint-disable-next-line
      alert('Referral Code copied');
    },
  },
};
</script>
