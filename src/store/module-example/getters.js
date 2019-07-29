export function sumTime (state) {
  let time = getTime(state.timePerSet) + getTime(state.timePerRest)
  time *= state.setNumber;
  return `총 ${Math.floor(time / 60)}시간 ${time % 60}분`;
}

function getTime (value) {
  if (!value) return 0;
  let h = value.split(':')[0];
  let m = value.split(':')[1];
  return parseInt(h) * 60 + parseInt(m);
}
