let startTime;
let timerInterval;
let payRate;

const startButton = document.getElementById('startButton');
const pauseButton = document.getElementById('pauseButton');
const timeElapsedElement = document.getElementById('timeElapsed');
const earnedMoneyElement = document.getElementById('earnedMoney');
const payRateInput = document.getElementById('payRate');

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);

function startTimer() {
    payRate = parseFloat(payRateInput.value);
    if (isNaN(payRate)) {
        alert('Please enter a valid hourly pay rate.');
        return;
    }

    startTime = Date.now();
    timerInterval = setInterval(updateTimer, 1000);
    startButton.disabled = true;
    pauseButton.disabled = false;
}

function pauseTimer() {
    clearInterval(timerInterval);
    startButton.disabled = false;
    pauseButton.disabled = true;
}

function updateTimer() {
    const currentTime = Date.now();
    const elapsedTime = (currentTime - startTime) / 1000; // in seconds
    const earnedMoney = (elapsedTime / 3600) * payRate; // hourly rate

    timeElapsedElement.textContent = formatTime(elapsedTime);
    earnedMoneyElement.textContent = '$' + earnedMoney.toFixed(2);
}

function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}
