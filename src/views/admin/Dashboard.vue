<template>
    <section class="section">
        <div class="container">
            <div class="box">
              <h3 class="title is-size-3">Pending pickup</h3>
              <div v-for="(order, i) in pendingOrders " :key="i">
                <router-link :to="'/admin/order/'+order['uid']+'/'+order['oid']">
                  OrderID: {{ order.createdAt.toString().substr(1,9) }}
                </router-link>
                CreatedAt: {{ (new Date(order.createdAt)).toLocaleString()}}
                <br><br>
              </div>
            </div>
            <div class="box">
              <h3 class="title is-size-3">Pending Delivery</h3>
              <div v-for="(order, i) in pendingDelivery " :key="i">
                 <router-link :to="'/admin/order/'+order['uid']+'/'+order['oid']">
                  OrderID: {{ order.createdAt.toString().substr(1,9) }}
                 </router-link>
                DeliveryDate: {{ (new Date(order.deliveryDate)).toLocaleString()}}
                <br><br>
              </div>
            </div>
            <div class="box">
              <h3 class="title is-size-3">Out for Delivery</h3>
              <div v-for="(order, i) in pendingOutForDelivery " :key="i">
                 <router-link :to="'/admin/order/'+order['uid']+'/'+order['oid']">
                  OrderID: {{ order.createdAt.toString().substr(1,9) }}
                 </router-link>
                DeliveryDate: {{ (new Date(order.deliveryDate)).toLocaleString()}}
                <br><br>
              </div>
            </div>
        </div>
    </section>
</template>
<script>
import firebase from 'firebase/app';
import 'firebase/database';

function compare(a, b) {
  if (a.createdAt > b.createdAt) return 1;
  if (b.createdAt > a.createdAt) return -1;

  return 0;
}
function compare2(a, b) {
  if (a.deliveryDate > b.deliveryDate) return 1;
  if (b.deliveryDate > a.deliveryDate) return -1;

  return 0;
}

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
  computed: {
    pendingOrders() {
      const pendingOrders = [];
      this.orders.forEach((user) => {
        Object.keys(user).forEach((key) => {
          const copy = user[key];
          copy.uid = user['.key'];
          copy.oid = key;
          if (copy.status === 'Pending') {
            pendingOrders.push(copy);
          }
        });
      });
      // sort this by created at
      return pendingOrders.sort(compare);
    },
    pendingDelivery() {
      const pendingDelivery = [];
      this.orders.forEach((user) => {
        Object.keys(user).forEach((key) => {
          const copy = user[key];
          copy.uid = user['.key'];
          copy.oid = key;
          if (copy.status === 'PickedUp') {
            pendingDelivery.push(copy);
          }
        });
      });
      // sort this by created at
      return pendingDelivery.sort(compare2);
    },
    pendingOutForDelivery() {
      const pendingDelivery = [];
      this.orders.forEach((user) => {
        Object.keys(user).forEach((key) => {
          const copy = user[key];
          copy.uid = user['.key'];
          copy.oid = key;
          if (copy.status === 'OutForDelivery') {
            pendingDelivery.push(copy);
          }
        });
      });
      // sort this by created at
      return pendingDelivery.sort(compare2);
    },
  },
};
</script>
