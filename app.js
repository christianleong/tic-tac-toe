/* 
Tic-tac-toe

requirements:
- switch turns between 2 players on the same computer
- visually display which player won
- visually display when there is a draw
- keep track of multiple game rounds with a win counter

To do

    strike out O
Doing
    

Done
    caching dom element references
    set up boilerplate and html
        do css styling
    set variables
        winning combinations
        currentplayer (X or O)
        choices
    event listeners
        boxClicked
        startGame
        restartGame
    event handlers
        update whoseturn
        change player
        restartgame
        check winner
        boxClicked
        updateBox
        update score
        other functions

    
    nice color scheme   
    different color X and O
    keep track of scores
    Start game or select player (X turn)
    during game, update message on top to show whose turn is it
    highlight player/computer box to show whose turn is it

ideas
message 'game over'
reset game/ restart game
switch players


Cosmetics

transition/animation when entering into game
    appear from the middle
transition when placing own choice - 0.5s transition duration
transition when computer places choice - 0.5s
transition/animation when ending game and showing message
sound effect
change cursor/pointer when hover over certain parts
    restart game - button
    restart game - board


*/

// caching dom element references
const xScoreCount = document.querySelector(".x-score-count");
const oScoreCount = document.querySelector(".o-score-count");
const turnTracker = document.querySelector(".turn-tracker");
const restartBtn = document.querySelector(".restart-btn");
const boxes = document.querySelectorAll(".box");
const winnerText = document.querySelector('.message')
const h4turn = document.querySelector('h4')
const scoreBoxes = document.querySelectorAll('.score-box')

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
let currentPlayer = "X"
let gameRunning = true
let totalMoves = 0
let xWinCount = 0;
let oWinCount = 0;

// event listeners
startGame()

function startGame() {
    for (let box of boxes) {
        box.addEventListener("click", handlePlayerChoice);
        box.addEventListener("click", playsound);
    }
    restartBtn.addEventListener("click", handleRestart);
    restartBtn.addEventListener("click", playsound2);
    h4turn.style.display = "block"
    setScoreColours()
    gameRunning = true;
}
    
// event handlers
function handlePlayerChoice() {
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
            changePlayers()
            checkWin();
        }
    }
}

function setScoreColours() {
    if (currentPlayer === "X") {
        scoreBoxes[0].style.borderBottomColor = "#f4af2d";
    } else if (currentPlayer === "O") {
        scoreBoxes[1].style.borderBottomColor = "#f4af2d";
    }
}

function disableBox() {
    selectedBox.disabled = true;
    selectedBox.style.pointerEvents = "none";
}

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

function changeScoreBoxColor() {
    if (currentPlayer === "X") {
        scoreBoxes[0].style.borderBottomColor = "black";
        scoreBoxes[1].style.borderBottomColor = "#f4af2d";
    } else {
        scoreBoxes[0].style.borderBottomColor = "#f4af2d";
        scoreBoxes[1].style.borderBottomColor = "black";
    }
}

function checkWin() {
    const numOfPossibleWins = winCombinations.length;
    for (i = 0; i < numOfPossibleWins; i++) {
        const boxA = choices[winCombinations[i][0]];
        const boxB = choices[winCombinations[i][1]];
        const boxC = choices[winCombinations[i][2]];
        if (boxA === "X" && boxB === "X" && boxC === "X") {
            xWinCount++;
            xScoreCount.textContent = xWinCount;
            boxes[winCombinations[i][0]].classList.add("strike-through");
            boxes[winCombinations[i][1]].classList.add("strike-through");
            boxes[winCombinations[i][2]].classList.add("strike-through");
            handlePlayerWin("X")
        } else if (boxA === "O" && boxB === "O" && boxC === "O") {
            oWinCount++;
            oScoreCount.textContent = oWinCount;
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
    h4turn.style.display = "none";
    gameRunning = false;
    playsound3();
}

// potential change this to check if all boxes are disabled
function checkDraw() {
    if (totalMoves === 9 && gameRunning === true) {
      winnerText.textContent = "It's a draw!";
      h4turn.style.display = "none";
      gameRunning = false;
    }
}

function handleRestart() {
    pauseSound3();
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

function playsound() {
    audio1.play();
}

function playsound2() {
    audio2.play();
}

function playsound3() {
    audio3.play();
}

function pauseSound3() {
    audio3.pause();
    audio3.currentTime = 0;
}
























// choices[4] = player1
// console.log(choices)
// choices[1] = player2
// console.log(choices);
// choices[5] = player1;
// console.log(choices);
// choices[3] = player2;
// console.log(choices);
// choices[2] = player1;
// console.log(choices);
// choices[8] = player2;
// console.log(choices);
// choices[6] = player1;
// console.log(choices);

// let xIndex = []
// let oIndex = []

// for (let i = 0; i < choices.length; i++) {
//     if (choices[i] === 'X') {
//         xIndex.push(i)
//     }
// }

// for (let i = 0; i < choices.length; i++) {
//     if (choices[i] === 'O') {
//         oIndex.push(i)
//     }
// }


// console.log(`x - ${xIndex.toString()}`)
// console.log(`o - ${oIndex.toString()}`)
// console.log(winCombinations[7].toString());

// let test1 = xIndex.toString();
// let test2 = winCombinations[7].toString();
// [ 1, 2, 5, 8 ]

// console.log(test1.includes(test2));

// console.log(xIndex[4]);

// let winArr = []

// for (let i = 0; i < xIndex.length; i++) {
//     for (let j = 0; j < 8; j++) {
//         for (let k= 0; k < 3; k++) {
//             if (xIndex[i] === winCombinations[j][k]) {
//                 winArr.push(xIndex[i]);
//             }
//         }
//     }
// }

// for (let i = 0; i < winCombinations.length; i++) {
//     const box1 = winCombinations[i][0]
//     const box2 = winCombinations[i][1]
//     const box3 = winCombinations[i][2]
//     console.log(box2)
// }
// console.log(winArr)

// for (let i = 0; i < winCombinations.length; i++) {
//     if (winCombinations[i])
// }

// console.log(choices.indexOf('X'))