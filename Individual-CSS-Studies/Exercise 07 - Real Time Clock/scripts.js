// Initializing Timer:
document.addEventListener("DOMContentLoaded", () => {
    updateTimer();
    setInterval(updatePointerTime, 10);
    setInterval(updateTimer, 1000);
});

function updateTimer() {
    const currentTime = new Date();

    const timerDisplay = document.getElementById("time-display");

    let hours = currentTime.getHours() % 12;
    hours = hours.toString().padStart(2, 0);

    const minutes = currentTime.getMinutes().toString().padStart(2, 0);
    const seconds = currentTime.getSeconds().toString().padStart(2, 0)

    timerDisplay.textContent = `${hours}:${minutes}:${seconds} ${currentTime.getHours() >= 12 ? "PM" : "AM"}`;
}

function updatePointerTime() {
    const currentTime = new Date();

    const currentMilliSec = currentTime.getSeconds() * 1000 + currentTime.getMilliseconds();
    document.querySelector('.clock-box').style.setProperty('--seconds-pointer-angle', `${((currentMilliSec / 500) * 3)}deg`);
}