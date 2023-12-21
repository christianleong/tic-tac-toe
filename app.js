/* 
Tic-tac-toe

requirements:
- switch turns between 2 players on the same computer
- visually display which player won
- visually display when there is a draw
- keep track of multiple game rounds with a win counter

To do
    do css styling
    event listeners
        boxClicked
    event handlers
        boxClicked
        updateBox
        update score
        other functions
    strike out O
Doing
    caching dom element references

Done
    set up boilerplate and html
    set variables
        winning combinations
        currentplayer (X or O)
        choices
    event listeners
        startGame
        restartGame
    event handlers
        update whoseturn
        change player
        restartgame
        check winner

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
nice color scheme
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
// let playerTurn = currentPlayer
let totalMoves = 0
let xWinCount = 0;
let oWinCount = 0;

// event listeners

startGame()

function startGame() {
    for (let box of boxes) {
        box.addEventListener("click", handlePlayerChoice);
    }
    restartBtn.addEventListener("click", handleRestart);
    h4turn.style.display = "block"
    debugger
    if (currentPlayer === "X") {
        debugger
        scoreBoxes[0].style.borderBottomColor = "#f4af2d";
    } else if (currentPlayer === "O") {
        debugger
        scoreBoxes[1].style.borderBottomColor = "#f4af2d";
    }
    gameRunning = true;
}
    
// event handlers
function handlePlayerChoice(event) {
    if (gameRunning === true) {
        let selectedBox = event.target
        let boxIndex = Number(selectedBox.dataset.num);

        if (currentPlayer === "X") {
            selectedBox.textContent = "X"
            selectedBox.style.color = "#193f4a";
            choices[boxIndex] = "X";
            totalMoves++
            selectedBox.disabled = true;
            selectedBox.style.pointerEvents = "none"
            restartBtn.style.display = "block";
            // console.log(choices);
            checkWin()
            changePlayers()
        } else {
            selectedBox.textContent = "O";
            selectedBox.style.color = "#fffffe";
            choices[boxIndex] = "O";
            totalMoves++
            selectedBox.disabled = true;
            selectedBox.style.pointerEvents = "none";
            restartBtn.style.display = "block";
            // console.log(choices);
            changePlayers()
            checkWin();
        }
    }
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

/* function checkWin() {
    const numOfPossibleWins = winCombinations.length

    for (i = 0; i < numOfPossibleWins; i++) {
        const boxA = choices[winCombinations[i][0]]
        const boxB = choices[winCombinations[i][1]]
        const boxC = choices[winCombinations[i][2]]
        if (boxA === "X" && boxB === "X" && boxC === "X") {
            winnerText.textContent = "X Wins"
            xWinCount ++;
            xScoreCount.textContent = xWinCount;

            boxes[winCombinations[i][0]].classList.add("strike-through");
            boxes[winCombinations[i][1]].classList.add("strike-through");
            boxes[winCombinations[i][2]].classList.add("strike-through");

            // console.log(`X wins`)
            h4turn.style.display = "none";
            gameRunning = false
        } else if (boxA === "O" && boxB === "O" && boxC === "O") {
            winnerText.textContent = "O Wins";
            oWinCount ++;
            oScoreCount.textContent = oWinCount;

            boxes[winCombinations[i][0]].classList.add("strike-through");
            boxes[winCombinations[i][1]].classList.add("strike-through");
            boxes[winCombinations[i][2]].classList.add("strike-through");

            // console.log(`O wins`)
            h4turn.style.display = "none";    
            gameRunning = false
        } 
    }
    checkDraw()
} */

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
}

// potential change this to check if all boxes are disabled
function checkDraw() {
    if (totalMoves === 9 && gameRunning === true) {
      winnerText.textContent = "It's a draw!";
      h4turn.style.display = "none";
      gameRunning = false;
    }
}

function handleRestart(event) {
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
    startGame();
    debugger

    // xWinCount = 0
    // oWinCount = 0
    // xScoreCount.textContent = "NIL"
    // oScoreCount.textContent = "NIL"  
    // currentPlayer = "X"
    // turnTracker.textContent = "X"
}


// other functions




























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