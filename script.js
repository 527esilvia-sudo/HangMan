// --------------------------
// WORD BANKS
// --------------------------
const easyWordBank = ['CAT','DOG','SUN','HAT','MAP','CUP','PEN','BED','BOX','CAR','TREE','FISH','BIRD','BALL','BOOK','SHOE','MILK','DOOR','HAND','STAR'];
const mediumWordBank = ['GARDEN','WINDOW','BUTTON','PICTURE','FAMILY','SCHOOL','FOREST','MOUNTAIN','PENCIL','ANIMAL','FRIEND','RIVER','LETTER','ORANGE','MARKET','TRAVEL','BRIDGE','SUMMER','CIRCLE','PUZZLE'];
const hardWordBank = ['ELEPHANT','CHOCOLATE','UMBRELLA','ADVENTURE','PINEAPPLE','COMPUTER','DINOSAUR','ASTRONOMY','BLUEBERRY','HAPPINESS','BACKPACK','TELEPHONE','TRIANGLE','ENGINEER','NOTEBOOK','CAMPFIRE','VOLCANO','HEADPHONES','SKYSCRAPER','PHOTOGRAPH'];
const randomWordBank = ['TELESCOPE','COIN','BASKET','ELECTRICITY','RAIN','GALLERY','SOCK','ROCKET','MICROSCOPE','LEAF','ARCHITECTURE','LAMP','SILVER','CONSTELLATION','POCKET','GRAVITY','ISLAND','FESTIVAL','DIAMOND','BOOK'];

// --------------------------
// GAME STATE VARIABLES
// --------------------------
let secretWord = '';
let guessedLetters = [];
let remainingGuesses = 8;
let gameOver = false;
let currentLevel = '';
let userStreak = 0;
let highestStreak = 0; // now only lasts per session

// --------------------------
// PAGE LOAD
// --------------------------
document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const mode = params.get('mode');
    startGame(mode);

    const letterInput = document.getElementById('letterInput');
    if(letterInput){
        letterInput.addEventListener('keypress', (e) => {
            if(e.key === 'Enter') guessLetter();
        });
    }

    updateStreakDisplay();
});

// --------------------------
// START GAME
// --------------------------
function startGame(level){
    guessedLetters = [];
    remainingGuesses = 8;
    gameOver = false;

    if(level) currentLevel = level;

    const dangerOverlay = document.querySelector('.danger-mode');
    if(dangerOverlay) dangerOverlay.classList.remove('danger-mode-active');

    let wordBank = easyWordBank;
    if(currentLevel === 'medium') wordBank = mediumWordBank;
    else if(currentLevel === 'hard') wordBank = hardWordBank;
    else if(currentLevel === 'random') wordBank = randomWordBank;

    secretWord = wordBank[Math.floor(Math.random() * wordBank.length)];

    updateDisplay();
    updateRemainingDisplay();
    updateGuessedLettersDisplay();
    resetGameOverMessage();
    updateImage();
}

// --------------------------
// GUESS LETTER
// --------------------------
function guessLetter(){
    if(gameOver) return;

    const inputBox = document.getElementById('letterInput');
    const warning = document.getElementById('warning');
    if(!inputBox) return;

    let letter = inputBox.value.trim().toUpperCase();
    inputBox.value = '';

    if(!/^[A-Z]$/.test(letter)){
        if(warning){ warning.textContent="Please enter a single letter"; warning.style.display="block"; }
        return;
    }

    if(guessedLetters.includes(letter)){
        if(warning){ warning.textContent="You already guessed that"; warning.style.display="block"; }
        return;
    }

    guessedLetters.push(letter);
    updateGuessedLettersDisplay();

    if(warning) warning.style.display="none";

    if(!secretWord.includes(letter)){
        remainingGuesses--;
        shakeHangman();
    }

    updateDangerMode();
    updateDisplay();
    updateRemainingDisplay();
    checkWin();
    checkGameOver();
    updateImage();
}

// --------------------------
// DISPLAY UPDATES
// --------------------------
function updateDisplay(){
    const wordEl = document.getElementById('wordDisplay');
    if(!wordEl) return;

    let display = '';
    for(let char of secretWord){
        if(guessedLetters.includes(char)) display += char + ' ';
        else display += '_ ';
    }

    wordEl.textContent = display;
}

