<template>
  <div id="video">
    <h1>This is an video page</h1>

    <div class="form-group w-50">
      <label for="name">Name</label>
      <input type="text" class="form-control" name="name" v-model="$store.state.name" id="">
    </div>
  </div>
</template>

<script>
export default {
  name: "Video",
}
</script>

<style scoped>
#video {
  height: 90vh;
}
</style>