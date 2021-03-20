<template>
  <div class="home" id="home">
    <div>
      <small class="text-primary">Welcome Home {{ $store.state.name }}..</small>
    </div>
  </div>
</template>

<script>
import store from '../store'
import Swal from 'sweetalert2'

export default {
  name: 'Home',
  data() {
    return {
      name: '',
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

  },
  components: {
    // HelloWorld,
  },
  methods: {
    changeName() {
      this.$store.commit('changeName', this.name);
    },
    connectSendMessage() {

    }
  }
}
</script>


<style scoped>
#home {
  height: 90vh;
}
</style>