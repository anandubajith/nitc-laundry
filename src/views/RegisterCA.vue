<template>
  <section class="section">
    <div class="container">
    <div class="register" v-if="!success">
      <h2 class="header">Please fill in your details</h2>
      <img :src="photo" class="profile">
      <form v-on:submit.prevent="addCA" autocomplete="off">
        <b-field label="Name">
            <b-input v-model="name" placeholder="Enter your name"></b-input>
        </b-field>
        <b-field label="Name">
            <b-input v-model="branch" placeholder="Enter your Branch"></b-input>
        </b-field>
        <b-field label="Year">
            <b-select placeholder="Select Year" v-model="year" required>
                <option value="first">First</option>
                <option value="second">Second</option>
            <option value="third">Third</option>
            <option value="fourth">Fourth</option>
            </b-select>
        </b-field>
        <b-field label="Hostel">
            <b-select placeholder="Select Hostel" v-model="hostel" required>
                <option value="MHB">MHB</option>
                <option value="A">A Hostel</option>
            <option value="B">B Hostel</option>
            <option value="C">C Hostel</option>
            <option value="D">D Hostel</option>
            </b-select>
        </b-field>
        <b-field label="Room number">
            <b-input v-model="room" placeholder="Enter your Room number.h"></b-input>
        </b-field>

        <b-field label="Email">
            <b-input v-model="email" disabled></b-input>
        </b-field>
         <b-field label="Whatsapp number">
            <b-input v-model="phone" placeholder="Enter your WhatsApp number.h"></b-input>
        </b-field>
        <input type="submit" class="button" value="Register" />
      </form>
    </div>
    </div>
  </section>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

export default {
  name: 'RegisterCA',
  data() {
    return {
      name: firebase.auth().currentUser.displayName,
      room: '',
      phone: '',
      year: '',
      branch: '',
      hostel: '',
      photo: firebase.auth().currentUser.photoURL,
      email: firebase.auth().currentUser.email,
      success: false,
    };
  },
  methods: {
    addCA() {
      firebase
        .database()
        .ref(`ambassadors/${firebase.auth().currentUser.uid}`)
        .update({
          name: this.name,
          hostel: this.hostel,
          phone: this.phone,
          email: this.email,
          year: this.year,
          branch: this.branch,
          room: this.room,
          photo: this.photo,
        })
        .then(() => {
          this.success = true;
          this.$router.push('home');
        });
    },
  },
  beforeCreate() {
    const user = firebase.auth().currentUser;
    firebase
      .database()
      .ref(`/ambassadors/${user.uid}`)
      .once('value')
      .then(snapshot => snapshot.val())
      .then((data) => {
        this.name = data && data.name ? data.name : user.displayName;
        this.college = data && data.college ? data.college : '';
        this.phone = data && data.phone ? data.phone : user.phoneNumber;
        this.year = data && data.year ? data.year : '';
        this.branch = data && data.branch ? data.branch : '';
        this.experience = data && data.experience ? data.experience : '';
      });
  },
};
</script>
