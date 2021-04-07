<template>
  <div class="video" id="video">
    <div>
      <small class="text-primary" v-if="authUser">Welcome to <i>Video Call</i> {{ authUser.displayName }}..</small>
    </div>

    <div class="row mx-auto text-primary">
      <div class="col-lg-4 col-md-6 col-sm-12 shadow-sm opacity-half pt-4 float-right">
        <div class="form-group ">
          <label for="connect_to">Connect to {{ connectTo }} <span v-if="showSelectUserError" class="text-danger">( Please Select Any User )</span></label>
          <select id="selectUser" v-model="connectTo" class="form-control">
            <option value="unknown">Select any user</option>
            <option v-for="user in allUsers" v-bind:key="user.uid" :value="user.uuid" >{{ user.displayName }}</option>
          </select>
        </div>
        <!-- <div class="form-group d-none ">
          <label for="message">Message</label>
          <textarea class="float-right" v-model="message" name="message" cols="30" rows="3" placeholder="Send some message" v-on:keyup.enter="connectCall()"></textarea>
        </div> -->
        <div class="row">
          <div class="form-group">
            <button class="rounded btn btn-primary" @click="connectCall()">Video Call</button>
          </div>
          <div class="form-group col-6">
            <a href="" class="rounded btn btn-danger float-right" >Disconnect Call</a>
            <!-- <button class="rounded btn btn-danger float-right" @click="disconnectCall()">Disconnect Call</button> -->
          </div>
        </div>
      </div>
    </div>

    <div class="row rounded my-4">
      <div class="call-area opacity-half mt-4 p-4 text-primary text-center col-lg-4 col-md-6 col-sm-12 shadow-sm pt-4 opacity-half float-right">
        <div class="">
            <h4 class=" text-monospace">Incoming Video here</h4>
        </div>
        <div class="">
          <video id="other_stream" src="" width="300" height="200" controls></video>
        </div>
      </div>
<hr>
      <div class="call-area opacity-half mt-4 p-4 text-primary text-center col-lg-4 col-md-6 col-sm-12 shadow-sm pt-4 opacity-half float-right">
        <div class=" ">
          <h4 class=" text-monospace">My Stream here</h4>
        </div>
        <div class="">
          <video id="my_stream" src="" width="300" height="200" controls></video>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
// @ is an alias to /src
import store from '../store'
import Peer from 'peerjs';
// import { v4 as uuidv4 } from 'uuid';
import Swal from 'sweetalert2'
import { printPeerRefreshed } from '../helper'

export default {
  name: 'Video',
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

    console.log('My Peer id is: \n', user.uuid);
    this.$store.dispatch('allUsers', user.uid);

    this.peer = new Peer(this.authUser.uuid);

    // this.connectTo = history.length;

    this.peer.on('call', async (call) => {
        var stream = await navigator.mediaDevices.getUserMedia({video: true, audio: true});

        // set my_stream from our device capture
        document.querySelector('#my_stream').srcObject = stream;

        // Answer the call with an A/V stream.
        call.answer(stream);

        call.on('stream', (remoteStream) => {
          // Show stream in some <video> element.
          document.querySelector('#other_stream').srcObject = remoteStream;
        });
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

  },
  methods: {
    async connectCall() {
      console.log('connectCall ()', this.connectTo);

      if(this.connectTo == 'unknown') {
        this.showSelectUserError = true;
      } else {
        this.showSelectUserError = false;
      }

      if(this.connectTo != 'unknown') {
        try {
            // this.peer = new Peer(this.authUser.uuid);

            this.my_stream = await navigator.mediaDevices.getUserMedia({video: true, audio: true});
            
            // set my_stream from our device capture
            document.querySelector('#my_stream').srcObject = this.my_stream;
    
            const call = this.peer.call(this.connectTo, this.my_stream);
    
            call.on('stream', (remoteStream) => {
              // Show stream in some <video> element.
              document.querySelector('#other_stream').srcObject = remoteStream;
    
            });
          
        } catch (error) {
        console.log('ERROR') ;
        console.log(error.message);
        }
      }
    
      console.log('end');
    },
    disconnectCall() {
      this.peer.destroy();
      this.connectTo = 'none';

      document.querySelector('#other_stream').srcObject = '';
      document.querySelector('#my_stream').srcObject = '';

      console.log('this.peer is ', this.peer);
      console.log('this.connectTo is ', this.connectTo);
      
    }
  }
}
</script>


<style scoped>
#video {
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