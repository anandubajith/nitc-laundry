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
                            Total cost: ₹ ??
                        </div>
                    </div>
                </div>
            </div>
            <div class="columns is-centered">
                <div class="column is-half">
                    <div class="box">

                             <b-field>
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
                         <b-input placeholder="Quantity"
                         v-model="quantity"
                            type="number"
                            >
                        </b-input>
                    </b-field>
                    <b-field>
                            <b-button type="is-primary" @click="addItem">Add</b-button>

                    </b-field>

                    </div>
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
      type: '',
      quantity: '',
    };
  },
  methods: {
    addItem() {
      this.items.push(
        { type: this.type, quantity: this.quantity },
      );
      this.type = '';
      this.quantity = '';
    },
    placeOrder() {
      firebase
        .database()
        .ref(`orders/${firebase.auth().currentUser.uid}`)
        .push({
          createdAt: Date.now(),
          items: this.items,
          status: 'pending',
        })
        .then(() => {
          this.$buefy.toast.open('Order Placed');
        })
        .then(() => {
          this.$router.replace('/home');
        });
    },
  },
};
</script>
