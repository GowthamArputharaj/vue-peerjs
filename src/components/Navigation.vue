<template>
  <div id="navigation" class="">
    <nav class="navbar navbar-expand-lg navbar-light text-monospace font-weight-bold fixed-bottom mb-2 bg-transparent">
      <!-- <router-link to="/" class="navbar-brand text-primary bg-white p-2 rounded mr-auto">Home</router-link> -->

      <!-- <div class=" nav-item  ml-3  bg-warning text-center py-1 mt-1">
        <router-link to="/" class="mx-2 navbar-brand">Home</router-link>
      </div> -->

      <button class="navbar-toggler border border-danger " type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      
      <div class="w-100 collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav"> 
          <li class=" nav-item   bg-primary-opacity text-center py-1 mt-1">
            <router-link to="/" class="nav-link">Home</router-link>
          </li>
          <li class=" nav-item   bg-primary-opacity text-center py-1 mt-1">
            <router-link to="chat" class="nav-link">Chat</router-link>
          </li>
          <li class=" nav-item   bg-primary-opacity text-center py-1 mt-1">
            <router-link to="call" class="nav-link">Call</router-link>
          </li>
          <li class=" nav-item   bg-primary-opacity text-center py-1 mt-1">
            <router-link to="video" class="nav-link">Video</router-link>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "Navigation",
}
</script>

<style scoped>
#navigation {
  height: 10vh;
  padding: 0.5rem 0;
}
.navbar-toggler {
  background: rgba(93, 235, 28, 0.8);
  border-radius: 50%;
  height: 3rem;
}
.navbar-toggler:hover, .navbar-toggler:focus {
  background: rgba(93, 235, 28, 0.8);
  border-radius: 50%;
  height: 3rem;
  transform: rotate(90deg);
}
.text-white {
  color: white !important;
}
.nav-link {
  color: white !important;
}
.bg-primary-opacity {
  background-color: rgba(5, 178, 221, 0.2);
}
.bg-primary-opacity:hover {
  background-color: rgba(5, 178, 221, 0.1);
}
@media only screen and (min-width: 1000px) {
  .nav-item {
    margin-left: 2rem;
  }
}
</style>