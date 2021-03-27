<template>
  <div id="nav" >
    <!-- <img src="./assets/logo.png" alt="no image gow" width="500" height="300"> -->
    <div class="fixed-top text-secondary bg-transparent text-center text-monospace py-1 m-0">
      <h3>Gowtham</h3>
    </div>
    <Navigation  />
    <div id="router_content " class="mx-5">
      <router-view />
    </div>
  </div>
</template>

<script>
import Navigation from "./components/Navigation.vue";
import Peer from 'peerjs';
import { v4 as uuidv4 } from 'uuid';
import Swal from 'sweetalert2';
import firebase from 'firebase';
import db from './db.js';

export default {
  data() {
    return {
      name: 'Gowtham',
      uuid: null,
      peer: null,
      auth_user: null
    }
  },
  components: {
    Navigation,
  },
  beforeCreate() {

    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        
        var uid = user.uid;

        this.auth_user = user;
        console.log('USER IS ', user);

        var db_user = await db.collection('users').doc(user.uid).get();

        var payload = {
          displayName: db_user.data().displayName,
          email: db_user.data().email,
          uid: db_user.data().uid,
          uuid: db_user.data().uuid,
        };
        
        this.$store.commit('setUser', payload);
        this.$store.commit('setIsAuth', true);
        
        this.$router.push('home');
          
        // ...
      } else {
        // User is signed out
        // ...

        this.$router.push('login');

      }
    });
  }
}
</script>

<style lang="scss" >
$primary: #05b2dd;
$secondary: #97e630;
@import "node_modules/bootstrap/scss/bootstrap.scss";

body {
  // background: rgb(243, 237, 237);
  // background-attachment: "./assets/forest.jpg";
  background-image: url("./assets/dark-leaves.jpg");
  width: 100vw;
  height: 100vh;
  background-size: cover;
  z-index: -1;
}
</style>
