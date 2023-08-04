'use strict';
// console.log(document.querySelector('.number').textContent);

// document.querySelector('.number').textContent = 1;

// console.log(document.querySelector('.score').textContent);
// document.querySelector('.guess').value = 10;

// console.log(typeof document.querySelector('.guess').value);
// if (document.querySelector('.guess').value === '10') {
//   console.log('hi');
//   document.querySelector('.guess').value = 69;
// }

// console.log(document.querySelector('.guess').value);

/* ----- GAME LOGIC -----
We randomly generate a Number
user inputs a number and clicks on check
we compare the userinput with our number
3 possible outcomes
> theNumber and guess matches (display winner messeage)
> guess is larger than theNumber (display the same)
> guess is smaller than theNumber (display the same)

user click again! button everything resets
*/

let theNumber = Math.trunc(Math.random() * 20) + 1;
//document.querySelector('.number').textContent = theNumber;
let score = 20;
let highscore = 0;
let history = [];

document.querySelector('.check').addEventListener('click', function () {
  let guess = Number(document.querySelector('.guess').value);

  if (!guess) {
    document.querySelector('.message').textContent = 'Invalid Input ❌';
  } else if (guess === theNumber) {
    document.querySelector('.message').textContent = 'Correct! 🎉';
    document.querySelector('body').style.backgroundColor = '#60b347';
    document.querySelector('.number').style.width = '30rem';
    document.querySelector('.number').textContent = theNumber;
    if (score > highscore) {
      highscore = score;
      document.querySelector('.highscore').textContent = highscore;
    }
  } else if (guess !== theNumber) {
    if (score >= 1) {
      document.querySelector('.message').textContent =
        guess > theNumber ? 'Too High!👇' : 'Too low!👆';
      score -= 1;
    } else {
      document.querySelector('.message').textContent = 'You Lost the Game!';
    }
  }
  document.querySelector('.score').textContent = score;

  //For Debugging
  history.push(guess);
  console.log(history);
});

document.querySelector('.again').addEventListener('click', function () {
  theNumber = Math.trunc(Math.random() * 20) + 1;
  score = 20;
  history = [];
  document.querySelector('.guess').value = '';
  document.querySelector('.score').textContent = score;
  document.querySelector('.message').textContent = 'Start guessing...';
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
  document.querySelector('.number').textContent = '?';
});
