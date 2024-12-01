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

function generateQuestion() {
    let num1 = Math.floor(Math.random() * numRange.value) + 1;
    let num2 = Math.floor(Math.random() * numRange.value) + 1;
    let operation = operations.value;

    switch (operation) {
        case 'addition':
            question.textContent = `What is ${num1} + ${num2}?`;
            break;
        case 'subtraction':
            question.textContent = `What is ${num1} - ${num2}?`;
            break;
        case 'multiplication':
            question.textContent = `What is ${num1} × ${num2}?`;
            break;
        case 'division':
            question.textContent = `What is ${num1} ÷ ${num2}?`;
            break;
    }

    questionNumber.textContent = `Question ${currentQuestion + 1} of ${numQuestions.value}`;
}

submitAnswer.addEventListener('click', submitAnswerHandler);

function submitAnswerHandler() {
    let correctAnswer;
    let num1 = parseInt(question.textContent.split(' ')[2]);
    let num2 = parseInt(question.textContent.split(' ')[4]);
    let operation = operations.value;

    switch (operation) {
        case 'addition':
            correctAnswer = num1 + num2;
            break;
        case 'subtraction':
            correctAnswer = num1 - num2;
            break;
        case 'multiplication':
            correctAnswer = num1 * num2;
            break;
        case 'division':
            correctAnswer = num1 / num2;
            break;
    }

    if (parseInt(answer.value) === correctAnswer) {
        correctAnswers++;
        result.textContent = 'Correct!';
    } else {
        result.textContent = `Incorrect. The correct answer is ${correctAnswer}.`;
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
    timeTaken.textContent = `Time taken: ${timeElapsed} seconds`;
    score.textContent = `Score: ${correctAnswers} out of ${numQuestions.value} (${(correctAnswers / numQuestions.value) * 100}%)`;

    // Draw chart
    let ctx = chart.getContext('2d');
    ctx.clearRect(0, 0, chart.width, chart.height);
    ctx.beginPath();
    ctx.arc(chart.width / 2, chart.height / 2, chart.width / 2 - 20, 0, (correctAnswers / numQuestions.value) * 2 * Math.PI);
    ctx.fillStyle = '#4CAF50';
    ctx.fill();
    ctx.beginPath();
    ctx.arc(chart.width / 2, chart.height / 2, chart.width / 2 - 20, (correctAnswers / numQuestions.value) * 2 * Math.PI, 2 * Math.PI);
    ctx.fillStyle = '#ccc';
    ctx.fill();
}
