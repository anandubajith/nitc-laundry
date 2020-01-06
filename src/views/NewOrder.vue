<template>
    <section class="section">
        <div class="container">
            <div class="columns is-centered">
                <div class="column is-half">
                    <div class="box">
                        <h3 class="is-size-4">Items in Order</h3>
                        <hr>
                        <div class="item" v-for="(item,key) in items" :key="key">
                            {{ item.type }} x {{ item.quantity }}
                        </div>
                        <div v-if="items.length == 0">
                            No Items in order
                        </div>
                        <hr>
                        <div>
                            Total cost: <b>₹{{totalCost}}</b>
                        </div>
                    </div>
                </div>
            </div>
            <div class="columns is-centered">
                <div class="column is-half">
                    <form class="box" v-on:submit.prevent="addItem">

                           <b-field grouped>
                               <b-field expanded>
                            <b-select
                                placeholder="Garment Type"
                                required
                                v-model="type"
                                expanded>
                                <option value="Shirt">Shirt</option>
                                <option value="Jeans">Jeans</option>
                            </b-select>
                        </b-field>
                         <b-field>
                         <b-numberinput min="1" v-model="quantity"
                          controls-position="compact" placeholder="Quantity" max="100">
                        </b-numberinput>

                    </b-field>
                           </b-field>
                    <b-field>
                            <b-button tag="input" native-type="submit" type="is-primary">
                              Add</b-button>
                    </b-field>

                    </form>
                </div>
            </div>
            <div class="columns is-centered">
                <div class="column is-half">
                    <div class="box">
                        <b-button type="is-primary" @click="placeOrder">Place order</b-button>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

export default {
  name: 'NewOrder',
  data() {
    return {
      items: [],
      type: null,
      quantity: 1,
      totalCost: 0,
    };
  },
  methods: {
    addItem() {
      this.items.push(
        { type: this.type, quantity: this.quantity },
      );
      this.type = null;
      this.quantity = 1;
    },
    placeOrder() {
      firebase
        .database()
        .ref(`orders/${firebase.auth().currentUser.uid}`)
        .push({
          createdAt: firebase.database.ServerValue.TIMESTAMP,
          updatedAt: firebase.database.ServerValue.TIMESTAMP,
          items: this.items,
          status: 'Pending',
        })
        .then(() => {
          this.$buefy.toast.open({ message: 'Order Placed', type: 'is-success' });
        })
        .then(() => {
          this.$router.replace('/home');
        });
    },
  },
};
</script>
