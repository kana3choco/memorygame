const gameContainer = document.getElementById("game");
let firstCard=null;
let secondCard= null;
let lockBoard = false;
let hasFlipedCard = false;

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

// a function to shuffle an array
function shuffle(array) {
  let n = array.length;
  for(let i= array.length-1; i>0; i--){
    let rand = Math.floor(Math.random() * n);
    let temp = array[i];
    array[i] = array[rand];
    array[rand] = temp;
  }
  return array;
}

let shuffledCards = shuffle(COLORS);
// console.log(shuffledCards);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    const newDiv = document.createElement("div");
    newDiv.classList.add(color);
    newDiv.addEventListener("click", handleCardClick);
    gameContainer.append(newDiv);
  }
}

function handleCardClick(e){
  //Matchしているカード
  if (lockBoard) return;
  //１枚目のカード
  let currentCard = e.target;
  if(currentCard.classList.contains("flipped")) return;
  currentCard.style.backgroundColor = currentCard.classList[0]

  if(!hasFlipedCard){
    currentCard.classList.add("flipped");
    hasFlipedCard = true;
    firstCard = currentCard;
    return;
  }
  secondCard = currentCard;
  currentCard.classList.add("flipped")
  checkForMatch();
}

function checkForMatch(){
  let firstColor = firstCard.className
  let secondColor = secondCard.className
  let isMatch = firstColor === secondColor
  isMatch ? disableCards() : unflipCards();
}

function disableCards(e){
  firstCard.removeEventListener("click", handleCardClick);
  secondCard.removeEventListener("click", handleCardClick);
  resetBoard();
}

function resetBoard(){
  [hasFlipedCard, lockBoard] = [false, false];
  [firstCard,secondCard] = [null,null]
}

function unflipCards(){
  lockBoard = true;
  setTimeout(function(){
    firstCard.style.backgroundColor="";
    secondCard.style.backgroundColor="";
    firstCard.classList.remove("flipped");
    secondCard.classList.remove("flipped");
    resetBoard();
  },1500)
}
createDivsForColors(shuffledCards);



// // TODO: Implement this function!
// function handleCardClick(event) {
//   // you can use event.target to see which element was clicked
//   console.log("you just clicked", event.target);
// }


/* */