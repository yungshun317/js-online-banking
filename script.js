'use strict';

// Data

// Elements
const labelWelcome = document.querySelector('.welcome');

const containerApp = document.querySelector('.app');

const btnLogin = document.querySelector('.login__btn');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');


// Event handlers
let currentAccount;

btnLogin.addEventListener('click', function(e) {
    // Prevent form from submitting
    e.preventDefault();

    currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value);
    console.log(currentAccount);

    if (currentAccount?.pin === Number(inputLoginPin.value)) {
        // Display UI & message
        labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(' ')[0]}`;
        containerApp.style.opacity = 100;

        // Clear input fields
        inputLoginUsername.value = inputLoginPin.value = '';
        inputLoginPin.blur();

        // Update UI
        updateUI(currentAccount);
    }
});