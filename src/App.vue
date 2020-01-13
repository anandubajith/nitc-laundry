<template>
  <div id="app">
     <b-navbar type="is-primary" :fixed-top="true">
        <template slot="brand">
            <b-navbar-item tag="router-link" :to="{ path }">
                   <b-icon  icon="water"></b-icon>
                <h1 class="is-size-4">eLaundry</h1>
            </b-navbar-item>
        </template>
        <template slot="start">
            <b-navbar-item href="#">
              How it works
            </b-navbar-item>
            <b-navbar-item tag="router-link" :to="{ path: '/about' }">
              About
            </b-navbar-item>
        </template>

        <template slot="end">
            <b-navbar-item tag="div">
                <div class="buttons">
                    <a class="button is-danger"
                       @click="logout()" v-if="currentUser">
                        <strong>Logout</strong>
                    </a>
                </div>
            </b-navbar-item>
        </template>
    </b-navbar>
      <transition name="slide">
      <router-view />
      </transition>
    <!-- <footer>
      <router-link to="/about">about</router-link>
      &middot;
      <router-link to="/contact">contact</router-link>
      <br>
      <a href="#" @click="logout()" v-if="$route.path === '/home'">
        logout
      </a>
    </footer> -->
  </div>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/auth';

export default {
  name: 'App',
  data() {
    return {
      currentUser: firebase.auth().currentUser || null,
      path: (firebase.auth().currentUser && firebase.auth().currentUser.uid === 'Qq7y53QqYJgb1wkoqWHyAPPkBOg1') ? '/admin/dashboard' : '/',
    };
  },
  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace('/login');
        });
    },
  },
};
</script>

<style lang="scss">
// Import Bulma's core
@import "~bulma/sass/utilities/_all";
// Set your colors
$primary: #00aba9;
$primary-invert: findColorInvert($primary);
$google: #4285fa;
$google-invert: findColorInvert($google);

// Setup $colors to use as bulma classes (e.g. 'is-twitter')
$colors: (
    "white": ($white, $black),
    "black": ($black, $white),
    "light": ($light, $light-invert),
    "dark": ($dark, $dark-invert),
    "primary": ($primary, $primary-invert),
    "info": ($info, $info-invert),
    "success": ($success, $success-invert),
    "warning": ($warning, $warning-invert),
    "danger": ($danger, $danger-invert),
    "google": ($google, $google-invert)
);

// Links
$link: $primary;
$link-invert: $primary-invert;
$link-focus-border: $primary;

// Import Bulma and Buefy styles
@import "~bulma";
@import "~buefy/src/scss/buefy";

</style>
