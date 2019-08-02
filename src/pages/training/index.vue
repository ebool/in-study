<template>
  <div class="training-page-cont column items-center">
    <div class="time" :style="getStyle">{{nowTime}}</div>
    <div>{{getCurrentSet}}/{{setCnt}}</div>
    <q-knob
      disable
      v-model="progress"
      show-value
      size="90px"
      :thickness="0.22"
      color="primary"
      track-color="grey-3"
      class="text-primary q-ma-md"
    >
      {{ progress }}%
    </q-knob>
    <transition-group name="fade">
      <q-btn key="stop" class="q-mr-sm" round color="primary" icon="stop" @click="stop" v-if="isPause"/>
      <q-btn key="run" round color="primary" icon="play_arrow" @click="run" v-if="isPause"/>
      <q-btn key="pause" round color="primary" icon="pause" @click="pause" v-else/>
    </transition-group>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState, mapMutations } from 'vuex';

export default {
  computed: {
    getCurrentSet () {
      return this.currentState ? this.currentState.set : this.setCnt;
    },
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
    ...mapGetters('timer', ['currentSet', 'getTimetable', 'sumOfTime', 'startTime']),
    ...mapState('timer', ['setCnt', 'pauseTime'])
  },
  data () {
    return {
      interval: '',
      currentState: '',
      progress: 0,
      isPause: false,
      tickTimer: '',
      pauseStartTime: 0
    }
  },
  methods: {
    stop () {
      this.$router.replace('/home');
    },
    stopTimer () {
      clearInterval(this.tickTimer);
    },
    run () {
      this.isPause = false;
      this.setPauseTime(+new Date() - this.pauseStartTime);
      this.startTickTimer();
    },
    pause () {
      this.isPause = true;
      this.stopTimer()
      this.pauseStartTime = +new Date();
    },
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
    startTickTimer () {
      this.tickTimer = this.startInterval(() => {
        let now = +new Date();

        this.currentState = this.getCurrent();
        if (!this.currentState) {
          clearInterval(this.tickTimer);
          this.interval = 0;
          this.progress = 100;
          return;
        }
        this.interval = this.currentState.endTime - now;
        this.progress = Math.floor((now - this.startTime - this.pauseTime) / (this.sumOfTime * 600));
      }, 1000);
    },
    ...mapMutations('timer', ['setPauseTime']),
    ...mapActions('timer', ['refreshTimer'])
  },
  mounted () {
    this.refreshTimer();
    this.startTickTimer();
  },
  beforeDestroy () {
    this.stopTimer();
  }
}
</script>

<style lang="scss" scoped>
.training-page-cont {
  .time {
    font-size: 80px;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }

  .fade-enter-to, .fade-leave {
    opacity: 1;
  }

  .fade-enter-active {
    transition: opacity .2s ease;
  }

  .fade-leave-active {
    transition: opacity .2s ease;
    position: absolute;
  }

  .fade-move {
    transition: all .2s ease;
  }
}
</style>
