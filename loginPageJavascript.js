function togglePasswordVisibility(passwordId, iconId) {
  var passwordInput = document.getElementById(passwordId);
  var icon = document.getElementById(iconId);

  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    icon.className = "bx bx-lock-open-alt icon";
  } else {
    passwordInput.type = "password";
    icon.className = "bx bx-lock-alt icon";
  }
}

function validateName() {
  var name = document.getElementById("name").value;
  var errorContainer = document.getElementById("name-error");

  if (name.length === 0) {
    errorContainer.textContent = "Name is required";
  } else {
    errorContainer.textContent = ""; // Clear the error message
  }
}

// JavaScript function for real-time email validation
function validateEmail() {
  var email = document.getElementById("email").value;
  var errorContainer = document.getElementById("email-error");

  if (email.length === 0) {
    errorContainer.textContent = "Email is required";
  } else if (!/^\S+@\S+\.\S+$/.test(email)) {
    errorContainer.textContent = "Invalid email format";
  } else {
    errorContainer.textContent = ""; // Clear the error message
  }
}

// JavaScript function for real-time password validation
function validatePassword() {
  var password = document.getElementById("password").value;
  var errorContainer = document.getElementById("password-error");

  if (password.length < 8 || password.length > 20 || !/\d/.test(password)) {
    errorContainer.textContent =
      "Password must be 8-20 characters and include at least one number";
  } else {
    errorContainer.textContent = ""; // Clear the error message
  }
}

// JavaScript function for real-time confirm password validation
function validateconfirmpassword() {
  var confirmpassword = document.getElementById("confirmpassword").value;
  var password = document.getElementById("password").value;
  var errorContainer = document.getElementById("confirmpassword-error");

  if (confirmpassword !== password) {
    errorContainer.textContent = "Passwords do not match";
  } else {
    errorContainer.textContent = ""; // Clear the error message
  }
}

// Add event listeners for real-time validation
document.getElementById("name").addEventListener("input", validateName);
document.getElementById("email").addEventListener("input", validateEmail);
document.getElementById("password").addEventListener("input", validatePassword);
document
  .getElementById("confirmpassword")
  .addEventListener("input", validateconfirmpassword);
