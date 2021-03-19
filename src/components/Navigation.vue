<template>
  <div id="navigation" class="">
    <nav class="navbar navbar-expand-lg navbar-light text-white text-monospace font-weight-bold">
      <router-link to="/" class="navbar-brand">Home</router-link>
      <div class="collapse navbar-collapse text-center" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item rounded bg-warning ml-3">
            <router-link to="chat" class="nav-link">Chat</router-link>
          </li>
          <li class="nav-item rounded bg-warning ml-3">
            <router-link to="call" class="nav-link">Call</router-link>
          </li>
          <li class="nav-item rounded bg-warning ml-3">
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
  background: gray;
  padding: 0.5rem 0;
}
</style>