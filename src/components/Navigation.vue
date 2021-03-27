<template>
  <div id="navigation" class="">
    <nav class="navbar navbar-expand-lg navbar-light text-monospace font-weight-bold fixed-bottom mb-2 bg-transparent">

      <button class="navbar-toggler  " type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      
      <div class="w-100 collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav"> 
          <li class=" nav-item   bg-primary-opacity text-center py-1 mt-1">
            <router-link to="home" class="nav-link">Home</router-link>
          </li>
          <li class=" nav-item   bg-primary-opacity text-center py-1 mt-1" v-if="isAuth">
            <router-link to="chat" class="nav-link">Chat</router-link>
          </li>
          <li class=" nav-item   bg-primary-opacity text-center py-1 mt-1" v-if="isAuth">
            <router-link to="call" class="nav-link">Call</router-link>
          </li>
          <li class=" nav-item   bg-primary-opacity text-center py-1 mt-1" v-if="isAuth">
            <router-link to="video" class="nav-link">Video</router-link>
          </li>
          <li class=" nav-item   bg-primary-opacity text-center py-1 mt-1 float-right" v-if="!isAuth">
            <router-link to="login" class="nav-link">Login</router-link>
          </li>
          <li class=" nav-item   bg-primary-opacity text-center py-1 mt-1 float-right" v-if="!isAuth">
            <router-link to="register" class="nav-link">Register</router-link>
          </li>
          <li class=" nav-item   bg-primary-opacity text-center py-1 mt-1 float-right" v-if="isAuth">
            <a href="" class="nav-link" @click.prevent="logout()">Logout</a>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
import firebase from 'firebase'
import db from '../db.js'

export default {
  name: "Navigation",
  computed: {
    isAuth() {
      console.log('NNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNn1111', this.$store.getters.getIsAuth)
      return this.$store.getters.getIsAuth;
    }
  },
  methods: {
    logout() {
      firebase.auth()
      .signOut()
      .then(() => {
        this.$store.commit('setName', null);
        this.auth_user = null;

        console.log('Logged out..');
        // this.$store.state.uuid = this.$store.state.auth_displayName = this.$store.state.auth_email = '';
        this.$store.commit('setUser', null);
        this.$store.commit('setIsAuth', false);

        this.$router.push('login');

      })
      .catch(err => {
        Swal.fire({
          title: 'Error!',
          text: err.message,
          type: 'error',
        })
      })
    }
  }
}
</script>

<style scoped>
#navigation {
  height: 10vh;
  padding: 0.5rem 0;
}
.navbar-toggler {
  background: rgba(93, 235, 28, 0.8);
  border-radius: 50%;
  height: 3rem;
}
.navbar-toggler:hover, .navbar-toggler:focus {
  background: rgba(93, 235, 28, 0.8);
  border-radius: 50%;
  height: 3rem;
  transform: rotate(90deg);
  border: 1px solid red;
}
.text-white {
  color: white !important;
}
.nav-link {
  color: white !important;
}
.bg-primary-opacity {
  background-color: rgba(5, 178, 221, 0.2);
}
.bg-primary-opacity:hover {
  background-color: rgba(5, 178, 221, 0.1);
}
@media only screen and (min-width: 1000px) {
  .nav-item {
    margin-left: 2rem;
  }
}
</style>