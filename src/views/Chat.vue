<template>
  <div id="chat" class="container">
    <div class="row">
      <h1>This is an chat page</h1>
    </div>
    
    <button type="button" class="btn btn-primary" @click="toggleModal" >
      Launch demo modal
    </button>
  </div>
</template>

<script>
import Peer from 'peerjs';
import { v4 as uuidv4 } from 'uuid';

export default {
  name: "Chat",
  data() {
    return {
      uid: '',
      name: '',
      message: '',
      type: '',
      showModal: true,
    }
  },
  methods: {
    toggleModal() {
      this.showModal = !this.showModal;
      console.log(this.showModal);
    }
  },
  created() {
    this.uid = uuidv4();
  },

}
</script>

<style scoped>
#chat {
  height: 90vh;
}
</style>