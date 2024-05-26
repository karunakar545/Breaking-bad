const questionContainer = document.getElementById('question-container');
const answerContainer = document.getElementById('answer-container');
const languageSelect = document.getElementById('language');
const getQuestionButton = document.getElementById('get-question');
const showAnswerButton = document.getElementById('show-answer');
const getAnotherButton = document.getElementById('get-another');
const subOptions = document.getElementById('sub-options');

 // Empty object to store loaded questions

function loadQuestions() {
  fetch('questions.json')
    .then(response => response.json())
    .then(data => {
      questions = data;
      populateLanguages(); // Call function to populate languages after data is loaded
    })
    .catch(error => {
      console.error('Error loading questions:', error);
      // Handle loading errors (e.g., display an error message to the user)
    });
}

function populateLanguages() {
  for (const language in questions) {
    const option = document.createElement('option');
    option.value = language;
    option.innerText = language;
    languageSelect.appendChild(option);
  }
}

function getQuestion(language) {
  if (language in questions) {
    const questionList = questions[language]; // Get the list of questions for the language
    // Fix: Use Math.random() to get a random index within the question list length
    const randomIndex = Math.floor(Math.random() * questionList.length);
    const randomQuestion = questionList[randomIndex];
    questionContainer.innerText = randomQuestion.question;
    answerContainer.innerText = randomQuestion.answer; // Pre-populate answer
    answerContainer.style.display = 'none'; // Initially hide the answer
    subOptions.style.display = 'block';
  } else {
    questionContainer.innerText = 'Sorry, no questions available for this language.';
    answerContainer.innerText = '';
    subOptions.style.display = 'none';
  }
}

getQuestionButton.addEventListener('click', () => {
  const language = languageSelect.value;
  getQuestion(language);
});

showAnswerButton.addEventListener('click', () => {
  answerContainer.style.display = 'block'; // Show the answer container on button click
});
let questions = {};

loadQuestions(); // Call the function to load questions on page load
