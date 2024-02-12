// public/passwordValidationScript.js

document.addEventListener('DOMContentLoaded', function () {
    const emailInput = document.getElementById("email");
    const myInput = document.getElementById("psw");
    const emailError = document.getElementById("emailError");
    const passwordError = document.getElementById("passwordError");
    const letter = document.getElementById("letter");
    const capital = document.getElementById("capital");
    const number = document.getElementById("number");
    const special = document.getElementById("special");
    const length = document.getElementById("length");
    const messageBox = document.getElementById("message");
    const submitButton = document.getElementById("submitBtn");

    myInput.addEventListener('focus', function () {
        messageBox.style.display = "block";
    });

    myInput.addEventListener('blur', function () {
        messageBox.style.display = "none";
    });

    myInput.addEventListener('input', function () {
        // Validate lowercase letters
        const lowerCaseLetters = /[a-z]/g;
        if (myInput.value.match(lowerCaseLetters)) {
            letter.classList.remove("invalid");
            letter.classList.add("valid");
        } else {
            letter.classList.remove("valid");
            letter.classList.add("invalid");
        }

        // Validate capital letters
        const upperCaseLetters = /[A-Z]/g;
        if (myInput.value.match(upperCaseLetters)) {
            capital.classList.remove("invalid");
            capital.classList.add("valid");
        } else {
            capital.classList.remove("valid");
            capital.classList.add("invalid");
        }

        // Validate numbers
        const numbers = /[0-9]/g;
        if (myInput.value.match(numbers)) {
            number.classList.remove("invalid");
            number.classList.add("valid");
        } else {
            number.classList.remove("valid");
            number.classList.add("invalid");
        }

        // Validate special characters
        const specialCharacters = /[!@#$%^&*(),.?":{}|<>]/g;
        if (myInput.value.match(specialCharacters)) {
            special.classList.remove("invalid");
            special.classList.add("valid");
        } else {
            special.classList.remove("valid");
            special.classList.add("invalid");
        }

        // Validate length
        if (myInput.value.length >= 8) {
            length.classList.remove("invalid");
            length.classList.add("valid");
        } else {
            length.classList.remove("valid");
            length.classList.add("invalid");
        }

        // Disable submit button if either email or password is invalid
        const isEmailValid = validateEmail(emailInput.value.trim());
        const isPasswordValid = validatePassword(myInput.value);
        submitButton.disabled = !isEmailValid || !isPasswordValid;
    });

    // Validate the email field
    emailInput.addEventListener('input', function () {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailInput.value.trim() === "") {
            emailError.textContent = "Email cannot be empty.";
        } else if (emailRegex.test(emailInput.value)) {
            emailError.textContent = "Valid Email Address";
            emailInput.classList.remove("invalid");
            emailInput.classList.add("valid");
        } else {
            emailInput.classList.add("invalid");
            emailInput.classList.remove("valid");
            emailError.textContent = "Invalid email address.";
        }

    });


    const validateAndSubmit = async () => {
        const email = emailInput.value.trim();
        const password = myInput.value;


        const isEmailValid = validateEmail(email);
        const isPasswordValid = validatePassword(password);


        if (!isEmailValid) {
            emailError.textContent = "Invalid email address.";
        } else {
            emailError.textContent = "valid email address";
        }


        if (!isPasswordValid) {
            passwordError.textContent = "Invalid password.";
        } else {
            passwordError.textContent = "valid password";
        }

        // If both email and password are valid, submit the form
        if (isEmailValid && isPasswordValid) {

            const formData = {
                email,
                password,
            };

            try {
                const response = await fetch('http://localhost:8080/submitFormData', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });

                // Handle the server response
                const result = await response.json();

                alert(result.message);
            } catch (error) {
                alert("Error submitting data. Please try again later.");
                console.error(error);
            }
        }
        else{
            alert('Please Enter Data');
        }
    };

    // Attach the validateAndSubmit function to the click event of the submit button
    submitButton.addEventListener("click", validateAndSubmit);
});

// Function to validate email format
const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};


const validatePassword = (password) => {
    // Validate lowercase letters
    const lowerCaseLetters = /[a-z]/g;

    // Validate capital letters
    const upperCaseLetters = /[A-Z]/g;

    // Validate numbers
    const numbers = /[0-9]/g;

    // Validate special characters
    const specialCharacters = /[!@#$%^&*(),.?":{}|<>]/g;

    // Validate length
    const minLength = password.length >= 8;

    return (
        password.match(lowerCaseLetters) &&
        password.match(upperCaseLetters) &&
        password.match(numbers) &&
        password.match(specialCharacters) &&
        minLength
    );
};
