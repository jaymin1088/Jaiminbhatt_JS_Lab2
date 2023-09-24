const quizData = [
  {
    question: "What is the capital of France?",
    answers: ["Paris", "Berlin", "Madrid", "Rome"],
    correct: 0,
  },
  {
    question: "Which programming language is used for web development?",
    answers: ["Java", "Python", "JavaScript", "C++"],
    correct: 2,
  },
  // Add more questions and answers here
];

let currentQuestion = 0;
let score = 0;

const questionElement = document.getElementById("question");
const choiceElements = Array.from(document.querySelectorAll(".choice-btn"));

function loadQuestion() {
  const currentQuizData = quizData[currentQuestion];
  questionElement.textContent = currentQuizData.question;
  currentQuizData.answers.forEach((answer, index) => {
    choiceElements[index].textContent = answer;
    choiceElements[index].addEventListener("click", () => checkAnswer(index));
  });
  updateProgress();
}

function checkAnswer(selected) {
  const currentQuizData = quizData[currentQuestion];
  if (selected === currentQuizData.correct) {
    score++;
  }
  currentQuestion++;
  if (currentQuestion < quizData.length) {
    loadQuestion();
  } else {
    showScore();
  }
}

function updateProgress() {
  const progressElement = document.getElementById("progress");
  progressElement.textContent = `Question ${currentQuestion + 1} of ${
    quizData.length
  }`;
}

function showScore() {
  const quizElement = document.getElementById("quiz");
  const percentage = ((score / quizData.length) * 100).toFixed(2);
  quizElement.innerHTML = `
      <h1>Your Score: ${score}/${quizData.length}</h1>
      <p><h4><center>You Achived  ${percentage}% </h4> </center> </p>
    `;
}

// Start the quiz by loading the first question
loadQuestion();
