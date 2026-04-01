
let easyWordBank = [
  'cat', 'dog', 'sun', 'hat', 'map',
  'cup', 'pen', 'bed', 'box', 'car',
  'tree', 'fish', 'bird', 'ball', 'book',
  'shoe', 'milk', 'door', 'hand', 'star'
];

let medWordBank = [
  'garden', 'window', 'button', 'picture', 'family',
  'school', 'forest', 'mountain', 'pencil', 'animal',
  'friend', 'river', 'letter', 'orange', 'market',
  'travel', 'bridge', 'summer', 'circle', 'puzzle'
];
let hardWordBank = [
  'elephant', 'chocolate', 'umbrella', 'adventure', 'pineapple',
  'computer', 'dinosaur', 'astronomy', 'blueberry', 'happiness',
  'backpack', 'telephone', 'triangle', 'engineer', 'notebook',
  'campfire', 'volcano', 'headphones', 'skyscraper', 'photograph'
];

let secretWord = '';
let guessedLetters = [];
let remainingGuesses = 0;
let wins = 0;
let wrongGuesses = 0;
let gameOver = false;
let currentLevel = '';

// Run on page load
document.addEventListener("DOMContentLoaded", function () {
  // Check URL for difficulty
  const params = new URLSearchParams(window.location.search);
  const mode = params.get('mode'); // "easy", "medium", "hard", "custom"
  
  startGame(mode); // auto-start if mode exists

  // Enter key listener
  document.getElementById('letterInput').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') guessLetter();
  });
});

function startGame(level) {
  let randomIndex;
  // Use stored level if no level is provided (restart case)
  if (!level) {
    level = currentLevel;
  } else {
    currentLevel = level;
  }
  guessedLetters = [];
  wins = 0;
  remainingGuesses = 8;
  wrongGuesses = 0;
  gameOver = false;
  const gameMsg = document.getElementById('gameOverMessage');
  gameMsg.textContent = '';
  gameMsg.classList.remove('game-over');
  document.getElementById('remaining-count').textContent = remainingGuesses;

  if (level === 'easy') {
    randomIndex = Math.floor(Math.random() * easyWordBank.length);
    secretWord = easyWordBank[randomIndex].toUpperCase();
  } else if (level === 'medium') {
    randomIndex = Math.floor(Math.random() * medWordBank.length);
    secretWord = medWordBank[randomIndex].toUpperCase();
  } else if (level === 'hard') {
    randomIndex = Math.floor(Math.random() * hardWordBank.length);
    secretWord = hardWordBank[randomIndex].toUpperCase();
  }

  updateDisplay();
  updateImage();
}

function checkGameOver() {
  if (remainingGuesses <= 0) {
    gameOver = true;
    const gameMsg = document.getElementById('gameOverMessage');
    gameMsg.textContent = 'Game Over!';
    gameMsg.classList.add('game-over');
  }
}

function updateDisplay() {
  const displayDiv = document.getElementById("wordDisplay");
  displayDiv.innerHTML = "";

  for (let i = 0; i < secretWord.length; i++) {
    const letter = secretWord.charAt(i);
    const letterElem = document.createElement("span");

    if (guessedLetters.includes(letter)) {
      letterElem.textContent = letter + " ";
    } else if (gameOver) 
      // code from google
      {
      letterElem.textContent = letter + " ";
      letterElem.style.color = "#FBBF24";
    } else {
      letterElem.textContent = "_ ";
    }

    displayDiv.appendChild(letterElem);
  }

  document.getElementById("guessedLetters").textContent = "Guessed: " + guessedLetters.join(", ");
  updateImage();
}

function guessLetter() {
  if (gameOver) return;

  const letter = document.getElementById('letterInput').value.trim().toUpperCase();
  const warning = document.getElementById('warning');

  if (letter === '') return;

  if (!/^[A-Z]$/.test(letter)) {
    warning.textContent = 'Please guess a letter';
    warning.style.display = 'block';
    document.getElementById('letterInput').value = '';
    return;
  }

  if (guessedLetters.includes(letter)) {
    warning.textContent = 'You already guessed that letter';
    warning.style.display = 'block';
    return;
  } else {
    guessedLetters.push(letter);
    warning.style.display = 'none';
  }

  if (!secretWord.includes(letter)) {
    remainingGuesses--;
    document.getElementById('remaining-count').textContent = remainingGuesses;
    // Add shake animation
    const hangman = document.getElementById('hangman');
    if (hangman) {
      hangman.classList.add('shake');
      setTimeout(() => hangman.classList.remove('shake'), 500);
    }
  }

  document.getElementById('letterInput').value = '';
  checkWin();
  checkGameOver();
  updateDisplay();
}

function updateImage() {
  let image;
  switch (remainingGuesses) {
    case 8: image = 'Untitled-1.png'; break;
    case 7: image = 'Untitled-2.png'; break;
    case 6: image = 'Untitled-3.png'; break;
    case 5: image = 'Untitled-4.png'; break;
    case 4: image = 'Untitled-5.png'; break;
    case 3: image = 'Untitled-6.png'; break;
    case 2: image = 'Untitled-7.png'; break;
    case 1: image = 'Untitled-8.png'; break;
    case 0: image = 'Untitled-9.png'; break;
  }
  const hangmanImg = document.getElementById('stagesImg');
  if (hangmanImg) hangmanImg.src = image;
}

// Confetti sequence
function launchConfettiSequence() {
  var container = document.getElementById('confetti-container');
  var colors = ['#f94144','#f3722c','#f9c74f','#90be6d','#577590','#43aa8b','#4d908e','#f9844a','#f8961e','#f7b267'];
  var animationDuration = 2000;

  function createBurst() {
    container.innerHTML = '';

    for (var i = 0; i < 2000; i++) {
      var confetti = document.createElement('div');
      confetti.className = 'confetti';

      var x = (Math.random() - 0.5) * 1000;
      var y = (Math.random() - 0.5) * 1000;
      var size = Math.floor(Math.random() * 8) + 4;
      var color = colors[Math.floor(Math.random() * colors.length)];
      var spin = Math.random() * 3 + 1;

      confetti.style.setProperty('--x', x + 'px');
      confetti.style.setProperty('--y', y + 'px');
      confetti.style.setProperty('--size', size + 'px');
      confetti.style.setProperty('--color', color);
      confetti.style.setProperty('--spin', spin);

      container.appendChild(confetti);
    }

    container.style.display = 'block';
    setTimeout(function() {
      container.style.display = 'none';
    }, animationDuration);
  }

  createBurst();
}

function checkWin() {
  if (secretWord.split('').every(letter => guessedLetters.includes(letter))) {
    gameOver = true;
    const gameMsg = document.getElementById('gameOverMessage');
    gameMsg.textContent = 'You Win! 🎉💥';
    gameMsg.classList.remove('game-over');
    launchConfettiSequence();
  }
}