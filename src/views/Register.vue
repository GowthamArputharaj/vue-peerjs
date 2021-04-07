<template>
  <div class="chat" id="chat">
    <div class="text-primary">
      <small>Welcome to Register place..</small>
    </div>

    <div class="row text-primary ">
      <div class="rounded col-lg-4 col-md-6 col-sm-12 shadow-sm pt-4 opacity-half float-right ">
        <div class="form-group ">
          <label for="name">UserName</label>
          <input type="name" class="form-control" name="displayName" v-model="displayName" placeholder="Enter Username">
        </div>
        <div class="form-group ">
          <label for="email">Email</label>
          <input type="email" class="form-control" name="email" v-model="email" placeholder="Enter email address">
        </div>
        <div class="form-group ">
          <label for="password">Password</label>
          <input type="password" class="form-control" name="password" v-model="password" placeholder="Enter password ">
        </div>
        <div class="form-group">
          <button class="rounded btn btn-primary" @click="register()">Register</button>
          <router-link to="/login" class="rounded btn btn-primary float-right">Already have account</router-link>
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
import { v4 as uuidv4 } from 'uuid';


export default {
  name: 'register',
  data() {
    return {
      displayName: '',
      email: '',
      password: '',
      uuid: null,
    }
  },
  created(){

  },
  components: {
    
  },
  methods: {
    register() {
      
      var email = this.email;
      var password = this.password;

      try {
    
        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then((userCredential) => {
            // Signed in 
            var user = userCredential.user;
            this.uuid = uuidv4();


            user.updateProfile({
              displayName: this.displayName,
              uuid: this.uuid
            })
            .then(() => {
              console.log('then');

              var payload = {
                displayName: this.displayName,
                email: user.email,
                uid: user.uid,
                uuid: this.uuid,
              };

              console.log(payload);
              
              // store in database with users collection(table)
              db.collection('users')
              .doc(user.uid)
              .set(payload)
              .then(() => {
                console.log('Users added in Then');
              })
              .catch(err => {
                console.log('err.message', err.message);
              });
              
              // store data in vuex

              this.$store.commit('setUser', payload);
              this.$store.commit('setIsAuth', true);
              
            })
            .catch((err) => {
              console.log('catch', err.message)
              Swal.fire({
                title: 'Error',
                text: err.message,
                type: 'error',
              });

            });
          
            console.log('Register create*** THEN');

            this.$router.push('/');

          })
          .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            // ..
            console.log('Register create*** cat');

            Swal.fire({
              title: 'Error',
              text: errorMessage,
              type: 'error',
            });

          });

      } catch (err) {
        console.log('db err', err.message);
      }



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