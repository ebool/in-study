export function parseTime (value) {
  if (!value) return 0;
  let h = value.split(':')[0];
  let m = value.split(':')[1];
  return parseInt(h) * 60 + parseInt(m);
}
