
import flatpickr from "flatpickr";
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
const refs = {
    startBtn: document.querySelector('button[data-start]'),
    daysValue: document.querySelector('.value[data-days]'),
    hoursValue: document.querySelector('.value[data-hours]'),
    minutesValue: document.querySelector('.value[data-minutes]'),
    secondsValue: document.querySelector('.value[data-seconds]')
}
const timer = {
     start() {
        refs.startBtn.disabled = true;
        timer.showValues(convertMs(eventDate.getTime()-Date.now()));
        const intervalId = setInterval(() => {
            const currentTime = Date.now();
            const diff = eventDate.getTime()-currentTime;
            if(diff > 0){
            timer.showValues(convertMs(diff))
            }else{
            clearInterval(intervalId);}
        }, 1000);
    },
    showValues({ days, hours, minutes, seconds }){
        refs.daysValue.textContent = addLeadingZero(days);
        refs.hoursValue.textContent = addLeadingZero(hours);
        refs.minutesValue.textContent = addLeadingZero(minutes);
        refs.secondsValue.textContent = addLeadingZero(seconds);}
}
const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      console.log(selectedDates[0]);
      if (Date.now() > selectedDates[0].getTime()){
        Notiflix.Notify.failure("Please choose a date in the future");
        refs.startBtn.disabled = true;
        } else {
        refs.startBtn.disabled = false;
        eventDate = selectedDates[0];
    }
    },
};
let eventDate = null;
refs.startBtn.disabled = true;
flatpickr("#datetime-picker", options);

refs.startBtn.addEventListener("click", onStartBtn);

function onStartBtn(){
 timer.start()}

function addLeadingZero(value){
     return String(value).padStart(2, '0')
 }
function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
  }
