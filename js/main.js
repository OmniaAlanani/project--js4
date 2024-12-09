let users = JSON.parse(localStorage.getItem('users')) || [];

// Function to validate email
function isValidEmail(email) {
    let re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

// Register user
function register() {
    let name = document.getElementById('signupName').value;
    let email = document.getElementById('signupEmail').value;
    let password = document.getElementById('signupPassword').value;
    let incorrect = document.getElementById('incorrect');

    if (!isValidEmail(email)) {
        incorrect.textContent = 'Invalid email format.';
        return;
    }

    let emailExists = users.some(user => user.email === email);
    if (emailExists) {
        incorrect.textContent = 'Email already exists. Please use a different email.';
        return;
    }

    users.push({ name, email, password });
    localStorage.setItem('users', JSON.stringify(users));
    alert('Registration successful! Redirecting to login...');
    window.location.href = 'index.html';
}

// Login user
function login() {
    let email = document.getElementById('signinEmail').value;
    let password = document.getElementById('signinPassword').value;
    let incorrect = document.getElementById('incorrect');

    let user = users.find(user => user.email === email && user.password === password);

    if (user) {
        localStorage.setItem('loggedInUser', JSON.stringify(user));
        alert(`Welcome, ${user.name}!`); // Display welcome message
        window.location.href = 'home.html';
    } else {
        incorrect.textContent = 'Incorrect email or password.';
    }
}

// Handle logout
function logout() {
    localStorage.removeItem('loggedInUser');
    window.location.href = 'index.html';
}

// Display welcome message on home page
function displayHome() {
    let user = JSON.parse(localStorage.getItem('loggedInUser'));
    if (!user) {
        window.location.href = 'index.html';
        return;
    }
    document.querySelector('#home h1').textContent = `Welcome, ${user.name}!`;
}

// Ensure the home page displays the message
document.addEventListener('DOMContentLoaded', displayHome);
