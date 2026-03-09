wordBank = ['Tree', 'Bridge', 'Lantern', 'Whisper', 'Compass', 'Glacier', 'Chair', 'Book', 'Pen', 'Pencil']

let secretWord = ''
let guessedLetters = []
let remainingGuesses = 0
let gameOver = false
let wins = 0
let wrongGuesses = 0
let userGuesses = []


document.addEventListener("DOMContentLoaded", function () {

  startGame();
});

function startGame() {
  let randomIndex = Math.floor(Math.random() * wordBank.length)
  secretWord = wordBank[randomIndex]
  console.log(secretWord)
  guessedLetters = []
  wins = 0
  wrongGuesses = 0
  remainingGuesses = 6
  gameOver = false
  updateDisplay()
  // • pick the random word yes
  // • reset variables yes
  // • build the starting display yes
  // • update elements on the page yes
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

}
/* startBtn.onclick = userGuesses;
nameInput.addEventListener("keydown", e => {
  if (e.key === "Enter") startGame();
}); */

function guessLetter() {
  const letterInput = document.getElementById('letterInput').value.trim();

  if (/^[a-zA-Z]$/.test(letterInput)) {
    console.log(letterInput);
    guessedLetters.push(letterInput);

    // clear the input after the guess
    document.getElementById('letterInput').value = '';
  } else {
    // show error somewhere else (not on the input element)
    console.log('Please guess a single letter');
  }

  updateDisplay();
}

