<template>
  <section class="section">
    <div class="container">
    <div class="register" v-if="!success">
      <h2 class="is-size-3">Please fill in your details</h2>
      <hr>
      <img :src="photo" class="profile-img">
      <form v-on:submit.prevent="addCA" autocomplete="off">
        <b-field label="Name">
            <b-input v-model="name" placeholder="Enter your name"></b-input>
        </b-field>
        <b-field label="Roll Number">
            <b-input v-model="roll" placeholder="Enter your Roll Number"></b-input>
        </b-field>
        <b-field grouped>
<b-field label="Hostel" expanded>
            <b-select placeholder="Select Hostel" v-model="hostel" expanded required>
                <option value="MegaBoys">Mega Boys Hostel</option>
                <option value="A">A Hostel</option>
                <option value="B">B Hostel</option>
                <option value="C">C Hostel</option>
                <option value="D">D Hostel</option>
                <option value="E">E Hostel</option>
                <option value="F">F Hostel</option>
                <option value="G">G Hostel</option>
                <option value="PG1">PG1 Hostel</option>
                <option value="PG2">PG2 Hostel</option>
            </b-select>
        </b-field>
        <b-field label="Room number">
            <b-input v-model="room" type="number" placeholder="Enter your Room number">
            </b-input>
        </b-field>
        </b-field>

        <b-field label="Email">
            <b-input v-model="email" disabled></b-input>
        </b-field>
         <b-field label="Contact number">
            <b-input v-model="phone" type="number" placeholder="Enter your Contact number">
            </b-input>
        </b-field>
        <b-field class="has-text-centered">
          <b-button tag="input" native-type="submit" type="is-primary">Save</b-button>
        </b-field>
      </form>
    </div>
    </div>
  </section>
</template>
<style>
.profile-img {
  display:block;
  width:150px;
  border-radius: 100%;
  margin:auto;
}
</style>
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
      roll: '',
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
        .ref(`users/${firebase.auth().currentUser.uid}`)
        .update({
          name: this.name,
          hostel: this.hostel,
          phone: this.phone,
          email: this.email,
          roll: this.roll,
          room: this.room,
          photo: this.photo,
        })
        .then(() => {
          this.success = true;
          this.$buefy.toast.open({ message: 'Details saved successfully', type: 'is-success' });
          this.$router.push('home');
        });
    },
  },
  beforeCreate() {
    const user = firebase.auth().currentUser;
    if (user.uid === 'Qq7y53QqYJgb1wkoqWHyAPPkBOg1') {
      this.$router.push('/admin/dashboard');
    }
    firebase
      .database()
      .ref(`/users/${user.uid}`)
      .once('value')
      .then(snapshot => snapshot.val())
      .then((data) => {
        this.name = data && data.name ? data.name : user.displayName;
        this.hostel = data && data.hostel ? data.hostel : '';
        this.phone = data && data.phone ? data.phone : user.phoneNumber;
        this.roll = data && data.roll ? data.roll : '';
        this.room = data && data.room ? data.room : '';
      });
  },
};
</script>
