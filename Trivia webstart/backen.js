// Backend para el sistema de Trivia
// Este archivo maneja la lógica del servidor y las operaciones de datos

class TriviaBackend {
    constructor() {
        this.questions = {
            easy: [],
            medium: [],
            hard: []
        };
        this.gameStats = {
            totalGames: 0,
            averageScore: 0,
            bestScore: 0,
            questionStats: {}
        };
        this.activeGames = new Map();
        this.initializeQuestions();
    }

    // Inicializar las preguntas desde la base de datos
    initializeQuestions() {
        if (typeof questionsDatabase !== 'undefined') {
            this.questions = {
                easy: [...questionsDatabase.easy],
                medium: [...questionsDatabase.medium],
                hard: [...questionsDatabase.hard]
            };
        }
        this.initializeQuestionStats();
    }

    // Inicializar estadísticas de preguntas
    initializeQuestionStats() {
        ['easy', 'medium', 'hard'].forEach(difficulty => {
            this.questions[difficulty].forEach((question, index) => {
                const questionId = `${difficulty}_${index}`;
                this.gameStats.questionStats[questionId] = {
                    timesAsked: 0,
                    timesCorrect: 0,
                    correctRate: 0
                };
            });
        });
    }

    // Crear una nueva sesión de juego
    createGameSession(playerId = null) {
        const sessionId = this.generateSessionId();
        const gameSession = {
            sessionId,
            playerId,
            questions: this.selectGameQuestions(),
            currentQuestionIndex: 0,
            score: 0,
            startTime: Date.now(),
            endTime: null,
            answers: [],
            scoreByDifficulty: {
                easy: 0,
                medium: 0,
                hard: 0
            }
        };
        
        this.activeGames.set(sessionId, gameSession);
        return gameSession;
    }

    // Seleccionar preguntas para el juego
    selectGameQuestions() {
        const selectedQuestions = [];
        
        // Seleccionar 3 preguntas fáciles
        const easyQuestions = this.getRandomQuestions('easy', 3);
        easyQuestions.forEach(q => selectedQuestions.push({...q, difficulty: 'easy'}));
        
        // Seleccionar 3 preguntas regulares
        const mediumQuestions = this.getRandomQuestions('medium', 3);
        mediumQuestions.forEach(q => selectedQuestions.push({...q, difficulty: 'medium'}));
        
        // Seleccionar 4 preguntas difíciles
        const hardQuestions = this.getRandomQuestions('hard', 4);
        hardQuestions.forEach(q => selectedQuestions.push({...q, difficulty: 'hard'}));
        
        // Mezclar las preguntas
        return this.shuffleArray(selectedQuestions);
    }

    // Obtener preguntas aleatorias de una dificultad específica
    getRandomQuestions(difficulty, count) {
        if (!this.questions[difficulty] || this.questions[difficulty].length === 0) {
            throw new Error(`No hay preguntas disponibles para la dificultad: ${difficulty}`);
        }
        
        const shuffled = this.shuffleArray([...this.questions[difficulty]]);
        return shuffled.slice(0, Math.min(count, shuffled.length));
    }

    // Mezclar array usando algoritmo Fisher-Yates
    shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    // Procesar respuesta del jugador
    processAnswer(sessionId, answerIndex) {
        const gameSession = this.activeGames.get(sessionId);
        if (!gameSession) {
            throw new Error('Sesión de juego no encontrada');
        }

        const currentQuestion = gameSession.questions[gameSession.currentQuestionIndex];
        const isCorrect = answerIndex === currentQuestion.correct;
        
        // Registrar respuesta
        const answerData = {
            questionIndex: gameSession.currentQuestionIndex,
            question: currentQuestion.question,
            selectedAnswer: answerIndex,
            correctAnswer: currentQuestion.correct,
            isCorrect,
            difficulty: currentQuestion.difficulty,
            timestamp: Date.now()
        };
        
        gameSession.answers.push(answerData);

        // Actualizar puntuación
        if (isCorrect) {
            gameSession.score++;
            gameSession.scoreByDifficulty[currentQuestion.difficulty]++;
        }

        // Actualizar estadísticas de pregunta
        this.updateQuestionStats(currentQuestion, gameSession.currentQuestionIndex, isCorrect);

        // Avanzar a la siguiente pregunta
        gameSession.currentQuestionIndex++;

        return {
            isCorrect,
            correctAnswer: currentQuestion.correct,
            currentScore: gameSession.score,
            isGameComplete: gameSession.currentQuestionIndex >= gameSession.questions.length
        };
    }

    // Actualizar estadísticas de preguntas
    updateQuestionStats(question, questionIndex, isCorrect) {
        const difficulty = question.difficulty;
        const questionId = `${difficulty}_${questionIndex}`;
        
        if (this.gameStats.questionStats[questionId]) {
            this.gameStats.questionStats[questionId].timesAsked++;
            if (isCorrect) {
                this.gameStats.questionStats[questionId].timesCorrect++;
            }
            this.gameStats.questionStats[questionId].correctRate = 
                (this.gameStats.questionStats[questionId].timesCorrect / 
                 this.gameStats.questionStats[questionId].timesAsked) * 100;
        }
    }

