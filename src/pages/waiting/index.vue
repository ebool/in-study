<template>
  <div class="waiting-page-cont column items-center justify-center">
    <div class="time" ref="1">1</div>
    <div class="time" ref="2">2</div>
    <div class="time" ref="3">3</div>
  </div>
</template>

<script>
export default {
  mounted () {
    this.$refs['3'].classList.add('slide-in')

    setTimeout(() => {
      this.$refs['3'].classList.remove('slide-in')
      this.$refs['3'].classList.add('slide-out')
      this.$refs['2'].classList.add('slide-in')
    }, 1200);
    setTimeout(() => {
      this.$refs['2'].classList.remove('slide-in')
      this.$refs['2'].classList.add('slide-out')
      this.$refs['1'].classList.add('slide-in')
    }, 2200);
    setTimeout(() => {
      this.$router.replace({ path: '/timer' });
    }, 3000);
  }
}
</script>

<style lang="scss" scoped>
.waiting-page-cont {
  background-color: black;
  width: 100%;
  height: 100%;

  .time {
    position: absolute;
    font-size: 180px;
    color: white;
    opacity: 0;
  }

  .slide-in {
    animation: slideIn .2s forwards;
  }
  .slide-out {
    animation: slideOut .2s forwards;
  }

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(-100%);
    }
    to {
      opacity: 1;
      transform: translateY(0%);
    }
  }
  @keyframes slideOut {
    from {
      opacity: 1;
      transform: translateY(0%);
    }
    to {
      opacity: 0;
      transform: translateY(100%);
    }
  }
}
</style>
