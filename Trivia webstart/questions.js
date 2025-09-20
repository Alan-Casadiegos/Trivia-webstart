// Base de datos de preguntas - 60 preguntas clasificadas por dificultad
const questionsDatabase = {
    easy: [
        {
            question: "¿Cuál es la capital de Francia?",
            options: ["Londres", "Berlín", "París", "Madrid"],
            correct: 2
        },
        {
            question: "¿Cuántos días tiene una semana?",
            options: ["6", "7", "8", "5"],
            correct: 1
        },
        {
            question: "¿De qué color es el sol?",
            options: ["Azul", "Verde", "Amarillo", "Rojo"],
            correct: 2
        },
        {
            question: "¿Cuántas patas tiene un perro?",
            options: ["3", "4", "5", "6"],
            correct: 1
        },
        {
            question: "¿En qué continente está España?",
            options: ["Asia", "África", "América", "Europa"],
            correct: 3
        },
        {
            question: "¿Cuál es el océano más grande?",
            options: ["Atlántico", "Pacífico", "Índico", "Ártico"],
            correct: 1
        },
        {
            question: "¿Cuántos minutos tiene una hora?",
            options: ["50", "60", "70", "80"],
            correct: 1
        },
        {
            question: "¿Cuál es el planeta más cercano al Sol?",
            options: ["Venus", "Tierra", "Mercurio", "Marte"],
            correct: 2
        },
        {
            question: "¿Cuántas estaciones tiene el año?",
            options: ["3", "4", "5", "6"],
            correct: 1
        },
        {
            question: "¿Qué animal es conocido como el 'Rey de la Selva'?",
            options: ["Tigre", "Elefante", "León", "Leopardo"],
            correct: 2
        },
        {
            question: "¿Cuál es la moneda de Estados Unidos?",
            options: ["Euro", "Dólar", "Libra", "Peso"],
            correct: 1
        },
        {
            question: "¿Cuántas letras tiene el alfabeto español?",
            options: ["26", "27", "28", "29"],
            correct: 1
        },
        {
            question: "¿Qué órgano del cuerpo bombea la sangre?",
            options: ["Hígado", "Pulmón", "Corazón", "Riñón"],
            correct: 2
        },
        {
            question: "¿En qué país se encuentra la Torre Eiffel?",
            options: ["Italia", "España", "Francia", "Alemania"],
            correct: 2
        },
        {
            question: "¿Cuál es el color que resulta de mezclar azul y amarillo?",
            options: ["Rojo", "Verde", "Naranja", "Violeta"],
            correct: 1
        },
        {
            question: "¿Qué gas necesitamos para respirar?",
            options: ["Hidrógeno", "Oxígeno", "Nitrógeno", "Carbono"],
            correct: 1
        },
        {
            question: "¿Cuántos lados tiene un triángulo?",
            options: ["2", "3", "4", "5"],
            correct: 1
        },
        {
            question: "¿Cuál es el instrumento musical de cuerda más pequeño?",
            options: ["Guitarra", "Violín", "Violonchelo", "Contrabajo"],
            correct: 1
        },
        {
            question: "¿Qué fruta es conocida por mantener alejado al médico?",
            options: ["Banana", "Naranja", "Manzana", "Pera"],
            correct: 2
        },
        {
            question: "¿Cuántos ojos tiene una persona normal?",
            options: ["1", "2", "3", "4"],
            correct: 1
        }
    ],
    medium: [
        {
            question: "¿En qué año llegó el hombre a la Luna?",
            options: ["1967", "1968", "1969", "1970"],
            correct: 2
        },
        {
            question: "¿Cuál es la capital de Australia?",
            options: ["Sydney", "Melbourne", "Canberra", "Brisbane"],
            correct: 2
        },
        {
            question: "¿Qué elemento químico tiene el símbolo 'Au'?",
            options: ["Plata", "Oro", "Aluminio", "Argón"],
            correct: 1
        },
        {
            question: "¿Quién escribió 'Don Quijote de la Mancha'?",
            options: ["Lope de Vega", "Miguel de Cervantes", "Garcilaso de la Vega", "Calderón de la Barca"],
            correct: 1
        },
        {
            question: "¿Cuántos huesos tiene el cuerpo humano adulto?",
            options: ["186", "206", "226", "246"],
            correct: 1
        },
        {
            question: "¿En qué océano se encuentra el Triángulo de las Bermudas?",
            options: ["Pacífico", "Índico", "Atlántico", "Ártico"],
            correct: 2
        },
        {
            question: "¿Cuál es la moneda oficial de Japón?",
            options: ["Won", "Yuan", "Yen", "Dong"],
            correct: 2
        },
        {
            question: "¿Qué planeta es conocido como el 'Planeta Rojo'?",
            options: ["Venus", "Marte", "Júpiter", "Saturno"],
            correct: 1
        },
        {
            question: "¿Cuál es la fórmula química del agua?",
            options: ["H2O", "CO2", "O2", "H2SO4"],
            correct: 0
        },
        {
            question: "¿En qué continente se encuentra el desierto del Sahara?",
            options: ["Asia", "América", "África", "Australia"],
            correct: 2
        },
        {
            question: "¿Cuál es la velocidad de la luz?",
            options: ["300,000 km/s", "150,000 km/s", "500,000 km/s", "100,000 km/s"],
            correct: 0
        },
        {
            question: "¿Quién pintó 'La Mona Lisa'?",
            options: ["Picasso", "Van Gogh", "Leonardo da Vinci", "Michelangelo"],
            correct: 2
        },
        {
            question: "¿Cuántos continentes hay en el mundo?",
            options: ["5", "6", "7", "8"],
            correct: 2
        },
        {
            question: "¿Cuál es la lengua oficial de Brasil?",
            options: ["Español", "Portugués", "Francés", "Inglés"],
            correct: 1
        },
        {
            question: "¿En qué año comenzó la Segunda Guerra Mundial?",
            options: ["1938", "1939", "1940", "1941"],
            correct: 1
        },
        {
            question: "¿Cuál es el río más largo del mundo?",
            options: ["Amazonas", "Nilo", "Yangtsé", "Misisipi"],
            correct: 1
        },
        {
            question: "¿Qué vitamina produce nuestro cuerpo cuando se expone al sol?",
            options: ["Vitamina A", "Vitamina C", "Vitamina D", "Vitamina E"],
            correct: 2
        },
        {
            question: "¿Cuántas cuerdas tiene una guitarra estándar?",
            options: ["4", "5", "6", "7"],
            correct: 2
        },
        {
            question: "¿Cuál es la montaña más alta del mundo?",
            options: ["K2", "Everest", "Kilimanjaro", "Aconcagua"],
            correct: 1
        },
        {
            question: "¿En qué país se inventó la pizza?",
            options: ["Francia", "España", "Italia", "Grecia"],
            correct: 2
        }
    ],
    hard: [
        {
            question: "¿Cuál es la constante matemática pi con 3 decimales?",
            options: ["3.141", "3.142", "3.143", "3.144"],
            correct: 0
        },
        {
            question: "¿Quién desarrolló la teoría de la relatividad?",
            options: ["Isaac Newton", "Albert Einstein", "Stephen Hawking", "Nikola Tesla"],
            correct: 1
        },
        {
            question: "¿Cuál es el elemento más abundante en el universo?",
            options: ["Oxígeno", "Carbono", "Hidrógeno", "Helio"],
            correct: 2
        },
        {
            question: "¿En qué año cayó el Muro de Berlín?",
            options: ["1987", "1988", "1989", "1990"],
            correct: 2
        },
        {
            question: "¿Cuál es la capital de Kazajistán?",
            options: ["Almaty", "Nur-Sultan", "Shymkent", "Aktobe"],
            correct: 1
        },
        {
            question: "¿Qué científico propuso las leyes del movimiento planetario?",
            options: ["Galileo Galilei", "Johannes Kepler", "Copérnico", "Tycho Brahe"],
            correct: 1
        },
        {
            question: "¿Cuál es la partícula subatómica con carga positiva?",
            options: ["Electrón", "Neutrón", "Protón", "Fotón"],
            correct: 2
        },
        {
            question: "¿En qué año se fundó la ONU?",
            options: ["1944", "1945", "1946", "1947"],
            correct: 1
        },
        {
            question: "¿Cuál es el nombre del telescopio espacial más famoso?",
            options: ["Kepler", "Spitzer", "Hubble", "James Webb"],
            correct: 2
        },
        {
            question: "¿Qué gas noble tiene el símbolo 'Xe'?",
            options: ["Xenón", "Neón", "Argón", "Kriptón"],
            correct: 0
        },
        {
            question: "¿Cuál es la obra más famosa de Gabriel García Márquez?",
            options: ["El amor en los tiempos del cólera", "Crónica de una muerte anunciada", "Cien años de soledad", "La casa de los espíritus"],
            correct: 2
        },
        {
            question: "¿En qué año se completó el genoma humano?",
            options: ["2001", "2003", "2005", "2007"],
            correct: 1
        },
        {
            question: "¿Cuál es la velocidad del sonido en el aire?",
            options: ["320 m/s", "340 m/s", "360 m/s", "380 m/s"],
            correct: 1
        },
        {
            question: "¿Quién escribió 'El origen de las especies'?",
            options: ["Charles Darwin", "Gregor Mendel", "Alfred Wallace", "Jean-Baptiste Lamarck"],
            correct: 0
        },
        {
            question: "¿Cuál es el nombre del superordenador de IBM que venció al campeón de ajedrez?",
            options: ["Deep Blue", "Watson", "Summit", "Sequoia"],
            correct: 0
        },
        {
            question: "¿En qué año se descubrió la estructura del ADN?",
            options: ["1951", "1952", "1953", "1954"],
            correct: 2
        },
        {
            question: "¿Cuál es la lengua con más hablantes nativos en el mundo?",
            options: ["Inglés", "Español", "Mandarín", "Hindi"],
            correct: 2
        },
        {
            question: "¿Qué emperador romano legalizó el cristianismo?",
            options: ["Nerón", "Trajano", "Constantino", "Augusto"],
            correct: 2
        },
        {
            question: "¿Cuál es la fórmula del teorema de Pitágoras?",
            options: ["a² + b² = c²", "a + b = c", "a × b = c", "a² - b² = c²"],
            correct: 0
        },
        {
            question: "¿En qué país se encuentra Machu Picchu?",
            options: ["Bolivia", "Ecuador", "Perú", "Colombia"],
            correct: 2
        }
    ]
};