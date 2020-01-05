<template>
    <section class="section">
        <div class="container">
            <div class="columns is-mobile is-multiline">
      <div class="column is-quarter-desktop is-full-mobile">
        <span class="header-icon user-profile-image">
          <img alt :src="user.photo" />
        </span>
      </div>
      <div class="column is-full-tablet is-half-desktop name">
        <p>
          <span class="title is-size-2 is-bold">{{ user.name }}</span>
          <span class="is-size-3 is-block">{{ user.phone }}</span>
        </p>
        <p class="tagline break">
          {{user.email}}
          <br />
          <b>{{ user.room }}</b>
          {{ user.hostel }}
          {{user.roll }}
        </p>
      </div>
    </div>
            <hr>
            <div class="box">
              <div class="columns has-text-centered">
                <div class="column">
                  <h4 class="is-size-4">
                    CreatedAt: <b>{{ (new Date(order.createdAt)).toLocaleString() }}</b>
                  </h4>
                </div>
                <div class="column">
                  <h4 class="is-size-4">
                    UpdatedAt: <b>{{ (new Date(order.updatedAt)).toLocaleString() }}</b>
                  </h4>
                </div>
              </div>
            </div>
            <div class="box">
              <h4 class="is-size-4">Items</h4>
              <hr>
              <div v-for="(item,key) in order.items" :key="key">
                  {{ item.type }} x {{ item.quantity }}
              </div>
              <hr>
              <h4 class="is-size-5">Total Cost: ??</h4>
            </div>
            <hr>
            <div class="box">
              <div class="columns">
                <div class="column is-vertical-center">
                  Select Delivery Date
                </div>
                <div class="column">
                  <b-field grouped>
                    <b-field expanded>
                      <b-datetimepicker
                    placeholder="Click to select..."
                    v-model="deliveryDate"
                    expanded
                    icon="calendar-today">
                </b-datetimepicker>
                    </b-field>
                    <b-field>
                      <b-button type="is-primary" @click="setDeliveryDate">
                        Set Delivery Date</b-button>
                    </b-field>
                  </b-field>
                </div>
              </div>
            </div>
            <div class="box">
               <div class="columns">
                 <div class="column is-vertical-center">
                   <h4 class="is-size-5">Update Status</h4>
                 </div>
                 <div class="column">
                   <b-field grouped>
                    <b-field expanded>
                            <b-select
                                placeholder="Select current Status"
                                required
                                v-model="status"
                                expanded>
                                <option value="Pending">Pending</option>
                                <option value="PickedUp">PickedUp</option>
                                <option value="OutForDelivery">OutForDelivery</option>
                                <option value="Delivered">Delivered</option>
                            </b-select>
                        </b-field>
                    <b-field>
                      <b-button type="is-primary" @click="updateStatus">Update Status</b-button>
                    </b-field>
                    </b-field>
                 </div>
               </div>
            </div>
        </div>
    </section>
</template>
<style>
.stat-val {
  font-size: 3em;
  /* padding-top: 20px; */
  font-weight: bold;
}
.stat-key {
  font-size: 1.4em;
  font-weight: 200;
}
.user-profile-image img {
  max-width: 100%;
  width: 200px;
  height: 200px;
  border-radius: 100%;
}

.break {
  word-break: break-word;
}
.is-vertical-center {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}
.card-footer-item.is-danger{
  color:tomato;
}
.card-footer-item.is-success{
  color:#23d160;
}
.table-poster {
  width: 100%;
  height: 100%;
  max-width: 200px;
  max-height: 300px;
  margin-right: 10px;
}
@media screen and ( min-width: 400px) {
   .user-profile-image img {
     display: block;
     margin:auto;
   }
}
.table__wrapper {
  overflow-x: auto;
}
</style>
<script>
import firebase from 'firebase/app';
import 'firebase/database';

export default {
  name: 'SingleOrder',
  data() {
    return {
      user: {},
      order: {},
      status: '',
      deliveryDate: null,
    };
  },
  firebase() {
    return {
      user: firebase.database().ref(`ambassadors/${this.$route.params.user}`),
      order: firebase.database().ref(`orders/${this.$route.params.user}/${this.$route.params.order}`),
    };
  },
  beforeUpdate() {
    this.status = this.order.status;
    this.deliveryDate = this.order.deliveryDate;
  },
  methods: {
    updateStatus() {
      firebase.database()
        .ref(`orders/${this.$route.params.user}/${this.$route.params.order}`)
        .update({
          status: this.status,
          updatedAt: Date.now(),
        });
    },
    setDeliveryDate() {
      firebase.database()
        .ref(`orders/${this.$route.params.user}/${this.$route.params.order}`)
        .update({
          deliveryDate: this.deliveryDate,
          updatedAt: Date.now(),
        });
    },
  },
};
</script>
