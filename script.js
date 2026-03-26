wordBank = ['Tree', 'Bridge', 'Lantern', 'Whisper', 'Compass', 'Glacier', 'Chair', 'Book', 'Pen', 'Pencil']

let secretWord = ''
let guessedLetters = []
let Guessed = []
let remainingGuesses = 0
let wins = 0
let wrongGuesses = 0
let userGuesses = []
let gameOver = false
let image = ''


document.addEventListener("DOMContentLoaded", function () {

  startGame();

  document.getElementById('letterInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      guessLetter();
    }
  });
});

function startGame() {
 
  let randomIndex = Math.floor(Math.random() * wordBank.length)
  secretWord = wordBank[randomIndex].toUpperCase()
  console.log(secretWord)
  guessedLetters = []
  wins = 0
  remainingGuesses = 6
  wrongGuesses = 0
  gameOver = false
  updateDisplay()
  updateHangman()
  // • pick the random word yes
  // • reset variables yes
  // • build the starting display yes
  // • update elements on the page yes
}

function checkGameOver(){
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
  document.getElementById('remaining-count').textContent = remainingGuesses;
}

function updateHangman() {
  const stage = wrongGuesses + 1;
  document.getElementById('hangmanImage').src = `stage ${stage}.jpg`;
}


function checkGameOver(){
  if (remainingGuesses <= 0) {
    gameOver = true;
    document.getElementById('gameOverMessage').textContent = 'Game Over!';
  }
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
    if (!secretWord.includes(letter)) {
      wrongGuesses++;
      remainingGuesses--;
      updateHangman();
    }
  }
  document.getElementById('letterInput').value = '';
  updateDisplay();
  checkGameOver();
}





