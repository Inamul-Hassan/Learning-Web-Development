'use strict';

// Defining variables

const displayScore0 = document.querySelector('#score--0');
const displayScore1 = document.querySelector('#score--1');
const currentScore0 = document.querySelector('#current--0');
const currentScore1 = document.querySelector('#current--1');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

const dice = document.querySelector('.dice');

let currentScoreValue = 0;
let playing = true;

const activePlayer = {
  player: player0,
  displayScore: displayScore0,
  currentScore: currentScore0,
};

const displayScore = function () {
  activePlayer.currentScore.textContent = currentScoreValue;
};

const changePlayer = function () {
  if (activePlayer.player === player0) {
    activePlayer.player.classList.remove('player--active');
    activePlayer.player = player1;
    activePlayer.displayScore = displayScore1;
    activePlayer.currentScore = currentScore1;
    activePlayer.player.classList.add('player--active');
  } else {
    activePlayer.player.classList.remove('player--active');
    activePlayer.player = player0;
    activePlayer.displayScore = displayScore0;
    activePlayer.currentScore = currentScore0;
    activePlayer.player.classList.add('player--active');
  }
};
// Reset the games
// Makes more sense to declare everything in HTML at the initial state.

// displayScore0.textContent = 0;
// displayScore1.textContent = 0;
// dice.classList.add('hidden');

// Roll the dice

btnRoll.addEventListener('click', function () {
  if (playing) {
    // Generate Dice Value
    let diceValue = Math.trunc(Math.random() * 6) + 1;

    //Display Dice
    dice.src = `assets/dice-${diceValue}.png`;
    dice.classList.remove('hidden');

    // Game Logic
    if (diceValue !== 1) {
      currentScoreValue += diceValue;
      displayScore();
    } else {
      currentScoreValue = 0;
      activePlayer.currentScore.textContent = currentScoreValue;
      changePlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  // Upating Display Value
  if (playing) {
    let displayValue = Number(activePlayer.displayScore.textContent);
    displayValue += Number(activePlayer.currentScore.textContent);
    activePlayer.displayScore.textContent = displayValue;

    //Hiding Dice
    //dice.classList.add('hidden');

    //Win or Player Change Logic
    if (displayValue >= 20) {
      //pass
      playing = false;
      activePlayer.player.classList.add('player--winner');
      //   activePlayer.player.classList.toggle('player--active');
    } else {
      activePlayer.currentScore.textContent = 0;
      currentScoreValue = 0;
      changePlayer();
    }
  }
});

btnNew.addEventListener('click', function () {
  // Reset Active Player
  if (!player0.classList.contains('player--active')) {
    // player0.classList.add('player--active');
    // player1.classList.remove('player--active');
    activePlayer.player.classList.remove('player--winner');
    changePlayer();
  }
  // Hiding Dice
  dice.classList.add('hidden');

  // Score Reset
  displayScore0.textContent = 0;
  displayScore1.textContent = 0;
  currentScore0.textContent = 0;
  currentScore1.textContent = 0;
});

/*
/// Take Away ///
Always try to handle variables in javascript, 
dont read from front end, just display the results in front end.

Always try to minimize the code, 
but make sure readability of the code is maintianed

Its not mandatory to declare/define all the neccessary 
DOM at the beggining. More often than not,
you might need to use them directly inside the code.s
*/
