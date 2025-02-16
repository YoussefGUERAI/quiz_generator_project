// configuration form ;

const config_form = document.querySelector(".config-form");
let questions = [];
let current_index = 0;

document.getElementById("config-form").addEventListener("submit", function(event) {
    event.preventDefault(); 
    

    // Récupérer les valeurs saisies par l'utilisateur
    let numQuestions = document.getElementById("num-questions").value;
    let category = document.getElementById("category").value;
    let difficulty = document.getElementById("difficulty").value;
    let type = document.getElementById("type").value;

    // Construire l'URL de l'API
    let apiUrl = `https://opentdb.com/api.php?amount=${numQuestions}&category=${category}&difficulty=${difficulty}&type=${type}`;

    // Appeler l'API pour récupérer les questions
    fetch(apiUrl)
        .then(response => response.json()) // Convertir la réponse en JSON
        .then(data => {
            questions = data.results ;
            Afficher(current_index); // Afficher les questions dans la page
        })
        .catch(error => console.error("Erreur lors de la récupération des questions :", error));
    
    function Afficher(index){
        const quiz_container  = document.getElementById("quiz-container");
        const question = questions[index];
        const allAnswers = [...question.incorrect_answers, question.correct_answer];
        const shuffledAnswers = shuffle(allAnswers); // Mélange des réponses

        quiz_container.innerHTML = `
        <p>Question ${index + 1}: ${question.question}</p>
        <ul>
            ${shuffledAnswers
                .map((answer, idx) => 
                    `<li><input type="radio" name="answer" id="answer-${index}-${idx}" value="${answer}">
                    <label for="answer-${index}-${idx}">${answer}</label></li>`
                )
                .join('')}     
        </ul>
        <button id="next-btn">Question suivante</button>
    `; // mafahemch had lqlawi ;


    document.getElementById("next-btn").addEventListener("click", function() {
        if (index + 1 < questions.length) {
            current_index++; // Passer à la question suivante
            Afficher(current_index); // Afficher la nouvelle question
        } else {
            alert("Vous avez terminé le quiz !");
            
        }
    });

        
    };
    
});



function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array;
}



