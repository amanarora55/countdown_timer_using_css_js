let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');
// const timeUp = document.querySelector('.display__time-up');
const timeUp = document.querySelector('.display__time-up');

function timer(seconds) {
    clearInterval(countdown);
    const now = Date.now();
    const then = now + seconds * 1000;
    displayTimeLeft(seconds);
    displayEndTime(then);
    
    countdown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000);

        // check to stop the timer
        if(secondsLeft < 0 ) {
            clearInterval(countdown);
            return;
        }
        displayTimeLeft(secondsLeft);
    }, 1000)
}

function displayTimeLeft (seconds) {
    // timerDisplay.style.animation = " ";
    console.log("reached");
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;

    const display = `${minutes} : ${remainderSeconds < 10 ? "0" : ""}${remainderSeconds}`;
    document.title = `${display} Countdown Timer`; 
    
    timerDisplay.textContent = display;

    // console.log(minutes, remainderSeconds);

    if(minutes == 0 && remainderSeconds == 0) {
        timeUp.style.opacity = "1";
        timeUp.textContent = "Time is up.";
        timerDisplay.style.animation = "shake 0.82s cubic-bezier(.36,.07,.19,.97) both";
        timerDisplay.style.color = "crimson";
        setTimeout(function() {
            timerDisplay.style.animation = "";
        },500);
    }else {
        timeUp.textContent = "";
    }
    // console.log(display);
}

function displayEndTime(timeStamp) {
    const end = new Date(timeStamp);
    const hour = end .getHours();
    const adjustedHour = hour > 12 ? hour - 12 : hour ;  
    const minutes = end.getMinutes();
    endTime.textContent = `Be back  at ${adjustedHour < 10 ? "0" : ""}${adjustedHour} : ${minutes < 10 ? "0" : ""}${minutes} ${hour > 12 ? "PM" : "AM"}`;
}

function startTimer() {
    timerDisplay.style.color = "white";
    timerDisplay.style.animation = "shake 0.82s cubic-bezier(.36,.07,.19,.97) both";
    setTimeout(function() {
        timerDisplay.style.animation = "";
    },500);

    const seconds = parseInt(this.dataset.time);
    timer(seconds);
}


buttons.forEach(button => button.addEventListener('click',startTimer));

document.customForm.addEventListener('submit',function(e) {
    e.preventDefault();
    const mins = this.minutes.value;
    // console.log(mins);
    timer(mins*60);
    this.reset();
})
