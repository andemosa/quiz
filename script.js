const startButton = document.getElementById('start-btn')
const header = document.querySelector('h1')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const score = document.querySelector('.score')
let counter = document.querySelector('.counter')
let points = 0
let currentQuestion = 1
let shuffledQuestions, currentQuestionIndex

if (startButton.addEventListener) {
    startButton.addEventListener('click', startGame)
}else 
{startButton.attachEvent('onclick', startGame)};

if (nextButton.addEventListener) {
    nextButton.addEventListener('click', getNextQuestion)
}else 
{nextButton.attachEvent('onclick', getNextQuestion)};

function getNextQuestion(){
    currentQuestionIndex++
    setNextQuestion()
}

function startGame(){
    console.log('Started')
    startButton.classList.add('hide')
    header.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
    nextButton.classList.remove('hide')
    setNextQuestion()
}

function setNextQuestion(){
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
    if(shuffledQuestions.length <= currentQuestionIndex + 1){
        nextButton.classList.add('hide')
        showResults()
    }
}

function showQuestion(question){
    questionElement.innerText = question.question
    question.answers.forEach(answer =>{
        const button = document.createElement('button')
        button.innerText = answer.option
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    })
    counter.innerText = `Q: ${(currentQuestionIndex + 1)} / 5`
}

function resetState(){
    while (answerButtonsElement.firstChild){
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

function selectAnswer(e){
    const selectedButton = e.target
    selectedButton.classList.add('wrong')
    const correct = selectedButton.dataset.correct 
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
        button.disabled = true
    })
    if (correct) {
        points += 1; 
        score.textContent = `Correct answer: ${points}/5`;
        if (points > 1){
            score.textContent = `Correct answers: ${points}/5`;
        } 
    } 
}

function setStatusClass(element, correct){
    if (correct) {
        element.classList.remove('wrong')
        element.classList.add('correct')
    }
}

function clearStatusClass(element){
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

const showResults = () => {
    questionContainerElement.innerHTML = "";
    let comment
    if(points > 3){
        comment = "I guess you are a True Gunner. Thumbs up"
    } else{
        comment = " "
    }
    const markup = `
    <div class="final">
            <h1>Thanks for playing!</h1>
            <h2>
            Your score is: ${points}
            </h2>
            <h3> ${comment}</h3>
            <button id="restart" class="start-btn btn">
                Restart
            </button>
        </div>
    `;

    questionContainerElement.insertAdjacentHTML('afterbegin', markup);
    
    document.getElementById('restart').addEventListener('click', () => {
        window.location.reload(); 
    }); 
   
}

const questions = [
    
    {
        question: "How many goals did Thierry Henry score in his career at Arsenal?",
        answers: [
            {option: '226', correct: true},
            {option: '230', correct:false},
            {option: '214', correct: false},
            {option: '255',  correct: false}
        ]  
    }, 
    
    
    
    {   
        question: `When was Arsenal Football Club founded?`,
        answers:  [
            {option: '1905', correct: false},
            {option: '1913', correct: false},
            {option: '1886', correct: true},
            {option: '1895', correct: false} 
        ]
        
        
        
    },
    
    { 
        "question":"When did the club become known as Arsenal?",

        answers: [  
            {option: "1886", correct: false},
            {option: "1914", correct: true},
            {option: "1893", correct: false},
            {option: "1904",  correct: false}
        ]  


    },
    
    { 
        question: "From May 2003 to October 2004, Arsenal went unbeaten in the Premier League. Across how many games were they unbeaten?", 

        answers: [  
            {option: "59", correct: false},
            {option: "49", correct: true},
            {option: "39", correct: false},
            {option: "45",  correct: false}
        ]  

    },
    
    { 
        question: " In what year did the legendary Arsene Wenger take over?",

        answers: [  
            {option: "1998", correct: false},
            {option: "1994", correct: false},
            {option: "1997", correct: false},
            {option: "1996",  correct: true}
        ]  
    },

    { 
        question: " Who was Arsenal's top scorer in the 2001-02 season?",

        answers: [  
            {option: "Ian Wright", correct: false},
            {option: "Nwankwo Kanu", correct: false},
            {option: "Robert Pires", correct: false},
            {option: "Thierry Henry",  correct: true}
        ]  
    }

]
