

const config_form = document.querySelector(".config-form");
let questions = [];
let current_index = 0;
let score = 0;
let timer;


document.getElementById("config-form").addEventListener("submit", function(event) {
    event.preventDefault(); 
    

    
    let numQuestions = document.getElementById("num-questions").value;
    let category = document.getElementById("category").value;
    let difficulty = document.getElementById("difficulty").value;
    let type = document.getElementById("type").value;

    
    let apiUrl = `https://opentdb.com/api.php?amount=${numQuestions}&category=${category}&difficulty=${difficulty}&type=${type}`;

   
    fetch(apiUrl)
        .then(response => response.json()) 
        .then(data => {
            questions = data.results ;
            Afficher(current_index); 
        })
        .catch(error => console.error("Erreur lors de la récupération des questions :", error));
    });
    
    function Afficher(index){


        const quiz_container  = document.getElementById("quiz-container");
        const question = questions[index];
        const allAnswers = [...question.incorrect_answers, question.correct_answer];
        const shuffledAnswers = shuffle(allAnswers); 
        quiz_container.innerHTML = `
                <p>Question ${index + 1}: ${question.question}</p>
                <ul>
                    ${shuffledAnswers
                        .map((answer, idx) => 

                            `<label for="answer-${index}-${idx}">${answer}</label>
                            <li><input type="radio" name="answer" id="answer-${index}-${idx}" value="${answer}">
                            </li>`
                        )
                        .join('')}     
                </ul>
                <button id="next-btn">Question suivante</button>
                <p id="timer">Temps restant : 10s</p>
            `; 
        let timeLeft = 10;
        const timerElement = document.getElementById("timer");
        let countdown = setInterval(() => {
            timeLeft--;
            timerElement.textContent = `Temps restant : ${timeLeft}s`;
    
            if (timeLeft <= 0) {
                clearInterval(countdown);
                clearTimeout(timer); 
                nextQuestion(); 
            }
        }, 1000);

        
        timer = setTimeout(() => {
            clearInterval(countdown); 
            nextQuestion(); 
        }, 10000);
        
        


        const suivant = document.getElementById('next-btn') ;
        suivant.addEventListener('click',function(){
            clearTimeout(timer);
            clearInterval(countdown);

            const user_answer = document.querySelector('input[name="answer"]:checked').value;
            if (user_answer === question.correct_answer){
                score ++ ;
            };
            nextQuestion();
        });
        

        
    };


    function nextQuestion(){
        if (current_index + 1 < questions.length) {
            current_index++; 
            Afficher(current_index); 
        } else {
            alert(`Vous avez terminé le quiz ! Votre score est : ${score}/${questions.length} `);
            document.getElementById('score').innerText = ` Score : ${score}`;
            
        }
    };
    






function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; 
    }
    return array;
}



