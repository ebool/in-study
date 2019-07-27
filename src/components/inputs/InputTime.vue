<template>
  <div class="input-time-cont">
    <div class="input-time row justify-center items-center">
      <q-icon class="icon q-mr-md" @click="minus" name="remove"/>
      <div class="time">{{hh}}:{{mm}}</div>
      <q-icon class="icon q-ml-md" @click="plus" name="add"/>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    unit: {
      default: 5,
      type: Number
    },
    min: {
      default: '00:00',
      type: String
    },
    max: {
      default: '03:00',
      type: String
    },
    default: {
      default: '00:00',
      type: String
    }
  },
  data () {
    return {
      time: ''
    }
  },
  computed: {
    hh () {
      if (!this.time) return 0;
      return this.addZero(this.time.getHours());
    },
    mm () {
      if (!this.time) return 0;
      return this.addZero(this.time.getMinutes());
    },
    addZero () {
      return (val) => val > 9 ? val : '0' + val;
    }
  },
  mounted () {
    this.time = new Date();
    let h = this.default.split(':')[0] || 0;
    let m = this.default.split(':')[1] || 0;
    this.time.setHours(h);
    this.time.setMinutes(m);
  },
  methods: {
    plus () {
      let res = this.addMinutes(this.time, this.unit);
      let d = this.parseDate(this.max);
      if (res.getTime() >= d.getTime()) return;
      this.time = res;
    },
    minus () {
      let res = this.addMinutes(this.time, -this.unit);
      let d = this.parseDate(this.min, true);
      if (res.getTime() <= d.getTime()) return;
      this.time = res;
    },
    parseDate (d, isSetSec) {
      let h = d.split(':')[0] || 0;
      let m = d.split(':')[1] || 0;
      let res = new Date();
      res.setHours(h);
      res.setMinutes(m);
      if (isSetSec)res.setSeconds(0);
      return res;
    },
    addMinutes (date, min) {
      return new Date(date.getTime() + min * 60000);
    }
  }
}
</script>

<style lang="scss" scoped>
.input-time-cont {
  .input-time {
    .icon {
      font-size: 54px;
      user-select: none;
      cursor: pointer;
    }
    .time {
      font-size: 64px;
    }
  }
}
</style>
