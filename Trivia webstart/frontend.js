// Variables globales del juego
let currentQuestionIndex = 0;
let score = 0;
let selectedQuestions = [];
let selectedAnswer = null;
let scoreByDifficulty = {
    easy: 0,
    medium: 0,
    hard: 0
};

// Referencias a elementos DOM
const welcomeScreen = document.getElementById('welcomeScreen');
const quizScreen = document.getElementById('quizScreen');
const resultsScreen = document.getElementById('resultsScreen');
const startBtn = document.getElementById('startBtn');
const nextBtn = document.getElementById('nextBtn');
const restartBtn = document.getElementById('restartBtn');
const progress = document.getElementById('progress');
const questionNumber = document.getElementById('questionNumber');
const difficultyBadge = document.getElementById('difficultyBadge');
const questionElement = document.getElementById('question');
const optionsContainer = document.getElementById('options');

// Función para seleccionar preguntas aleatorias
function selectRandomQuestions() {
    selectedQuestions = [];
    
    // Seleccionar 3 preguntas fáciles
    const easyQuestions = getRandomQuestions(questionsDatabase.easy, 3);
    easyQuestions.forEach(q => selectedQuestions.push({...q, difficulty: 'easy'}));
    
    // Seleccionar 3 preguntas regulares
    const mediumQuestions = getRandomQuestions(questionsDatabase.medium, 3);
    mediumQuestions.forEach(q => selectedQuestions.push({...q, difficulty: 'medium'}));
    
    // Seleccionar 4 preguntas difíciles
    const hardQuestions = getRandomQuestions(questionsDatabase.hard, 4);
    hardQuestions.forEach(q => selectedQuestions.push({...q, difficulty: 'hard'}));
    
    // Mezclar las preguntas para que no aparezcan en orden de dificultad
    selectedQuestions = shuffleArray(selectedQuestions);
}

// Función para obtener preguntas aleatorias de una categoría
function getRandomQuestions(questionArray, count) {
    const shuffled = shuffleArray([...questionArray]);
    return shuffled.slice(0, count);
}

// Función para mezclar un array (Fisher-Yates shuffle)
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Función para iniciar el juego
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    selectedAnswer = null;
    scoreByDifficulty = { easy: 0, medium: 0, hard: 0 };
    
    selectRandomQuestions();
    showScreen('quiz');
    displayQuestion();
}

// Función para mostrar una pantalla específica
function showScreen(screenName) {
    welcomeScreen.style.display = 'none';
    quizScreen.style.display = 'none';
    resultsScreen.style.display = 'none';
    
    switch(screenName) {
        case 'welcome':
            welcomeScreen.style.display = 'block';
            break;
        case 'quiz':
            quizScreen.style.display = 'block';
            quizScreen.classList.add('active');
            break;
        case 'results':
            resultsScreen.style.display = 'block';
            resultsScreen.classList.add('active');
            break;
    }
}

// Función para mostrar la pregunta actual
function displayQuestion() {
    if (currentQuestionIndex >= selectedQuestions.length) {
        showResults();
        return;
    }
    
    const question = selectedQuestions[currentQuestionIndex];
    selectedAnswer = null;
    
    // Actualizar información de la pregunta
    questionNumber.textContent = `Pregunta ${currentQuestionIndex + 1}/10`;
    
    // Actualizar badge de dificultad
    difficultyBadge.textContent = getDifficultyText(question.difficulty);
    difficultyBadge.className = `difficulty-badge difficulty-${question.difficulty}`;
    
    // Mostrar pregunta
    questionElement.textContent = question.question;
    
    // Limpiar y crear opciones
    optionsContainer.innerHTML = '';
    question.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.className = 'option';
        optionElement.textContent = `${String.fromCharCode(65 + index)}. ${option}`;
        optionElement.addEventListener('click', () => selectOption(index, optionElement));
        optionsContainer.appendChild(optionElement);
    });
    
    // Actualizar barra de progreso
    const progressPercent = ((currentQuestionIndex + 1) / selectedQuestions.length) * 100;
    progress.style.width = `${progressPercent}%`;
    
    // Deshabilitar botón siguiente
    nextBtn.classList.remove('enabled');
    nextBtn.textContent = currentQuestionIndex === selectedQuestions.length - 1 ? 'Ver Resultados' : 'Siguiente';
}

