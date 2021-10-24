import { startConfetti, stopConfetti, removeConfetti } from './confetti.js';
import { 
  buttonSound, 
  soundArrayLose5, 
  soundArrayLose10, 
  soundArrayLose20, 
  soundArrayLose50, 
  soundArrayLose100, 
  soundArrayLose1000, 
  soundArrayWin5, 
  soundArrayWin10, 
  soundArrayWin20, 
  soundArrayWin50, 
  soundArrayWin100, 
  sm64UltimateKoopaClear_1000WinSound 
} from './sounds.js';

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
let buttonDisable = false;

/////////////////////////////

// The Fisher–Yates Shuffle
// function shuffle(array) {
//   var i = array.length,
//       j = 0,
//       temp;

//   while (i--) {

//       j = Math.floor(Math.random() * (i+1));

//       // swap randomly chosen element with current element
//       temp = array[i];
//       array[i] = array[j];
//       array[j] = temp;

//   }

//   return array;
// }

// Durstenfeld shuffle
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  prevMySounds = [...array] // Save current array
  return array;
}

let prevMySounds = [];

function randomSound(array) {
  // let index = Math.floor(Math.random() * 1000) % soundArray.length;
  // var id = soundArray[index];
  // id.play();

  if (array.length < 1) {
    console.log("Array is empty.")
    return array
  } else if (array.length < 2) {
    //console.log(array[0])
    array[0].play();
    return array[0]
  } else {
    let previousArrayCheck = prevMySounds;
    //console.log('previousArrayCheck', previousArrayCheck[0])

    let randomTrack = shuffleArray(array);
    let id = randomTrack[0];
    
    //console.log('id1', id)
    if(id === previousArrayCheck[0]) {
      //console.log("DUPLICATE!!!")

      while (id === previousArrayCheck[0]) {
        //console.log("WHILE DUPLICATE!!!")
        randomTrack = shuffleArray(array);
        id = randomTrack[0];
        //console.log('id2', id)
      }
    }
    id.play();
    return id;
  }
}

// Disable/Enable Button
function toggleButton(num) {
  allGameIcon.forEach(icon => {
    icon.classList.add('disabled');
    buttonDisable = true;
  });
  allGameIcon.forEach(icon => {
    setTimeout(() => {
      icon.classList.remove('disabled');
      buttonDisable = false;
    }, num);
  });
  return
}

