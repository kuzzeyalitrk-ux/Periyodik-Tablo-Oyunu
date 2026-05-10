const elements = [
    { symbol: "H", name: "Hidrojen" }, { symbol: "He", name: "Helyum" },
    { symbol: "Li", name: "Lityum" }, { symbol: "Be", name: "Berilyum" },
    { symbol: "B", name: "Bor" }, { symbol: "C", name: "Karbon" },
    { symbol: "N", name: "Azot" }, { symbol: "O", name: "Oksijen" },
    { symbol: "F", name: "Flor" }, { symbol: "Ne", name: "Neon" },
    { symbol: "Na", name: "Sodyum" }, { symbol: "Mg", name: "Magnezyum" },
    { symbol: "Al", name: "Alüminyum" }, { symbol: "Si", name: "Silisyum" },
    { symbol: "P", name: "Fosfor" }, { symbol: "S", name: "Kükürt" },
    { symbol: "Cl", name: "Klor" }, { symbol: "Ar", name: "Argon" },
    { symbol: "K", name: "Potasyum" }, { symbol: "Ca", name: "Kalsiyum" }
];

let score = 0;
let lives = 3;
let currentQuestionIndex = 0;
let shuffledElements = [];
let timer;
let timeLeft = 10; // Her soru için 10 saniye

const questionElement = document.getElementById("question");
const choicesElement = document.getElementById("choices");
const scoreElement = document.getElementById("score");
const resultElement = document.getElementById("result");

// Oyunu Başlat
function startGame() {
    shuffledElements = elements.sort(() => Math.random() - 0.5);
    score = 0;
    lives = 3;
    currentQuestionIndex = 0;
    updateUI();
    showQuestion();
}

function updateUI() {
    scoreElement.innerHTML = `Skor: ${score} | ❤️ Can: ${lives}`;
}

function startTimer() {
    timeLeft = 10;
    document.getElementById("questionCount").innerText = `Süre: ${timeLeft}s`;
    clearInterval(timer);
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById("questionCount").innerText = `Süre: ${timeLeft}s`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            wrongAnswer("Süre Doldu!");
        }
    }, 1000);
}

function showQuestion() {
    if (currentQuestionIndex >= shuffledElements.length || lives <= 0) {
        endGame();
        return;
    }

    startTimer();
    const currentElement = shuffledElements[currentQuestionIndex];
    questionElement.innerText = `${currentElement.symbol} sembolü hangi elemente aittir?`;
    choicesElement.innerHTML = "";

    let choices = [currentElement.name];
    while (choices.length < 4) {
        let randomName = elements[Math.floor(Math.random() * elements.length)].name;
        if (!choices.includes(randomName)) choices.push(randomName);
    }
    choices.sort(() => Math.random() - 0.5);

    choices.forEach(choice => {
        const button = document.createElement("button");
        button.innerText = choice;
        button.onclick = () => checkAnswer(choice);
        choicesElement.appendChild(button);
    });
}

function checkAnswer(selected) {
    clearInterval(timer);
    const correct = shuffledElements[currentQuestionIndex].name;
    if (selected === correct) {
        score++;
        resultElement.innerText = "Doğru! 🎉";
        resultElement.style.color = "#2ecc71";
    } else {
        wrongAnswer(`Yanlış! Doğru: ${correct}`);
        return; // wrongAnswer zaten showQuestion çağıracak
    }
    
    currentQuestionIndex++;
    updateUI();
    setTimeout(() => {
        resultElement.innerText = "";
        showQuestion();
    }, 1000);
}

function wrongAnswer(message) {
    lives--;
    updateUI();
    resultElement.innerText = message;
    resultElement.style.color = "#e74c3c";
    
    if (lives <= 0) {
        setTimeout(endGame, 1000);
    } else {
        currentQuestionIndex++;
        setTimeout(() => {
            resultElement.innerText = "";
            showQuestion();
        }, 1500);
    }
}

function endGame() {
    clearInterval(timer);
    questionElement.innerText = "Oyun Bitti!";
    choicesElement.innerHTML = "";
    if (lives <= 0) {
        resultElement.innerText = `Canın bitti! Toplam Skor: ${score}`;
    } else {
        resultElement.innerText = `Tebrikler! Tüm soruları tamamladın. Skor: ${score}`;
    }
    
    const restartBtn = document.createElement("button");
    restartBtn.innerText = "Yeniden Başla";
    restartBtn.onclick = startGame;
    choicesElement.appendChild(restartBtn);
}

startGame();
