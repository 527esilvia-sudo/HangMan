// --------------------------
// WORD BANKS
// --------------------------
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

let randomWordBank = [
    'telescope','coin','basket','electricity','rain',
    'gallery','sock','rocket','microscope','leaf',
    'architecture','lamp','silver','constellation','pocket',
    'gravity','island','festival','diamond','book'
];

// --------------------------
// GAME VARIABLES
// --------------------------
let secretWord = "";
let guessedLetters = [];
let remainingGuesses = 0;
let wrongGuesses = 0;
let gameOver = false;
let currentLevel = "";

// --------------------------
// PAGE LOAD
// --------------------------
document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);
    const mode = params.get("mode");

    startGame(mode);

    const letterInput = document.getElementById("letterInput");
    if(letterInput){
        letterInput.addEventListener("keypress", function (e) {
            if (e.key === "Enter") guessLetter();
        });
    }
});

// --------------------------
// START GAME
// --------------------------
function startGame(level) {
    if(!level) level = currentLevel;
    else currentLevel = level;

    guessedLetters = [];
    wrongGuesses = 0;
    remainingGuesses = 8;
    gameOver = false;

    // Reset display
    const remainingEl = document.getElementById("remaining-count");
    if(remainingEl) remainingEl.textContent = remainingGuesses;

    const gameMsg = document.getElementById("gameOverMessage");
    if(gameMsg){
        gameMsg.textContent = "";
        gameMsg.classList.remove("game-over");
    }

    // Pick random word
    let randomIndex;
    if (level === "easy") {
        randomIndex = Math.floor(Math.random() * easyWordBank.length);
        secretWord = easyWordBank[randomIndex].toUpperCase();
    } else if (level === "medium") {
        randomIndex = Math.floor(Math.random() * medWordBank.length);
        secretWord = medWordBank[randomIndex].toUpperCase();
    } else if (level === "hard") {
        randomIndex = Math.floor(Math.random() * hardWordBank.length);
        secretWord = hardWordBank[randomIndex].toUpperCase();
    } else if (level === "random") {
        randomIndex = Math.floor(Math.random() * randomWordBank.length);
        secretWord = randomWordBank[randomIndex].toUpperCase();
    }

    updateDisplay();
    updateGuessedLetters();
    updateImage();
    updateDangerMode();
}

// --------------------------
// GUESS LETTER
// --------------------------
function guessLetter() {
    if (gameOver) return;

    const inputBox = document.getElementById("letterInput");
    const warning = document.getElementById("warning");
    if(!inputBox) return;

    let letter = inputBox.value.trim().toUpperCase();
    inputBox.value = "";

    if(!/^[A-Z]$/.test(letter)){
        if(warning){ warning.textContent="Please guess a letter"; warning.style.display="block"; }
        return;
    }

    if(guessedLetters.includes(letter)){
        if(warning){ warning.textContent="You already guessed that letter"; warning.style.display="block"; }
        return;
    }

    guessedLetters.push(letter);
    if(warning) warning.style.display="none";

    if(!secretWord.includes(letter)){
        remainingGuesses--;
        shakeHangman();
    }

    updateDisplay();
    updateGuessedLetters();
    updateRemainingDisplay();
    updateDangerMode();
    checkWin();
    checkGameOver();
    updateImage();
}

// --------------------------
// DISPLAY
// --------------------------
function updateDisplay() {
    const wordEl = document.getElementById("wordDisplay");
    if(!wordEl) return;

    let display = "";
    for(let char of secretWord){
        if(guessedLetters.includes(char)) display += char + " ";
        else if(gameOver) display += `<span style="color:red">${char}</span> `;
        else display += "_ ";
    }

    wordEl.innerHTML = display;
}

function updateGuessedLetters() {
    const guessedEl = document.getElementById("guessedLetters");
    if(!guessedEl) return;

    guessedEl.textContent = "Guessed: " + guessedLetters.join(" ");
}

function updateRemainingDisplay() {
    const remainingEl = document.getElementById("remaining-count");
    if(remainingEl) remainingEl.textContent = remainingGuesses;
}

function shakeHangman() {
    const hangman = document.getElementById("hangman");
    if(hangman){
        hangman.classList.add("shake");
        setTimeout(()=> hangman.classList.remove("shake"),500);
    }
}

function updateDangerMode(){
    const dangerEl = document.querySelector(".danger-mode");
    if(!dangerEl) return;

    if(remainingGuesses === 1 && !gameOver) dangerEl.classList.add("danger-mode-active");
    else dangerEl.classList.remove("danger-mode-active");
}

// --------------------------
// WIN / LOSE
// --------------------------
function checkWin(){
    let allFound = true;
    for(let char of secretWord){
        if(!guessedLetters.includes(char)) allFound = false;
    }

    if(allFound){
        gameOver = true;
        const winImg = document.getElementById("stagesImg");
        if(winImg) winImg.src = "Untitled-10.png";

        const gameMsg = document.getElementById("gameOverMessage");
        if(gameMsg){
            gameMsg.textContent = "You Win! 🎉💥";
            gameMsg.classList.remove("game-over");
        }

        updateDangerMode();
        launchConfetti();
    }
}

function checkGameOver(){
    if(remainingGuesses <= 0){
        gameOver = true;

        const gameMsg = document.getElementById("gameOverMessage");
        if(gameMsg){
            gameMsg.textContent = "Game Over!";
            gameMsg.classList.add("game-over");
        }

        updateDisplay(); // show unguessed letters in red
        updateDangerMode();
    }
}

// --------------------------
// IMAGE + CONFETTI
// --------------------------
function updateImage(){
    const img = document.getElementById("stagesImg");
    if(!img) return;

    // Only overwrite if the game is NOT won
    if(gameOver && secretWord.split('').every(l => guessedLetters.includes(l))){
        img.src = "Untitled-10.png"; // win image
        return; // exit early, don't overwrite
    }

    let image = "";
    if(remainingGuesses === 8) image = "Untitled-1.png";
    if(remainingGuesses === 7) image = "Untitled-2.png";
    if(remainingGuesses === 6) image = "Untitled-3.png";
    if(remainingGuesses === 5) image = "Untitled-4.png";
    if(remainingGuesses === 4) image = "Untitled-5.png";
    if(remainingGuesses === 3) image = "Untitled-6.png";
    if(remainingGuesses === 2) image = "Untitled-7.png";
    if(remainingGuesses === 1) image = "Untitled-8.png";
    if(remainingGuesses === 0) image = "Untitled-9.png";

    img.src = image;
}

function launchConfetti(){
    const container = document.getElementById("confetti-container");
    if(!container) return;

    container.innerHTML = "";
    const colors = ['#f94144','#f3722c','#f9c74f','#90be6d','#577590','#43aa8b','#4d908e','#f9844a','#f8961e','#f7b267'];

    for(let i=0;i<450;i++){
        const confetti = document.createElement("div");
        confetti.className = "confetti";
        const size = Math.floor(Math.random()*10)+6;
        confetti.style.width = confetti.style.height = size + "px";
        confetti.style.backgroundColor = colors[Math.floor(Math.random()*colors.length)];
        confetti.style.left = Math.random()*window.innerWidth + "px";
        confetti.style.top = Math.random()*window.innerHeight + "px";
        container.appendChild(confetti);
    }

    container.style.opacity = "1";
    setTimeout(()=> container.style.opacity="0",6000);
}