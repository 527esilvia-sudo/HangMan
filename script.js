let easyWordBank = [
  'cat', 'dog', 'car', 'sun', 'hat',
  'map', 'cup', 'pen', 'box', 'bed'
];

let medWordBank = [
  'button', 'screen', 'window', 'folder', 'mouse',
  'keyboard', 'image', 'color', 'border', 'margin'
];

let hardWordBank = [
  'function', 'variable', 'argument', 'parameter', 'boolean',
  'callback', 'operator', 'element', 'property', 'document'
];


let secretWord = ''
let guessedLetters = []
let Guessed = []
let remainingGuesses = 0
let wins = 0
let wrongGuesses = 0
let userGuesses = []
let gameOver = false
let hangmanImg = document.getElementById('stagesImg')

document.addEventListener("DOMContentLoaded", function () {

  startGame();

  document.getElementById('letterInput').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      guessLetter();
    }
  });
});

function startGame(level) {

  let randomIndex
  console.log(secretWord)
  guessedLetters = []
  wins = 0
  remainingGuesses = 8
  wrongGuesses = 0
  gameOver = false
   if (level === 'easy') {
       randomIndex = Math.floor(Math.random() * easyWordBank.length)
  secretWord = easyWordBank[randomIndex].toUpperCase()
  } else if (level === 'medium') {
       randomIndex = Math.floor(Math.random() * medWordBank.length)
  secretWord = medWordBank[randomIndex].toUpperCase()
  } else if (level === 'hard') {
   randomIndex = Math.floor(Math.random() * hardWordBank.length)
  secretWord = hardWordBank[randomIndex].toUpperCase()
  }
  updateDisplay()
  updateHangman()

}

function checkGameOver() {
  if (remainingGuesses <= 0) {
    gameOver = true;
    document.getElementById('gameOverMessage').textContent = 'Game Over!';

  }
}
function updateDisplay() {
  let display = "";

  for (let i = 0; i < secretWord.length; i++) {

    let letter = secretWord.charAt(i);

    if (guessedLetters.includes(letter)) {
      display += letter + " ";
    } else {
      display += "_ ";
    }

  }

  document.getElementById("wordDisplay").textContent = display;
  document.getElementById("guessedLetters").textContent = "Guessed: " + guessedLetters.join(", ");
  updateImage()
}


function guessLetter() {
  if (gameOver) return;
  const letter = document.getElementById('letterInput').value.trim().toUpperCase();
  const warning = document.getElementById('warning');

  // Ignore empty input (e.g., when Enter is pressed without typing)
  if (letter === '') {
    return;
  }

  if (!/^[A-Z]$/.test(letter)) {
    warning.textContent = 'Please guess a single letter';
    console.log('Please guess a single letter');
    warning.textContent = 'Please guess a letter';
    warning.style.display = 'block';
    document.getElementById('letterInput').value = '';
    return;
  }
  if (guessedLetters.includes(letter)) {
    console.log('You already guessed that letter');
    warning.style.display = 'block';
    warning.textContent = 'You already guessed that letter';
  } else {
    guessedLetters.push(letter);
    warning.style.display = 'none';
  }
  if (!secretWord.includes(letter)) {
    remainingGuesses--;
    document.getElementById('remaining-count').textContent = remainingGuesses;
  }
  document.getElementById('letterInput').value = '';
  updateDisplay();
  checkGameOver();
}

function updateImage() {
  console.log('remainingGuesses:', remainingGuesses)
  let image;
  switch (remainingGuesses) {
    case 6:
      image = 'Untitled-1.png';
      break;

    case 5:
      image = 'Untitled-2.png';
      break;

    case 4:
      image = 'Untitled-3.png';
      break;

    case 3:
      image = 'Untitled-4.png';
      break;

    case 2:
      image = 'Untitled-5.png';
      break;

    case 1:
      image = 'Untitled-6.png';
      break;

    case 0:
      image = 'Untitled-7.png';
      break;

    case 7:
      image = 'Untitled-8.png';
      break;

  }
  const hangmanImg = document.getElementById('stagesImg');
  if (hangmanImg) hangmanImg.src = image;
}
// function gameOver(){
//   if (remainingGuesses <= 0) {
//     gameOver = true;
//     document.getElementById('gameOverMessage').textContent = 'Game Over! The word was: ' + secretWord;
//   }
// }





