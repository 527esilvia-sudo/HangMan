wordBank = ['Tree', 'Bridge', 'Lantern', 'Whisper', 'Compass', 'Glacier', 'Chair', 'Book', 'Pen', 'Pencil']

let secretWord = ''
let guessedLetters = []
let Guessed = []
let remainingGuesses = 0
let wins = 0
let wrongGuesses = 0
let userGuesses = []
let gameOver = false


function checkGameOver(){
  if (remainingGuesses <= 0) {
    gameOver = true;
    document.getElementById('gameOverMessage').textContent = 'Game Over!';

  }
}
document.addEventListener("DOMContentLoaded", function () {

  startGame();

  document.getElementById('letterInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      guessLetter();
    }
  });
});

function startGame() {
  gameOver()
  let randomIndex = Math.floor(Math.random() * wordBank.length)
  secretWord = wordBank[randomIndex].toUpperCase()
  console.log(secretWord)
  guessedLetters = []
  wins = 0
  remainingGuesses = 6
  gameOver = false
  updateDisplay()
  // • pick the random word yes
  // • reset variables yes
  // • build the starting display yes
  // • update elements on the page yes
}

function updateDisplay() {
gameOver()
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

}


function guessLetter() {
  gameOver()
  const letter = document.getElementById('letterInput').value.trim().toUpperCase();
  const warning = document.getElementById('warning');
warning.textContent = '';
 
  if (!/^[A-Z]$/.test(letter)) {
     warning.textContent = 'Please guess a single letter';
    console.log('Please guess a single letter');
    warning.style.display = 'block';
    return;
  }
  if (guessedLetters.includes(letter)) {
    console.log('You already guessed that letter');
    warning.style.display = 'block';
    warning.textContent = 'You already guessed that letter';
    return;
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
}

// function gameOver(){
//   if (remainingGuesses <= 0) {
//     gameOver = true;
//     document.getElementById('gameOverMessage').textContent = 'Game Over! The word was: ' + secretWord;
//   }
// }





