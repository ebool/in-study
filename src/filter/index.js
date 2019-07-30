import Vue from 'vue'

Vue.filter('timeFormat', function (value) {
  return `총 ${Math.floor(value / 60)}시간 ${value % 60}분`
})
