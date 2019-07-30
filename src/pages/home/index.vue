<template>
  <div class="home-cont column q-px-lg">
    <div class="q-mb-md">Time per set</div>
    <input-time :unit="10" min="00:10" max="03:00" init-value="00:50" @callback="setTrainingTime"></input-time>
    <div class="q-mb-md">Time per rest</div>
    <input-time :unit="5" min="00:00" max="01:00" init-value="00:10" @callback="setRestTime"></input-time>
    <div class="q-mb-md">Set</div>
    <input-number :unit="1" :min="1" :max="10" :default="5" @callback="setSetCnt"></input-number>
    <q-btn
      @click="goTo"
      class="q-mt-lg"
      rounded
      style="background: #7A74E8; color: white"
      size="xl"
      :label="getSumOfTime"></q-btn>
  </div>
</template>

<script>
import InputTime from 'src/components/inputs/InputTime.vue'
import InputNumber from 'src/components/inputs/InputNumber.vue'
import { mapMutations, mapGetters } from 'vuex';

export default {
  components: {
    InputTime,
    InputNumber
  },
  methods: {
    goTo () {
      this.$router.push({ path: '/waiting' });
    },
    ...mapMutations('timer', ['setTrainingTime', 'setRestTime', 'setSetCnt'])
  },
  computed: {
    getSumOfTime () {
      return `총 ${Math.floor(this.sumOfTime / 60)}시간 ${this.sumOfTime % 60}분`
    },
    ...mapGetters('timer', ['sumOfTime'])
  },
  mounted () {
  }
}
</script>

<style lang="scss" scoped>
.home-cont {
  height: 100%;
  width: 100%;
  background-color: #3CFFAF;
}

</style>
