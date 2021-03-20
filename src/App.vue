<template>
  <div id="nav" >
    <!-- <img src="./assets/logo.png" alt="no image gow" width="500" height="300"> -->
    <div class="fixed-top text-secondary bg-transparent text-center text-monospace py-1 m-0">
      <h3>Gowtham</h3>
    </div>
    <Navigation />
    <div id="router_content " class="mx-5">
      <router-view :peer="peer" :uuid="uuid" />
    </div>
  </div>
</template>

<script>
import Navigation from "./components/Navigation.vue";
import Peer from 'peerjs';
import { v4 as uuidv4 } from 'uuid';


export default {
  data() {
    return {
      name: 'Gowtham',
      uuid: null,
      peer: null,
    }
  },
  components: {
    Navigation,
  },
  created() {
    this.uuid = uuidv4();

    // this.peer = new Peer(this.uuid);
    // var peerName = `gowtham-madurai-welcome-to-webrtc`;
    this.peer = new Peer(this.uuid);

  }
}
</script>

<style lang="scss" >
$primary: #05b2dd;
$secondary: #97e630;
@import "node_modules/bootstrap/scss/bootstrap.scss";

body {
  // background: rgb(243, 237, 237);
  // background-attachment: "./assets/forest.jpg";
  background-image: url("./assets/dark-leaves.jpg");
  width: 100vw;
  height: 100vh;
  background-size: cover;
  z-index: -1;
}
</style>
