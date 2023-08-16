"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");

const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

// Display Movements
const displayMovements = function (movements, sort = false) {
  // Empty the movements container
  containerMovements.innerHTML = "";

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  // Add each movement as a row
  movs.forEach(function (mov, i) {
    const type = mov > 0 ? "deposit" : "withdrawal";

    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>

      <div class="movements__value">${mov}€</div>
    </div>
    `;
    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

// Display the account balance
const calcDisplayBalance = function (account) {
  account.balance = account.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${account.balance} €`;
};

// Display summary
const calcDisplaySummary = function (account) {
  const income = account.movements
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${income}€`;

  const expenditure = account.movements
    .filter((mov) => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(expenditure)}€`;

  const interest = account.movements
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => {
      const int = (mov * account.interestRate) / 100; // (mov*1.2)/100
      if (int >= 1) {
        return acc + int;
      } else {
        return acc;
      }
    }, 0);
  labelSumInterest.textContent = `${interest}€`;
};

// Create username for each accounts
const createUsernames = function (accounts) {
  accounts.forEach(function (account) {
    account.username = account.owner
      .toLowerCase()
      .split(" ")
      .map((name) => name[0])
      .join("");
  });
};
createUsernames(accounts);

// Login Functionality
let currentAccount;

const clearUsernamePin = function () {
  inputLoginUsername.value = inputLoginPin.value = "";
  inputLoginPin.blur();
};

const updateUI = function (account) {
  // Display Movements
  displayMovements(account.movements);

  // Display Summary
  calcDisplaySummary(account);

  // Display Account Balance
  calcDisplayBalance(account);
};

btnLogin.addEventListener("click", function (event) {
  // Prevent default behaviour of the form element
  event.preventDefault();
  // If find method is uable to find the username it will return undefined
  currentAccount = accounts.find(
    (acc) => acc.username === inputLoginUsername.value
  );
  // If the currentAccount is undefined this will be short circuitted (optional chaining)
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display Welcome message
    clearUsernamePin();
    labelWelcome.textContent = `Welcome back ${
      currentAccount.owner.split(" ")[0]
    }!`;

    // Display UI
    containerApp.style.opacity = 100;

    //Update UI
    updateUI(currentAccount);
  } else {
    clearUsernamePin();
    alert("Invalid Username/Password!");
  }
});

// Amount transfer between accounts
btnTransfer.addEventListener("click", function (event) {
  event.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    (acc) => acc.username === inputTransferTo.value
  );
  // Condition of a valid transfer
  if (
    amount > 0 &&
    currentAccount.balance >= amount &&
    receiverAcc &&
    receiverAcc.username !== currentAccount.username
  ) {
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    //Update UI
    updateUI(currentAccount);
  }
  inputTransferTo.value = inputTransferAmount.value = 0;
  //console.log(receiverAcc, amount);
});

//btnLogin.setAttribute('disabled', 'disabled');
//btnLogin.style.cursor = 'default';

// Close user account

btnClose.addEventListener("click", function (event) {
  event.preventDefault();
  if (
    currentAccount.username === inputCloseUsername.value &&
    currentAccount.pin === Number(inputClosePin.value)
  ) {
    const index = accounts.findIndex(function (account) {
      account.username === currentAccount.username;
    });

    // Remove account
    accounts.splice(index, 1);
    containerApp.style.opacity = 0;
  }
  inputCloseUsername = inputClosePin = "";
});

// Requesting Loan

btnLoan.addEventListener("click", function (event) {
  event.preventDefault();
  const amount = Number(inputLoanAmount.value);
  if (
    amount > 0 &&
    currentAccount.movements.some((mov) => mov >= amount * 0.1)
  ) {
    currentAccount.movements.push(amount);
    updateUI(currentAccount);
  }
  inputLoanAmount.value = "";
});

// Sorting
let sorted = false;
btnSort.addEventListener("click", function (event) {
  event.preventDefault();
  sorted = !sorted;
  displayMovements(currentAccount.movements, sorted);
});