// reset all selected icons
function resetSelected() {
  allGameIcon.forEach(icon => {
    icon.classList.remove('selected');
    icon.classList.remove('disabled');
    buttonDisable = false;
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
      if(playerScoreNumber % 5 == 0 && playerScoreNumber % 50 !== 0 && playerScoreNumber % 100 !== 0 && playerScoreNumber % 1000 !== 0) {
        resultText.textContent = `You Won, Keep Going!`;
        let soundWin5 = randomSound(soundArrayWin5);
        if(playerScoreNumber % 10 !== 0 && playerScoreNumber % 20 !== 0 && playerScoreNumber % 50 !== 0 && playerScoreNumber % 100 !== 0 && playerScoreNumber % 1000 !== 0) {
          let soundDuration = Math.floor(soundWin5._duration) * 1000;
          toggleButton(soundDuration > 1000 ? (soundDuration - 500) : 500);
        }
      }
      if(playerScoreNumber % 10 == 0 && playerScoreNumber % 50 !== 0 && playerScoreNumber % 100 !== 0 && playerScoreNumber % 1000 !== 0) {
        resultText.textContent = `You Won ${playerScoreNumber} rounds!`;
        let soundWin10 = randomSound(soundArrayWin10);
        toggleButton(Math.floor(soundWin10._duration) * 1000 - 500);
        colorGirl.style.visibility = 'visible';
        startConfetti();
      }
      if(playerScoreNumber % 20 == 0 && playerScoreNumber % 100 !== 0 && playerScoreNumber % 1000 !== 0) {
        randomSound(soundArrayWin20);
      }
      if(playerScoreNumber % 50 == 0 && playerScoreNumber % 100 !== 0 && playerScoreNumber % 1000 !== 0) {
        resultText.textContent = `You Won ${playerScoreNumber} rounds!`;
        let soundWin50 = randomSound(soundArrayWin50);
        toggleButton(Math.floor(soundWin50._duration) * 1000 - 500);
        colorGirl.style.visibility = 'visible';
        startConfetti();
      }
      if(playerScoreNumber % 100 == 0 && playerScoreNumber % 1000 !== 0) {
        resultText.textContent = `Wow You Won ${playerScoreNumber} rounds!`;
        let soundWin100 = randomSound(soundArrayWin100);
        toggleButton(Math.floor(soundWin100._duration) * 1000 - 500);
        colorGirl.style.visibility = 'visible';
        startConfetti();
      }
      if(playerScoreNumber % 1000 == 0) {
        resultText.textContent = `OMG You Won ${playerScoreNumber} rounds!!!`;
        resultText2.textContent = `YOU BEAT THE GAME, WELL DONE! ^_^`;
        sm64UltimateKoopaClear_1000WinSound.play();
        startConfetti();
        allGameIcon.forEach(icon => {
          icon.classList.add('disabled');
          buttonDisable = true;
        });
      }
    } else {
      resultText.textContent = 'You Lost!';
      computerScoreNumber++;
      computerScoreEl.textContent = computerScoreNumber;
      resultText2.textContent = choice2.name + " beats " + choice.name;
      if(computerScoreNumber % 5 == 0 && computerScoreNumber % 50 !== 0 && computerScoreNumber % 100 !== 0 && computerScoreNumber % 1000 !== 0) {
        resultText.textContent = `You Lost, Don't Give Up!`;
        let soundLose5 = randomSound(soundArrayLose5);
        if(computerScoreNumber % 10 !== 0 && computerScoreNumber % 20 !== 0 && computerScoreNumber % 50 !== 0 && computerScoreNumber % 100 !== 0 && computerScoreNumber % 1000 !== 0) {
          let soundDuration = Math.floor(soundLose5._duration) * 1000;
          toggleButton(soundDuration > 1000 ? (soundDuration - 500) : 500);
        }
      }
      if(computerScoreNumber % 10 == 0 && computerScoreNumber % 50 !== 0 && computerScoreNumber % 100 !== 0 && computerScoreNumber % 1000 !== 0) {
        resultText.textContent = `You Lost ${computerScoreNumber} rounds...`;
        let soundLose10 = randomSound(soundArrayLose10);
        toggleButton(Math.floor(soundLose10._duration) * 1000 - 500);
        chunLi.style.visibility = 'visible';
      }
      if(computerScoreNumber % 20 == 0 && computerScoreNumber % 100 !== 0 && computerScoreNumber % 1000 !== 0) {
        randomSound(soundArrayLose20);
      }
      if(computerScoreNumber % 50 == 0 && computerScoreNumber % 100 !== 0 && computerScoreNumber % 1000 !== 0) {
        resultText.textContent = `You Lost ${computerScoreNumber} rounds :(`;
        let soundLose50 = randomSound(soundArrayLose50);
        toggleButton(Math.floor(soundLose50._duration) * 1000 - 500);
        chunLi.style.visibility = 'visible';
      }
      if(computerScoreNumber % 100 == 0 && computerScoreNumber % 1000 !== 0) {
        resultText.textContent = `You Lost ${computerScoreNumber} rounds 😢`;
        let soundLose100 = randomSound(soundArrayLose100);
        toggleButton(Math.floor(soundLose100._duration) * 1000 - 500);
        chunLi.style.visibility = 'visible';
      }
      if(computerScoreNumber === 1000) {
        resultText.textContent = `You Lost ${computerScoreNumber} times O_O`;
        resultText2.textContent = `GAME OVER`;
        randomSound(soundArrayLose1000);
        chunLi.style.visibility = 'visible';
        allGameIcon.forEach(icon => {
          icon.classList.add('disabled');
          buttonDisable = true;
        });
      }
    }
  }
}

// call functions to process turn
function checkResult(playerChoice) {
  resetSelected();
  computerRandomChoice();
  displayComputerChoice();
  updateScore(playerChoice);
}

// passing player selection value and styling icons
function select(playerChoice) {
  if (!buttonDisable) {
    checkResult(playerChoice);
    switch (playerChoice) {
      case 'rock':
        playerRock.classList.add('selected');
        playerChoiceEl.textContent = ' --- Rock';
        buttonSound.play();
        break;
      case 'paper':
        playerPaper.classList.add('selected');
        playerChoiceEl.textContent = ' --- Paper';
        buttonSound.play();
        break;
      case 'scissors':
        playerScissors.classList.add('selected');
        playerChoiceEl.textContent = ' --- Scissors';
        buttonSound.play();
        break;
      case 'lizard':
        playerLizard.classList.add('selected');
        playerChoiceEl.textContent = ' --- Lizard';
        buttonSound.play();
        break;
      case 'spock':
        playerSpock.classList.add('selected');
        playerChoiceEl.textContent = ' --- Spock';
        buttonSound.play();
        break;
      default:
        break;
      }
  } else {
    return
  }
}

window.select = select;

// on startup, set initial values
resetAll();