'use strict';

// Data
const account1 = {
    owner: 'Joe Chang',
    movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
    interestRate: 1.2, // %
    pin: 1111,
};

const account2 = {
    owner: 'Mai Shiranui',
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5,
    pin: 2222,
};

const account3 = {
    owner: 'Kula Diamond',
    movements: [200, -200, 340, -300, -20, 50, 400, -460],
    interestRate: 0.7,
    pin: 3333,
};

const account4 = {
    owner: 'Morrigan Aensland',
    movements: [430, 1000, 700, 50, 90],
    interestRate: 1,
    pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');

// Functions
const displayMovements = function(movements, sort = false) {
    containerMovements.innerHTML = '';

    const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

    movs.forEach(function(mov, i) {
       const type = mov > 0 ? 'deposit' : 'withdrawal';

       const html = `
           <div class="movements__row">
               <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
               <div class="movements__value">${mov}€</div>
           </div>    
       `;

       containerMovements.insertAdjacentHTML('afterbegin', html);
    });
};

const calcDisplayBalance = function(acc) {
    acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
    labelBalance.textContent = `${acc.balance}€`;
};

const calcDisplaySummary = function(acc) {

};

const createUsernames = function(accs) {
    accs.forEach(function(acc) {
       acc.username = acc.owner.toLowerCase().split(' ').map(name => name[0]).join('');
    });
    console.log(accs);
    /*
    (4) [{...}, {...}, {...}, {...}]
        0: {owner: 'Joe Chang', movements: Array(8), interestRate: 1.2, pin: 1111, username: 'jc'}
        1: {owner: 'Mai Shiranui', movements: Array(8), interestRate: 1.5, pin: 2222, username: 'ms'}
        2: {owner: 'Kula Diamond', movements: Array(8), interestRate: 0.7, pin: 3333, username: 'kd'}
        3: {owner: 'Morrigan Aensland', movements: Array(5), interestRate: 1, pin: 4444, username: 'ma'}
        length: 4
        [[Prototype]]: Array(0)
     */
};
createUsernames(accounts);

const updateUI = function(acc) {
    // Display movements
    displayMovements(acc.movements);

    // Display balance
    calcDisplayBalance(acc);

    // Display summary
    calcDisplaySummary(acc);
};

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