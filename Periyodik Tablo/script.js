const elements = [
    {symbol:"H",name:"Hidrojen"}, {symbol:"He",name:"Helyum"},
    {symbol:"Li",name:"Lityum"}, {symbol:"Be",name:"Berilyum"},
    {symbol:"B",name:"Bor"}, {symbol:"C",name:"Karbon"},
    {symbol:"N",name:"Azot"}, {symbol:"O",name:"Oksijen"},
    {symbol:"F",name:"Flor"}, {symbol:"Ne",name:"Neon"},
    {symbol:"Na",name:"Sodyum"}, {symbol:"Mg",name:"Magnezyum"},
    {symbol:"Al",name:"Alüminyum"}, {symbol:"Si",name:"Silisyum"},
    {symbol:"P",name:"Fosfor"}, {symbol:"S",name:"Kükürt"},
    {symbol:"Cl",name:"Klor"}, {symbol:"Ar",name:"Argon"},
    {symbol:"K",name:"Potasyum"}, {symbol:"Ca",name:"Kalsiyum"}
];

let score = 0;
let questionNumber = 0;
let currentQuestion;
let usedQuestions = [];

function shuffle(array){
    return array.sort(() => Math.random() - 0.5);
}

function startGame(){
    score = 0;
    questionNumber = 0;
    usedQuestions = [];
    document.getElementById("gameScreen").style.display = "block";
    document.getElementById("endScreen").style.display = "none";
    nextQuestion();
}

function nextQuestion(){
    if(questionNumber >= 20){
        endGame();
        return;
    }
    document.getElementById("result").innerHTML = "";
    let available = elements.filter(e => !usedQuestions.includes(e.symbol));
    currentQuestion = available[Math.floor(Math.random() * available.length)];
    usedQuestions.push(currentQuestion.symbol);
    questionNumber++;
    document.getElementById("question").innerHTML = currentQuestion.symbol + " elementinin adı nedir?";
    document.getElementById("score").innerHTML = "Doğru: " + score;
    document.getElementById("questionCount").innerHTML = "Soru: " + questionNumber + " / 20";

    let choices = [currentQuestion.name];
    while(choices.length < 4){
        let randomName = elements[Math.floor(Math.random() * elements.length)].name;
        if(!choices.includes(randomName)){
            choices.push(randomName);
        }
    }
    choices = shuffle(choices);
    let html = "";
    choices.forEach(choice => {
        html += `<button onclick="checkAnswer('${choice}')">${choice}</button>`;
    });
    document.getElementById("choices").innerHTML = html;
}

function checkAnswer(answer){
    if(answer === currentQuestion.name){
        score++;
        document.getElementById("result").innerHTML = "✅ Doğru!";
    }else{
        document.getElementById("result").innerHTML = "❌ Yanlış! Doğru: " + currentQuestion.name;
    }
    document.getElementById("score").innerHTML = "Doğru: " + score;
    setTimeout(nextQuestion, 1000);
}

function endGame(){
    document.getElementById("gameScreen").style.display = "none";
    document.getElementById("endScreen").style.display = "block";
    document.getElementById("finalMessage").innerHTML = score >= 15 ? "🏆 KAZANDIN!" : "💀 KAYBETTİN!";
    document.getElementById("finalScore").innerHTML = "Doğru Sayın: " + score + " / 20";
}

function restartGame(){ startGame(); }
function closeGame(){
    document.body.innerHTML = `<div style="display:flex;justify-content:center;align-items:center;height:100vh;background:#020617;color:white;font-size:50px;font-family:Arial;">👋 Oyun Kapatıldı</div>`;
}

startGame();