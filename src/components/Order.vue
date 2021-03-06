<template>
    <div :class="['order', 'box', {'cancel': inProgress}]">
        <div class="columns is-multiline">
            <div class="column is-vertical-center is-one-third">
                <b>Order #{{ order.createdAt.toString().substr(1,9) }}</b>
            </div>
            <div class="column is-vertical-center is-one-third">
                {{ (new Date(order.updatedAt)).toLocaleString() }} -
                <b>{{ order.status }}</b>
            </div>
            <div class="column is-one-third has-text-centered">
                <b-button type="is-primary"
                        @click="showDetails = !showDetails"
                        :icon-right="showDetails ? 'caret-up' : 'caret-down'">
                    {{ showDetails ? 'Less' : 'More' }}
                </b-button>
            </div>
        </div>
        <div class="columns content" v-if="showDetails">
            <div class="column is-half is-vertical-center">
                <ul>
                    <li v-for="(count,name) in items" :key="name">
                        {{name}} x {{ count }}
                    </li>
                </ul>
            </div>
            <div class="column is-half is-vertical-center">
                <div>
                    <p>Total Cost: <b>₹{{ order.totalCost || 0 }}</b>
                        <br>
                        <b-tooltip type="is-dark" label="Estimated">
                            Delivery Date
                        </b-tooltip>:
                        <b>{{ (new Date(order.deliveryDate)).toLocaleString() || ''}}</b>
                    </p>
                    <b-button @click="cancelOrder" :disabled="inProgress"
                          icon-left="trash" v-if="order.status === 'Pending'" type="is-danger">
                        Cancel
                    </b-button>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.is-vertical-center {
    display: flex;
    align-items: center;
}

.content ul {
    margin-top: 0
}

.cancel {
    background: #eee;
    text-decoration: line-through;
}
</style>

<script>
import firebase from 'firebase/app';
import 'firebase/functions';

export default {
  name: 'Order',
  data() {
    return {
      showDetails: false,
      inProgress: false,
    };
  },
  props: {
    order: Object,
  },
  computed: {
    items() {
      const items = {};
      Object.keys(this.order.items).forEach((key) => {
        if (this.order.items[key] !== 0) {
          items[key] = this.order.items[key];
        }
      });
      return items;
    },
  },
  methods: {
    cancelOrder() {
      this.$buefy.dialog.confirm({
        title: 'Cancel Order',
        message: 'Are you sure you want to <b>cancel</b> this order',
        confirmText: 'Cancel Order',
        type: 'is-danger',
        onConfirm: () => this.doCancelOrder(),
      });
    },
    doCancelOrder() {
      this.inProgress = true;
      const cancelOrderFunction = firebase.functions().httpsCallable('cancelOrder');
      cancelOrderFunction({ key: this.order['.key'] })
        .then((result) => {
          this.$buefy.toast.open({
            message: result.data,
            type: 'is-danger',
          });
        })
        .then(() => { this.inProgress = false; });
    },
  },
};
</script>
