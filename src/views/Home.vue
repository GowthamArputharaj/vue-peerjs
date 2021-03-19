<template>
  <div class="home" id="home">
    <div>
      <small>Welcome {{ $store.state.name }}..</small>
    </div>

    <div class="row mx-auto">
      <div class="col-lg-4 col-md-6 col-sm-12 border border-primary pt-4 float-right">
        <div class="form-group ">
          <label for="name">Name</label>
          <input type="text" class="form-control" name="name" v-model="name" >
        </div>
        <div class="form-group">
          <button class="rounded btn btn-danger" @click="changeName()">CHnage</button>
        </div>
      </div>
    </div>

    <div class="row mx-auto">
      <div class="col-lg-4 col-md-6 col-sm-12 border border-primary pt-4 float-right">
        <div class="form-group ">
          <label for="connect_to">Connect to</label>
          <input type="text" class="form-control" name="connect_to" v-model="connectTo" >
        </div>
        <div class="form-group ">
          <label for="message">Message</label>
          <textarea class="float-right" v-model="message" name="message" cols="30" rows="3" placeholder="Send some message" v-on:keyup.enter="connectSendMessage()"></textarea>
        </div>
        <div class="form-group">
          <button class="rounded btn btn-danger" @click="connectSendMessage()">Connect</button>
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
import Peer from 'peerjs';
import { v4 as uuidv4 } from 'uuid';
import Swal from 'sweetalert2'

export default {
  name: 'Home',
  data() {
    return {
      uuid: '',
      name: '',
      peer: null,
      connectTo: null,
      message: null,
    }
  },
  created(){
    this.uuid = uuidv4();

    console.log('My Peer id is: \n', this.uuid);
    
    this.name = this.$store.getters.getName;

    // create peer
    const peer = new Peer(this.uuid); 

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

    this.peer = peer;

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
#home {
  height: 90vh;
}
</style>