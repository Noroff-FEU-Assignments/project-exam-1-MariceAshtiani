const form = document.querySelector("#contactform");

const name = document.querySelector("#name");
const nameError = document.querySelector("#nameError");

const email = document.querySelector("#email");
const emailError = document.querySelector("#emailError");

const subject = document.querySelector("#subject");
const subjectError = document.querySelector("#subjectError");

const message = document.querySelector("#message");
const messageError = document.querySelector("#messageError");

function validateForm() {
    event.preventDefault();

    if (checkLength(name.value, 3) === true) {
        nameError.style.display = "none";
    } else {
        nameError.style.display ="block";
    }

    if (validateEmail(email.value) === true) {
        emailError.style.display = "none";
    } else {
        emailError.style.display = "block";
    }

    if (checkLength(subject.value, 14) === true) {
        subjectError.style.display = "none";
    } else {
        subjectError.style.display = "block";
    }

    if (checkLength(message.value, 24) === true) {
        messageError.style.display = "none";
    } else {
        messageError.style.display = "block";
    }
}

form.addEventListener("submit", validateForm)

function checkLength(value, len) {
    if (value.trim().length > len) {
        return true;
    } else {
        return false;
    }
}

function validateEmail(email) {
    const regEx = /\S+@\S+\.\S+/;
    const patternMatch = regEx.test(email);
    return patternMatch;
}