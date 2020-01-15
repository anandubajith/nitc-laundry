<template>
    <section class="section">
        <div class="container">
            <div class="columns is-centered">
                <div class="column is-half">
                    <b-steps v-model="activeStep" :animated="true"
                             :has-navigation="false">
                        <b-step-item label="Add Items">
                            <div class="box">
                                <h3 class="is-size-4">Add Items</h3>
                                <hr>
                                <div >
                                    <b-field grouped>
                                        <b-field expanded>
                                          <div class="item-desc">
                                            <p class="item-title">Shirt</p>
                                            <p class="subtitle">₹11 each </p>
                                          </div>
                                        </b-field>
                                        <b-field>
                                            <b-numberinput min="0" v-model="items.Shirt"
                                                                   controls-position="compact"
                                                                   placeholder="Quantity" max="100">
                                            </b-numberinput>
                                        </b-field>
                                    </b-field>
                                    <b-field grouped>
                                        <b-field expanded>
                                          <div class="item-desc">
                                            <p class="item-title">TShirt</p>
                                            <p class="subtitle">₹9 each </p>
                                            </div>
                                        </b-field>
                                        <b-field>
                                            <b-numberinput min="0" v-model="items.TShirt"
                                                                   controls-position="compact"
                                                                   placeholder="Quantity" max="100">
                                            </b-numberinput>
                                        </b-field>
                                    </b-field>
                                    <b-field grouped>
                                        <b-field expanded>
                                          <div class="item-desc">
                                            <p class="item-title">Pants</p>
                                            <p class="subtitle">₹10 each </p>
                                            </div>
                                        </b-field>
                                        <b-field>
                                            <b-numberinput min="0" v-model="items.Pants"
                                                                   controls-position="compact"
                                                                   placeholder="Quantity" max="100">
                                            </b-numberinput>
                                        </b-field>
                                    </b-field>
                                       <b-field grouped>
                                        <b-field expanded>
                                          <div class="item-desc">
                                            <p class="item-title">Jeans</p>
                                            <p class="subtitle">₹12 each </p>
                                            </div>
                                        </b-field>
                                        <b-field>
                                            <b-numberinput min="0" v-model="items.Jeans"
                                                                   controls-position="compact"
                                                                   placeholder="Quantity" max="100">
                                            </b-numberinput>
                                        </b-field>
                                    </b-field>
                                       <b-field grouped>
                                        <b-field expanded>
                                            <div class="item-desc">
                                              <p class="item-title">Other</p>
                                            <p class="subtitle">Cost updated at time of pickup</p>
                                              </div>
                                        </b-field>
                                        <b-field>
                                            <b-numberinput min="0" v-model="items.Other"
                                                                   controls-position="compact"
                                                                   placeholder="Quantity" max="100">
                                            </b-numberinput>
                                        </b-field>
                                    </b-field>
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
                                <h3 class="is-size-4">Items in Order</h3>
                                <hr>
                                <div class="item" v-for="(val,key) in items" :key="key">
                                  <div v-if="val != 0" >
                                   {{ key }} - ( {{ val }} x ₹{{ costModel[key] }} )
                                   - ₹{{ val *  costModel[key]}}
                                  </div>
                                </div>
                                <div v-if="items.length == 0">
                                    No Items in order
                                </div>
                                <hr>
                                <div class="has-text-centered">
                                    <b-button @click="activeStep = 0"
                                    icon-left="pencil-alt" type="is-info">
                                        Edit order
                                    </b-button>
                                </div>
                            </div>
                            <div class="box">

                                <b-field label="Remarks">
                                    <b-input maxlength="200" type="textarea"></b-input>
                                </b-field>
                            </div>
                            <div class="box">
                              <div class="columns is-centered">
                                <div class="column">
                                   <h1 class="title has-text-centered">
                                    Total Cost: ₹{{ totalCost }}
                                </h1>
                                <hr>
                                  </div>
                                </div>
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
                                        Note:<br>
                                        * OneDay delivery costs extra 50% of total<br>
                                        * Free delivery for orders over ₹50
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
<style scoped>
.item-title {
  display:block;
  font-size: 1.25em;
  font-weight: bold;
}
.item-desc .subtitle {
  font-size: 1em;
}
</style>
<script>
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

export default {
  name: 'NewOrder',
  data() {
    return {
      items: {
        Shirt: 0,
        TShirt: 0,
        Jeans: 0,
        Pants: 0,
        Other: 0,
        DeliveryCharge: 0,
      },
      type: null,
      activeStep: 0,
      costModel: {
        Shirt: 11,
        Jeans: 12,
        Pants: 10,
        TShirt: 9,
        Other: 0,
        DeliveryCharge: 20,
      },
    };
  },
  computed: {
    totalCost() {
      let total = 0;
      Object.keys(this.items)
        .forEach((item) => {
          total += this.costModel[item] * this.items[item];
        });
      return total;
    },
    expressCost() {
      return this.totalCost * 1.25;
    },
  },
  methods: {
    doOneDayOrder() {
      if (this.totalCost <= 50) {
        this.$buefy.dialog.confirm({
          message: 'Minimum Order Cost of ₹50 is not met<br><b>DeliveryCharge: ₹20</b>',
          onConfirm: () => {
            this.items.DeliveryCharge = 1;
            this.$forceUpdate();
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
            this.items.DeliveryCharge = 1;
            this.$forceUpdate();
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
