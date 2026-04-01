// WORD BANKS
let easyWordBank = [
    'cat','dog','sun','hat','map',
    'cup','pen','bed','box','car',
    'tree','fish','bird','ball','book',
    'shoe','milk','door','hand','star'
];

let medWordBank = [
    'garden','window','button','picture','family',
    'school','forest','mountain','pencil','animal',
    'friend','river','letter','orange','market',
    'travel','bridge','summer','circle','puzzle'
];

let hardWordBank = [
    'elephant','chocolate','umbrella','adventure','pineapple',
    'computer','dinosaur','astronomy','blueberry','happiness',
    'backpack','telephone','triangle','engineer','notebook',
    'campfire','volcano','headphones','skyscraper','photograph'
];

// GAME VARIABLES
let secretWord = "";
let guessedLetters = [];
let remainingGuesses = 0;
let wrongGuesses = 0;
let gameOver = false;
let currentLevel = "";

// PAGE LOAD
document.addEventListener("DOMContentLoaded", function () {

    // AI-assisted URL param difficulty
    const params = new URLSearchParams(window.location.search);
    const mode = params.get("mode");

    startGame(mode);

    document.getElementById("letterInput").addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            guessLetter();
        }
    });
});

// START GAME
function startGame(level) {
    let randomIndex;

    if (!level) {
        level = currentLevel;
    } else {
        currentLevel = level;
    }

    guessedLetters = [];
    wrongGuesses = 0;
    remainingGuesses = 8;
    gameOver = false;

    document.getElementById("remaining-count").textContent = remainingGuesses;

    const gameMsg = document.getElementById("gameOverMessage");
    gameMsg.textContent = "";
    gameMsg.classList.remove("game-over");

    // Pick random word
    if (level === "easy") {
        randomIndex = Math.floor(Math.random() * easyWordBank.length);
        secretWord = easyWordBank[randomIndex].toUpperCase();
    } else if (level === "medium") {
        randomIndex = Math.floor(Math.random() * medWordBank.length);
        secretWord = medWordBank[randomIndex].toUpperCase();
    } else if (level === "hard") {
        randomIndex = Math.floor(Math.random() * hardWordBank.length);
        secretWord = hardWordBank[randomIndex].toUpperCase();
    }

    updateDisplay();
    updateImage();
}

// UPDATE WORD DISPLAY
function updateDisplay() {
    let display = "";

    for (let i = 0; i < secretWord.length; i++) {
        let letter = secretWord.charAt(i);

        if (guessedLetters.includes(letter)) {
            display += letter + " ";
        } else if (gameOver) {
            display += letter + " ";
        } else {
            display += "_ ";
        }
    }

    document.getElementById("wordDisplay").textContent = display;
    document.getElementById("guessedLetters").textContent =
        "Guessed: " + guessedLetters.join(", ");
}

// GUESS LETTER
function guessLetter() {
    if (gameOver) {
        return;
    }

    const inputBox = document.getElementById("letterInput");
    const warning = document.getElementById("warning");
    const letter = inputBox.value.trim().toUpperCase();

    if (letter === "") {
        return;
    }

    if (!/^[A-Z]$/.test(letter)) {
        warning.textContent = "Please guess a letter";
        warning.style.display = "block";
        inputBox.value = "";
        return;
    }

    if (guessedLetters.includes(letter)) {
        warning.textContent = "You already guessed that letter";
        warning.style.display = "block";
        return;
    }

    guessedLetters.push(letter);
    warning.style.display = "none";

    if (!secretWord.includes(letter)) {
        remainingGuesses--;
        document.getElementById("remaining-count").textContent = remainingGuesses;

        const hangman = document.getElementById("hangman");
        if (hangman) {
            hangman.classList.add("shake");
            setTimeout(function () {
                hangman.classList.remove("shake");
            }, 500);
        }
    }

    inputBox.value = "";

    checkWin();
    checkGameOver();
    updateDisplay();
    updateImage();
}

// UPDATE IMAGE
function updateImage() {
  if (gameOver) {
    return;
}
    let image = "";

    if (remainingGuesses === 8) image = "Untitled-1.png";
    if (remainingGuesses === 7) image = "Untitled-2.png";
    if (remainingGuesses === 6) image = "Untitled-3.png";
    if (remainingGuesses === 5) image = "Untitled-4.png";
    if (remainingGuesses === 4) image = "Untitled-5.png";
    if (remainingGuesses === 3) image = "Untitled-6.png";
    if (remainingGuesses === 2) image = "Untitled-7.png";
    if (remainingGuesses === 1) image = "Untitled-8.png";
    if (remainingGuesses === 0) image = "Untitled-9.png";

    const hangmanImg = document.getElementById("stagesImg");
    hangmanImg.src = image;
}

// CHECK LOSE
function checkGameOver() {
    if (remainingGuesses <= 0) {
        gameOver = true;

        const gameMsg = document.getElementById("gameOverMessage");
        gameMsg.textContent = "Game Over!";
        gameMsg.classList.add("game-over");
    }
}

// CHECK WIN
function checkWin() {
    let allFound = true;

    for (let i = 0; i < secretWord.length; i++) {
        if (!guessedLetters.includes(secretWord.charAt(i))) {
            allFound = false;
        }
    }

    if (allFound) {
        gameOver = true;

        const winImg = document.getElementById("stagesImg");
        winImg.src = "Untitled-10 (3).png";

        const gameMsg = document.getElementById("gameOverMessage");
        gameMsg.textContent = "You Win! 🎉💥";
        gameMsg.classList.remove("game-over");

        launchConfettiSequence(); // AI-assisted
    }
}

// CONFETTI (AI-assisted)
function launchConfettiSequence() {
    const container = document.getElementById("confetti-container");
    container.innerHTML = "";

    const colors = [
        "#f94144","#f3722c","#f9c74f","#90be6d",
        "#577590","#43aa8b","#4d908e","#f9844a",
        "#f8961e","#f7b267"
    ];

    const totalPieces = 450;

    for (let i = 0; i < totalPieces; i++) {
        const confetti = document.createElement("div");
        confetti.className = "confetti";

        const size = Math.floor(Math.random() * 10) + 6;
        const color = colors[Math.floor(Math.random() * colors.length)];

        confetti.style.width = size + "px";
        confetti.style.height = size + "px";
        confetti.style.backgroundColor = color;

        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;

        confetti.style.left = x + "px";
        confetti.style.top = y + "px";

        container.appendChild(confetti);
    }

    container.style.opacity = "1";

    setTimeout(function () {
        container.style.opacity = "0";
    }, 6000);
}
