export const secondsToHms = d => {
  d = Number(d);
  var h = Math.floor(d / 3600);
  var m = Math.floor((d % 3600) / 60);
  var s = Math.floor((d % 3600) % 60);

  var hDisplay = h > 9 ? h + ':' : h > 0 ? '0' + h + ':' : '00:';
  var mDisplay = m > 9 ? m + ':' : m > 0 ? '0' + m + ':' : '00:';
  var sDisplay = s > 9 ? s : s > 0 ? '0' + s : '00';
  return hDisplay + mDisplay + sDisplay;
};
