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
const xScoreCount = document.querySelector(".x-score-count");
const oScoreCount = document.querySelector(".o-score-count");
const turnTracker = document.querySelector(".turn-tracker");
const restartBtn = document.querySelector(".restart-btn");

// event listeners
restartBtn.addEventListener("click", handleRestart);

// event handlers

// other functions

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

let currentPlayer = "X";
