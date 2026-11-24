
const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");

const loginTab = document.getElementById("loginTab");
const registerTab = document.getElementById("registerTab");

const message = document.getElementById("message");

// Demo account (temporary memory only)
let registeredUser = null;

// Switch to Login
function showLogin() {
    loginForm.classList.remove("hidden");
    registerForm.classList.add("hidden");

    loginTab.classList.add("active");
    registerTab.classList.remove("active");

    message.textContent = "";
    message.className = "message";
}

// Switch to Registration
function showRegister() {
    registerForm.classList.remove("hidden");
    loginForm.classList.add("hidden");

    registerTab.classList.add("active");
    loginTab.classList.remove("active");

    message.textContent = "";
    message.className = "message";
}

loginTab.addEventListener("click", showLogin);
registerTab.addEventListener("click", showRegister);

document.getElementById("goRegister").addEventListener("click", (e) => {
    e.preventDefault();
    showRegister();
});

document.getElementById("goLogin").addEventListener("click", (e) => {
    e.preventDefault();
    showLogin();
});

// Show / Hide Password
document.querySelectorAll(".toggle-password").forEach(button => {
    button.addEventListener("click", () => {
        const input = document.getElementById(button.dataset.target);

        if (input.type === "password") {
            input.type = "text";
            button.textContent = "Hide";
        } else {
            input.type = "password";
            button.textContent = "Show";
        }
    });
});

// Registration
registerForm.addEventListener("submit", function(e) {
    e.preventDefault();

    const name = document.getElementById("fullName").value.trim();
    const email = document.getElementById("registerEmail").value.trim();
    const password = document.getElementById("registerPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (name.length < 2) {
        showMessage("Please enter a valid name.", "error");
        return;
    }

    if (password.length < 8) {
        showMessage("Password must be at least 8 characters.", "error");
        return;
    }

    if (password !== confirmPassword) {
        showMessage("Passwords do not match!", "error");
        return;
    }

    registeredUser = {
        name: name,
        email: email,
        password: password
    };

    showMessage("Account created successfully! Please login.", "success");

    registerForm.reset();

    setTimeout(() => {
        showLogin();
        document.getElementById("loginEmail").value = email;
    }, 1200);
});

// Login
loginForm.addEventListener("submit", function(e) {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value;

    if (!registeredUser) {
        showMessage("Please create an account first.", "error");
        return;
    }

    if (
        email === registeredUser.email &&
        password === registeredUser.password
    ) {
        showMessage(
            "Welcome, " + registeredUser.name + "! Login successful.",
            "success"
        );

        loginForm.reset();
    } else {
        showMessage("Invalid email or password.", "error");
    }
});

// Forgot Password
document.getElementById("forgotPassword").addEventListener("click", function(e) {
    e.preventDefault();

    showMessage(
        "Password recovery requires a verified email service.",
        "error"
    );
});

// Display messages
function showMessage(text, type) {
    message.textContent = text;
    message.className = "message " + type;
}
