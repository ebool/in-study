const state = {
  trainingTime: '',
  restTime: '',
  setCnt: ''
}

const getters = {
  sumOfTime (state) {
    return (state.trainingTime + state.restTime) * state.setCnt;
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
