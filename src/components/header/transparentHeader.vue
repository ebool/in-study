<template>
  <div class="transparent-header-cont row justify-between items-center">
    <div class="q-ml-md" style="width: 28px; height: 28px"></div>
    <div>IN STUDY</div>
    <q-icon class="q-mr-md" name="bar_chart" @click="goTo('home')" v-if="isChart"></q-icon>
    <q-icon class="q-mr-md" name="access_time" @click="goTo('stats')" v-else></q-icon>
  </div>
</template>

<script>
export default {
  props: {
    rightIcon: {
      default: ''
    }
  },
  computed: {
    isChart () {
      return this.rightIcon === 'chart';
    }
  },
  methods: {
    goTo (path) {
      this.$router.replace({ path });
    }
  }
}
</script>

<style lang="scss" scoped>
.transparent-header-cont {
  height: 56px;
  font-size: 28px;
  border-bottom: grey 1px solid;
}
</style>
