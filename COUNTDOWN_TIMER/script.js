// script.js
let countdownTarget = null;
let countdownInterval = null;

function setCountdown() {
    const dateInput = document.getElementById('countdown-date').value;
    if (!dateInput) return;

    countdownTarget = new Date(dateInput);
    if (countdownInterval) clearInterval(countdownInterval);

    countdownInterval = setInterval(updateCountdown, 1000);
    updateCountdown();
}

function updateCountdown() {
    if (!countdownTarget) return;

    const now = new Date();
    const timeDifference = countdownTarget - now;

    if (timeDifference <= 0) {
        clearInterval(countdownInterval);
        document.getElementById('timer').innerHTML = 'Countdown Finished';
        return;
    }

    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = formatNumber(days);
    document.getElementById('hours').textContent = formatNumber(hours);
    document.getElementById('minutes').textContent = formatNumber(minutes);
    document.getElementById('seconds').textContent = formatNumber(seconds);
}

function formatNumber(number) {         
    return number.toString().padStart(2, '0');      
}
