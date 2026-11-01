// Samira's Knowledge Challenge
// The questions are stored in one array so they are easy to change.

const questions = [
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Mercury"],
    answer: "Mars",
    explanation: "Mars is called the Red Planet because iron minerals in its soil give it a reddish color."
  },
  {
    question: "Which part of a plant takes in water from the soil?",
    options: ["Flower", "Leaf", "Root", "Stem"],
    answer: "Root",
    explanation: "Roots absorb water and minerals from the soil and help hold the plant in place."
  },
  {
    question: "What is the largest ocean on Earth?",
    options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
    answer: "Pacific Ocean",
    explanation: "The Pacific Ocean is the largest and deepest ocean on our planet."
  },
  {
    question: "How many sides does a hexagon have?",
    options: ["Five", "Six", "Seven", "Eight"],
    answer: "Six",
    explanation: "A hexagon is a shape with six straight sides and six corners."
  },
  {
    question: "Which gas do humans need to breathe to stay alive?",
    options: ["Oxygen", "Carbon dioxide", "Helium", "Hydrogen"],
    answer: "Oxygen",
    explanation: "Our bodies use oxygen to release energy from food."
  }
];

const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const questionCount = document.getElementById("question-count");
const scoreLabel = document.getElementById("score-label");
const progressBar = document.getElementById("progress-bar");
const questionText = document.getElementById("question-text");
const answerOptions = document.getElementById("answer-options");
const feedback = document.getElementById("feedback");
const nextButton = document.getElementById("next-btn");

let currentQuestion = 0;
let score = 0;
let answerSelected = false;

document.getElementById("start-btn").addEventListener("click", startQuiz);
nextButton.addEventListener("click", showNextQuestion);
document.getElementById("restart-btn").addEventListener("click", startQuiz);

function showScreen(screenToShow) {
  startScreen.classList.add("hidden");
  quizScreen.classList.add("hidden");
  resultScreen.classList.add("hidden");
  screenToShow.classList.remove("hidden");
}

function startQuiz() {
  currentQuestion = 0;
  score = 0;
  showScreen(quizScreen);
  showQuestion();
}

function showQuestion() {
  answerSelected = false;
  nextButton.disabled = true;
  feedback.textContent = "";
  feedback.className = "feedback";

  const question = questions[currentQuestion];

  questionCount.textContent = `QUESTION ${currentQuestion + 1} OF ${questions.length}`;
  scoreLabel.textContent = `Score: ${score}`;
  progressBar.style.width = `${((currentQuestion + 1) / questions.length) * 100}%`;
  questionText.textContent = question.question;
  answerOptions.innerHTML = "";

  question.options.forEach(function(option) {
    const button = document.createElement("button");
    button.className = "option-btn";
    button.textContent = option;
    button.addEventListener("click", function() {
      checkAnswer(button, option);
    });
    answerOptions.appendChild(button);
  });

  nextButton.textContent = currentQuestion === questions.length - 1
    ? "See my result →"
    : "Next question →";
}

function checkAnswer(selectedButton, selectedAnswer) {
  if (answerSelected) return;

  answerSelected = true;
  const question = questions[currentQuestion];
  const allButtons = answerOptions.querySelectorAll(".option-btn");

  allButtons.forEach(function(button) {
    button.disabled = true;

    if (button.textContent === question.answer) {
      button.classList.add("correct");
    }
  });

  if (selectedAnswer === question.answer) {
    score++;
    feedback.textContent = `Correct! ${question.explanation}`;
    feedback.classList.add("good");
  } else {
    selectedButton.classList.add("wrong");
    feedback.textContent = `Not quite. ${question.explanation}`;
    feedback.classList.add("bad");
  }

  scoreLabel.textContent = `Score: ${score}`;
  nextButton.disabled = false;
}

function showNextQuestion() {
  currentQuestion++;

  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  showScreen(resultScreen);

  const percentage = Math.round((score / questions.length) * 100);
  document.getElementById("final-score").textContent = `${score}/${questions.length}`;
  document.getElementById("final-percent").textContent = `${percentage}%`;

  let title = "Good effort!";
  let message = "Keep practising. Every question is a chance to learn something new.";

  if (score === questions.length) {
    title = "Excellent work!";
    message = "You answered every question correctly. Amazing job!";
  } else if (score >= 3) {
    title = "Well done!";
    message = "You did a great job. Keep learning and growing!";
  }

  document.getElementById("result-title").textContent = title;
  document.getElementById("result-message").textContent = message;
}
