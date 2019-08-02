<template>
  <div class="home-cont column">
    <header-cont></header-cont>
    <div class="column q-px-lg q-mt-lg">
      <div class="q-mb-md">Time per set</div>
      <input-time :unit="1" min="00:00" max="01:00" init-value="00:01" @callback="setTrainingTime"></input-time><!-- test -->
      <!--<input-time :unit="10" min="00:10" max="03:00" init-value="00:50" @callback="setTrainingTime"></input-time>-->
      <div class="q-mb-md">Time per rest</div>
      <input-time :unit="1" min="00:00" max="00:10" init-value="00:01" @callback="setRestTime"></input-time><!-- test -->
      <!--<input-time :unit="5" min="00:00" max="01:00" init-value="00:10" @callback="setRestTime"></input-time>-->
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
  </div>
</template>

<script>
import HeaderCont from 'src/components/header/transparentHeader.vue'
import InputTime from 'src/components/inputs/InputTime.vue'
import InputNumber from 'src/components/inputs/InputNumber.vue'
import { mapMutations, mapGetters, mapActions } from 'vuex';

export default {
  components: {
    HeaderCont,
    InputTime,
    InputNumber
  },
  methods: {
    goTo () {
      this.$router.push({ path: '/waiting' });
    },
    ...mapMutations('timer', ['setTrainingTime', 'setRestTime', 'setSetCnt']),
    ...mapActions('timer', ['removeTimer'])
  },
  computed: {
    getSumOfTime () {
      return `총 ${Math.floor(this.sumOfTime / 60)}시간 ${this.sumOfTime % 60}분`
    },
    ...mapGetters('timer', ['sumOfTime'])
  },
  mounted () {
    this.removeTimer();
  }
}
</script>

<style lang="scss" scoped>
.home-cont {
  height: 100%;
  width: 100%;
}

</style>
