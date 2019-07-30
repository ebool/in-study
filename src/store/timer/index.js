import { parseTime } from 'utils/utils.js'

const state = {
  trainingTime: '',
  restTime: '',
  setCnt: ''
}

const getters = {
  sumOfTime (state) {
    let time = (parseTime(state.trainingTime) + parseTime(state.restTime)) * state.setCnt;
    return `총 ${Math.floor(time / 60)}시간 ${time % 60}분`;
  }
}

const mutations = {
  setTrainingTime (state, val) { state.trainingTime = val },
  setRestTime (state, val) { state.restTime = val },
  setSetCnt (state, val) { state.setCnt = val }
}
const actions = {
  someAction (/* context */) {
  }
}
export default {
  namespaced: true,
  getters,
  mutations,
  actions,
  state
}
