<template>
  <div class="chat" id="chat">
    <div class="text-primary">
      <small>Welcome to Login place..</small>
    </div>

    <div class="row text-primary ">
      <div class="rounded col-lg-4 col-md-6 col-sm-12 shadow-sm pt-4 opacity-half float-right ">
        <div class="form-group ">
          <label for="email">Email</label>
          <input type="email" class="form-control" name="email" v-model="email" placeholder="Enter email address">
        </div>
        <div class="form-group ">
          <label for="password">Password</label>
          <input type="password" class="form-control" name="password" v-model="password" placeholder="Enter password ">
        </div>
        <div class="form-group">
          <button class="rounded btn btn-primary" @click="login()">Login</button>
          <router-link to="/register" class="rounded btn btn-primary float-right">Create an account</router-link>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
// @ is an alias to /src
import store from '../store'
import Swal from 'sweetalert2'
import firebase from 'firebase'
import db from '../db.js';

export default {
  name: 'login',
  data() {
    return {
      name: '',
      email: '',
      password: '',
    }
  },
  created(){

  },
  components: {
    
  },
  methods: {
    login() {
      var email = this.email;
      var password = this.password;

      firebase.auth().signInWithEmailAndPassword(email, password)
        .then( async (userCredential) => {
          // Signed in

          var user = userCredential.user;
          
          Swal.fire({
            title: 'Logged in',
            text: 'Welcome to CHat room',
            type: 'success',
          });

          console.log('Login user', user);

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
          
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;

          Swal.fire({
            title: 'Error',
            text: errorMessage,
            type: 'error',
          });

        });
        
    },
    changeName() {
      this.$store.commit('changeName', this.name);
    },
  }
}
</script>


<style scoped>
#chat {
  height: 90vh;
}
.opacity-half {
  background-color: rgba(255, 255, 255, 0.1);
}
input, textarea{
  background-color: rgba(5, 178, 221, 0);
  /* opacity: 0; */
}
input:focus, textarea:focus{
  background-color: rgba(5, 178, 221, 0);
  /* opacity: 0; */
}
</style>