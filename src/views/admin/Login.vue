<template>
    <div class="hero-body">
        <div class="container">
            <div class="columns is-centered">
                <div class="column is-5-tablet is-5-desktop is-4-widescreen">
                    <form class="box" v-on:submit.prevent="login">
                        <!-- <img src="../assets/logo.png" style="width:200px" alt="Ragam Logo"> -->
                        <b-field label="Email">
                            <b-input placeholder="eg. anandu_b180288cs@nitc.ac.in"
                                  required
                                  type="email" v-model="email" icon="envelope">
                            </b-input>
                        </b-field>
                        <b-field label="Password">
                            <b-input v-on:keyup.enter="login()" v-model="password" required
                                placeholder="********" type="password" icon="lock" password-reveal>
                            </b-input>
                        </b-field>
                        <b-field>
                            <b-button
                                    tag="input" native-type="submit"
                                    value="Login"
                                    type="is-primary">
                                Login
                            </b-button>
                        </b-field>
                    </form>
                </div>
            </div>
        </div>
        <b-loading :is-full-page="true" :active.sync="isLoading" :can-cancel="false"></b-loading>
    </div>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/auth';

export default {
  name: 'login',
  data() {
    return {
      email: '',
      password: '',
      isLoading: false,
    };
  },
  methods: {
    login() {
      this.isLoading = true;
      firebase.auth().signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          this.isLoading = false;
          this.$router.replace('/admin/dashboard');
        })
        .catch((err) => {
          this.isLoading = false;
          this.$buefy.toast.open({
            message: `Oops. ${err.message}`,
            type: 'is-danger',
          });
        });
    },
  },
};
</script>

<style scoped>
hr {
    margin-bottom: 0.5rem
}

img {
    max-width: 300px;
    display: block;
    margin: auto;
}
</style>
