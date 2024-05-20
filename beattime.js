function startTime() {
  var d = new Date();
  var h = d.getHours();
  var m = d.getMinutes();
  var s = d.getSeconds();
  var tzoff = 60 + d.getTimezoneOffset();
  var time =
    "@" +
    (
      "000" +
      (Math.floor((h * 3600 + (m + tzoff) * 60 + s) / 86.4) % 1000)
    ).slice(-3);

  const timeElement = document.getElementById("time");
  timeElement.innerText = time;
}
startTime();
