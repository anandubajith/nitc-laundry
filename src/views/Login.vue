<template>
  <section class="hero is-fullheight-with-navbar">
        <div class="hero-body">
            <div class="container has-text-centered">
                <div class="column is-4 is-offset-4">
                    <div class="box">
                      <div>
                        <b-icon
                            pack="fas"
                            icon="tshirt"
                            size="is-large">
                        </b-icon>
                        <br><br>
                      </div>
                            <b-button @click="socialLogin"
                            icon-left="google"
                            size="is-large"
                            type="is-info"
                            expanded>
                              Login with Google
                            </b-button>
                    </div>
                    <p class="has-text-grey">
                        <a href="../">Need Help?</a>
                    </p>
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
      // console.log('hi there');
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(() => {
          this.$router.replace('home');
        })
        .catch((err) => {
          // eslint-disable-next-line
          alert(`Oops. ${err.message}`);
        });
    },
  },
};
</script>
