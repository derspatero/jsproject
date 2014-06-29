/*
VARIABLES
*/


//get cell variables in array
var cells = [];
for(var i=0; i < 16; i++) {
    cells.push(document.getElementById('cell' + i));
}

//hud variables
var startStopGame = document.getElementById('start_end_button');
var numberOfTurns = document.getElementById('number_of_turns');
var numberOfMatches = document.getElementById('number_of_matches');

//game variables
var cardSelected = [];  //array to hold user's selections
var stopGame = true;
var turns = 0;
var matches = 0;

//array to hold unique cards
var cards = [];

//load images
for(var i=0; i < 8; i++) {
    var image = new Image();
    image.src = 'img/card' + i + '.jpg';
    cards.push(image);
}

//array to hold images for each cell
var cellImages = [];

//assign images to cell
for(var i=0; i < 16; i++) {
    if (i<=7) {
        cellImages[i] = cards[i];
    }
    else {
        cellImages[i] = cards[i-8];
    }
}


/*
END VARIABLES
*/


startStopGame.onclick = startStopClick;


/*
FUNCTIONS
*/

//randomize the game cells
function shuffleCards() {
    var shuffledCards = [];
    for (var i = 0; i < 16; i++) {
        var randomPosition = Math.round(Math.random() * 15);
        while (shuffledCards[randomPosition] != null) {
            randomPosition = Math.round(Math.random() * 15);
        }
        shuffledCards[randomPosition] = cellImages[i];
    }
    cellImages = shuffledCards;
}

//stop start restart button actions
function startStopClick(){
    //game is stopped and needs to be started
    if(stopGame){
        startStopGame.innerHTML = 'Stop Game';
        stopGame = false;
        //reset the board and start game
        turns = 0;
        matches = 0;
        updateNumberOfTurns();
        updateNumberOfMatches();
        turnAllCardsFaceDown();
        shuffleCards();
        gameOn();
    }
    //game is active and needs to be stopped
    else {
        startStopGame.innerHTML = 'Start Game';
        stopGame = true;
        location.reload();
    }
}

//in game button functionality
function gameOn() {
    //turn cards
    $('[id^=cell]').click(function (){
        turnOverCard($(this).attr('id').split('cell')[1]);
    });
    startStopGame.onclick = startStopClick;
}


/*
END CELL TURNING FUNCTIONS
*/

//Card turning and match evaluation
function turnOverCard(i) {
    i = parseFloat(i);

    //if the selected card isn't already displayed and the if a second card hasn't already been selected
    if (cells[i].innerHTML == '' && cardSelected[1] == null) {

        //display selected card face
        cells[i].innerHTML = '<img id="card' + i + '" class="card" src="' + cellImages[i].src + '">';

        //if no previous cards are selected this turn
        if (cardSelected[0] == null) {
            cardSelected[0] = i;
        }
        //a previous card has been turned, evaluate card match
        else {
            //update game variables
            cardSelected[1] = i;
            turns = turns + 1;
            updateNumberOfTurns();

            //if selections match
            if (cellImages[cardSelected[0]].src == cellImages[cardSelected[1]].src) {
                matches = matches + 1;
                updateNumberOfMatches();
                cardSelected[0] = null;
                cardSelected[1] = null;

                //if all 8 matches have been found
                if (matches == 8) {
                    alert('Yay! It took ' + turns + ' turns.');
                    startStopGame.innerHTML = 'Restart Game';
                    stopGame = true;
                }
            }
            //if selections don't match
            else {
                setTimeout(turnSelectedCardsFaceDown, 1500);
            }
        }
    }
}

//update scoreboard
function updateNumberOfTurns(){
    numberOfTurns.innerHTML = turns;
}

function updateNumberOfMatches(){
    numberOfMatches.innerHTML = matches;
}

//clear unmatching selections and images
function turnSelectedCardsFaceDown() {
    cells[cardSelected[0]].innerHTML = '';
    cells[cardSelected[1]].innerHTML = '';
    cardSelected[0] = null;
    cardSelected[1] = null;
}

//clear image from all cards
function turnAllCardsFaceDown() {
    for (var i = 0; i < 16; i++) {
        cells[i].innerHTML = '';
    }
}




