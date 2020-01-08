<template>
  <section class="hero is-fullheight-with-navbar">
        <div class="hero-body">
            <div class="container has-text-centered">
                <div class="column is-4 is-offset-4">
                    <div class="box">
                      <div>
                        <b-icon
                            icon="washing-machine"
                            size="is-large">
                        </b-icon>
                        <br><br>
<table class="table is-bordered is-fullwidth">
      <thead>
        <tr>
          <th>Item</th>
          <th>Rate</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Shirt</td>
          <td>₹11</td>
        </tr>
        <tr>
          <td>Jeans</td>
          <td>₹12</td>
        </tr>
        <tr>
          <td>Pants</td>
          <td>₹10</td>
        </tr>
        <tr>
          <td>TShirt</td>
          <td>₹9</td>
        </tr>
      </tbody>
    </table>
    <p><i>Free delivery over ₹50</i></p>
    <br>
                      </div>
                            <b-button @click="socialLogin"
                            icon-left="google"
                            size="is-large"
                            type="is-info"
                            expanded>
                              Login with Google
                            </b-button>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/auth';

export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    socialLogin() {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(() => {
          this.$router.replace('home');
        })
        .catch((err) => {
          // eslint-disable-next-line
          this.$buefy.toast.open({
            message: `Oops. ${err.message}`,
            type: 'is-danger',
          });
        });
    },
  },
};
</script>
