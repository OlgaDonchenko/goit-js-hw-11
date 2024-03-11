import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import icon from "../img/octagon.png";

document.addEventListener("DOMContentLoaded", () => {
  const startButton = document.querySelector("[data-start]");
  const timerFields = {
    days: document.querySelector("[data-days]"),
    hours: document.querySelector("[data-hours]"),
    minutes: document.querySelector("[data-minutes]"),
    seconds: document.querySelector("[data-seconds]")
  };
  const input = document.querySelector(".inp");
  let timerId = null;

  function getTimeDifference(endDate) {
    const msInSecond = 1000;
    const msInMinute = msInSecond * 60;
    const msInHour = msInMinute * 60;
    const msInDay = msInHour * 24;

    const difference = endDate - new Date();
    const days = Math.floor(difference / msInDay);
    const hours = Math.floor((difference % msInDay) / msInHour);
    const minutes = Math.floor((difference % msInHour) / msInMinute);
    const seconds = Math.floor((difference % msInMinute) / msInSecond);

    return { days, hours, minutes, seconds };
  }

  
  function addLeadingZero(value) {
    return String(value).padStart(2, "0");
  }

 
  function updateTimerDisplay(time) {
    timerFields.days.textContent = addLeadingZero(time.days);
    timerFields.hours.textContent = addLeadingZero(time.hours);
    timerFields.minutes.textContent = addLeadingZero(time.minutes);
    timerFields.seconds.textContent = addLeadingZero(time.seconds);
  }

  function onClose(selectedDates) {
    const userSelectedDate = selectedDates[0];
    if (userSelectedDate < new Date()) {
      iziToast.error({
        message: "Please choose a date in the future",
        width: 300,
        height: 64,
        close: false,
        position: "topRight",
        timeout: 5000,
        closeOnEscape: true,
        messageSize: 16,
        messageColor: "#fff",
        backgroundColor: "#ef4040",
        title: "Error",
        titleSize: 16,
        titleColor: "#fff",
        iconUrl: icon,
        iconColor: "#fff",
      });
      startButton.disabled = true;
      startButton.classList.remove("active");
      startButton.classList.add("inactive");
    } else {
      startButton.disabled = false;
      startButton.classList.remove("inactive");
      startButton.classList.add("active");
    }
  }

 
  const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose: onClose
  };
  flatpickr("#datetime-picker", options);

  function startTimer() {
    input.disabled = true;
    startButton.disabled = true;
    startButton.classList.remove("active");
    startButton.classList.add("inactive");

    const endDate = flatpickr.parseDate(input.value, "Y-m-d H:i");
    updateTimerDisplay(getTimeDifference(endDate));

    timerId = setInterval(() => {
      const time = getTimeDifference(endDate);
      if (time.days === 0 && time.hours === 0 && time.minutes === 0 && time.seconds === 0) {
        clearInterval(timerId);
        input.disabled = false;
        startButton.disabled = false;
        startButton.classList.remove("inactive");
        startButton.classList.add("active");
      } else {
        updateTimerDisplay(time);
      }
    }, 1000);
  }

  startButton.addEventListener("click", startTimer);
});





