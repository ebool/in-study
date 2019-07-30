<template>
  <div class="training-page-cont column items-center">
    <div class="time">{{nowTime}}</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    nowTime () {
      let mInterval = this.interval / 1000;
      let s = Math.floor(mInterval % 60);
      let m = Math.floor(mInterval / 60 % 60);
      let h = Math.floor(mInterval / 3600);
      return `${this.add0(h)}:${this.add0(m)}:${this.add0(s)}`;
    },
    add0 () { return (v) => v > 9 ? v : '0' + v },
    ...mapGetters('timer', ['targetTime'])
  },
  data () {
    return {
      interval: ''
    }
  },
  mounted () {
    this.interval = this.targetTime - +new Date();
    let timer = setInterval(() => {
      this.interval -= 1000;
      if (this.interval <= 0) {
        clearInterval(timer);
        this.interval = 0;
      }
    }, 1000)
  }
}
</script>

<style lang="scss" scoped>
.training-page-cont {
  .time {
    font-size: 80px;
  }
}
</style>