// Función para obtener texto de dificultad
function getDifficultyText(difficulty) {
    switch(difficulty) {
        case 'easy': return 'Fácil';
        case 'medium': return 'Regular';
        case 'hard': return 'Difícil';
        default: return 'Regular';
    }
}

// Función para seleccionar una opción
function selectOption(optionIndex, optionElement) {
    // Limpiar selecciones anteriores
    document.querySelectorAll('.option').forEach(opt => {
        opt.classList.remove('selected');
        opt.classList.remove('disabled');
    });
    
    // Marcar opción seleccionada
    optionElement.classList.add('selected');
    selectedAnswer = optionIndex;
    
    // Habilitar botón siguiente
    nextBtn.classList.add('enabled');
}

// Función para ir a la siguiente pregunta
function nextQuestion() {
    if (selectedAnswer === null) return;
    
    const currentQuestion = selectedQuestions[currentQuestionIndex];
    const isCorrect = selectedAnswer === currentQuestion.correct;
    
    // Mostrar respuesta correcta/incorrecta
    showAnswerFeedback(isCorrect, currentQuestion.correct);
    
    // Actualizar puntuación
    if (isCorrect) {
        score++;
        scoreByDifficulty[currentQuestion.difficulty]++;
    }
    
    // Esperar un momento antes de continuar
    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex >= selectedQuestions.length) {
            showResults();
        } else {
            displayQuestion();
        }
    }, 1500);
}

// Función para mostrar feedback de la respuesta
function showAnswerFeedback(isCorrect, correctIndex) {
    const options = document.querySelectorAll('.option');
    
    options.forEach((option, index) => {
        option.classList.add('disabled');
        
        if (index === correctIndex) {
            option.classList.add('correct');
        } else if (index === selectedAnswer && !isCorrect) {
            option.classList.add('incorrect');
        }
    });
    
    nextBtn.classList.remove('enabled');
}

// Función para mostrar resultados
function showResults() {
    showScreen('results');
    
    // Mostrar puntuación total
    document.getElementById('finalScore').textContent = score;
    
    // Mostrar puntuación por dificultad
    document.getElementById('easyScore').textContent = `${scoreByDifficulty.easy}/3`;
    document.getElementById('mediumScore').textContent = `${scoreByDifficulty.medium}/3`;
    document.getElementById('hardScore').textContent = `${scoreByDifficulty.hard}/4`;
    
    // Mostrar mensaje según puntuación
    const percentage = (score / 10) * 100;
    const messageElement = document.getElementById('scoreMessage');
    
    if (percentage >= 90) {
        messageElement.textContent = "¡Excelente! Eres todo un experto 🏆";
        messageElement.style.color = "#4caf50";
    } else if (percentage >= 70) {
        messageElement.textContent = "¡Muy bien! Tienes un gran conocimiento 👏";
        messageElement.style.color = "#2196f3";
    } else if (percentage >= 50) {
        messageElement.textContent = "¡Bien! Puedes mejorar con más práctica 💪";
        messageElement.style.color = "#ff9800";
    } else {
        messageElement.textContent = "Sigue practicando, ¡puedes hacerlo mejor! 📚";
        messageElement.style.color = "#f44336";
    }
}

// Función para reiniciar el juego
function restartQuiz() {
    showScreen('welcome');
}

// Event listeners
startBtn.addEventListener('click', startQuiz);
nextBtn.addEventListener('click', nextQuestion);
restartBtn.addEventListener('click', restartQuiz);

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    showScreen('welcome');
});