<template>
  <div class="order box">
      <div class="columns is-multiline">
          <div class="column is-vertical-center is-one-third">
              <b>Order #{{ order.createdAt.toString().substr(1,9) }}</b>
          </div>
          <div class="column is-vertical-center is-one-third">
             {{ (new Date(order.updatedAt)).toLocaleString() }}
             -
             <b>{{ order.status }}</b>
          </div>
          <div class="column is-one-third has-text-centered">
              <b-button type="is-primary" @click="showDetails = !showDetails">
                  {{ showDetails ? 'Less' : 'More' }}
              </b-button>
          </div>
      </div>
      <div class="columns content" v-if="showDetails">
        <div class="column is-half is-vertical-center">
                <ul>
                    <li v-for="(item,key) in order.items" :key="key">
                        {{ item.type }} x {{ item.quantity }}
                    </li>
                </ul>
          </div>
          <div class="column is-half is-vertical-center">
          <div>
            <p>Total Cost: ₹ ??
              <br>
              Delivery Date ( estimated ): <b>{{ order.deliveryDate || ''}}</b>
            </p>
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
</style>
<script>
export default {
  name: 'Order',
  data() {
    return {
      showDetails: false,
    };
  },
  props: {
    order: Object,
  },
};
</script>
