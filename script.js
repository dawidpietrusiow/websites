const timeDispEl = document.getElementById('time-display');
const startBtnEl = document.getElementById('start-btn');
const stopBtnEl = document.getElementById('stop-btn');
const resetBtnEl = document.getElementById('reset-btn');
const lapListEl = document.getElementById('lap-list');

let isRunning = false;
let startTime;
let elapsedTime = 0;
let timeRunningId;
let lapList = [];

startBtnEl.addEventListener('click', () => {
  if (!isRunning) {
    isRunning = true;
    startTime = Date.now() - elapsedTime;
    timeRunningId = setInterval(() => {
      elapsedTime = Date.now() - startTime;
      timeDispEl.textContent = formatTime(elapsedTime);
    }, 10);
    startBtnEl.textContent = 'Lap';
    stopBtnEl.classList.remove('disabled');
  }
  else if (isRunning) {
    const time = timeDispEl.textContent;
    lapList.push(time);
    renderLapList();
  }
});

stopBtnEl.addEventListener('click', () => {
  if (isRunning) {
    isRunning = false;
    clearInterval(timeRunningId);
    startBtnEl.textContent = 'Start';
    stopBtnEl.classList.add('disabled');
  }
});

resetBtnEl.addEventListener('click', () => {
  isRunning = false;
  clearInterval(timeRunningId);
  elapsedTime = 0;
  timeDispEl.textContent = formatTime(elapsedTime);
  lapList = [];
  renderLapList();
  startBtnEl.textContent = 'Start';
  stopBtnEl.classList.remove('disabled');
});

function formatTime(timeMillis) {
  const millis = Math.floor((timeMillis % 1000) / 10);
  const seconds = Math.floor((timeMillis / 1000) % 60);
  const minutes = Math.floor((timeMillis / (1000 * 60)) % 60);
  const hours = Math.floor(timeMillis / (1000 * 60 * 60));

  return `
${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}.${millis < 10 ? '0' + millis : millis}
`;
}

function renderLapList() {
  let html = '';
  lapList.forEach((time, index) => {
    html += `
<div class="lap-list-elements">
  <div class="lap-list-values">${index + 1}</div>
  <div class="lap-list-values">${time}</div>
</div>    
`
  });
  lapListEl.innerHTML = html;
}