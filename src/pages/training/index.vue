<template>
  <div class="training-page-cont column items-center">
    <div class="time" :style="getStyle">{{nowTime}}</div>
    <div>{{currentSet}}</div>
    <q-knob
      disable
      v-model="progress"
      show-value
      size="90px"
      :thickness="0.22"
      color="primary"
      track-color="grey-3"
      class="text-primary q-ma-md"
    >{{ progress }}%</q-knob>
    <br>
    <div>======</div>
    <br>
    <div>{{getTimetable}}</div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  computed: {
    getStyle () {
      if (!this.currentState) return;
      return {
        color: this.currentState.type === 'rest' ? 'orange' : ''
      }
    },
    nowTime () {
      let mInterval = this.interval / 1000;
      let s = Math.floor(mInterval % 60);
      let m = Math.floor(mInterval / 60 % 60);
      let h = Math.floor(mInterval / 3600);
      return `${this.add0(h)}:${this.add0(m)}:${this.add0(s)}`;
    },
    add0 () { return (v) => v > 9 ? v : '0' + v },
    ...mapGetters('timer', ['currentSet', 'getTimetable', 'sumOfTime', 'startTime'])
  },
  data () {
    return {
      interval: '',
      currentState: '',
      progress: 0
    }
  },
  methods: {
    startInterval (callback, sec) {
      callback();
      return setInterval(callback, sec);
    },
    getCurrent () {
      if (!this.getTimetable) return;
      let now = +new Date();
      for (let i of this.getTimetable) {
        if (i.startTime < now && now < i.endTime) return i;
      }
    },
    ...mapActions('timer', ['refreshTimer'])
  },
  mounted () {
    this.refreshTimer();
    let intervalTimer = this.startInterval(() => {
      let now = +new Date();

      this.currentState = this.getCurrent();
      if (!this.currentState) {
        clearInterval(intervalTimer);
        this.interval = 0;
        this.progress = 100;
        return;
      }
      this.interval = this.currentState.endTime - now;
      this.progress = Math.floor((now - this.startTime) / (this.sumOfTime * 600));
    }, 1000);
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