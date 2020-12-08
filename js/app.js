const { func } = require("prop-types");

//list of types of tile of a card
const tiles={
    "ANCHOR": "fa-anchor",
    "BICYCLE": "fa-motorcycle",
    "BOLT": "fa-bolt",
    "BOMB": "fa-bomb",
    "CUBE": "fa-cube",
    "DIAMOND": "fa-gem",
    "LEAF": "fa-leaf",
    "PAPER_PLANE": "fa-paper-plane"
};

Object.freeze(tiles);

//list to store status of a card
const status={
    "OPENED":"open",
    "CLOSED": "close",
    "MATCHED": "match"
};
Object.freeze(status);

//constructor to create a card
function Card(tileType,status){
    this.tileType=tileType;
    this.status=status;
}

/*
*timer class to update game timer every second
*start() to start the timer amnd stop() to stop the timer
*/

class Timer{
    constructor(ele){
        this.element=ele;
    }

    //start the timer
    start(){
        //fetch the start time of the game
        this.startTime= new Date().getTime();
        this.timerInterval=setInterval(()=>{
            //get current time
            const date=new Date();

            //format the time to min:sec
            let millis=date.getTime()-this.startTime;
            let secs=parseInt(millis/1000);
            millis%=parseInt(1000);
            let mins=parseInt(secs/60);
            secs=parseInt(secs%60);

            //update the time
            this.element.textContent=("0"+mins).slice(-2)+ ":"+("0"+secs).slice(-2);
            },1000);
    }

    //stop the timer
    stop(){
        window.clearInterval(this.timerInterval);
        this.timerInterval=null;
    }
}
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
