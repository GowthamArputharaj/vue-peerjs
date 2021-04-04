<template>
  <div>
      <h1 class="text-center text-danger mt-3">Page Not Found</h1>

      <div class="w-100">
        <router-link to="home" class="btn btn-primary" id="go_home" >Go to Home</router-link>
      </div>

  </div>
</template>

<script>
export default {
    name: "NotFound",
}
</script>

<style scoped>
body {
  background-attachment: fixed;
  background-image: url('../assets/404.gif');
  background-size: cover;
  background-position: center;
}
@media only screen and (max-width: 600px) {
  body {
    background-attachment: fixed;
    background-image: url('../assets/good-luck.gif');
    background-size: cover;
    background-position: center;
  }
}
#go_home {
  margin: 0;
  position: absolute;
  top: 50%;
  right: 50%;
  -ms-transform: translateX(50%) translateY(-50%);
  transform: translateX(50%) translateY(-50%);
}
</style>