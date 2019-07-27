<template>
  <div id="q-app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
}
</script>

<style>
  html, body {
    overflow: hidden;
    width: 100%;
    height: 100%;
  }
  body {
    overflow: scroll;
  }
  #q-app {
    height: 100%;
  }
</style>
