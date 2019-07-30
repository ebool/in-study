export function parseTime (value) {
  if (!value) return 0;
  let h = value.split(':')[0];
  let m = value.split(':')[1];
  return parseInt(h) * 60 + parseInt(m);
}

export function parseTimeByMinutes (time) {
  let split = time.split(':');
  return split.length === 2 ? calcTimeByMinutes(split[0], split[1]) : 0;
}

export function parseMinutesToFormat (val) {
  let h = Math.floor(val / 60);
  let m = val % 60;
  return `${h > 9 ? h : '0' + h}:${m > 9 ? m : '0' + m}`;
}

function calcTimeByMinutes (h, m) {
  return parseInt(h) * 60 + parseInt(m);
}
