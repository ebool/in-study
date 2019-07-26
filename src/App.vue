<template>
  <div class="cont">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
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
</style>
