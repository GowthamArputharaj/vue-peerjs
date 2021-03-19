<template>
  <div class="call">
    <h1>This is an call page</h1>

    <div class="form-group w-50">
      <label for="name">Name</label>
      <input type="text" class="form-control" name="name" v-model="$store.state.name" id="">
    </div>
  </div>
</template>

<script>
import store from '../store'

export default {
  name: "Call",
}
</script>

<style scoped>
.call {
  height: 90vh;
}
</style>