    // Finalizar juego y obtener resultados
    finishGame(sessionId) {
        const gameSession = this.activeGames.get(sessionId);
        if (!gameSession) {
            throw new Error('Sesión de juego no encontrada');
        }

        gameSession.endTime = Date.now();
        const gameDuration = gameSession.endTime - gameSession.startTime;

        const results = {
            sessionId,
            finalScore: gameSession.score,
            totalQuestions: gameSession.questions.length,
            scorePercentage: (gameSession.score / gameSession.questions.length) * 100,
            scoreByDifficulty: gameSession.scoreByDifficulty,
            gameDuration,
            answers: gameSession.answers,
            rank: this.calculateRank(gameSession.score)
        };

        // Actualizar estadísticas generales
        this.updateGameStats(results);

        // Limpiar sesión activa
        this.activeGames.delete(sessionId);

        return results;
    }

    // Calcular rango basado en puntuación
    calculateRank(score) {
        if (score >= 9) return { level: 'Maestro', description: 'Conocimiento excepcional' };
        if (score >= 7) return { level: 'Experto', description: 'Muy buen conocimiento' };
        if (score >= 5) return { level: 'Avanzado', description: 'Conocimiento sólido' };
        if (score >= 3) return { level: 'Intermedio', description: 'Conocimiento básico' };
        return { level: 'Principiante', description: 'Sigue practicando' };
    }

    // Actualizar estadísticas generales del juego
    updateGameStats(results) {
        this.gameStats.totalGames++;
        
        // Actualizar puntuación promedio
        this.gameStats.averageScore = 
            ((this.gameStats.averageScore * (this.gameStats.totalGames - 1)) + results.finalScore) 
            / this.gameStats.totalGames;
        
        // Actualizar mejor puntuación
        if (results.finalScore > this.gameStats.bestScore) {
            this.gameStats.bestScore = results.finalScore;
        }
    }

    // Obtener estadísticas generales
    getGameStats() {
        return {
            ...this.gameStats,
            averageScore: Math.round(this.gameStats.averageScore * 100) / 100
        };
    }

    // Obtener pregunta actual de una sesión
    getCurrentQuestion(sessionId) {
        const gameSession = this.activeGames.get(sessionId);
        if (!gameSession) {
            throw new Error('Sesión de juego no encontrada');
        }

        if (gameSession.currentQuestionIndex >= gameSession.questions.length) {
            return null; // Juego terminado
        }

        const currentQuestion = gameSession.questions[gameSession.currentQuestionIndex];
        return {
            questionNumber: gameSession.currentQuestionIndex + 1,
            totalQuestions: gameSession.questions.length,
            question: currentQuestion.question,
            options: currentQuestion.options,
            difficulty: currentQuestion.difficulty,
            progress: ((gameSession.currentQuestionIndex + 1) / gameSession.questions.length) * 100
        };
    }

    // Validar respuesta (para verificación del lado del servidor)
    validateAnswer(sessionId, answerIndex) {
        const gameSession = this.activeGames.get(sessionId);
        if (!gameSession) {
            return { valid: false, error: 'Sesión no encontrada' };
        }

        if (typeof answerIndex !== 'number' || answerIndex < 0 || answerIndex > 3) {
            return { valid: false, error: 'Índice de respuesta inválido' };
        }

        return { valid: true };
    }

    // Agregar nueva pregunta (para administración)
    addQuestion(difficulty, questionData) {
        if (!['easy', 'medium', 'hard'].includes(difficulty)) {
            throw new Error('Dificultad inválida');
        }

        if (!questionData.question || !Array.isArray(questionData.options) || 
            questionData.options.length !== 4 || typeof questionData.correct !== 'number') {
            throw new Error('Formato de pregunta inválido');
        }

        this.questions[difficulty].push(questionData);
        
        // Inicializar estadísticas para la nueva pregunta
        const questionId = `${difficulty}_${this.questions[difficulty].length - 1}`;
        this.gameStats.questionStats[questionId] = {
            timesAsked: 0,
            timesCorrect: 0,
            correctRate: 0
        };

        return { success: true, questionId };
    }

    // Generar ID único de sesión
    generateSessionId() {
        return 'game_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    // Obtener información de sesión
    getSessionInfo(sessionId) {
        const gameSession = this.activeGames.get(sessionId);
        if (!gameSession) {
            return null;
        }

        return {
            sessionId: gameSession.sessionId,
            currentQuestionIndex: gameSession.currentQuestionIndex,
            score: gameSession.score,
            totalQuestions: gameSession.questions.length,
            startTime: gameSession.startTime
        };
    }

    // Limpiar sesiones expiradas (llamar periódicamente)
    cleanExpiredSessions(maxAge = 3600000) { // 1 hora por defecto
        const now = Date.now();
        const expiredSessions = [];

        this.activeGames.forEach((session, sessionId) => {
            if (now - session.startTime > maxAge) {
                expiredSessions.push(sessionId);
            }
        });

        expiredSessions.forEach(sessionId => {
            this.activeGames.delete(sessionId);
        });

        return expiredSessions.length;
    }
}

// Exportar la clase para uso en Node.js (si está disponible)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TriviaBackend;
}

// Crear instancia global para uso en el navegador
if (typeof window !== 'undefined') {
    window.TriviaBackend = TriviaBackend;
}