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

/* 🎬 ENTERTAINMENT ---------------------------------- */

let moviesBank = [
  "inception","avatar","titanic","rocky","jaws",
  "gladiator","frozen","coco","dune","moana",
  "up","shrek","aladdin","memento","brave",
  "zootopia","cars","ratatouille","halloween","twilight"
];

let tvBank = [
  "friends","sherlock","glee","suits","lost",
  "arrow","psych","bones","frasier","dexter",
  "scrubs","office","community","supergirl","gotham",
  "vikings","lucifer","manifest","reacher","columbo"
];

let charactersBank = [
  "mario","elsa","batman","spiderman","harry","hermione",
  "yoda","shrek","gandalf","pikachu",
  "katniss","thor","loki","woody","buzz",
  "scooby","velma","moana","tiana","stitch"
];

let gamesBank = [
  "minecraft","fortnite","zelda","pokemon","halo",
  "overwatch","roblox","skyrim","portal","doom",
  "terraria","valorant","league","diablo","fallout",
  "bioshock","metroid","kirby","sonic","tetris"
];

let musicBank = [
  "beyonce","rihanna","drake","adele","weeknd",
  "bruno","sza","usher","pink","shakira",
  "doja","olivia","ariana","bts","coldplay",
  "nirvana","queen","journey","rihanna","rihanna"
];

/* 🌍 REAL WORLD ------------------------------------- */

let countriesBank = [
  "canada","brazil","france","germany","japan",
  "mexico","italy","india","spain","egypt",
  "china","sweden","norway","chile","argentina",
  "peru","greece","turkey","ireland","poland"
];

let citiesBank = [
  "paris","tokyo","london","sydney","dubai",
  "rome","berlin","toronto","miami","seattle",
  "vienna","oslo","madrid","lisbon","athens",
  "cairo","jakarta","seoul","boston","dallas"
];

let landmarksBank = [
  "colosseum","pyramids","eiffel","bigben","acropolis",
  "stonehenge","machupicchu","tajmahal","liberty","sphinx",
  "petra","angkor","chichenitza","mountfuji","everest",
  "niagara","grandcanyon","uluru","christredeemer","leaningtower"
];

let jobsBank = [
  "teacher","doctor","lawyer","chef","artist",
  "engineer","nurse","pilot","writer","farmer",
  "dentist","barber","cashier","plumber","electrician",
  "mechanic","scientist","librarian","firefighter","carpenter"
];

/* 🧠 BRAINY CATEGORIES ------------------------------- */

let scienceBank = [
  "gravity","atom","molecule","energy","photosynthesis",
  "evolution","voltage","friction","ecosystem","protein",
  "neutron","electron","galaxy","oxygen","carbon",
  "biology","chemistry","physics","geology","cellular"
];

let legalBank = [
  "evidence","verdict","jury","contract","appeal",
  "statute","witness","hearing","justice","rights",
  "lawyer","defense","prosecution","settlement","injunction",
  "liability","notary","petition","precedent","testimony"
];

let medicalBank = [
  "vaccine","therapy","diagnosis","symptom","fracture",
  "immune","allergy","infection","surgery","nervous",
  "circulation","respiration","antibiotic","hormone","muscle",
  "tendon","cartilage","virus","bacteria","treatment"
];

let technologyBank = [
  "software","hardware","network","database","algorithm",
  "browser","server","robotics","sensor","encryption",
  "processor","monitor","keyboard","wireless","bluetooth",
  "firewall","storage","compiler","interface","protocol"
];

/* 🍔 EVERYDAY STUFF ---------------------------------- */

let foodBank = [
  "pizza","burger","pasta","sushi","taco",
  "salad","cookie","cereal","smoothie","pancake",
  "waffle","sandwich","noodles","steak","fries",
  "popcorn","brownie","muffin","omelette","lasagna"
];

