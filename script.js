window.onload = function countDown() {
  CountDown.init();
  let startBtn = document.getElementById("startBtn");
  let resetBtn = document.getElementById("resetBtn");
  let range = document.getElementById("range");
  let selectedRange = document.getElementById("selectedRange");

  startBtn.addEventListener("click", () => {
    startBtn.disabled = true;
    CountDown.startTimer(range.value);
  });

  resetBtn.addEventListener("click", CountDown.resetTimer);
  range.addEventListener(
    "change",
    () =>
      (selectedRange.innerHTML =
        range.value === 1 ? "1 Minute" : `${range.value} Minutes`)
  );
};

const CountDown = (() => {
  let M = document.getElementById("minutes"),
    S = document.getElementById("seconds"),
    canvas = document.getElementById("canvas"),
    c = canvas.getContext("2d");

  const second = 1000,
    minute = second * 60,
    hour = minute * 60,
    day = hour * 24;

  let posX = canvas.width / 2,
    posY = canvas.height / 2,
    arcSize = 360;

  c.lineCap = "round";

  function path() {
    c.clearRect(0, 0, canvas.width, canvas.height);
    c.beginPath();
    c.arc(posX, posY, 70, (Math.PI / 180) * 270, (Math.PI / 180) * (270 + 360));
    c.strokeStyle = "#eee";
    c.lineWidth = "5";
    c.stroke();
  }

  function init() {
    path();
  }

  let timer = 0;
  let digitalTimer = 0;

  function resetTimer() {
    startBtn.disabled = false;
    clearInterval(timer);
    clearInterval(digitalTimer);
    c.clearRect(0, 0, canvas.width, canvas.height);
    M.innerText = 0;
    S.innerText = 0;
    path();
  }

  function startTimer(range) {
    let targetTime = parseInt(range, 10);

    let degrees = 0;

    var nextTarget = new Date();
    nextTarget.setMinutes(nextTarget.getMinutes() + targetTime);

    digitalTimer = setInterval(function () {
      const now = new Date().getTime(),
        distance = nextTarget - now;
      M.innerText = Math.floor((distance % hour) / minute);
      S.innerText = Math.floor((distance % minute) / second);
    }, 1000);

    timer = setInterval(function () {
      degrees += 1;
      path();

      c.beginPath();
      c.strokeStyle = "#4b5563";
      c.lineWidth = "5";
      c.arc(
        posX,
        posY,
        70,
        (Math.PI / 180) * 270,
        (Math.PI / 180) * (270 + degrees)
      );
      c.stroke();
      if (degrees >= arcSize) {
        clearInterval(timer);
        clearInterval(digitalTimer);
      }
    }, (targetTime * minute) / 360);
  }
  return {
    startTimer,
    resetTimer,
    init,
  };
})();
