document.addEventListener('DOMContentLoaded', () => {
    // Quotes array to display random quotes
    const quotes = [
        "It does not do to dwell on dreams and forget to live.",
        "Happiness can be found even in the darkest of times, if one only remembers to turn on the light.",
        "I solemnly swear that I am up to no good.",
        "After all this time? Always.",
        "You're a wizard, Harry.",
        "The ones that love us never really leave us.",
        "We are only as strong as we are united, as weak as we are divided.",
        "It matters not what someone is born, but what they grow to be."
    ];

    const quoteText = document.getElementById('quoteText');
    const randomIndex = Math.floor(Math.random() * quotes.length);
    quoteText.textContent = quotes[randomIndex];
});

// Search functionality
function searchCharacters() {
    const input = document.getElementById('searchBar').value.toLowerCase();
    const characters = document.querySelectorAll('.character');

    characters.forEach(character => {
        const name = character.getAttribute('data-name').toLowerCase();
        if (name.includes(input)) {
            character.style.display = '';
        } else {
            character.style.display = 'none';
        }
    });
}

// Modal functionality
function showModal(character) {
    const modal = document.getElementById('characterModal');
    const modalContent = document.getElementById('modalContent');

    const characterDetails = {
        harry: {
            name: "Harry Potter",
            description: "The Boy Who Lived, famous for his lightning-shaped scar and his role in defeating Voldemort.",
            image: "images/harry.jpg",
            facts: [
                "Birthday: July 31",
                "Patronus: Stag",
                "Favorite Spell: Expelliarmus"
            ]
        },
        hermione: {
            name: "Hermione Granger",
            description: "A brilliant witch with a love for books and learning, and one of Harry's best friends.",
            image: "images/hermione.jpg",
            facts: [
                "Birthday: September 19",
                "Patronus: Otter",
                "Favorite Subject: Arithmancy"
            ]
        },
        ron: {
            name: "Ron Weasley",
            description: "Harry's loyal friend, known for his bravery and sense of humor.",
            image: "images/ron.jpg",
            facts: [
                "Birthday: March 1",
                "Patronus: Jack Russell Terrier",
                "Favorite Quidditch Team: Chudley Cannons"
            ]
        },
        neville: {
            name: "Neville Longbottom",
            description: "A brave and loyal friend, known for his growth from a timid boy to a courageous hero.",
            image: "images/neville.jpg",
            facts: [
                "Birthday: July 30",
                "Patronus: Non-corporeal",
                "Favorite Subject: Herbology"
            ]
        },
        ginny: {
            name: "Ginny Weasley",
            description: "A talented witch and Harry's eventual wife, known for her fierce independence and bravery.",
            image: "images/ginny.jpg",
            facts: [
                "Birthday: August 11",
                "Patronus: Horse",
                "Favorite Spell: Bat-Bogey Hex"
            ]
        }
        // Add more characters as needed
    };

    const characterInfo = characterDetails[character];
    modalContent.innerHTML = `
        <img src="${characterInfo.image}" alt="${characterInfo.name}">
        <h3>${characterInfo.name}</h3>
        <p>${characterInfo.description}</p>
        <ul>
            ${characterInfo.facts.map(fact => `<li>${fact}</li>`).join('')}
        </ul>
    `;

    modal.classList.add('show');
    setTimeout(() => {
        modal.setAttribute('aria-hidden', 'false');
        document.body.setAttribute('aria-hidden', 'true');
        modal.focus(); // Move focus to the modal
    }, 10); // Adding a small timeout ensures visibility change before focusing
}

// Close modal functionality
function closeModal() {
    const modal = document.getElementById('characterModal');
    modal.classList.remove('show');
    modal.addEventListener('transitionend', () => {
        modal.style.display = "none";
        modal.setAttribute('aria-hidden', 'true');
        document.body.setAttribute('aria-hidden', 'false');
    });
}

