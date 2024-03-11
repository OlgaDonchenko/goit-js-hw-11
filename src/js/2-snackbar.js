import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import iconFulfilled from "../img/bi_check.png";
import iconRejected from "../img/octagon.png";

const form = document.querySelector('form');
form.addEventListener('submit', handleFormSubmit);

function handleFormSubmit(event) {
    event.preventDefault();

    const { delay, state } = getFormData();

    const promise = createDelayPromise(delay, state);

    promise
        .then(handleFulfilledPromise)
        .catch(handleRejectedPromise)
        .finally(() => form.reset());
}

function getFormData() {
    const delayInput = document.querySelector('input[name="delay"]');
    const stateInput = document.querySelector('input[name="state"]:checked');

    const delay = delayInput.value;
    const state = stateInput.value;

    return { delay, state };
}

function createDelayPromise(delay, state) {
    return new Promise((resolve, reject) => {
        const timeoutFunction = state === 'fulfilled' ? resolve : reject;
        setTimeout(() => timeoutFunction(delay), delay);
    });
}

function handleFulfilledPromise(delay) {
    showNotification({
        message: `Fulfilled promise in ${delay}ms`,
        color: "#59a10d",
        iconUrl: iconFulfilled
    });
}

function handleRejectedPromise(delay) {
    showNotification({
        message: `Rejected promise in ${delay}ms`,
        color: "#ef4040",
        iconUrl: iconRejected
    });
}

function showNotification({ message, color, iconUrl }) {
    iziToast.show({
        message: message,
        timeout: 5000,
        close: true,
        position: "topRight",
        color: color,
        messageSize: 16,
        messageColor: "#fff",
        title: color === "#59a10d" ? "Ok" : "Error",
        titleSize: 16,
        titleColor: "#fff",
        iconUrl: iconUrl
    });
}