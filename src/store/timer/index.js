import Cookie from 'js-cookie';

const state = {
  // trainingTime: '',
  // restTime: '',
  // setCnt: ''
  trainingTime: 50,
  restTime: 10,
  setCnt: 5
}

const getters = {
  sumOfTime (state) {
    return (state.trainingTime + state.restTime) * state.setCnt;
  },
  targetTime () {
    return Cookie.get('targetTime');
  }
}

const mutations = {
  setTrainingTime (state, val) { state.trainingTime = val },
  setRestTime (state, val) { state.restTime = val },
  setSetCnt (state, val) { state.setCnt = val }
}
const actions = {
  setTargetTime ({ getters }) {
    Cookie.set('targetTime', +new Date() + getters.sumOfTime * 60000);
  }
}
export default {
  namespaced: true,
  getters,
  mutations,
  actions,
  state
}