function updateGuessedLettersDisplay(){
    const guessedEl = document.getElementById('guessedLetters');
    if(!guessedEl) return;

    guessedEl.textContent = "Guessed: " + guessedLetters.join(' ');
}

function updateRemainingDisplay(){
    const remainingEl = document.getElementById('remaining-count');
    if(remainingEl) remainingEl.textContent = remainingGuesses;
}

function shakeHangman(){
    const hangman = document.querySelector('.hangman-stage');
    if(hangman){
        hangman.classList.add('shake');
        setTimeout(() => hangman.classList.remove('shake'), 500);
    }
}

function updateDangerMode(){
    const danger = document.querySelector('.danger-mode');
    if(!danger) return;

    if(remainingGuesses === 1) danger.classList.add('danger-mode-active');
    else danger.classList.remove('danger-mode-active');
}

function resetGameOverMessage(){
    const msg = document.getElementById('gameOverMessage');
    if(msg){
        msg.textContent = '';
        msg.classList.remove('game-over');
    }
}

// --------------------------
// CHECK WIN / GAME OVER
// --------------------------
function checkWin(){
    if(secretWord.split('').every(char => guessedLetters.includes(char))){
        gameOver = true;
        updateImage('win');
        launchConfetti();
        handleStreak(true);
    }
}

function checkGameOver(){
    if(remainingGuesses <= 0){
        gameOver = true;
        displayGameOverMessage("Game Over!");
        revealWordInRed();
        handleStreak(false);
    }
}

function displayGameOverMessage(text){
    const msg = document.getElementById('gameOverMessage');
    if(msg){
        msg.textContent = text;
        msg.classList.add('game-over');
    }
}

// show unguessed letters in red
function revealWordInRed(){
    const wordEl = document.getElementById('wordDisplay');
    if(!wordEl) return;

    let display = '';
    for(let char of secretWord){
        if(guessedLetters.includes(char)){
            display += char + ' ';
        } else {
            display += `<span style="color:red">${char}</span> `;
        }
    }

    wordEl.innerHTML = display;
}

// --------------------------
// STREAK (SESSION ONLY NOW)
// --------------------------
function handleStreak(win){
    if(win) userStreak++;
    else userStreak = 0;

    if(userStreak > highestStreak){
        highestStreak = userStreak;
    }

    updateStreakDisplay();
}

function updateStreakDisplay(){
    const streakEl = document.getElementById('streakDisplay');
    const highEl = document.getElementById('highestStreak');

    if(streakEl) streakEl.textContent = "Current Streak: " + userStreak;
    if(highEl) highEl.textContent = "Highest Streak: " + highestStreak;
}

// --------------------------
// IMAGE + CONFETTI
// --------------------------
function updateImage(state){
    const img = document.getElementById('stagesImg');
    if(!img) return;

    if(state === 'win'){
        img.src = 'Untitled-10.png';
        return;
    }

    const images = [
        'Untitled-1.png','Untitled-2.png','Untitled-3.png','Untitled-4.png',
        'Untitled-5.png','Untitled-6.png','Untitled-7.png','Untitled-8.png','Untitled-9.png'
    ];

    img.src = images[8 - remainingGuesses] || images[0];
}

function launchConfetti(){
    const container = document.getElementById('confetti-container');
    if(!container) return;

    container.innerHTML = '';
    const colors = ['#f94144','#f3722c','#f9c74f','#90be6d','#577590','#43aa8b','#4d908e','#f9844a','#f8961e','#f7b267'];

    for(let i=0;i<450;i++){
        const confetti = document.createElement('div');
        confetti.className = 'confetti';

        const size = Math.floor(Math.random()*10)+6;
        confetti.style.width = confetti.style.height = size + 'px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random()*colors.length)];
        confetti.style.left = Math.random()*window.innerWidth + 'px';
        confetti.style.top = Math.random()*window.innerHeight + 'px';

        container.appendChild(confetti);
    }

    container.style.opacity = 1;
    setTimeout(()=>container.style.opacity=0, 6000);
}