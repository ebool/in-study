<template>
  <div class="input-number-cont">
    <div class="input-number row justify-center items-center">
      <q-icon class="icon q-mr-lg" @click="minus" name="remove"/>
      <div class="number">{{number}}</div>
      <q-icon class="icon q-ml-lg" @click="plus" name="add"/>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    unit: {
      default: 1,
      type: Number
    },
    min: {
      default: 0,
      type: Number,
      validator: (val) => val >= 0
    },
    max: {
      default: 0,
      type: Number,
      validator: (val) => val >= 0
    },
    default: {
      default: 0,
      type: Number
    }
  },
  data () {
    return {
      number: 1
    }
  },
  computed: {
  },
  mounted () {
    this.number = this.default;
  },
  methods: {
    plus () {
      console.log(this.number, this.unit, this.max);
      if (this.number + this.unit > this.max) return;
      this.number += this.unit;
    },
    minus () {
      if (this.number - this.unit < this.min) return;
      this.number -= this.unit;
    }
  }
}
</script>

<style lang="scss" scoped>
.input-number-cont {
  .input-number {
    .icon {
      font-size: 54px;
      user-select: none;
    }
    .number {
      font-size: 64px;
    }
  }
}
</style>
