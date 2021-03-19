<template>
  <div id="nav" >
    <Navigation />
  </div>
  <div id="router_content bg-warning">
    <router-view />
  </div>
</template>

<script>
import Navigation from "./components/Navigation.vue";

export default {
  data() {
    return {
      name: 'Gowtham',
    }
  },
  components: {
    Navigation,
  },
}
</script>

<style lang="scss" >
$primary: #05b2dd;
@import "node_modules/bootstrap/scss/bootstrap.scss";

body {
  background: rgb(243, 237, 237);
}
</style>
