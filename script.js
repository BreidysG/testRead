document.addEventListener('DOMContentLoaded', function() {
    const paragraphInit = document.getElementById("paragraphInit");
    const startButton = document.getElementById('startButton');
    const textContainer = document.getElementById('textContainer');
    const finishButton = document.getElementById('finishButton');
    const questionnaire = document.getElementById('questionnaire');
    const quizForm = document.getElementById('quizForm');
    const results = document.getElementById('results');
    const questionOptions = document.querySelector('.question-options'); // Contenedor de las opciones de pregunta
    const timerValue = document.getElementById('timerValue');

    let wordCount = 0;
    let startTime, endTime;
    let quizCompleted = false;
    let timerInterval;

    // Texto para las preguntas del cuestionario
    const questions = [
        { question: "¿Cuál es el deseo de la pequeña Julia?", answers: ["Un gato", "Un perrito", "Un muñeco", "Una bicicleta"], correctAnswer: "Un perrito" },
        { question: "¿Quién es Lucia?", answers: ["La amiga de Julia", "La tía de Julia", "La mamá de Julia", "La hermana de Julia"], correctAnswer: "La mamá de Julia" },
        { question: "¿Por qué Lucía no quería un perro en casa?", answers: ["No le gustan las mascotas", "No quería sacarlo a pasear, ni limpiar lo que ensuciara", "Perdería la libertad de salir", "Todas las respuestas son correctas"], correctAnswer: "Todas las respuestas son correctas" },
        { question: "¿Cuál fue la decisión final de Lucia sobre la mascota para su hija?", answers: ["Consiguió un gatico", "Le regaló el perrito", "Se fueron las dos a comprar el perrito", "No tendrá mascota Julia"], correctAnswer: "Le regaló el perrito" },
        { question: "¿Dónde estaba Julia cuando le entregaron la mascota?", answers: ["En casa de una amiga", "En la casa con sus papás", "En el parque", "En casa de la tía"], correctAnswer: "En casa de una amiga" }
    ];

    // Función para contar las palabras en el texto
    function countWords(text) {
        return text.split(/\s+/).length;
    }

    // Función para calcular la velocidad de lectura
    function calculateReadingSpeed(startTime, endTime, wordCount) {
        const minutes = (endTime - startTime) / 60000; // Convertir a minutos
        return Math.round(wordCount / minutes);
    }

    // Función para mostrar las preguntas del cuestionario
    function displayQuestions() {
        const questionList = document.getElementById('questionList');
        questionList.innerHTML = '';
        
        questions.forEach((question, index) => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <p>${question.question}</p>
                <div class="question-options">
                    ${question.answers.map((answer, i) => `
                        <label>
                            <input type="radio" name="answer${index}" value="${answer}">
                            ${answer}
                        </label>
                    `).join('')}
                </div>
            `;
            questionList.appendChild(listItem);
        });
    }

    // Evento para comenzar el test al hacer clic en "Empezar"
    startButton.addEventListener('click', function() {
        textContainer.classList.remove('hidden');
        paragraphInit.classList.add("hidden");
        startButton.classList.add('hidden');
        startTime = Date.now();
        // Iniciar el contador
        timerInterval = setInterval(updateTimer, 1000);
    });

    // Función para actualizar el contador de tiempo
    function updateTimer() {
        const currentTime = Math.floor((Date.now() - startTime) / 1000); // Tiempo transcurrido en segundos
        timerValue.textContent = currentTime;
    }

    // Evento para finalizar el test al hacer clic en "Terminar Test"
    finishButton.addEventListener('click', function() {
        clearInterval(timerInterval); // Detener el contador
        textContainer.classList.add('hidden');
        finishButton.classList.add('hidden');
        endTime = Date.now();
        wordCount = countWords(document.getElementById('textToRead').textContent);
        const readingSpeed = calculateReadingSpeed(startTime, endTime, wordCount);
        questionnaire.classList.remove('hidden');
        displayQuestions();
    });

    // Evento para enviar el cuestionario
    quizForm.addEventListener('submit', function(event) {
        event.preventDefault();
        if (!quizCompleted) {
            let anyAnswerSelected = true; // Inicialmente, asumimos que al menos una opción está seleccionada

            questions.forEach((question, index) => {
                const selectedAnswer = document.querySelector(`input[name="answer${index}"]:checked`);
                if (!selectedAnswer) { // Si ninguna opción está seleccionada para alguna pregunta
                    anyAnswerSelected = false;
                    return;
                }
            });

            if (!anyAnswerSelected) {
                alert("Debes seleccionar una opción para cada pregunta antes de terminar.");
                return;
            }

            let correctAnswers = 0;
            let totalQuestions = questions.length;
            
            questions.forEach((question, index) => {
                const selectedAnswer = document.querySelector(`input[name="answer${index}"]:checked`);
                if (selectedAnswer && selectedAnswer.value === question.correctAnswer) {
                    correctAnswers++;
                }
            });
            
            let comprehensionPercentage = (correctAnswers / totalQuestions) * 100;
            
            quizCompleted = true;
            results.classList.remove('hidden');
            questionnaire.classList.add('hidden');
            document.getElementById('wordCountValue').textContent = wordCount;
            document.getElementById('readingSpeedValue').textContent = `${calculateReadingSpeed(startTime, endTime, wordCount)}`;
            document.getElementById('comprehensionValue').textContent = `${comprehensionPercentage}`;
            
        }
    });

});

        }
    });

});