let clothingBank = [
  "nike","adidas","puma","reebok","levi",
  "gap","zara","uniqlo","crocs","vans",
  "hollister","aeropostale","converse","northface","columbia",
  "patagonia","champion","fila","skechers","timberland"
];

let schoolBank = [
  "math","science","history","english","art",
  "music","biology","chemistry","algebra","geography",
  "physics","writing","reading","grammar","calculus",
  "spanish","french","economics","health","geometry"
];

let sportsBank = [
  "soccer","basketball","baseball","tennis","hockey",
  "golf","boxing","swimming","volleyball","football",
  "rugby","cricket","skating","skiing","surfing",
  "bowling","cycling","wrestling","rowing","track"
];

/* 🎮 GAME-FRIENDLY ---------------------------------- */

let longwordsBank = [
  "imagination","celebration","information","generation","adventure",
  "motivation","population","foundation","technology","chocolate",
  "friendship","leadership","creativity","incredible","remarkable",
  "understand","appreciate","confidence","experience","challenge"
];

let shortwordsBank = [
  "cat","dog","sun","map","cup",
  "hat","pen","car","box","key",
  "bed","egg","ice","jam","lip",
  "owl","pie","toy","web","zip"
];

let difficultBank = [
  "rhythm","oxygen","awkward","pneumonia","mnemonic",
  "bouquet","chaos","genuine","jealous","subtle",
  "whistle","yacht","numb","psychic","receipt",
  "island","plaque","rogue","sword","debris"
];

let compoundBank = [
  "sunflower","notebook","raincoat","football","snowman",
  "toothbrush","backpack","cupcake","moonlight","starlight",
  "firefly","lighthouse","playground","haircut","handshake",
  "bookstore","airport","earthquake","bedroom","rainbow"
];

// --------------------------
// GAME STATE VARIABLES
// --------------------------
// (renamed for clarity)

let secretWord = "";
let guessedLetters = [];
let remainingGuesses = 0;
let wrongGuesses = 0;
let gameOver = false;

let currentLevel = "";
let currentCategory = "";

// --------------------------
// PAGE LOAD
// --------------------------
// Reads URL params and starts the game.

document.addEventListener("DOMContentLoaded", function () {

    const params = new URLSearchParams(window.location.search);
    const mode = params.get("mode");
    const category = params.get("category");

    currentCategory = category; // ai debug: store category globally

    startGame(mode, category);

    const letterInput = document.getElementById("letterInput");
    if (letterInput) {
        letterInput.addEventListener("keypress", function (e) {
            if (e.key === "Enter") guessLetter();
        });
    }
});

