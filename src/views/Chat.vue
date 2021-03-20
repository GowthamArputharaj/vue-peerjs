<template>
  <div class="chat" id="chat">
    <div class="text-primary">
      <small>Welcome {{ $store.state.name }} to Chat place..</small>
    </div>

    <!-- hidden :d-none -->
    <div class="row d-none">
      <div class="col-lg-4 col-md-6 col-sm-12 border border-white pt-4 ">
        <div class="form-group ">
          <label for="name">Name</label>
          <input type="text" class="form-control" name="name" v-model="name" >
        </div>
        <div class="form-group">
          <button class="rounded btn btn-danger" @click="changeName()">CHnage</button>
        </div>
      </div>
    </div>

    <div class="row text-primary ">
      <div class="rounded col-lg-4 col-md-6 col-sm-12 shadow-sm pt-4 opacity-half float-right ">
        <div class="form-group ">
          <label for="connect_to">Connect to</label>
          <input type="text" class="form-control" name="connect_to" v-model="connectTo" placeholder="Enter peer id">
        </div>
        <div class="form-group mt-2">
          <label for="message">Message</label>
          <textarea class="float-right form-control mb-2" v-model="message" name="message" cols="30" rows="3" placeholder="Send some message" v-on:keyup.enter="connectSendMessage()"></textarea>
        </div>
        <div class="form-group">
          <button class="rounded btn btn-primary" @click="connectSendMessage()">Send Message</button>
        </div>
      </div>
    </div>
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <!-- <Navigation /> -->
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import Navigation from '@/components/Navigation.vue'
import store from '../store'
// import Peer from 'peerjs';
// import { v4 as uuidv4 } from 'uuid';
import Swal from 'sweetalert2'

export default {
  name: 'Chat',
  data() {
    return {
      // uuid: '',
      name: '',
      // peer: null,
      connectTo: null,
      message: null,
    }
  },
  props: [
    "peer",
    "uuid",
  ],
  created(){

    console.log('My Peer id is: \n', this.uuid);
    
    this.name = this.$store.getters.getName;

    // create peer
    const peer = this.peer; 

    // Peer connection event listener
    peer.on('connection', (peerConnection) => {

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
    Navigation,
  },
  methods: {
    changeName() {
      this.$store.commit('changeName', this.name);
    },
    connectSendMessage() {
      
      // create connection to another Peer
      const conn = this.peer.connect(this.connectTo);

      // 
      conn.on('open', () => {
        conn.send(this.message);
        console.log('hi Connection opened  and Message Sent!')
      });
    }
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