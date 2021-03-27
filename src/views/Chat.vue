<template>
  <div class="chat" id="chat">
    <div class="text-primary">
      <small>Welcome {{ authUser.displayName }} to Chat place..</small>
    </div>

    <!-- hidden :d-none -->
    <div class="row d-none">
      <div class="col-lg-4 col-md-6 col-sm-12 border border-white pt-4 ">
        <div class="form-group ">
          <label for="name">Name</label>
          <input type="text" class="form-control" name="displayName" v-model="displayName" >
        </div>
        <div class="form-group">
          <button class="rounded btn btn-danger" @click="changeName()">CHnage</button>
        </div>
      </div>
    </div>

    <div class="row text-primary ">
      <div class="rounded col-lg-4 col-md-6 col-sm-12 shadow-sm pt-4 opacity-half float-right ">
        <div class="form-group ">
          <label for="connect_to">Connect to {{ connectTo }}</label>
          <select id="selectUser" v-model="connectTo" class="form-control">
            <option value="none">Select any user</option>
            <option v-for="user in allUsers" v-bind:key="user.uid" :value="user.uuid" >{{ user.displayName }}</option>
          </select>
        </div>
        <div class="form-group mt-2">
          <label for="message">Message</label>
          <textarea class="float-right form-control mb-2" v-model.trim="message" name="message" cols="30" rows="3" placeholder="Send some message" v-on:keyup.enter="connectSendMessage()"></textarea>
        </div>
        <div class="form-group">
          <div class="form-group ">
            <button class="rounded btn btn-primary" @click="connectSendMessage()">Send Message</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
// import Navigation from '@/components/Navigation.vue'
import store from '../store'
import Peer from 'peerjs';
import Swal from 'sweetalert2'

export default {
  name: 'Chat',
  data() {
    return {
      // uuid: '',
      displayName: '',
      peer: null,
      connectTo: null,
      message: null,
      selectedUser: null,
    }
  },
  computed: {
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
  created(){

    var user = this.authUser;

    console.log('My Peer id is: \n', user.uuid);
    
    this.name = this.$store.getters.getName;

    // create peer
    // const peer = this.peer; 
    this.peer = new Peer(this.authUser.uuid);

    // Peer connection event listener
    this.peer.on('connection', (peerConnection) => {
      Swal.fire({
        title: 'Connected successfully',
        type: 'success',
        confirmButtonText: 'Cool',
      });

      // Receive message event listener
      peerConnection.on('data', (data) => {

        // Shows received message
        Swal.fire({
          title: 'Received Message',
          text: data,
          type: 'success',
          confirmButtonText: 'Cool',
        });

        console.log(`Received this message: ${data}`);
      });

      // peerConnection.on('open', () => {
      //   peerConnection.send('hello!');
      //   console.log('Sending hello! message');
      // });
    });

    // this.peer = peer;

  },
  components: {
    // HelloWorld,
    // Navigation,
  },
  methods: {
    changeName() {
      this.$store.commit('changeName', this.displayName);
    },
    connectSendMessage() {
      
      // create connection to another Peer
      const conn = this.peer.connect(this.connectTo);

      // send message to connectTo peer id
      conn.on('open', () => {
        conn.send(this.message);
        console.log('hi Connection opened  and Message Sent!')
        this.message = '';
      });
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
input, textarea, select {
  background-color: rgba(5, 178, 221, 0);
  /* opacity: 0; */
}
input:focus, textarea:focus, select:focus {
  background-color: rgba(5, 178, 221, 0);
  /* opacity: 0; */
}
</style>