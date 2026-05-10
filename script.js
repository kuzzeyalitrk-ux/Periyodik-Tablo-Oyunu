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

let score = 0, lives = 3, currentQuestionIndex = 0, timer, timeLeft = 10, gameMode = "easy";
let shuffledElements = [];

function setMode(mode) {
    gameMode = mode;
    document.getElementById("startScreen").style.display = "none";
    document.getElementById("gameScreen").style.display = "block";
    startGame();
}

function startGame() {
    shuffledElements = [...elements].sort(() => Math.random() - 0.5);
    score = 0; lives = 3; currentQuestionIndex = 0;
    updateUI();
    showQuestion();
}

function updateUI() {
    document.getElementById("score").innerHTML = `Skor: ${score} | ❤️: ${lives}`;
}

function showQuestion() {
    if (currentQuestionIndex >= shuffledElements.length || lives <= 0) {
        endGame();
        return;
    }

    timeLeft = gameMode === "easy" ? 10 : 5;
    document.getElementById("questionCount").innerText = `Süre: ${timeLeft}s`;
    
    clearInterval(timer);
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById("questionCount").innerText = `Süre: ${timeLeft}s`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            wrongAnswer("Süre Doldu! ⏰");
        }
    }, 1000);

    const current = shuffledElements[currentQuestionIndex];
    // Zor modda %50 ihtimalle ters köşe sor (İsimden sembolü bulma)
    const isReverse = gameMode === "hard" ? Math.random() > 0.5 : false;
    let qText, correct, pool;

    if (isReverse) {
        qText = `"${current.name}" sembolü nedir?`;
        correct = current.symbol;
        pool = elements.map(e => e.symbol);
    } else {
        qText = `"${current.symbol}" hangi elementtir?`;
        correct = current.name;
        pool = elements.map(e => e.name);
    }

    document.getElementById("question").innerText = qText;
    const choicesDiv = document.getElementById("choices");
    choicesDiv.innerHTML = "";
    
    let currentChoices = [correct];
    while(currentChoices.length < 4) {
        let rand = pool[Math.floor(Math.random() * pool.length)];
        if(!currentChoices.includes(rand)) currentChoices.push(rand);
    }
    
    currentChoices.sort(() => Math.random() - 0.5).forEach(c => {
        const btn = document.createElement("button");
        btn.innerText = c;
        btn.onclick = () => {
            clearInterval(timer);
            if(c === correct) {
                score++;
                document.getElementById("result").innerText = "Doğru! 🎉";
                document.getElementById("result").style.color = "#2ecc71";
                currentQuestionIndex++;
                updateUI();
                setTimeout(() => { document.getElementById("result").innerText = ""; showQuestion(); }, 800);
            } else {
                wrongAnswer(`Yanlış! Doğru: ${correct}`);
            }
        };
        choicesDiv.appendChild(btn);
    });
}

function wrongAnswer(msg) {
    lives--;
    updateUI();
    document.getElementById("result").innerText = msg;
    document.getElementById("result").style.color = "#e74c3c";
    
    if (lives <= 0) {
        setTimeout(endGame, 1000);
    } else {
        currentQuestionIndex++;
        setTimeout(() => { document.getElementById("result").innerText = ""; showQuestion(); }, 1200);
    }
}

function endGame() {
    clearInterval(timer);
    document.getElementById("question").innerText = "Oyun Bitti!";
    document.getElementById("choices").innerHTML = `<button onclick="location.reload()" style="background-color: #3498db; width: 100%;">Tekrar Dene</button>`;
    document.getElementById("result").innerText = `Final Skoru: ${score}`;
    document.getElementById("result").style.color = "white";
}