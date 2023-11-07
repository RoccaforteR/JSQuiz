document.addEventListener('DOMContentLoaded', function() {
    displayHighScores();
});
let timer;
let timeLeft = 60; // Initial time in seconds
let currentQuestionIndex = 0;
let score = 0;

const questions = [
    {
        question: "What is the correct way to write a JavaScript array?",
        options: ["var colors = 'red', 'green', 'blue'", "var colors = (1:'red', 2:'green', 3:'blue')", "var colors = 1 = ('red'), 2 = ('green'), 3 = ('blue')", "var colors = ['red', 'green', 'blue']"],
        answer: "var colors = ['red', 'green', 'blue']"
    },
    {
        question: "What is the result of the following expression: 2 + 2 + '2'?",
        options: ["22", "4", "222", "Error"],
        answer: "42"
    },
    {
        question: "Which keyword is used to declare a variable in JavaScript?",
        options: ["variable", "v", "declare", "var"],
        answer: "var"
    },
    {
        question: "What is the purpose of the 'console.log()' method in JavaScript?",
        options: ["To display a message box", "To print the output to the console", "To create a new variable", "To add a new CSS style"],
        answer: "To print the output to the console"
    },
    {
        question: "What is the correct way to write a comment in JavaScript?",
        options: ["<!--This is a comment-->", "/*This is a comment*/", "//This is a comment", "**This is a comment**"],
        answer: "//This is a comment"
    }
];

const startButton = document.getElementById('startButton');
const questionContainer = document.getElementById('questionContainer');
const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const submitButton = document.getElementById('submitAnswer');
const timerElement = document.getElementById('timer');
const highScoresElement = document.getElementById('highScores');

startButton.addEventListener('click', startGame);

function startGame() {
    startButton.style.display = 'none';
    questionContainer.style.display = 'block';
    showQuestion();
    startTimer();
}

let selectedAnswer = null;

function showQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    optionsElement.innerHTML = "";
    currentQuestion.options.forEach((option) => {
        const optionElement = document.createElement('div');
        optionElement.classList.add('option');
        optionElement.textContent = option;
        optionElement.addEventListener('click', function () {
            selectedAnswer = option;
            highlightSelectedOption();
        });
        optionsElement.appendChild(optionElement);
    });
}

function highlightSelectedOption() {
    const options = document.querySelectorAll('.option');
    options.forEach((option) => {
        if (option.textContent === selectedAnswer) {
            option.style.backgroundColor = '#e3350d';
            option.style.color = '#fff';
        } else {
            option.style.backgroundColor = '#ffcb05';
            option.style.color = '#e3350d';
        }
    });
}

submitButton.addEventListener('click', moveToNextQuestion);

function moveToNextQuestion() {
    if (selectedAnswer !== null) {
        checkAnswer(selectedAnswer);
        selectedAnswer = null;
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion();
        } else {
            endGame();
        }
    }
}

function startTimer() {
    timer = setInterval(function() {
        timeLeft--;
        timerElement.textContent = `Time left: ${timeLeft}`;

        if (timeLeft <= 0) {
            endGame();
        }
    }, 1000);
}

function checkAnswer(userAnswer) {
    const currentQuestion = questions[currentQuestionIndex];
    if (userAnswer === currentQuestion.answer) {
        score++;
    } else {
        timeLeft -= 10; // Deduct 10 seconds for wrong answer
    }
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        endGame();
    }
}

function endGame() {
    clearInterval(timer);
    questionContainer.style.display = 'none';
    const initials = prompt('Please enter your initials:');
    saveScore(initials, score);
    displayHighScores();
    alert(`Game over! Your score is ${score}`);
}

function saveScore(initials, score) {
    let highScores = JSON.parse(localStorage.getItem('highScores')) || [];
    highScores.push({ initials, score });
    highScores.sort((a, b) => b.score - a.score);
    highScores = highScores.slice(0, 5); // Keep only the top 5 high scores
    localStorage.setItem('highScores', JSON.stringify(highScores));
}

function displayHighScores() {
    highScoresElement.innerHTML = '<h2>High Scores</h2>';
    const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
    highScores.forEach((entry, index) => {
        const highScoreElement = document.createElement('p');
        highScoreElement.textContent = `${index + 1}. ${entry.initials} - ${entry.score}`;
        highScoresElement.appendChild(highScoreElement);
    });
}
