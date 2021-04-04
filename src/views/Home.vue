<template>
  <div class="home" id="home">
    <small class="text-primary" v-if="authUser.displayName">Welcome to Home {{ authUser.displayName }} ..</small><br>
    <div class="row height-half">
      <div class="col-md-5 col-sm-12 rounded ml-3 ">
        <div class="row my-5">
          <div class="col-md-6 col-sm-12 text-center mb-3">
            <button 
              class="btn btn-outline-secondary text-bold-800 text-danger"
              @click="generateConnectionLink()"
              > Get Connection Link
            </button>
          </div>
            <div class="col-md-6 col-sm-12 text-center mb-3">
              <button type="button" class="btn btn-outline-secondary text-bold-800 text-danger" data-toggle="modal" data-target="#connectUsingLink">
                Connect Using Link
              </button>
            </div>
        </div>
      </div>

      <div class=" col-md-5 height-half col-md-6 col-sm-12 rounded mr-1 my-5 ">
        <div class=" opacity-half px-3  rounded  ">
          <h2 class="text-monospace pt-2 text-primary text-center">Connections</h2>
          
          <div class=" pb-2 h-75 pr-3 users" v-if="allUsers">
            <div v-for="user in allUsers" v-bind:key="user.id" class="zoom-hover bold-hover rounded p-2 m-1 opacity-75 text-primary">
              <span class="ml-2">{{ user.displayName }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>


    <!-- bootstrap modal | connect using link -->
    <div class="modal fade" id="connectUsingLink" tabindex="-1" aria-labelledby="connectUsingLink2" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="connectUsingLink2">Connect Via Link</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group">
                <label for="exampleInputText">Connection link</label>
                <input type="url" class="form-control" id="exampleInputText" v-model="addConnectionLink" aria-describedby="urlHelp">
                <small id="urlHelp" class="form-text text-muted">We'll never share your url with anyone else.</small>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" @click="connectUsingLink()">Save changes</button>
          </div>
        </div>
      </div>
    </div>
    <!-- bootstrap modal ends -->

  </div>
</template>

<script>
import store from '../store'
import Swal from 'sweetalert2'
import firebase from 'firebase'
import db from '../db.js'

export default {
  name: 'Home',
  data() {
    return {
      name: '',
      message: null,
      user: null,
      addConnectionLink: null,
    }
  },
  computed: {
    displayName() {
      return this.$store.getters.getDisplayName;
    },
    authUser() {
      return this.$store.getters.getUser;
    },
    isAuth() {
      return this.$store.getters.getIsAuth;
    },
    allUsers() {
      var au = this.$store.getters.getAllUsers;
      return au;
    }
  },
  created() {

    console.log('My Peer id is: \n', this.authUser.uuid);
    
    console.log('Home page is Created');
    this.$store.dispatch('allUsers', this.authUser.uid);

  },
  components: {
    // HelloWorld,
  },
  methods: {
    changeName() {
      this.$store.commit('changeName', this.name);
    },
    generateConnectionLink() {
      Swal.fire({
        title: 'Connection Link',
        text: window.location.href+`?c=${this.authUser.uid}`,
        type: 'success',
        confirmButtonText: 'Cool'
      });
    },
    connectUsingLink() {
      
      console.log('connectUsingLink '); console.log(this.addConnectionLink);

      var url = this.addConnectionLink;
      var u = new URL(url).searchParams;
      var sender_uid = u.get('c');
      console.log('sender_uid ', sender_uid);
      document.querySelector('.close').click();
var payload = { authUser: this.authUser.uid, sender_uid};
console.log(payload);
console.log(')))))))))))))))))))))))))))))))');
console.log(this.authUser.uid, '(((((((((((((((((((((((((((((((((', sender_uid);

      this.$store.dispatch('createConnection', payload);
      // Swal.fire({
      //   title: 'Connection Link',
      //   text: window.location.href+`?c=${this.authUser.uid}`,
      //   type: 'success',
      //   confirmButtonText: 'Cool'
      // });
    }
  }
}
</script>


<style scoped>
#home {
  height: 90vh;
}
.opacity-half {
  background-color: rgba(255, 255, 255, 0.1);
}
.opacity-75 {
  background-color: rgba(255, 255, 255, 0.2);
}
.opacity-75:hover {
  background-color: rgba(255, 255, 255, 0.15);
}
.zoom-hover:hover {
  transform: scale(1.05);
}
.bold-hover:hover {
  font-weight: 600;
}
div.users {
  overflow-y: scroll;
  overflow-x: hidden;
}
.height-half {
  height: 50vh !important;
}
.h-75 {
  max-height: 40vh;
}
</style>