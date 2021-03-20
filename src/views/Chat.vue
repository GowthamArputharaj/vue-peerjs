<template>
  <div class="home" id="home">
    <div>
      <small>Welcome to <i>Media Call</i> {{ $store.state.name }}..</small>
    </div>

    <div class="row mx-auto">
      <div class="col-lg-4 col-md-6 col-sm-12 border border-primary pt-4 float-right">
        <div class="form-group ">
          <label for="connect_to">Connect to</label>
          <input type="text" class="form-control" name="connect_to" v-model="connectTo" >
        </div>
        <div class="form-group ">
          <label for="message">Message</label>
          <textarea class="float-right" v-model="message" name="message" cols="30" rows="3" placeholder="Send some message" v-on:keyup.enter="connectCall()"></textarea>
        </div>
        <div class="form-group">
          <button class="rounded btn btn-danger" @click="connectCall()">Connect</button>
        </div>
      </div>
    </div>

    <div class="row mx-auto">
      <h2 class="text-center text-monospace">Video here</h2>
      <!-- <video v-bind:src="strm" width="300" height="200" controls></video> -->
      <video id="other_stream" src="" width="300" height="200" controls></video>
    </div>

    <div class="row mx-auto">
      <h2 class="text-center text-monospace">My Stream here</h2>
      <!-- <video v-bind:src="strm" width="300" height="200" controls></video> -->
      <video id="my_stream" src="" width="300" height="200" controls></video>
    </div>

  </div>
</template>

<script>
// @ is an alias to /src
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
      strm: null,
      my_stream: null,
    }
  },
  created(){
    this.uuid = uuidv4();

    console.log('My Peer id is: \n', this.uuid);

    const peer = new Peer(this.uuid);

    // this.connectTo = history.length;

    peer.on('call', async (call) => {
      this.my_stream = await navigator.mediaDevices.getUserMedia({video: true, audio: true});
        console.log('this.my_stream');
        console.log(this.my_stream);
        call.answer(this.my_stream); // Answer the call with an A/V stream.
        // document.querySelector('#my_stream').srcObject = stream;

        call.on('stream', (remoteStream) => {
          // Show stream in some <video> element.
          console.log('RemoteStream is');
          console.log(remoteStream);

          document.querySelector('#other_stream').srcObject = remoteStream;
          
        });
      // }, (err) => {
      //   console.error('Failed to get local stream', err);
      // });
    });

    this.peer = peer;

  },
  methods: {
    async connectCall() {
      console.log('connectCall ()', this.connectTo);

      try {
        
          console.log('stream connectCall()');
          this.my_stream = await navigator.mediaDevices.getUserMedia({video: true, audio: true});
          console.log(this.my_stream);
          document.querySelector('#my_stream').srcObject = this.my_stream;
  
          const call = this.peer.call(this.connectTo, this.my_stream);
  
          call.on('stream', (remoteStream) => {
            // Show stream in some <video> element.
            console.log('remoteStream connectCall()')
            console.log(remoteStream);
  
            document.querySelector('#other_stream').srcObject = remoteStream;
  
          });


       
        
      } catch (error) {
       console.log('ERROR') ;
       console.log(error.message);
      }
      

      console.log('end');
    }
  }
}
</script>


<style scoped>
#home {
  height: 90vh;
}
</style>