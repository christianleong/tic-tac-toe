// caching dom element references
const xScoreCount = document.querySelector(".x-score-count");
const oScoreCount = document.querySelector(".o-score-count");
const turnTracker = document.querySelector(".turn-tracker");
const restartBtn = document.querySelector(".restart-btn");
const boxes = document.querySelectorAll(".box");
const winnerText = document.querySelector(".message");
const turnMessage = document.querySelector("h4");
const scoreBoxes = document.querySelectorAll(".score-box");

const audio1 = new Audio("./audio/711795__plasma4__click-sound.mp3");
const audio2 = new Audio("./audio/70107__justinbw__power-on.wav");
const audio3 = new Audio("./audio/681383__kalinkamalinka__an_concerte_hall-05.wav");

const winCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let choices = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameRunning = true;
let totalMoves = 0;
let xScore = 0;
let oScore = 0;

// execute startGame function
startGame();

// set event listeners for each box that is clicked and restart button
// display player turn indicator
// reset Score Box Colour
function startGame() {
    for (let box of boxes) {
        box.addEventListener("click", handlePlayerChoice);
        box.addEventListener("click", soundBoxClicked);
    }
    restartBtn.addEventListener("click", handleRestart);
    restartBtn.addEventListener("click", soundRestart);
    turnMessage.style.display = "block";
    setScoreColours();
    gameRunning = true;
}
    
// event handlers

// handle player's choice/click and mark box with X or O
// adding X into the choices array
// disabling the box so the player can change the selected boxes
// display restartButton
// keep track of the moves to check if it's a draw later
// change player
// check if any player has won
function handlePlayerChoice(event) {
    if (gameRunning === true) {
        let selectedBox = event.target
        let boxIndex = Number(selectedBox.dataset.num);
        totalMoves++;
        if (currentPlayer === "X") {
            choices[boxIndex] = "X";
            selectedBox.textContent = "X"
            selectedBox.style.color = "#193f4a";
            selectedBox.disabled = true;
            selectedBox.style.pointerEvents = "none"
            restartBtn.style.display = "block";
            checkWin()
            changePlayers()
        } else {
            choices[boxIndex] = "O";
            selectedBox.textContent = "O";
            selectedBox.style.color = "#fffffe";
            selectedBox.disabled = true;
            selectedBox.style.pointerEvents = "none";
            restartBtn.style.display = "block";
            checkWin();
            changePlayers()
        }
    }
}

// update the score board colour in the bottom border to indicate whose turn is it
function setScoreColours() {
    if (currentPlayer === "X") {
        scoreBoxes[0].style.borderBottomColor = "#f4af2d";
    } else if (currentPlayer === "O") {
        scoreBoxes[1].style.borderBottomColor = "#f4af2d";
    }
}

// function to disable already selected boxes
function disableBox() {
    selectedBox.disabled = true;
    selectedBox.style.pointerEvents = "none";
}

// function to change players, update score board colour and turn indicator
function changePlayers() {
    if (currentPlayer === "X") {
        changeScoreBoxColor(); 
        currentPlayer = "O";
        turnTracker.textContent = "O "
    } else {
        changeScoreBoxColor(); 
        currentPlayer = "X";
        turnTracker.textContent = "X ";
    }
}

// function to update score board colour
function changeScoreBoxColor() {
    if (currentPlayer === "X") {
        scoreBoxes[0].style.borderBottomColor = "black";
        scoreBoxes[1].style.borderBottomColor = "#f4af2d";
    } else {
        scoreBoxes[0].style.borderBottomColor = "#f4af2d";
        scoreBoxes[1].style.borderBottomColor = "black";
    }
}

// function to check if any player has won by looping through each possible win combination in the array and checking against the index in the choices array if they have all been filled up by either X or O. 
// If either player has won, add the score count and update the score board. 
// Then, execute the handlePlayerWin function to display who won, remove turn indicator, end the game and play the applause sound.
// Lastly, if neither player has won, check if it's a draw.
function checkWin() {
    const numOfPossibleWins = winCombinations.length;
    for (i = 0; i < numOfPossibleWins; i++) {
        const boxA = choices[winCombinations[i][0]];
        const boxB = choices[winCombinations[i][1]];
        const boxC = choices[winCombinations[i][2]];
        if (boxA === "X" && boxB === "X" && boxC === "X") {
            xScore++;
            xScoreCount.textContent = xScore;
            boxes[winCombinations[i][0]].classList.add("strike-through");
            boxes[winCombinations[i][1]].classList.add("strike-through");
            boxes[winCombinations[i][2]].classList.add("strike-through");
            handlePlayerWin("X")
        } else if (boxA === "O" && boxB === "O" && boxC === "O") {
            oScore++;
            oScoreCount.textContent = oScore;
            boxes[winCombinations[i][0]].classList.add("strike-through");
            boxes[winCombinations[i][1]].classList.add("strike-through");
            boxes[winCombinations[i][2]].classList.add("strike-through");
            handlePlayerWin("O");
        }
    }
    checkDraw();
}

function handlePlayerWin(player) {
    winnerText.textContent = `${player} Wins`;
    turnMessage.style.display = "none";
    gameRunning = false;
    soundApplause();
}

// update message, remove turn indicator and end the game
function checkDraw() {
    if (totalMoves === 9 && gameRunning === true) {
      winnerText.textContent = "It's a draw!";
      turnMessage.style.display = "none";
      gameRunning = false;
    }
}

// when restart button is clicked, a reset sound will be played.
// every box will be reset to default
// the score board will not display any colour and not indicate the player's turn.
// reset variables (ie. totalMoves, choices array, message)
// remove restart button
// start a new game
function handleRestart() {
    pauseSoundApplause();
    for (let box of boxes) {
        box.textContent = ""
        box.disabled = false;
        box.classList.remove("strike-through");
        box.style.pointerEvents = "auto";
    } 

    scoreBoxes[0].style.borderBottomColor = "black";
    scoreBoxes[1].style.borderBottomColor = "black";
    choices = ["", "", "", "", "", "", "", "", ""]
    totalMoves = 0
    winnerText.textContent = "";
    restartBtn.style.display = "none";
    startGame()
}

// other functions

function soundBoxClicked() {
    audio1.play();
}

function soundRestart() {
    audio2.play();
}

function soundApplause() {
    audio3.play();
}

function pauseSoundApplause() {
    audio3.pause();
    audio3.currentTime = 0;
}