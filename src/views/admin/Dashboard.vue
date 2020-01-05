<template>
    <section class="section">
        <div class="container">
          <!-- Order Search Page -->
          <!-- Group orders -->
          <!-- Let them go to specific orderpage for actions -->
          <!-- List all users here  here -->
            <!-- {{ orders }} -->
            <ul>
              <li v-for="(order,key) in orders" :key="key">
                <div v-for="(o,k) in order" :key="k">
                  <router-link :to="'/admin/order/'+order['.key'] + '/' + k">
                    OrderID: {{ o.createdAt.toString().substr(1,9) }}
                  </router-link>
                </div>
              </li>
            </ul>
        </div>
    </section>
</template>
<script>
import firebase from 'firebase/app';
import 'firebase/database';

export default {
  name: 'AdminDashboard',
  firebase() {
    return {
      orders: firebase.database().ref('orders'),
    };
  },
  data() {
    return {
      orders: [],
    };
  },
};
</script>
