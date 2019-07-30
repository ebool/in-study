import Vue from 'vue'
import { parseMinutesToFormat } from 'utils/utils.js';

Vue.filter('timeFormat', function (value) {
  return parseMinutesToFormat(value);
})
