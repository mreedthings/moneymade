// Clear local storage on initial page load
localStorage.removeItem('elapsedTime');
localStorage.removeItem('earnedMoney');

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

        // Retrieve previously saved values from local storage
        const savedTime = parseFloat(localStorage.getItem('elapsedTime')) || 0;
        const savedEarnedMoney = parseFloat(localStorage.getItem('earnedMoney')) || 0;
    
        startTime = Date.now() - savedTime * 1000;
        timerInterval = setInterval(updateTimer, 1000);
        startButton.disabled = true;
        pauseButton.disabled = false;
    
        // Set the previous earned money value
        earnedMoneyElement.textContent = '$' + savedEarnedMoney.toFixed(2);

}

function pauseTimer() {
    clearInterval(timerInterval);
    startButton.disabled = false;
    pauseButton.disabled = true;
    startButton.innerText = 'Resume';

    //save the current elapsed time so that it can be the starting elapsed time when the timer is resumed
    const currentTime = Date.now();
    const elapsedTime = (currentTime - startTime) / 1000; // in seconds
    localStorage.setItem('elapsedTimeAccumulated', elapsedTime);


}

function updateTimer() {

    const currentTime = Date.now();
    const elapsedTime = (currentTime - startTime) / 1000; // in seconds
    const earnedMoney = (elapsedTime / 3600) * payRate; // hourly rate

    timeElapsedElement.textContent = formatTime(elapsedTime);
    earnedMoneyElement.textContent = '$' + earnedMoney.toFixed(2);

    // Save current elapsed time and earned money to local storage
    localStorage.setItem('elapsedTime', elapsedTime);
    localStorage.setItem('earnedMoney', earnedMoney);

}



function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}
