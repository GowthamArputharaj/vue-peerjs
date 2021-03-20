<template>
  <div class="call" id="call">
    <div>
      <small class="text-primary">Welcome to <i>Audio Call</i> {{ $store.state.name }}..</small>
    </div>

    <div class="row text-primary ">
      <div class="rounded col-lg-4 col-md-6 col-sm-12 shadow-sm pt-4 opacity-half float-right">
        <div class="form-group ">
          <label for="connect_to">Connect to</label>
          <input type="text" class="form-control" name="connect_to" v-model="connectTo" placeholder="Enter peer id">
        </div>
        <div class="form-group d-none">
          <label for="message">Message</label>
          <textarea class="float-right form-control mb-2" v-model="message" name="message" cols="30" rows="3" placeholder="Send some message" v-on:keyup.enter="connectCall()"></textarea>
        </div>
        <div class="form-group">
          <button class="rounded btn btn-primary" @click="connectCall()">Audio Call</button>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="call-area opacity-half mt-4 p-4 text-primary rounded col-lg-4 col-md-6 col-sm-12 shadow-sm pt-4 opacity-half float-right">
        <div class="">
            <h4 class=" text-monospace">Incoming Voice here</h4>
        </div>
        <div class="">
          <audio src="" controls id="other_stream"></audio>
        </div>
          

        <div class=" mt-4">
          <h4 class=" text-monospace">My Stream here</h4>
        </div>
        <div class="">
          <audio src="" controls id="my_stream"></audio>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
// @ is an alias to /src
import store from '../store'
import Swal from 'sweetalert2'

export default {
  name: 'Call',
  data() {
    return {
      // uuid: '',
      name: '',
      // peer: null,
      connectTo: null,
      message: null,
      strm: null,
      my_stream: null,
    }
  },
  props: [
    "peer",
    "uuid",
  ],
  created(){

    console.log('My Peer id is: \n', this.uuid);

    const peer = this.peer;

    // this.connectTo = history.length;

    peer.on('call', async (call) => {
      this.my_stream = await navigator.mediaDevices.getUserMedia({video: false, audio: true});
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

    // this.peer = peer;

  },
  methods: {
    async connectCall() {
      console.log('connectCall ()', this.connectTo);

      try {
        
          console.log('stream connectCall()');
          this.my_stream = await navigator.mediaDevices.getUserMedia({video: false, audio: true});
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
#call {
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
/* .call-area {
  
} */
</style>