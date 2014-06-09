
var cell0 = document.getElementById('cell0');
var cell1 = document.getElementById('cell1');
var cell2 = document.getElementById('cell2');
var cell3 = document.getElementById('cell3');
var cell4 = document.getElementById('cell4');
var cell5 = document.getElementById('cell5');
var cell6 = document.getElementById('cell6');
var cell7 = document.getElementById('cell7');
var cell8 = document.getElementById('cell8');
var cell9 = document.getElementById('cell9');
var cell10 = document.getElementById('cell10');
var cell11 = document.getElementById('cell11');
var cell12 = document.getElementById('cell12');
var cell13 = document.getElementById('cell13');
var cell14 = document.getElementById('cell14');
var cell15 = document.getElementById('cell15');

var cells = [];

var startStopGame = document.getElementById('start_end_button');
var numberOfTurns = document.getElementById('number_of_turns');
var numberOfMatches = document.getElementById('number_of_matches');

var cardselected = [];
var stopGame = true;
var turns = 0;
var matches = 0;

//get cards
for(var i=0; i < 16; i++) {
    cells.push(document.getElementById('cell' + i));
}

var cards = [];

//load images
for(var i=0; i < 8; i++) {
    var image = new Image();
    if(i<10) {
        image.src = 'img/card' + i + '.jpg';
    }
    cards.push(image);
}

var cellImages = [];

//assign images to cards
for(var i=0; i < 16; i++) {
    if (i<=7) {
        cellImages[i] = cards[i];
    }
    else {
        cellImages[i] = cards[i-8];
    }
}



//shuffle cards
var shuffledCards = [];
for (var i = 0; i < 16; i++) {
    var randomPosition = Math.round(Math.random() * 15);
    while (shuffledCards[randomPosition] != null){
        randomPosition = Math.round(Math.random() * 15);
    }
    shuffledCards[randomPosition] = cellImages[i];
}
cellImages = shuffledCards;

startStopGame.onclick = startStopClick;

function startStopClick(){
    if(stopGame){
        startStopGame.innerHTML = 'Stop Game';
        stopGame = false;
        turns = 0;
        matches = 0;
        updateNumberOfTurns();
        newMatch();
        turnAllCardsFaceDown();
        gameOn();
    }
    else {
        startStopGame.innerHTML = 'Start Game';
        stopGame = true;
        location.reload();
    }
}

function gameOn() {
    //turn cards
    cell0.onclick = turnOverCard0;
    cell1.onclick = turnOverCard1;
    cell2.onclick = turnOverCard2;
    cell3.onclick = turnOverCard3;
    cell4.onclick = turnOverCard4;
    cell5.onclick = turnOverCard5;
    cell6.onclick = turnOverCard6;
    cell7.onclick = turnOverCard7;
    cell8.onclick = turnOverCard8;
    cell9.onclick = turnOverCard9;
    cell10.onclick = turnOverCard10;
    cell11.onclick = turnOverCard11;
    cell12.onclick = turnOverCard12;
    cell13.onclick = turnOverCard13;
    cell14.onclick = turnOverCard14;
    cell15.onclick = turnOverCard15;
    startStopGame.onclick = startStopClick;

}


function turnOverCard0() {
    turnOverCard(0);
}

function turnOverCard1() {
    turnOverCard(1);
}
function turnOverCard2() {
    turnOverCard(2);
}

function turnOverCard3() {
    turnOverCard(3);
}

function turnOverCard4() {
    turnOverCard(4);
}

function turnOverCard5() {
    turnOverCard(5);
}

function turnOverCard6() {
    turnOverCard(6);
}

function turnOverCard7() {
    turnOverCard(7);
}

function turnOverCard8() {
    turnOverCard(8);
}

function turnOverCard9() {
    turnOverCard(9);
}

function turnOverCard10() {
    turnOverCard(10);
}

function turnOverCard11() {
    turnOverCard(11);
}

function turnOverCard12() {
    turnOverCard(12);
}

function turnOverCard13() {
    turnOverCard(13);
}

function turnOverCard14() {
    turnOverCard(14);
}

function turnOverCard15() {
    turnOverCard(15);
}

function turnOverCard(i) {
    i = parseFloat(i);
    if (cells[i].innerHTML == '' && cardselected[1] == null) {
        cells[i].innerHTML = '<img id="card' + i + '" class="card" src="' + cellImages[i].src + '">';
        if (cardselected[0] == null) {
            cardselected[0] = i;
        }
        else {
            cardselected[1] = i;
            turns = turns + 1;
            updateNumberOfTurns();
            if (cellImages[cardselected[0]].src == cellImages[cardselected[1]].src) {
                matches = matches + 1;
                newMatch();
                cardselected[0] = null;
                cardselected[1] = null;
                if (matches == 8) {
                    alert('Yay! It took ' + turns + ' turns.');
                    startStopGame.innerHTML = 'Restart Game';
                    stopGame = true;
                }
            }
            else {
                setTimeout(turnCardsFaceDown, 1500);
            }
        }
    }
}

function updateNumberOfTurns(){
    numberOfTurns.innerHTML = turns;
}

function newMatch(){
    numberOfMatches.innerHTML = matches;
}

function turnCardsFaceDown() {
    cells[cardselected[0]].innerHTML = '';
    cells[cardselected[1]].innerHTML = '';
    cardselected[0] = null;
    cardselected[1] = null;
}

function turnAllCardsFaceDown() {
    for (var i = 0; i < 16; i++) {
        cells[i].innerHTML = '';
    }
}




