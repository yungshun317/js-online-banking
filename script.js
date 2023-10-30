'use strict';

// [1] Website
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');
const header = document.querySelector('.header');
const allSections = document.querySelectorAll('.section');

// Modal window
const openModal = function (e) {
    e.preventDefault();
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
}

const closeModal = function (e) {
    e.preventDefault();
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
}

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
        closeModal();
    }
})

// Button scrolling
btnScrollTo.addEventListener('click', function (e) {
    const s1coords = section1.getBoundingClientRect();
    console.log(s1coords);
    /*
    DOMRect {x: 0, y: 2120.296875, width: 1927, height: 1234.6875, top: 2120.296875, …}
        bottom: 3354.984375
        height: 1234.6875
        left: 0
        right: 1927
        top: 2120.296875
        width: 1927
        x: 0
        y: 2120.296875
        [[Prototype]]: DOMRect
    */
    console.log(e.target.getBoundingClientRect());
    /*
    DOMRect {x: 465.171875, y: 819.046875, width: 110, height: 29, top: 819.046875, …}
        bottom: 848.046875
        height: 29
        left: 465.171875
        right: 575.171875
        top: 819.046875
        width: 110
        x: 465.171875
        y: 819.046875
        [[Prototype]]: DOMRect
    */
    // console.log('Current scroll (X/Y)', window.pageXOffset, window.pageYOffset);
    console.log('Current scroll (X/Y)', window.scrollX, window.scrollY);
    // Current scroll (X/Y) 0 0
    console.log('height/width viewport', document.documentElement.clientHeight, document.documentElement.clientWidth);
    // height/width viewport 1353 1927
    section1.scrollIntoView({ behavior: 'smooth' });
})

// Page navigation
/*
document.querySelectorAll('.nav__link').forEach(function (el) {
   el.addEventListener('click', function(e) {
      e.preventDefault();
      const id = this.getAttribute('href');
      console.log(id);
      document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
   });
});
 */
document.querySelector('.nav__links').addEventListener('click', function (e) {
    e.preventDefault();

    // Matching strategy
    if (e.target.classList.contains('nav__link')) {
        const id = e.target.getAttribute('href');
        document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
    }
});

// Tab component
tabsContainer.addEventListener('click', function (e) {
    const clicked = e.target.closest('.operations__tab');

    // Guard clause
    if (!clicked) return;

    // Remove active classes
    tabs.forEach(t => t.classList.remove('operations__tab--active'));
    tabsContent.forEach(c => c.classList.remove('operations__content--active'));

    // Activate tab
    clicked.classList.add('operations__tab--active');

    // Activate content area
    document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active');
});

// Menu fade animation
const handleHover = function (e) {
    if (e.target.classList.contains('nav__link')) {
        const link = e.target;
        const siblings = link.closest('.nav').querySelectorAll('.nav__link');
        const logo = link.closest('.nav').querySelector('img');

        siblings.forEach(el => {
            if (el !== link) el.style.opacity = this;
        });
        logo.style.opacity = this;
    }
};

// Pass arguments into handler
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

// Sticky navigation
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
    const [entry] = entries;
    console.log(entry);

    if (!entry.isIntersecting) nav.classList.add('sticky');
    else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
    root: null,
    threshold: 0,
    rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

// Reveal sections
const revealSection = function (entries, observer) {
    const [entry] = entries;
    console.log(entry);

    if (!entry.isIntersecting) return;

    entry.target.classList.remove('section--hidden');
    observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
    root: null,
    threshold: 0.15
})

allSections.forEach(function (section) {
    sectionObserver.observe(section);
    section.classList.add('section--hidden');
})

// [2] Online banking
// Data
const account1 = {
    owner: 'Joe Chang',
    movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
    interestRate: 1.2, // %
    pin: 1111,
    movementsDates: [
        "2019-11-18T21:31:17.178Z",
        "2019-12-23T07:42:02.383Z",
        "2020-01-28T09:15:04.904Z",
        "2020-04-01T10:17:24.185Z",
        "2020-05-08T14:11:59.604Z",
        "2020-07-26T17:01:17.194Z",
        "2020-07-28T23:36:17.929Z",
        "2020-08-01T10:51:36.790Z",
    ],
    currency: "TWD",
    locale: "zh-TW",
};

