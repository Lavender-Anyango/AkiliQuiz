// const question = document.getElementById('question');
// const choices = Array.from(document.getElementsByClassName('choice-text'));
// const progressText = document.getElementById('progressText');
// const scoreText = document.getElementById('score');
// const progressBarFull = document.getElementById('progressBarFull');
// let currentQuestion = {};
// let acceptingAnswers = false;
// let score = 0;
// let questionCounter = 0;
// let availableQuesions = [];

// let questions = [];

// fetch('questions.json')
//     .then((res) => {
//         return res.json();
//     })
//     .then((loadedQuestions) => {
//         questions = loadedQuestions;
//         startGame();
//     })
//     .catch((err) => {
//         console.error(err);
//     });

// //CONSTANTS
// const CORRECT_BONUS = 10;
// const MAX_QUESTIONS = 3;

// startGame = () => {
//     questionCounter = 0;
//     score = 0;
//     availableQuesions = [...questions];
//     getNewQuestion();
// };

// getNewQuestion = () => {
//     if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
//         localStorage.setItem('mostRecentScore', score);
//         //go to the end page
//         return window.location.assign('/end.html');
//     }
//     questionCounter++;
//     progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
//     //Update the progress bar
//     progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

//     const questionIndex = Math.floor(Math.random() * availableQuesions.length);
//     currentQuestion = availableQuesions[questionIndex];
//     question.innerText = currentQuestion.question;

//     choices.forEach((choice) => {
//         const number = choice.dataset['number'];
//         choice.innerText = currentQuestion['choice' + number];
//     });

//     availableQuesions.splice(questionIndex, 1);
//     acceptingAnswers = true;
// };

// choices.forEach((choice) => {
//     choice.addEventListener('click', (e) => {
//         if (!acceptingAnswers) return;

//         acceptingAnswers = false;
//         const selectedChoice = e.target;
//         const selectedAnswer = selectedChoice.dataset['number'];

//         const classToApply =
//             selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

//         if (classToApply === 'correct') {
//             incrementScore(CORRECT_BONUS);
//         }

//         selectedChoice.parentElement.classList.add(classToApply);

//         setTimeout(() => {
//             selectedChoice.parentElement.classList.remove(classToApply);
//             getNewQuestion();
//         }, 1000);
//     });
// });

// incrementScore = (num) => {
//     score += num;
//     scoreText.innerText = score;
// };




const question = document.getElementById('question'); // Selects the element where the question will be displayed.
const choices = Array.from(document.getElementsByClassName('choice-text')); // Converts NodeList of choice elements into an array for easier manipulation.
const progressText = document.getElementById('progressText'); // Selects the element to display the progress of the quiz.
const scoreText = document.getElementById('score'); // Selects the element to display the user's score.
const progressBarFull = document.getElementById('progressBarFull'); // Selects the element representing the progress bar.
let currentQuestion = {}; // Initializes an empty object to hold the current question.
let acceptingAnswers = false; // Flag to indicate whether answers are currently being accepted.
let score = 0; // Initializes the user's score.
let questionCounter = 0; // Counter for the current question number.
let availableQuesions = []; // Array to hold the questions that haven't been asked yet.
let questions = []; // Array to hold all the questions fetched from the JSON file.

fetch('questions.json') // Fetches the questions from a JSON file.
   .then((res) => { // Once the promise resolves, parse the response as JSON.
        return res.json();
    })
   .then((loadedQuestions) => { // When the JSON is successfully parsed, assign it to the questions array and start the game.
        questions = loadedQuestions;
        startGame();
    })
   .catch((err) => { // If there's an error during fetching or parsing, log it to the console.
        console.error(err);
    });

// CONSTANTS
const CORRECT_BONUS = 10; // Bonus points for a correct answer.
const MAX_QUESTIONS = 6; // Maximum number of questions the user can attempt.

startGame = () => { // Function to initialize the game.
    questionCounter = 0; // Reset the question counter.
    score = 0; // Reset the score.
    availableQuesions = [...questions]; // Copy the questions array to availableQuesions.
    getNewQuestion(); // Load the first question.
};

getNewQuestion = () => { // Function to load a new question.
    if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) { // Check if there are no more questions or if the max questions limit is reached.
        localStorage.setItem('mostRecentScore', score); // Save the score to local storage.
        // Redirect to the end page.
        return window.location.assign('/end.html');
    }
    questionCounter++; // Increment the question counter.
    progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`; // Update the progress text.
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`; // Update the progress bar width.
    const questionIndex = Math.floor(Math.random() * availableQuesions.length); // Randomly select a question index.
    currentQuestion = availableQuesions[questionIndex]; // Set the current question.
    question.innerText = currentQuestion.question; // Display the question.
    choices.forEach((choice) => { // Iterate through each choice element.
        const number = choice.dataset['number']; // Get the dataset attribute for the choice number.
        choice.innerText = currentQuestion['choice' + number]; // Update the choice text.
    });
    availableQuesions.splice(questionIndex, 1); // Remove the current question from the available questions.
    acceptingAnswers = true; // Allow answers to be accepted.
};

choices.forEach((choice) => { // Add click event listeners to each choice element.
    choice.addEventListener('click', (e) => { // When a choice is clicked...
        if (!acceptingAnswers) return; //...if answers aren't being accepted, exit early.
        acceptingAnswers = false; // Stop accepting answers.
        const selectedChoice = e.target; // Get the clicked choice element.
        const selectedAnswer = selectedChoice.dataset['number']; // Get the dataset attribute for the selected answer.
        const classToApply = selectedAnswer == currentQuestion.answer? 'correct' : 'incorrect'; // Determine the class to apply based on correctness.
        if (classToApply === 'correct') { // If the answer is correct...
            incrementScore(CORRECT_BONUS); //...increase the score by the bonus.
        }
        selectedChoice.parentElement.classList.add(classToApply); // Apply the determined class to the choice element.
        setTimeout(() => { // After a delay...
            selectedChoice.parentElement.classList.remove(classToApply); //...remove the class.
            getNewQuestion(); // Load the next question.
        }, 1000);
    });
});

incrementScore = (num) => { // Function to increment the score.
    score += num; // Increase the score by the passed number.
    scoreText.innerText = score; // Update the score text.
};
