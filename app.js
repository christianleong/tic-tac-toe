/* 
Tic-tac-toe

requirements:
- switch turns between 2 players on the same computer
- visually display which player won
- visually display when there is a draw
- keep track of multiple game rounds with a win counter

To do
    set up boilerplate and html
    do css styling
    caching dom element references
    set variables
        winning combinations
        currentplayer (X or O)
        choices
    event listeners
        startGame
        restartGame
    event handlers
        boxClicked
        updateBox
        update whoseturn
        update score
        change player
        restartgame
    other functions
        check winner
Doing
Done

ideas
Start game or select player (X turn)
Take turns
    need to use clearInterval to pause
during game, update message on top to show whose turn is it
    highlight player/computer box to show whose turn is it
keep track of scores
message 'game over'
reset game/ restart game
switch players
different color X and O

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
// const xScoreCount = document.querySelector(".x-score-count");
// const oScoreCount = document.querySelector(".o-score-count");
// const turnTracker = document.querySelector(".turn-tracker");
// const restartBtn = document.querySelector(".restart-btn");
// const box = document.querySelectorAll(".box");

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

let player1 = "X";
let player2 = "O";

let choices = ["", "", "", "", "", "", "", "", ""];

choices[4] = player1
console.log(choices)
choices[1] = player2
console.log(choices);
choices[5] = player1;
console.log(choices);
choices[3] = player2;
console.log(choices);
choices[2] = player1;
console.log(choices);
choices[8] = player2;
console.log(choices);
choices[6] = player1;
console.log(choices);

let xIndex = []
let oIndex = []

for (let i = 0; i < choices.length; i++) {
    if (choices[i] === 'X') {
        xIndex.push(i)
    }
}

for (let i = 0; i < choices.length; i++) {
    if (choices[i] === 'O') {
        oIndex.push(i)
    }
}

console.log(choices(winCombinations[0]));


console.log(`x - ${xIndex.toString()}`)
console.log(`o - ${oIndex.toString()}`)
console.log(winCombinations[7].toString());

let test1 = xIndex.toString();
let test2 = winCombinations[7].toString();
// [ 1, 2, 5, 8 ]

console.log(test1.includes(test2));

console.log(xIndex[4]);

let winArr = []

for (let i = 0; i < xIndex.length; i++) {
    for (let j = 0; j < 8; j++) {
        for (let k= 0; k < 3; k++) {
            if (xIndex[i] === winCombinations[j][k]) {
                winArr.push(xIndex[i]);
            }
        }
    }
}

console.log(winArr)

// for (let i = 0; i < winCombinations.length; i++) {
//     if (winCombinations[i])
// }

// console.log(choices.indexOf('X'))

// event listeners
// restartBtn.addEventListener("click", handleRestart);

// event handlers

// other functions


