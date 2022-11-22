import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Report } from 'notiflix/build/notiflix-report-aio';

const refs = {
    datetimePicker: document.querySelector('#datetime-picker'),
    startBtn: document.querySelector('button[data-start]'),
    daysValue: document.querySelector('span[data-days]'),
    hoursValue: document.querySelector('span[data-hours]'),
    minutesValue: document.querySelector('span[data-minutes]'),
    secondsValue: document.querySelector('span[data-seconds]')
}

let timerTime = null;
let selectedDate = null;
let currentDate = null;
let timerInterval = null;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        selectedDate = selectedDates[0].getTime();
        checkSetDate();
        resetTimer();
    },
};

flatpickr(refs.datetimePicker, options);
disableBtn(refs.startBtn);

refs.startBtn.addEventListener('click', onStartBtnClick);

function onStartBtnClick() {
    setTimer();
    disableBtn(refs.startBtn);
}

function setTimer() {
    timerInterval = setInterval(() => {
        timerTime = timerTime - 1000;
        checkTimerExpire();
    }, 1000);
}

function checkSetDate() {
    currentDate = new Date();
    timerTime = selectedDate - currentDate;
    if (timerTime > 0) {
        enableBtn(refs.startBtn);
    } else {
        disableBtn(refs.startBtn);
        Report.failure('WRONG DATE', 'Please choose a date in the future', 'OK');;
    }
}

function checkTimerExpire() {
    if (timerTime > 0) {
        updateTimerValue()
    } else {
        resetTimer();
    }
}

function resetTimer() {
    refs.daysValue.textContent = '00';
    refs.hoursValue.textContent = '00';
    refs.minutesValue.textContent = '00';
    refs.secondsValue.textContent = '00';
    clearInterval(timerInterval);
}

function updateTimerValue() {
    const { days, hours, minutes, seconds } = convertMs(timerTime);
    refs.daysValue.textContent = addLeadingZero(days);
    refs.hoursValue.textContent = addLeadingZero(hours);
    refs.minutesValue.textContent = addLeadingZero(minutes);
    refs.secondsValue.textContent = addLeadingZero(seconds);
}

function disableBtn(btn) {
    btn.setAttribute('disabled', 'disabled');
}

function enableBtn(btn) {
    btn.removeAttribute('disabled');
}

function convertMs(ms) {
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

function addLeadingZero(value) {
    return value.toString().padStart(2, '0');
}