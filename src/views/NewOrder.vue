<template>
    <section class="section">
        <div class="container">
            <div class="columns is-centered">
                <div class="column is-half">
                    <b-steps v-model="activeStep" :animated="true" :has-navigation="false">
                        <b-step-item label="Add Items">
                            <form class="box" v-on:submit.prevent="addItem">
                                <b-field grouped>
                                    <b-field expanded>
                                        <b-select placeholder="Garment Type"
                                                v-model="type" required expanded>
                                            <option value="Shirt">Shirt</option>
                                            <option value="Jeans">Jeans</option>
                                            <option value="Pants">Pants</option>
                                            <option value="TShirt">T Shirt</option>
                                            <option value="Other">Other</option>
                                        </b-select>
                                    </b-field>
                                    <b-field>
                                        <b-numberinput min="1" v-model="quantity"
                                              controls-position="compact"
                                              placeholder="Quantity" max="100">
                                        </b-numberinput>
                                    </b-field>
                                </b-field>
                                <b-field>
                                    <b-button tag="input" native-type="submit"
                                          value="Add" type="is-primary">
                                        Add
                                    </b-button>
                                </b-field>

                            </form>
                            <div class="box">
                                <h3 class="is-size-4">Items in Order</h3>
                                <hr>
                                <div class="item" v-for="(item,key) in items" :key="key">
                                    {{ item.type }} -
                                    ( ₹{{ costModel[item.type]}} x {{ item.quantity }} )
                                </div>
                                <div v-if="items.length == 0">
                                    No Items in order
                                </div>
                                <hr>
                                <div>
                                    Total cost: <b>₹{{totalCost}}</b>
                                </div>
                            </div>
                            <div class="box buttons has-text-centered">
                                <b-button type="is-primary" @click="activeStep = 1"
                                          :disabled="items.length < 1">
                                    Confirm Order
                                </b-button>
                            </div>
                        </b-step-item>

                        <b-step-item label="Confirm">
                            <div class="box">
                                <h1 class="title has-text-centered">
                                    Total Cost: ₹{{ totalCost }}
                                </h1>
                            </div>
                            <div class="box">

                                <b-field label="Remarks">
                                    <b-input maxlength="200" type="textarea"></b-input>
                                </b-field>
                            </div>
                            <div class="box">
                                <div class="columns is-centered">
                                    <div class="column is-half-tablet">
                                        <b-button type="is-primary" size="is-large"
                                                  outlined @click="doOneDayOrder" expanded>
                                            OneDay Delivery*
                                        </b-button>
                                    </div>
                                    <div class="column is-half-tablet">
                                        <b-button type="is-primary" size="is-large"
                                                  @click="doRegularOrder" expanded>
                                            Regular Delivery
                                        </b-button>
                                    </div>
                                </div>
                                <div class="columns">
                                    <div class="column" style="font-weight:bold;">
                                        Note: *OneDay delivery costs +25% of Total
                                    </div>
                                </div>
                            </div>
                        </b-step-item>
                    </b-steps>
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
      activeStep: 0,
      costModel: {
        Shirt: 11,
        Jeans: 12,
        Pants: 10,
        TShirt: 9,
        BedSheetSingle: 3,
        BedSheetDouble: 4,
        Other: 0,
        DeliveryCharge: 20,
      },
    };
  },
  computed: {
    totalCost() {
      let total = 0;
      this.items.forEach((item) => {
        total += this.costModel[item.type] * item.quantity;
      });
      return total;
    },
    expressCost() {
      return this.totalCost * 1.25;
    },
  },
  methods: {
    addItem() {
      this.items.push({ type: this.type, quantity: this.quantity });
      this.type = null;
      this.quantity = 1;
    },
    doOneDayOrder() {
      if (this.totalCost <= 50) {
        this.$buefy.dialog.confirm({
          message: 'Minimum Order Cost of ₹50 is not met<br><b>DeliveryCharge: ₹20</b>',
          onConfirm: () => {
            this.items.push({ type: 'DeliveryCharge', quantity: 1 });
            this.oneDayOrder();
          },
        });
      } else {
        this.oneDayOrder();
      }
    },
    oneDayOrder() {
      firebase
        .database()
        .ref(`orders/${firebase.auth().currentUser.uid}`)
        .push({
          createdAt: firebase.database.ServerValue.TIMESTAMP,
          updatedAt: firebase.database.ServerValue.TIMESTAMP,
          items: this.items,
          status: 'Pending',
          deliveryDate: Date.now() + 86400000,
          totalCost: this.expressCost,
        })
        .then(() => {
          this.$buefy.toast.open({ message: 'Order Placed', type: 'is-success' });
          // firebase.analytics().logEvent('one_day_order_placed');
        })
        .then(() => {
          this.$router.replace('/home');
        });
    },
    doRegularOrder() {
      if (this.totalCost <= 50) {
        this.$buefy.dialog.confirm({
          message: 'Minimum Order Cost of ₹50 is not met<br><b>DeliveryCharge: ₹20</b>',
          onConfirm: () => {
            this.items.push({ type: 'DeliveryCharge', quantity: 1 });
            this.regularOrder();
          },
        });
      } else {
        this.regularOrder();
      }
    },
    regularOrder() {
      firebase
        .database()
        .ref(`orders/${firebase.auth().currentUser.uid}`)
        .push({
          createdAt: firebase.database.ServerValue.TIMESTAMP,
          updatedAt: firebase.database.ServerValue.TIMESTAMP,
          items: this.items,
          status: 'Pending',
          deliveryDate: Date.now() + 259200000,
          totalCost: this.totalCost,
        })
        .then(() => {
          this.$buefy.toast.open({ message: 'Order Placed', type: 'is-success' });
          // firebase.analytics().logEvent('regular_order_placed');
        })
        .then(() => {
          this.$router.replace('/home');
        });
    },
  },
};
</script>
