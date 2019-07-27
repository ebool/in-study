<template>
  <div class="home-cont column q-px-lg">
    <div class="q-mb-md">Time per set</div>
    <input-time :unit="10" min="00:10" max="03:00" default="00:50"></input-time>
    <div class="q-mb-md">Time per rest</div>
    <input-time :unit="5" min="00:00" max="01:00" default="00:10"></input-time>
    <div class="q-mb-md">Set</div>
    <input-number :unit="1" :min="1" :max="10" :default="5"></input-number>
    <q-btn
      class="q-mt-lg"
      rounded
      style="background: #7A74E8; color: white"
      size="xl"
      :label="`총 4시간 40분 시작`"></q-btn>
  </div>
</template>

<script>
import InputTime from 'src/components/inputs/InputTime.vue'
import InputNumber from 'src/components/inputs/InputNumber.vue'

export default {
  components: {
    InputTime,
    InputNumber
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
