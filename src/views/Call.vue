<template>
  <div class="call" id="call">
    <div>
      <small class="text-primary" v-if="authUser">Welcome to <i>Audio Call</i> {{ authUser.displayName }}..</small>
    </div>

    <div class="row text-primary ">
      <div class="rounded col-lg-4 col-md-6 col-sm-12 shadow-sm pt-4 opacity-half float-right">
        <div class="form-group ">
          <label for="connect_to">Connect to {{ connectTo }} <span v-if="showSelectUserError" class="text-danger">( Please Select Any User )</span></label>
          <select id="selectUser" v-model="connectTo" class="form-control">
            <option value="unknown">Select any user</option>
            <option v-for="user in allUsers" v-bind:key="user.uid" :value="user.uuid" >{{ user.displayName }}</option>
          </select>
        </div>
        <div class="form-group d-none">
          <label for="message">Message</label>
          <textarea class="float-right form-control mb-2" v-model="message" name="message" cols="30" rows="3" placeholder="Send some message" v-on:keyup.enter="connectCall()"></textarea>
        </div>
        <div class="row">
          <div class="form-group col-6">
            <button class="rounded btn btn-primary" @click="connectCall()">Audio Call</button>
          </div>
          <div class="form-group col-6">
            <a href="" class="rounded btn btn-danger float-right" >Disconnect Call</a>
            <!-- <button class="rounded btn btn-danger float-right" @click="disconnectCall()">Disconnect Call</button> -->
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="call-area opacity-half mt-4 p-4 text-primary rounded col-lg-4 col-md-6 col-sm-12 shadow-sm pt-4 opacity-half float-right">
        <div class="">
            <h4 class=" text-monospace">Incoming Voice here</h4>
        </div>
        <div class="">
          <audio src=""  id="other_stream" controls></audio>
        </div>
          

        <div class=" mt-4">
          <h4 class=" text-monospace">My Stream here</h4>
        </div>
        <div class="">
          <audio src=""  id="my_stream" controls></audio>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
// @ is an alias to /src
import store from '../store'
import Swal from 'sweetalert2'
import Peer from 'peerjs'
import { printPeerRefreshed } from '../helper'

export default {
  name: 'Call',
  data() {
    return {
      // uuid: '',
      name: '',
      peer: null,
      connectTo: 'unknown',
      message: null,
      strm: null,
      my_stream: null,
      showSelectUserError: false,
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

    var user = this.$store.getters.getUser;
    
    this.$store.dispatch('allUsers', user.uid);

    console.log('My Peer id is: \n', user.uuid);

    this.peer = new Peer(this.authUser.uuid);

    // this.connectTo = history.length;

    this.peer.on('call', async (call) => {
      var stream = await navigator.mediaDevices.getUserMedia({video: false, audio: true});
      
      // Answer the call with an A/V stream.
      call.answer(stream); 
      
      document.querySelector('#my_stream').srcObject = stream;

      call.on('stream', (remoteStream) => {
        // Show stream in some <video> element.
        document.querySelector('#other_stream').srcObject = remoteStream;
        
      });
      // }, (err) => {
      //   console.error('Failed to get local stream', err);
      // });
    });

    // peer close event listener
    this.peer.on('close', () => {
      // Swal.fire({
      //   title: 'Connection status',
      //   text: 'Peer connection is refreshed',
      //   type: 'success', 
      //   confirmButtonText: 'Okay'
      // });

      printPeerRefreshed();

    });

    // this.peer = peer;
    this.peer.on('error', function(err){
        console.error(err);
    });

  },
  methods: {
    async connectCall() {
      
      if(this.connectTo == 'unknown') {
        this.showSelectUserError = true;
      } else {
        this.showSelectUserError = false;
      }

      if(this.connectTo != 'unknown') {
        try {
            // this.peer = new Peer(this.authUser.uuid);
          
            this.my_stream = await navigator.mediaDevices.getUserMedia({video: false, audio: true});
            
            document.querySelector('#my_stream').srcObject = this.my_stream;
            
            const call = this.peer.call(this.connectTo, this.my_stream);
            

            call.on('stream', (remoteStream) => {
              // Show stream in some <video> element.
              document.querySelector('#other_stream').srcObject = remoteStream;
    
            });
          
        } catch (error) {
         console.log(error.message);
        }
      }
    
    },
    disconnectCall() {
      this.peer.destroy();
      this.connectTo = 'none';

      document.querySelector('#other_stream').srcObject = '';
      document.querySelector('#my_stream').srcObject = '';
      
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
input, textarea, select {
  background-color: rgba(5, 178, 221, 0);
  /* opacity: 0; */
}
input:focus, textarea:focus, select:focus {
  background-color: rgba(5, 178, 221, 0);
  /* opacity: 0; */
}
/* .call-area {
  
} */
</style>