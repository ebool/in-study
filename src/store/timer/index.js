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
    return state.trainingTime * state.setCnt + state.restTime * (state.setCnt - 1);
  },
  targetTime (state, getters) {
    let timer = getters.getTimer;
    return timer ? parseInt(timer.targetTime) : 0;
  },
  startTime (state, getters) {
    return getters.targetTime - getters.sumOfTime * 60000;
  },
  currentSet (state, getters) {
    let timer = getters.getTimer;
    if (!timer) return 0;

    let now = +new Date();

    for (let i of getters.getTimetable) {
      if (i.startTime < now && now < i.endTime) {
        return i;
      }
    }
  },
  getTimetable (s, getters) {
    let timer = getters.getTimer;
    if (!timer) return 0;

    let res = []
    let temp = timer.startTime;
    for (let i = 1; i < timer.setCnt; i++) {
      res.push({
        set: i,
        startTime: temp,
        endTime: temp + timer.trainingTime * 60000,
        type: 'training'
      })
      temp += timer.trainingTime * 60000;
      res.push({
        set: i,
        startTime: temp,
        endTime: temp + timer.restTime * 60000,
        type: 'rest'
      })
      temp += timer.restTime * 60000;
    }
    return res;
  },
  getTimer () {
    let timer = JSON.parse(Cookie.get('timer'));
    return typeof timer === 'object' ? timer : ''
  }
}

const mutations = {
  setTrainingTime (state, val) { state.trainingTime = val },
  setRestTime (state, val) { state.restTime = val },
  setSetCnt (state, val) { state.setCnt = val }
}
const actions = {
  setTimer ({ state, getters }) {
    Cookie.set('timer', JSON.stringify({
      startTime: +new Date(),
      targetTime: +new Date() + getters.sumOfTime * 60000,
      trainingTime: state.trainingTime,
      restTime: state.restTime,
      setCnt: state.setCnt
    }));
  }
}
export default {
  namespaced: true,
  getters,
  mutations,
  actions,
  state
}
