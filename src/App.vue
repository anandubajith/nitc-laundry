<template>
  <div id="app">
     <b-navbar type="is-light" :fixed-top="true">
        <template slot="brand">
            <b-navbar-item tag="router-link" :to="{ path: '/' }">
                   <b-icon
                      icon="tshirt-v">
                  </b-icon>
                <h1 class="is-size-4"> Laundry</h1>
            </b-navbar-item>
        </template>
        <template slot="start">
            <b-navbar-item href="#">
                How it works
            </b-navbar-item>
            <b-navbar-item href="/about">
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
      currentUser: firebase.auth().currentUser,
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
