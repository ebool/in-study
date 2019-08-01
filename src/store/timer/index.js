import Cookie from 'js-cookie';

const state = {
  // trainingTime: '',
  // restTime: '',
  // setCnt: '',
  // timer: ''
  trainingTime: 50,
  restTime: 10,
  setCnt: 5,
  timer: '',
  pauseTime: 0
}

const getters = {
  sumOfTime (state) {
    return state.trainingTime * state.setCnt + state.restTime * (state.setCnt - 1);
  },
  startTime (state) {
    return state.timer.startTime;
  },
  targetTime (state) {
    let timer = state.timer;
    return timer ? parseInt(timer.targetTime) : 0;
  },
  currentSet (state, getters) {
    let timer = state.timer;
    if (!timer) return 0;

    let now = +new Date();

    for (let i of getters.getTimetable) {
      if (i.startTime < now && now < i.endTime) {
        return i;
      }
    }
  },
  getTimetable (state) {
    let timer = state.timer;
    if (!timer) return;

    let res = []
    let temp = timer.startTime + state.pauseTime;
    for (let i = 1; i <= timer.setCnt; i++) {
      res.push({
        set: i,
        startTime: temp,
        endTime: temp + timer.trainingTime * 60000,
        type: 'training'
      })
      temp += timer.trainingTime * 60000;
      if (i === timer.setCnt) return res;
      res.push({
        set: i,
        startTime: temp,
        endTime: temp + timer.restTime * 60000,
        type: 'rest'
      })
      temp += timer.restTime * 60000;
    }
    return res;
  }
}

const mutations = {
  setTrainingTime (state, val) { state.trainingTime = val },
  setRestTime (state, val) { state.restTime = val },
  setSetCnt (state, val) { state.setCnt = val },
  setTimer (state, val) { state.timer = val },
  setPauseTime (state, val) { state.pauseTime += val }
}
const actions = {
  setTimerCookie ({ state, getters }) {
    Cookie.set('timer', JSON.stringify({
      startTime: +new Date(),
      targetTime: +new Date() + getters.sumOfTime * 60000,
      trainingTime: state.trainingTime,
      restTime: state.restTime,
      setCnt: state.setCnt
    }));
  },
  removeTimer () {
    Cookie.remove('timer');
  },
  refreshTimer ({ commit }) {
    let timer = Cookie.get('timer') ? JSON.parse(Cookie.get('timer')) : '';
    if (!timer) return;
    commit('setTimer', timer);
    commit('setTrainingTime', timer.trainingTime);
    commit('setRestTime', timer.restTime);
    commit('setSetCnt', timer.setCnt);
  }
}
export default {
  namespaced: true,
  getters,
  mutations,
  actions,
  state
}
