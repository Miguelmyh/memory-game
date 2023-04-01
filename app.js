const gameCanvas = document.getElementById('game');
const arrayCards = [];
const form = document.querySelector('form');
const clicksCount = [];
const btn = document.getElementById('btn');
let noClicking = false;
const canvas = document.getElementById('start');
let numCards = arrayCards.length;
let card1 = null;
let card2 = null;
let score = 0;
let attempts = 0;
let cardsFlipped = 0;
let cardsCreated = 0;
let clickCount = 0;
let startForm = document.querySelector('.start');
let currentAttempts = document.getElementById('attempts');
let lowScore = JSON.parse(localStorage.getItem('score'));
let totalAttempts = JSON.parse(localStorage.getItem('attempts'));
let currentScore = document.getElementById('score');
let totalScore = 0;
const COLORS = [
    "red",
    "blue",
    "green",
    "orange",
    "purple",
    "red",
    "blue",
    "green",
    "orange",
    "purple"
  ];
  

  currentScore.innerText = lowScore;
  currentAttempts.innerText = totalAttempts;

  function shuffleColors(array){ 
    let counter = array.length;
  
    // While there are elements in the array
    while (counter > 0) {
      // Pick a random index
      let index = Math.floor(Math.random() * counter);
  
      // Decrease counter by 1
      counter--;
  
      // And swap the last element with it
      let temp = array[counter];
      array[counter] = array[index];
      array[index] = temp;
    }
  
    return array;
};

let shuffledColors = shuffleColors(COLORS);


function createCards(colorArray){
    for(let color of colorArray){

        const newCard = document.createElement('div');
        
        newCard.classList.add(color);

        newCard.addEventListener('click', handleClick);//checks validity
        
        gameCanvas.append(newCard);
        arrayCards.push(newCard);
        cardsCreated = arrayCards.length;
    }
    //return newCard
};


function startGame(){
    createCards(shuffledColors);

};

//start game

btn.addEventListener('click', startGame);

//
function handleClick(clickedCard){
    clickCount += 1;

    console.log(clickedCard.target);

    let cardClicked = clickedCard.target;
    let colorClass = clickedCard.target.classList[0];

    if(noClicking) return;

    if(cardClicked.classList.contains('flipped')){
      return;
    }
    //background color
    cardClicked.style.backgroundColor = colorClass;

    // if(!cardClicked.classList.contains('flipped')){
    //     cardClicked.classList.add('flipped');
    // }
    if(!card1 || !card2){
        cardClicked.classList.add('flipped');
        card1 = card1 || cardClicked;
        card2 = cardClicked === card1 ? null : cardClicked;
    }
    if(card1 && card2){
        noClicking = true;
        
       
        if(card1.className === card2.className){
            attempts+=1;
           cardsFlipped += 2;
            card1.removeEventListener('click', handleClick)
            card2.removeEventListener('click', handleClick)
            card1 = null;
            card2 = null;
            score++;
            currentScore.innerText = score;
            console.log(score);
            console.log("flipped",cardsFlipped);
            noClicking = false;
        }
        else{
            attempts += 1;
            console.log("attempts",attempts);
            currentAttempts.innerText = attempts;


            setTimeout(function() {
                card1.style.backgroundColor = "";
                card2.style.backgroundColor = "";
                card1.classList.remove("flipped");
                card2.classList.remove("flipped");
                card1 = null;
                card2 = null;
                noClicking = false;
            }, 1000);
            }
    }

    if (cardsFlipped === COLORS.length){
        alert("game over!");
        endGame();
    } 
    totalScore = score + lowScore;
    console.log("total score",totalScore);
    localStorage.setItem('score', JSON.stringify(score));
    localStorage.setItem('attempts', JSON.stringify(attempts));

}

// function arrayOfClicks (){
//         gameCanvas.addEventListener('click', function(event){
//             let target = event.target;
//             let clickCount = 0;
//             if(target.className !== null){
//                 clickCount += 1;
//             }
//             console.log(clickCount);
//             clicksCount.push(clickCount);
//         })
//     };
    

function endGame(){
    for(let element in gameCanvas){
        let removeElement = gameCanvas[element];
        if(removeElement !== 0){
            gameCanvas.remove(removeElement);
        }
        else{
            return;
        }
    }

};