// Trap focus within the modal
document.addEventListener('keydown', function(event) {
    const modal = document.getElementById('characterModal');
    if (modal.style.display === 'block') {
        const focusableElements = modal.querySelectorAll('a, button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])');
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (event.key === 'Tab') {
            if (event.shiftKey) {
                if (document.activeElement === firstElement) {
                    lastElement.focus();
                    event.preventDefault();
                }
            } else {
                if (document.activeElement === lastElement) {
                    firstElement.focus();
                    event.preventDefault();
                }
            }
        }

        if (event.key === 'Escape') {
            closeModal();
        }
    }
});
document.addEventListener('DOMContentLoaded', () => {
    const harryPotterTrailers = [
        {
            title: "Harry Potter and the Sorcerer's Stone",
            url: "https://www.youtube.com/embed/VyHV0BRtdxo"
        },
        {
            title: "Harry Potter and the Chamber of Secrets",
            url: "https://www.youtube.com/embed/1bq0qff4iF8"
        },
        {
            title: "Harry Potter and the Prisoner of Azkaban",
            url: "https://www.youtube.com/embed/lAxgztbYDbs"
        },
        {
            title: "Harry Potter and the Goblet of Fire",
            url: "https://www.youtube.com/embed/3EGojp4Hh6I"
        },
        {
            title: "Harry Potter and the Order of the Phoenix",
            url: "https://www.youtube.com/embed/y6ZW7KXaXYk"
        },
        {
            title: "Harry Potter and the Half-Blood Prince",
            url: "https://www.youtube.com/embed/sg81Lts5kYY"
        },
        {
            title: "Harry Potter and the Deathly Hallows: Part 1",
            url: "https://www.youtube.com/embed/MxqsmsA8y5k"
        },
        {
            title: "Harry Potter and the Deathly Hallows: Part 2",
            url: "https://www.youtube.com/embed/mObK5XD8udk"
        }
    ];

    const trailersContainer = document.getElementById('trailersContainer');

    harryPotterTrailers.forEach(trailer => {
        const trailerDiv = document.createElement('div');
        trailerDiv.classList.add('trailer');

        trailerDiv.innerHTML = `
            <h3>${trailer.title}</h3>
            <iframe width="560" height="315" src="${trailer.url}" frameborder="0" allowfullscreen></iframe>
        `;

        trailersContainer.appendChild(trailerDiv);
    });
});


// Trivia quiz functionality
const quizContainer = document.getElementById('quizContainer');
const resultContainer = document.getElementById('resultContainer');
let score = 0;

const quizQuestions = [
    {
        question: "What house is Harry Potter sorted into?",
        options: ["Gryffindor", "Hufflepuff", "Ravenclaw", "Slytherin"],
        answer: "Gryffindor"
    },
    {
        question: "What is the name of Harry Potter's owl?",
        options: ["Hedwig", "Errol", "Pigwidgeon", "Fawkes"],
        answer: "Hedwig"
    },
    {
        question: "Who is the Half-Blood Prince?",
        options: ["Harry Potter", "Severus Snape", "Tom Riddle", "Albus Dumbledore"],
        answer: "Severus Snape"
    },
    {
        question: "What position does Harry play on his Quidditch team?",
        options: ["Chaser", "Beater", "Keeper", "Seeker"],
        answer: "Seeker"
    },
    {
        question: "What is the name of the Weasley's house?",
        options: ["The Burrow", "Shell Cottage", "Grimmauld Place", "Hogwarts"],
        answer: "The Burrow"
    },
    {
        question: "What is Hermione's patronus?",
        options: ["Otter", "Stag", "Doe", "Phoenix"],
        answer: "Otter"
    },
    {
        question: "Who is the headmaster of Hogwarts during Harry's first year?",
        options: ["Albus Dumbledore", "Severus Snape", "Minerva McGonagall", "Dolores Umbridge"],
        answer: "Albus Dumbledore"
    },
    {
        question: "What spell is used to disarm an opponent?",
        options: ["Expelliarmus", "Avada Kedavra", "Lumos", "Alohomora"],
        answer: "Expelliarmus"
    },
    {
        question: "What is the name of the potion that grants good luck?",
        options: ["Polyjuice Potion", "Felix Felicis", "Amortentia", "Veritaserum"],
        answer: "Felix Felicis"
    },
    {
        question: "Who is the author of 'Fantastic Beasts and Where to Find Them'?",
        options: ["Newt Scamander", "Gilderoy Lockhart", "Bathilda Bagshot", "Rita Skeeter"],
        answer: "Newt Scamander"
    }
];

// Function to display the questions and options
quizQuestions.forEach((q, index) => {
    const questionDiv = document.createElement('div');
    questionDiv.classList.add('question');
    questionDiv.innerHTML = `
        <p>${q.question}</p>
        ${q.options.map(option => `<button onclick="checkAnswer('${q.answer}', '${option}', this)">${option}</button>`).join('')}
    `;
    quizContainer.appendChild(questionDiv);
});

// Function to check answer and update score
function checkAnswer(correctAnswer, selectedAnswer, button) {
    const buttons = button.parentElement.querySelectorAll('button');
    
    // Disable all buttons for the current question after an answer is selected
    buttons.forEach(b => b.disabled = true);

    // Check if the selected answer is correct
    if (selectedAnswer === correctAnswer) {
        button.classList.add('correct');
        button.textContent = 'Correct!';
        score++;
    } else {
        button.classList.add('incorrect');
        button.textContent = 'Incorrect!';
    }
    
    // Show the total score after all questions are answered
    if (quizContainer.querySelectorAll('button:not([disabled])').length === 0) {
        displayScore();
    }
}

// Function to display the total score
function displayScore() {
    resultContainer.innerHTML = `<h2>Your Score: ${score}/${quizQuestions.length}</h2>`;
}