// --------------------------
// START GAME
// --------------------------
function startGame(level, category) {

    // store mode + category
    if (!level) level = currentLevel;
    else currentLevel = level;

    if (!category) category = currentCategory;
    else currentCategory = category;

    // reset state
    guessedLetters = [];
    wrongGuesses = 0;
    remainingGuesses = 8;
    gameOver = false;

    // reset UI
    const remainingDisplay = document.getElementById("remaining-count");
    if (remainingDisplay) remainingDisplay.textContent = remainingGuesses;

    const gameMessage = document.getElementById("gameOverMessage");
    if (gameMessage) {
        gameMessage.textContent = "";
        gameMessage.classList.remove("game-over");
    }

    // pick word
    let randomIndex;

    // difficulty modes
    if (level === "easy") {
        randomIndex = Math.floor(Math.random() * easyWordBank.length);
        secretWord = easyWordBank[randomIndex].toUpperCase();
    }
    else if (level === "medium") {
        randomIndex = Math.floor(Math.random() * medWordBank.length);
        secretWord = medWordBank[randomIndex].toUpperCase();
    }
    else if (level === "hard") {
        randomIndex = Math.floor(Math.random() * hardWordBank.length);
        secretWord = hardWordBank[randomIndex].toUpperCase();
    }
    else if (level === "random") {
        randomIndex = Math.floor(Math.random() * randomWordBank.length);
        secretWord = randomWordBank[randomIndex].toUpperCase();
    }

    // category modes
    else if (category === "movies") {
        secretWord = moviesBank[
            Math.floor(Math.random() * moviesBank.length)
        ].toUpperCase();
    }
    else if (category === "tv") {
        secretWord = tvBank[
            Math.floor(Math.random() * tvBank.length)
        ].toUpperCase();
    }
    else if (category === "characters") {
        secretWord = charactersBank[
            Math.floor(Math.random() * charactersBank.length)
        ].toUpperCase();
    }
    else if (category === "games") {
        secretWord = gamesBank[
            Math.floor(Math.random() * gamesBank.length)
        ].toUpperCase();
    }
    else if (category === "music") {
        secretWord = musicBank[
            Math.floor(Math.random() * musicBank.length)
        ].toUpperCase();
    }

    else if (category === "countries") {
        secretWord = countriesBank[
            Math.floor(Math.random() * countriesBank.length)
        ].toUpperCase();
    }
    else if (category === "cities") {
        secretWord = citiesBank[
            Math.floor(Math.random() * citiesBank.length)
        ].toUpperCase();
    }
    else if (category === "landmarks") {
        secretWord = landmarksBank[
            Math.floor(Math.random() * landmarksBank.length)
        ].toUpperCase();
    }
    else if (category === "jobs") {
        secretWord = jobsBank[
            Math.floor(Math.random() * jobsBank.length)
        ].toUpperCase();
    }

    else if (category === "science") {
        secretWord = scienceBank[
            Math.floor(Math.random() * scienceBank.length)
        ].toUpperCase();
    }
    else if (category === "legal") {
        secretWord = legalBank[
            Math.floor(Math.random() * legalBank.length)
        ].toUpperCase();
    }
    else if (category === "medical") {
        secretWord = medicalBank[
            Math.floor(Math.random() * medicalBank.length)
        ].toUpperCase();
    }
    else if (category === "technology") {
        secretWord = technologyBank[
            Math.floor(Math.random() * technologyBank.length)
        ].toUpperCase();
    }

    else if (category === "food") {
        secretWord = foodBank[
            Math.floor(Math.random() * foodBank.length)
        ].toUpperCase();
    }
    else if (category === "clothing") {
        secretWord = clothingBank[
            Math.floor(Math.random() * clothingBank.length)
        ].toUpperCase();
    }
    else if (category === "school") {
        secretWord = schoolBank[
            Math.floor(Math.random() * schoolBank.length)
        ].toUpperCase();
    }
    else if (category === "sports") {
        secretWord = sportsBank[
            Math.floor(Math.random() * sportsBank.length)
        ].toUpperCase();
    }

    else if (category === "longwords") {
        secretWord = longwordsBank[
            Math.floor(Math.random() * longwordsBank.length)
        ].toUpperCase();
    }
    else if (category === "shortwords") {
        secretWord = shortwordsBank[
            Math.floor(Math.random() * shortwordsBank.length)
        ].toUpperCase();
    }
    else if (category === "difficult") {
        secretWord = difficultBank[
            Math.floor(Math.random() * difficultBank.length)
        ].toUpperCase();
    }
    else if (category === "compound") {
        secretWord = compoundBank[
            Math.floor(Math.random() * compoundBank.length)
        ].toUpperCase();
    }

    // update UI
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
    if (!inputBox) return;

    let letter = inputBox.value.trim().toUpperCase();
    inputBox.value = "";

    // invalid input
    if (!/^[A-Z]$/.test(letter)) {
        if (warning) {
            warning.textContent = "Please guess a letter";
            warning.style.display = "block";
        }
        return;
    }

    // already guessed
    if (guessedLetters.includes(letter)) {
        if (warning) {
            warning.textContent = "You already guessed that letter";
            warning.style.display = "block";
        }
        return;
    }

    guessedLetters.push(letter);
    if (warning) warning.style.display = "none";

    // wrong guess
    if (!secretWord.includes(letter)) {
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

// DISPLAY
function updateDisplay() {
    const wordEl = document.getElementById("wordDisplay");
    if (!wordEl) return;

    let display = "";
    for (let char of secretWord) {
        if (guessedLetters.includes(char)) display += char + " ";
        else if (gameOver) display += `<span style="color:red">${char}</span> `;
        else display += "_ ";
    }

    wordEl.innerHTML = display;
}

function updateGuessedLetters() {
    const guessedEl = document.getElementById("guessedLetters");
    if (!guessedEl) return;

    guessedEl.textContent = "Guessed: " + guessedLetters.join(" ");
}

function updateRemainingDisplay() {
    const remainingEl = document.getElementById("remaining-count");
    if (remainingEl) remainingEl.textContent = remainingGuesses;
}

function shakeHangman() {
    const hangman = document.getElementById("hangman");
    if (hangman) {
        hangman.classList.add("shake");
        setTimeout(() => hangman.classList.remove("shake"), 500);
    }
}

function updateDangerMode() {
    const dangerEl = document.querySelector(".danger-mode");
    if (!dangerEl) return;

    if (remainingGuesses === 1 && !gameOver) dangerEl.classList.add("danger-mode-active");
    else dangerEl.classList.remove("danger-mode-active");
}

// WIN / LOSE
function checkWin() {
    let allFound = true;

    for (let char of secretWord) {
        if (!guessedLetters.includes(char)) allFound = false;
    }

    if (allFound) {
        gameOver = true;

        const winImg = document.getElementById("stagesImg");
        if (winImg) winImg.src = "Untitled-10.png";

        const gameMsg = document.getElementById("gameOverMessage");
        if (gameMsg) {
            gameMsg.textContent = "You Win! 🎉💥";
            gameMsg.classList.remove("game-over");
        }

        updateDangerMode();
        launchConfetti(); // ai-generated effect
    }
}

function checkGameOver() {
    if (remainingGuesses <= 0) {
        gameOver = true;

        const gameMsg = document.getElementById("gameOverMessage");
        if (gameMsg) {
            gameMsg.textContent = "Game Over!";
            gameMsg.classList.add("game-over");
        }

        updateDisplay(); // reveal missed letters
        updateDangerMode();
    }
}
// IMAGE + CONFETTI
function updateImage() {
    const img = document.getElementById("stagesImg");
    if (!img) return;

    // win image
    if (gameOver && secretWord.split('').every(l => guessedLetters.includes(l))) {
        img.src = "Untitled-10.png";
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

    img.src = image;
}

// ai-generated confetti effect
function launchConfetti() {
    const container = document.getElementById("confetti-container");
    if (!container) return;

    container.innerHTML = "";

    const colors = [
        '#f94144','#f3722c','#f9c74f','#90be6d','#577590',
        '#43aa8b','#4d908e','#f9844a','#f8961e','#f7b267'
    ];

    for (let i = 0; i < 450; i++) {
        const confetti = document.createElement("div");
        confetti.className = "confetti";

        const size = Math.floor(Math.random() * 10) + 6;
        confetti.style.width = confetti.style.height = size + "px";

        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * window.innerWidth + "px";
        confetti.style.top = Math.random() * window.innerHeight + "px";

        container.appendChild(confetti);
    }

    container.style.opacity = "1";
    setTimeout(() => container.style.opacity = "0", 6000);
}

// UI BUTTONS
// ai help
function goBack() {
    window.location.href = "index.html";
}

const instructionsTab = document.querySelector('.instructions-tab');
const instructionsSlideout = document.querySelector('.instructions-slideout');

instructionsTab.addEventListener('click', () => {
    instructionsSlideout.classList.toggle('active');
});
