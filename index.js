let numQuestions = document.getElementById('numQuestions');
let numRange = document.getElementById('numRange');
let operations = document.getElementById('operations');
let timer = document.getElementById('timer');
let showCorrect = document.getElementById('showCorrect');
let startQuiz = document.getElementById('startQuiz');
let questionnaire = document.querySelector('.questionnaire');
let resultDiv = document.querySelector('.result');
let question = document.getElementById('question');
let answer = document.getElementById('answer');
let submitAnswer = document.getElementById('submitAnswer');
let result = document.getElementById('result');
let questionNumber = document.getElementById('questionNumber');
let score = document.getElementById('score');
let timeTaken = document.getElementById('timeTaken');
let chart = document.getElementById('chart');

let currentQuestion = 0;
let correctAnswers = 0;
let startTime;

startQuiz.addEventListener('click', startQuizHandler);

function startQuizHandler() {
    currentQuestion = 0;
    correctAnswers = 0;
    questionnaire.style.display = 'block';
    resultDiv.style.display = 'none';
    document.querySelector('.settings').style.display = 'none';
    startTime = new Date().getTime();
    generateQuestion();
}

function getRandomOperation() {
    const selectedOperations = Array.from(operations.selectedOptions).map(option => option.value);
    return selectedOperations[Math.floor(Math.random() * selectedOperations.length)];
}

function generateQuestion() {
    let num1 = Math.floor(Math.random() * numRange.value) + 1;
    let num2 = Math.floor(Math.random() * numRange.value) + 1;
    let operation = getRandomOperation();

    switch (operation) {
        case 'addition':
            question.textContent = `What is ${num1} + ${num2}?`;
            question.dataset.correctAnswer = num1 + num2;
            break;
        case 'subtraction':
            question.textContent = `What is ${num1} - ${num2}?`;
            question.dataset.correctAnswer = num1 - num2;
            break;
        case 'multiplication':
            question.textContent = `What is ${num1} × ${num2}?`;
            question.dataset.correctAnswer = num1 * num2;
            break;
        case 'division':
            question.textContent = `What is ${num1} ÷ ${num2}?`;
            question.dataset.correctAnswer = (num1 / num2).toFixed(2); 
            break;
    }

    questionNumber.textContent = `Question ${currentQuestion + 1} of ${numQuestions.value}`;
}

submitAnswer.addEventListener('click', submitAnswerHandler);

function submitAnswerHandler() {
    const correctAnswer = parseFloat(question.dataset.correctAnswer);

    if (parseFloat(answer.value) === correctAnswer) {
        correctAnswers++;
        result.textContent = showCorrect.checked?'Correct!':'';
    } else {
        result.textContent = showCorrect.checked?`Incorrect. The correct answer is ${correctAnswer}`:'';
    }

    if (showCorrect.checked) {
        result.textContent = `The correct answer is ${correctAnswer}.`;
    }

    answer.value = '';
    currentQuestion++;

    if (currentQuestion < numQuestions.value) {
        generateQuestion();
    } else {
        endQuiz();
    }
}

function endQuiz() {
    questionnaire.style.display = 'none';
    resultDiv.style.display = 'block';
    let endTime = new Date().getTime();
    let timeElapsed = (endTime - startTime) / 1000;
    timeTaken.textContent = timer.checked?`Time taken: ${timeElapsed} seconds`:'';
    score.textContent = `Score: ${correctAnswers} out of ${numQuestions.value} (${((correctAnswers / numQuestions.value) * 100).toFixed(2)}%)`;

    canvasHandle()
}
function canvasHandle(){
    let ctx = chart.getContext('2d');

ctx.clearRect(0, 0, chart.width, chart.height);

const centerX = chart.width / 2;
const centerY = chart.height / 2;
const radius = Math.min(chart.width, chart.height) / 2 - 20; 

ctx.beginPath();
ctx.moveTo(centerX, centerY);
ctx.arc(centerX, centerY, radius, 0, (correctAnswers / numQuestions.value) * 2 * Math.PI);
ctx.closePath();
ctx.fillStyle = '#4CAF50'; 
ctx.fill();

ctx.beginPath();
ctx.moveTo(centerX, centerY);
ctx.arc(centerX, centerY, radius, (correctAnswers / numQuestions.value) * 2 * Math.PI, 2 * Math.PI);
ctx.closePath();
ctx.fillStyle = '#ccc'; 
ctx.fill();

}
