
const startBtn = document.querySelector("#start-btn");
const cards = document.querySelectorAll(".card");
const questions = document.querySelector(".questions h1");
const options = document.querySelectorAll(".questions ul li span");
const timerCount = document.querySelector("#time strong");
const result = document.querySelector(".questions .result");
let scoreBlock = document.querySelector(".initials p strong");
let score = 0;
let userInput = document.querySelector("#userName");
let submit = document.querySelector("#submit");
let highScore = document.querySelector(".high-score ul");
const showScore = document.querySelector("#show-score");
const goBack = document.querySelector("#goBack");
const clearHighScore = document.querySelector("#clearHighScore");

// TIMER SETTING
let timer = 80;
let timerInterval;

// START BUTTON EVENT
startBtn.addEventListener("click", function(){

    // DISPLAY QUESTION SECTION
    cards[0].style.opacity = "1";
    cards[0].style.pointerEvents = "auto";

    // LOAD QUESTIONS
    loadQuestions();

    // DISPLAY TIMER
    document.querySelector("#time").style.display = "block";

    timerInterval = setInterval(function(){
        if(timer > 0)
        {
            timer--;
        }else
        {
            clearInterval(timerInterval);
        }

        // SET TIMER VALUE
        timerCount.textContent = timer;
    }, 1000);
});



// QUESTION BANK
const questionBank = [
    {
        q: "Commonly used data types DO Not Include:",
        opt1: "string",
        opt2: "booleans",
        opt3: "alerts",
        opt4: "numbers",
        ans: 3
    },
    {
        q: "The condition in an if / else statment is enclosed with ________:",
        opt1: "quotes",
        opt2: "curly brackets",
        opt3: "parenthesis",
        opt4: "square brackets",
        ans: 3
    },
    {
        q: "Arrays in JavaScript can be used to store _______:",
        opt1: "numbers and strings",
        opt2: "other arrays",
        opt3: "booleans",
        opt4: "all of the above",
        ans: 4
    },
    {
        q: "String values must be enclosed within ______ when being assigned to variables:",
        opt1: "commas",
        opt2: "curly brackets",
        opt3: "quotes",
        opt4: "parenthesis",
        ans: 3
    },
    {
        q: "A very useful tool used during development and debugging for printing content to the debugger is:",
        opt1: "JavaScript",
        opt2: "terminal/bash",
        opt3: "for loops",
        opt4: "console.log",
        ans: 4
    }
];



// QUESTION NUMBER
let questionNumber = 0;


// LOAD QUESTIONS AND OPTIONS
function loadQuestions()
{
    questions.textContent = questionBank[questionNumber].q;

    // Options
    options[0].textContent = "1. " + questionBank[questionNumber].opt1;
    options[1].textContent = "2. " + questionBank[questionNumber].opt2;
    options[2].textContent = "3. " + questionBank[questionNumber].opt3;
    options[3].textContent = "4. " + questionBank[questionNumber].opt4;
}



// CHOOSE ANSWER
options.forEach(function(element){
    element.addEventListener('click', function(){

        // CHECK FOR ANSWER
        if(questionBank[questionNumber].ans == element.id)
        {
            // LOAD NEW QUESTION
            questionNumber++;
            loadQuestions();

            // ADD SCORE
            score += 5;

            // RESULT 
            result.style.display = "block";
            result.textContent = "Correct";
        }else
        {
            // LOAD NEW QUESTION
            questionNumber++;
            loadQuestions();

            // SUBTRACT SECONDS
            timer -= 10;

            // RESULT
            result.style.display = "block";
            result.textContent = "Incorrect";
        }


        if(questionNumber == questionBank.length - 1)
        {
            cards[1].style.opacity = "1";
            cards[1].style.pointerEvents = "auto";
            clearInterval(timerInterval);
            scoreBlock.textContent = score;
        }

    });
});



// SUBMIT SCORE
submit.addEventListener("click", function(){

    // STORE HIGH SCORE
    if(userInput.value !== "")
    {
        localStorage.setItem(userInput.value, score);

        // DISPLAY HIGH SCORE
        cards[2].style.opacity = "1";
        cards[2].style.pointerEvents = "auto";

        // LOAD SCORE
        loadHighScore();

        // RESET QUESTION NUMBER
        questionNumber = 0;

        // RESET USER INPUT
        userInput.value = "";

        // RESET SCORE
        score = 0;
    }else
    {
        alert("Please provide the name!");
    }

});


showScore.addEventListener("click", function(){
    cards[2].style.opacity = "1";
    cards[2].style.pointerEvents = "auto";
    loadHighScore();

    // RESET TIMER
    resetTimer();
});


// LOAD HIGH SCORES
function loadHighScore()
{
    if(localStorage.length > 0)
    {
        highScore.innerHTML = "";
        for(let i=0; i < localStorage.length; i++)
        {
            highScore.innerHTML += "<li>" + (i+1) + ". " + localStorage.key(i) + " - " + localStorage.getItem(localStorage.key(i)) + "</li>";
        }
    }else
    {
        highScore.innerHTML = "<li style='background-color: red; color:white; text-align:center; font-size: 1.5em'>Score not registored yet!</li>";
    }
}



// Go Back Button
goBack.addEventListener("click", function(){
    cards.forEach(function(ele){
        ele.style.opacity = "0";
        ele.style.pointerEvents = "none";
    });

    // RESET TIMER
    resetTimer();
});


// CLEAR HIGH SCORE
clearHighScore.addEventListener("click", function(){
    localStorage.clear();
    loadHighScore();

});



// RESET TIMER
function resetTimer()
{
    // RESET TIMER
    timer = 80;

    // HIDE TIMER BUTTON
    document.querySelector("#time").style.display = "none";

    // CLEAR INTERVAL
    clearInterval(timerInterval);
}
