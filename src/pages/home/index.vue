<template>
  <div class="home-cont">
    <div class="q-mb-md">Time per set</div>
    <input-time :unit="10" min="00:10" max="03:00" default="00:50"></input-time>
    <div class="q-mb-md">Time per rest</div>
    <input-time :unit="5" min="00:00" max="01:00" default="00:10"></input-time>
    <div class="q-mb-md">Set</div>
    <input-number :unit="1" :min="1" :max="10" :default="5"></input-number>
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

<style scoped>

</style>
