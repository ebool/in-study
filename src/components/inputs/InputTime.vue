<template>
  <div class="input-time-cont">
    <div class="input-time row justify-center items-center">
      <q-icon class="icon q-mr-md" @click="minus" name="remove"/>
      <div class="time">{{time | timeFormat}}</div>
      <q-icon class="icon q-ml-md" @click="plus" name="add"/>
    </div>
  </div>
</template>

<script>
import { parseTimeByMinutes } from 'utils/utils.js';

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
    initValue: {
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
  },
  mounted () {
    this.time = parseTimeByMinutes(this.initValue);
    this.emitData();
  },
  methods: {
    plus () {
      let res = this.time + this.unit;
      let max = parseTimeByMinutes(this.max);
      if (res > max) return;
      this.time = res;
      this.emitData();
    },
    minus () {
      let res = this.time - this.unit;
      let min = parseTimeByMinutes(this.min);
      if (res < min) return;
      this.time = res;
      this.emitData();
    },
    emitData () {
      this.$emit('callback', this.time);
    }
  }
}
</script>

<style lang="scss" scoped>
.input-time-cont {
  user-select: none;
  .input-time {
    .icon {
      font-size: 54px;
      cursor: pointer;
    }
    .time {
      font-size: 64px;
    }
  }
}
</style>
