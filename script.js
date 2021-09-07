import { startConfetti, stopConfetti, removeConfetti } from './confetti.js';

const playerScoreEl = document.getElementById('playerScore');
const playerChoiceEl = document.getElementById('playerChoice');
const computerScoreEl = document.getElementById('computerScore');
const computerChoiceEl = document.getElementById('computerChoice');
const resultText = document.getElementById('resultText');
const resultText2 = document.getElementById('resultText2');

const playerRock = document.getElementById('playerRock');
const playerPaper = document.getElementById('playerPaper');
const playerScissors = document.getElementById('playerScissors');
const playerLizard = document.getElementById('playerLizard');
const playerSpock = document.getElementById('playerSpock');

const computerRock = document.getElementById('computerRock');
const computerPaper = document.getElementById('computerPaper');
const computerScissors = document.getElementById('computerScissors');
const computerLizard = document.getElementById('computerLizard');
const computerSpock = document.getElementById('computerSpock');

const allGameIcon = document.querySelectorAll('.far');

const chunLi = document.getElementById('chun-li');
const colorGirl = document.getElementById('color-girl');

const hitSound = new Audio('sounds/click2.mp3');
const lossSound = new Audio('sounds/aww.mp3');
const lossSound2 = new Audio('sounds/aww2.mp3');
const winSound = new Audio('sounds/cash.mp3');
const fiftyWinSound = new Audio('sounds/50win.mp3');
const hundredWinSound = new Audio('sounds/100win.mp3');

const choices = {
  rock: { name: 'Rock', defeats: ['scissors', 'lizard'] },
  paper: { name: 'Paper', defeats: ['rock', 'spock'] },
  scissors: { name: 'Scissors', defeats: ['paper', 'lizard'] },
  lizard: { name: 'Lizard', defeats: ['paper', 'spock'] },
  spock: { name: 'Spock', defeats: ['scissors', 'rock'] },
};

let playerScoreNumber = 0;
let computerScoreNumber = 0;
let computerChoice = '';

// reset all selected icons
function resetSelected() {
  allGameIcon.forEach(icon => {
    icon.classList.remove('selected');
  });
  stopConfetti();
  removeConfetti();
  chunLi.style.visibility = 'hidden';
  colorGirl.style.visibility = 'hidden';
}

// reset score & playerChoice/computerChoice
function resetAll() {
  playerScoreNumber = 0;
  computerScoreNumber = 0;
  playerScoreEl.textContent = playerScoreNumber;
  computerScoreEl.textContent = computerScoreNumber;
  playerChoiceEl.textContent = '';
  computerChoiceEl.textContent = '';
  resultText.textContent = '';
  resultText2.textContent = '';
  chunLi.style.visibility = 'hidden';
  colorGirl.style.visibility = 'hidden';
  resetSelected();
}
window.resetAll = resetAll;

//random computer choice
function computerRandomChoice() {
  const computerChoiceNumber = Math.random();
  if (computerChoiceNumber < 0.2) {
    computerChoice = 'rock';
  } else if (computerChoiceNumber <= 0.4) {
    computerChoice = 'paper';
  } else if (computerChoiceNumber <= 0.6) {
    computerChoice = 'scissors';
  } else if (computerChoiceNumber <= 0.8) {
    computerChoice = 'lizard';
  } else {
    computerChoice = 'spock';
  }
}

function displayComputerChoice() {
  switch (computerChoice) {
    case 'rock':
      computerRock.classList.add('selected');
      computerChoiceEl.textContent = ' --- Rock';
      break;
    case 'paper':
      computerPaper.classList.add('selected');
      computerChoiceEl.textContent = ' --- Paper';
      break;
    case 'scissors':
      computerScissors.classList.add('selected');
      computerChoiceEl.textContent = ' --- Scissors';
      break;
    case 'lizard':
      computerLizard.classList.add('selected');
      computerChoiceEl.textContent = ' --- Lizard';
      break;
    case 'spock':
      computerSpock.classList.add('selected');
      computerChoiceEl.textContent = ' --- Spock';
      break;
    default:
      break;
  }
}

// check result, increase scores, update resultText
function updateScore(playerChoice) {
  if (playerChoice === computerChoice) {
    resultText.textContent = "It's a tie.";
    resultText2.textContent = '';
    colorGirl.style.visibility = 'hidden';
    chunLi.style.visibility = 'hidden';
  } else {
    const choice = choices[playerChoice];
    const choice2 = choices[computerChoice];
    // resultText2.textContent = choice.name + " beats " + choice2.name;
    if (choice.defeats.indexOf(computerChoice) > -1) {
      // startConfetti();
      resultText.textContent = 'You Won!';
      playerScoreNumber++;
      playerScoreEl.textContent = playerScoreNumber;
      resultText2.textContent = choice.name + " beats " + choice2.name;
      if(playerScoreNumber % 10 == 0) {
        resultText.textContent = `You Won ${playerScoreNumber} rounds!`;
        winSound.play();
        colorGirl.style.visibility = 'visible';
        startConfetti();
      }
      if(playerScoreNumber % 50 == 0) {
        resultText.textContent = `You Won ${playerScoreNumber} rounds!`;
        fiftyWinSound.play();
        colorGirl.style.visibility = 'visible';
        startConfetti();
      }
      if(playerScoreNumber % 100 == 0) {
        resultText.textContent = `Wow You Won ${playerScoreNumber} rounds!`;
        hundredWinSound.play();
        colorGirl.style.visibility = 'visible';
        startConfetti();
      }
    } else {
      resultText.textContent = 'You Lost!';
      computerScoreNumber++;
      computerScoreEl.textContent = computerScoreNumber;
      resultText2.textContent = choice2.name + " beats " + choice.name;
      if(computerScoreNumber % 10 == 0) {
        resultText.textContent = `You Lost ${computerScoreNumber} rounds...`;
        lossSound.play();
        chunLi.style.visibility = 'visible';
      }
      if(computerScoreNumber % 50 == 0) {
        resultText.textContent = `You Lost ${computerScoreNumber} rounds...`;
        lossSound2.play();
        chunLi.style.visibility = 'visible';
      }
    }
  }
}

// call functions to proccess turn
function checkResult(playerChoice) {
  resetSelected();
  computerRandomChoice();
  displayComputerChoice();
  updateScore(playerChoice);
}

// passing player selection value and styling icons
function select(playerChoice) {
  checkResult(playerChoice);
  switch (playerChoice) {
    case 'rock':
      playerRock.classList.add('selected');
      playerChoiceEl.textContent = ' --- Rock';
      hitSound.play();
      break;
    case 'paper':
      playerPaper.classList.add('selected');
      playerChoiceEl.textContent = ' --- Paper';
      hitSound.play();
      break;
    case 'scissors':
      playerScissors.classList.add('selected');
      playerChoiceEl.textContent = ' --- Scissors';
      hitSound.play();
      break;
    case 'lizard':
      playerLizard.classList.add('selected');
      playerChoiceEl.textContent = ' --- Lizard';
      hitSound.play();
      break;
    case 'spock':
      playerSpock.classList.add('selected');
      playerChoiceEl.textContent = ' --- Spock';
      hitSound.play();
      break;
    default:
      break;
  }
}

window.select = select;

// on startup, set initial values
resetAll();