<template>
  <transition :name="transitionName" mode="out-in">
    <router-view></router-view>
  </transition>
</template>

<script>
export default {
  data () {
    return {
      transitionName: ''
    }
  },
  watch: {
    '$route' (to, from) {
      let res = to.path.indexOf('stats') > 0 && from.path.indexOf('home') > 0;
      let res1 = from.path.indexOf('stats') > 0 && to.path.indexOf('home') > 0;
      this.transitionName = res || res1 ? 'rotate' : '';
    }
  }
}
</script>

<style scoped lang="scss">
  .rotate-enter-active, .rotate-leave-active {
    transition: all .2s;
  }
  .rotate-enter, .rotate-leave-to {
    opacity: 0;
    transform: rotateY(90deg);
  }
</style>
