function setupFormToggle() {
    const buttons = document.querySelectorAll(".bottom .btn");
    const sections = document.querySelectorAll(".form"); 
    function activateButton(button) {
        buttons.forEach((btn) => btn.classList.remove("active"));
        button.classList.add("active");
    }
    function activateSection(section) {
        sections.forEach((sec) => sec.classList.remove("active"));
        section.classList.add("active");
    }
    function handleClick(event) {
        const button = event.currentTarget;
        const targetSectionClass = button.dataset.btn;
        activateButton(button);
        const targetSection = document.querySelector(`.${targetSectionClass}`);
        activateSection(targetSection);
    }
    buttons.forEach((button) => {
        button.addEventListener("click", handleClick);
    });
}

document.addEventListener("DOMContentLoaded", setupFormToggle); 

document.addEventListener("DOMContentLoaded", function () {
    const passwordInput = document.getElementById("password");
    const passwordToggle = document.getElementById("passwordToggle");
    const passwordIcon = passwordToggle.querySelector("i");

    passwordToggle.addEventListener("click", function () {
        const isPasswordVisible = passwordInput.type === "text";

        passwordInput.type = isPasswordVisible ? "password" : "text";
        passwordIcon.classList.toggle("fa-eye", !isPasswordVisible);
        passwordIcon.classList.toggle("fa-eye-slash", isPasswordVisible);
    }); 
});

function getActiveSection() {
    return document.querySelector(".form.active");
}

function getActiveInputs() {
    const activeForm = getActiveSection();
    return activeForm ? activeForm.querySelectorAll("input") : [];
}

function validateField(input) {
    const fieldName = input.id;
    const value = input.value.trim();

    if (value === "") {
        showError(fieldName, `&{fieldName} cannot be empty`);
    } else {
         hideError(fieldName);
    }

    if (fieldName === "email" || fieldName === "emailLogin") {
        validateEmailFormat(fieldName, value);
    }

    if (fieldName === "firstName") {
        validateNomEmptyField(fieldName, "First Name");
    }

    if (fieldName === "lastName") {
        validateNomEmptyField(fieldName, "Last Name");
    }

    if(fieldName === "phoneNumber") {
        validateNomEmptyField(fieldName, "Phone Number");
    }

    if(fieldName === "passwordLogin") {
        validateNomEmptyField(fieldName, "Password");
    }


}

function validateNomEmptyField(fieldName, displayName) {
    const value = document.getElementById(fieldName).value.trim();
    if (value === ""){
        showError(fieldName, `${displayName} cannot be empty`);
    } else {
        hideError(fieldName);
    }
}

function validateEmailFormat(fieldName, email) {
    const emailRegex = /^[^\s@]+@[^\s@\+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showError(fieldName, "Invalid email format");
    } else {
        hideError(fieldName);
    }
}

function validatePassword() {
    const password = document.getElementById("password").value;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[-_@$!%*?&])[A-Za-z\d\-_@$!%*?&]{8,}$/;
    if(!passwordRegex.test(password)) {
        showError("password", "Password must meet certain criteria (uppercase, lowercase, special characters and numbers)");
    } else {
        hideError("password");
    }
}

function validateConfirmPassword() {
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (confirmPassword === "") {
        showError("confirmPassword", "Confirm Password cannot be empty");
    } else if (password !== confirmPassword) {
        showError("confirmPassword", "passwords do not match");
    } else {
        hideError("confirmPassword");
    }
}

function validatePhoneNumber() {
    const phoneNumber = document.getElementById("phoneNumber").value;
    const phoneNumberRegex = /^(?:\+?\d{2,3}\s?)?(?:\d{2,4}\s?)?\d{6,8}$/;

    if (!phoneNumberRegex.test(phoneNumber)) {
        showError("phoneNumber", "Invalid phone number format. Enter a valid phone number.");
    } else {
        hideError("phoneNumber");
    }
}

function showError(field, message) {
    const errorElement = document.getElementById(`${field}Error`);
    errorElement.innerHTML = message;
    errorElement.style.display = "block";

    const inputElement = document.getElementById(field);
    inputElement.classList.add("error-input");
}

function hideError(field) {
    const errorElement = document.getElementById(`${field}Error`);
    errorElement.style.display = "none";

    const inputElement = document.getElementById(field);
    inputElement.classList.remove("error-input");
}

function validateActiveForm() {
    const activeFormInputs = getActiveInputs();
    activeFormInputs.forEach(validateField);
    if(getActiveSection().classList.contains("sign-up")) {
        validatePassword();
        validateConfirmPassword();
        validatePhoneNumber();
    }
}

function handleSignUp(event) {
    event.preventDefault();
    validateActiveForm();
    const errorMessage = document.querySelectorAll(".error-message");
    for (const message of errorMessage) {
        if (message.style.display === "block") {
            event.preventDefault();
        }
    }

    if (getActiveSection().classList.contains("sign-up")) {
        console.log("check Email if exist");
    } else if (getActiveSection().classList.contains("sign-in")) {
        console.log("Handle sign in");
    }

}

const signUpForm = document.querySelector(".form.sign-up");
const signInForm = document.querySelector(".form.sign-in");

signUpForm.addEventListener("submit", handleSignUp);

const signUpInputs = signUpForm.querySelectorAll("input");
signUpInputs.forEach((input) => {
    input.addEventListener("blur", () => {
        validateField(input);
        if(signUpForm.classList.contains("active") && input.id === "password") {
            validatePassword();
        } else if (signUpForm.classList.contains("active") && input.id === "confirmPassword"){
            validateConfirmPassword();
        }
    })
})