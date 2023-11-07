document.addEventListener('DOMContentLoaded', function() {
    displayHighScores();
});
let timer;
let timeLeft = 60; // Initial time in seconds
let currentQuestionIndex = 0;
let score = 0;

const questions = [
    {
        question: "Which Pokemon is known as the 'Electric Mouse'?",
        options: ["Pikachu", "Charmander", "Squirtle", "Bulbasaur"],
        answer: "Pikachu"
    },
    {
        question: "What type of Pokemon is Pikachu?",
        options: ["Fire", "Water", "Electric", "Grass"],
        answer: "Electric"
    },
    {
        question: "Which Pokemon is also known as the 'Time Travel Pokemon'?",
        options: ["Jigglypuff", "Meowth", "Celebi", "Mew"],
        answer: "Celebi"
    },
    {
        question: "Which Pokemon is known for its sleep-inducing moves?",
        options: ["Snorlax", "Hypno", "Drowzee", "Jigglypuff"],
        answer: "Jigglypuff"
    },
    {
        question: "Which Pokemon has the ability to fly continuously without landing?",
        options: ["Lugia", "Articuno", "Ho-Oh", "Zapdos"],
        answer: "Ho-Oh"
    },
    {
        question: "What type of Pokemon is Charizard?",
        options: ["Fire", "Water", "Electric", "Grass"],
        answer: "Fire"
    },
    {
        question: "Which Pokemon has the highest base stat total?",
        options: ["Mewtwo", "Arceus", "Rayquaza", "Groudon"],
        answer: "Arceus"
    },
    {
        question: "What type of Pokemon is Jigglypuff?",
        options: ["Normal", "Fairy", "Psychic", "Dark"],
        answer: "Normal"
    },
    {
        question: "Which Pokemon is also known as the 'Fire Lizard'?",
        options: ["Squirtle", "Bulbasaur", "Charmander", "Charmeleon"],
        answer: "Charmander"
    },
    {
        question: "What type of Pokemon is Bulbasaur?",
        options: ["Grass", "Poison", "Bug", "Rock"],
        answer: "Grass"
    },
    {
        question: "Which Pokemon is known for its powerful psychic abilities?",
        options: ["Mewtwo", "Alakazam", "Kadabra", "Mr. Mime"],
        answer: "Mewtwo"
    },
    {
        question: "Which Pokemon is known as the 'Water-type Mouse'?",
        options: ["Pikachu", "Rattata", "Marill", "Pachirisu"],
        answer: "Marill"
    },
    {
        question: "What type of Pokemon is Squirtle?",
        options: ["Water", "Fire", "Grass", "Electric"],
        answer: "Water"
    },
    {
        question: "Which Pokemon is also known as the 'Seed Pokemon'?",
        options: ["Bulbasaur", "Ivysaur", "Oddish", "Bellsprout"],
        answer: "Bulbasaur"
    },
    {
        question: "Which Pokemon is known for its extreme speed?",
        options: ["Pikachu", "Electrode", "Jolteon", "Zapdos"],
        answer: "Electrode"
    },
    {
        question: "What type of Pokemon is Gengar?",
        options: ["Ghost", "Dark", "Poison", "Psychic"],
        answer: "Ghost"
    },
    {
        question: "Which Pokemon is also known as the 'Poison Bee'?",
        options: ["Beedrill", "Vespiquen", "Dustox", "Yanmega"],
        answer: "Beedrill"
    },
    {
        question: "What type of Pokemon is Beedrill?",
        options: ["Bug", "Poison", "Flying", "Bug/Flying"],
        answer: "Bug/Poison"
    },
    {
        question: "Which Pokemon is known as the 'Mystic Pokemon'?",
        options: ["Mew", "Jirachi", "Mesprit", "Azelf"],
        answer: "Mew"
    },
    {
        question: "What type of Pokemon is Mewtwo?",
        options: ["Psychic", "Dark", "Ghost", "Psychic/Fighting"],
        answer: "Psychic"
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
        timeLeft += 10; // Add 10 seconds for correct answer
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