const account2 = {
    owner: 'Mai Shiranui',
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5,
    pin: 2222,
    movementsDates: [
        "2019-11-01T13:15:33.035Z",
        "2019-11-30T09:48:16.867Z",
        "2019-12-25T06:04:23.907Z",
        "2020-01-25T14:18:46.235Z",
        "2020-02-05T16:33:06.386Z",
        "2020-04-10T14:43:26.374Z",
        "2020-06-25T18:49:59.371Z",
        "2020-07-26T12:01:20.894Z",
    ],
    currency: "USD",
    locale: "en-US",
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
// const labelWelcome = document.querySelector('.welcome');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');
const labelDate = document.querySelector(".date");

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

// Functions
const formatMovementDate = function(date, locale) {
    const calcDaysPassed = (date1, date2) => Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

    const daysPassed = calcDaysPassed(new Date(), date);
    console.log(daysPassed);

    if (daysPassed === 0) return "Today";
    if (daysPassed === 1) return "Yesterday";
    if (daysPassed <= 7) return `${daysPassed} days ago`;

    /*
    const day = `${date.getDate()}`.padStart(2, 0);
    const month = `${date.getMonth() + 1}`.padStart(2, 0);
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
     */
    return new Intl.DateTimeFormat(locale).format(date);
};

const formatCur = function(value, locale, currency) {
    return new Intl.NumberFormat(locale, {
        style: "currency",
        currency: currency
    }).format(value);
};

const displayMovements = function(acc, sort = false) {
    containerMovements.innerHTML = '';

    const movs = sort ? acc.movements.slice().sort((a, b) => a - b) : acc.movements;

    movs.forEach(function(mov, i) {
       const type = mov > 0 ? 'deposit' : 'withdrawal';

       const date = new Date(acc.movementsDates[i]);
       const displayDate = formatMovementDate(date, acc.locale);

       const formattedMov = formatCur(mov, acc.locale, acc.currency);

       const html = `
           <div class="movements__row">
               <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
               <div class="movements__date">${displayDate}</div>
               <div class="movements__value">${formattedMov}</div>
           </div>    
       `;

       containerMovements.insertAdjacentHTML('afterbegin', html);
    });
};

const calcDisplayBalance = function(acc) {
    acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
    labelBalance.textContent = formatCur(acc.balance, acc.locale, acc.currency);
};

const calcDisplaySummary = function(acc) {
    const incomes = acc.movements
        .filter(mov => mov > 0)
        .reduce((acc, mov) => acc + mov, 0);
    labelSumIn.textContent = formatCur(incomes, acc.locale, acc.currency);

    const out = acc.movements
        .filter(mov => mov < 0)
        .reduce((acc, mov) => acc + mov, 0);
    labelSumOut.textContent = formatCur(Math.abs(out), acc.locale, acc.currency);

    const interest = acc.movements
        .filter(mov => mov > 0)
        .map(deposit => (deposit * acc.interestRate) / 100)
        .filter((int, i, arr) => {
            // console.log(arr);
            return int >= 1;
        })
        .reduce((acc, int) => acc + int, 0);
    labelSumInterest.textContent = formatCur(interest, acc.locale, acc.currency);
};

const createUsernames = function(accs) {
    accs.forEach(function(acc) {
       acc.username = acc.owner
           .toLowerCase()
           .split(' ')
           .map(name => name[0])
           .join('');
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
    displayMovements(acc);

    // Display balance
    calcDisplayBalance(acc);

    // Display summary
    calcDisplaySummary(acc);
};

const startLogOutTimer = function() {
    const tick = function() {
        const min = String(Math.trunc(time / 60)).padStart(2, 0);
        const sec = String(time % 60).padStart(2, 0);

        // In each call, print the remaining time to UI
        labelTimer.textContent = `${min}:${sec}`;

        // When 0 seconds, stop timer and log out user
        if (time === 0) {
            clearInterval(timer);
            // labelWelcome.textContent = "Log in to get started";
            containerApp.style.display = 'none';
            setTimeout(function() { containerApp.style.opacity = 0; }, 100);
        }

        // Decrease 1s
        time--;
    }

    // Set time to 5 minutes
    let time = 120;

    // Call the timer every second
    tick();
    const timer = setInterval(tick, 1000);

    return timer;
}

// Event handlers
let currentAccount, timer;

btnLogin.addEventListener('click', function(e) {
    // Prevent form from submitting
    e.preventDefault();

    currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value);
    console.log(currentAccount);
    /*
    Object
        balance: 3840
        interestRate: 1.2
        movements: (8) [200, 450, -400, 3000, -650, -130, 70, 1300]
        owner: "Joe Chang"
        pin: 1111
        username: "jc"
        [[Prototype]]: Object
     */

    if (currentAccount?.pin === Number(inputLoginPin.value)) {
        // Display UI & message
        // labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(' ')[0]}`;

        containerApp.style.display = 'grid';
        setTimeout(function() { containerApp.style.opacity = 100; }, 100);

        // Create current date and time
        const now = new Date();
        const options = {
            hour: "numeric",
            minute: "numeric",
            day: "numeric",
            month: "numeric",
            year: "numeric",
            // weekday: "long"
        };
        // const locale = navigator.language;
        // console.log(locale);

        labelDate.textContent = new Intl.DateTimeFormat(currentAccount.locale, options).format(now);

        // const day = `${now.getDate()}`.padStart(2, 0);
        // const month = `${now.getMonth() + 1}`.padStart(2, 0);
        // const year = now.getFullYear();
        // const hour = `${now.getHours()}`.padStart(2, 0);
        // const min = `${now.getMinutes()}`.padStart(2, 0);
        // labelDate.textContent = `${day}/${month}/${year}, ${hour}:${min}`;

        // Clear input fields
        inputLoginUsername.value = inputLoginPin.value = '';
        inputLoginPin.blur();

        // Timer
        if (timer) clearInterval(timer);
        timer = startLogOutTimer();

        // Update UI
        updateUI(currentAccount);
    }
});

btnTransfer.addEventListener('click', function(e) {
    e.preventDefault();
    const amount = Number(inputTransferAmount.value);
    const receiverAcc = accounts.find(acc => acc.username === inputTransferTo.value);
    inputTransferAmount.value = inputTransferTo.value = '';

    if (amount > 0 &&
        receiverAcc &&
        currentAccount.balance >= amount &&
        receiverAcc?.username !== currentAccount.username) {
        // Do the transfer
        currentAccount.movements.push(-amount);
        receiverAcc.movements.push(amount);

        // Add transfer date
        currentAccount.movementsDates.push(new Date().toISOString());
        receiverAcc.movementsDates.push(new Date().toISOString());

        // Update UI
        updateUI(currentAccount);

        // Reset timer
        clearInterval(timer);
        timer = startLogOutTimer();
    }
});

btnLoan.addEventListener('click', function(e) {
    e.preventDefault();

    const amount = Number(inputLoanAmount.value);

    if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
        setTimeout(function() {
            // Add movement
            currentAccount.movements.push(amount);

            // Add loan date
            currentAccount.movementsDates.push(new Date().toISOString());

            // Update UI
            updateUI(currentAccount);

            // Reset timer
            clearInterval(timer);
            timer = startLogOutTimer();
        }, 2500);
    }
    inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function(e) {
    e.preventDefault();

    if (inputCloseUsername.value === currentAccount.username && Number(inputClosePin.value) === currentAccount.pin) {
        const index = accounts.findIndex(
            acc => acc.username === currentAccount.username
        );
        console.log(index);

        // Delete account
        accounts.splice(index, 1);

        // Hide UI
        containerApp.style.display = 'none';
        setTimeout(function() { containerApp.style.opacity = 0; }, 100);
    }

    inputCloseUsername.value = inputClosePin.value = '';
})

let sorted = false;
btnSort.addEventListener('click', function(e) {
   e.preventDefault();
   displayMovements(currentAccount, !sorted);
   sorted = !sorted;
});
