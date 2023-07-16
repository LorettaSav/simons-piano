// GAME BREAKDOWN
// 1.User presses play --> Detect play button
// 2.PC plays random note --> create array of notes
// 3.user must replicate note --> array for user + detect click on key 
// 4.check if key pressed is correct - and if arrays match 
// 5.if user presses repeat: repeat latest pc note (recover last item from note array)
// 6. match note + user clicks and patterns.
// 7.inform of loss / reset arrays and game / 

//VARIABLES
let userPattern = [];
let gamePattern = [];

let notes = ["do1" , "re", "mi" , "fa", "sol" , "la", "si", "do2"];
let keys = document.querySelectorAll(".key");
let keyClicked; 

let notePlayed;

let turn = 1;
let clickCounter = 0;

let body = document.querySelector(".body");
let title = document.querySelector(".game-title");

let isPlay = false;
let isPlayTune = false;

let randomTuneSelected;

let havana = ["sol", "si", "si", "sol", "sol", "re", "si", "la", "si", "do2", 
"si", "la", "sol","si", "si", "sol", "sol", "mi" ]; //18
let jingleBells = ["mi","mi","mi","mi","mi","mi","mi","sol","do1","re", "mi"]; //11
let cmajor = ["do1", "re", "mi", "fa", "sol", "la", "si", "do2"];
let twinkle = [ "sol", "sol", "re", "re", "mi", "mi", "re", "do1", "do1", "si", "si", "la", "la", "sol"];
let tunes = [cmajor, jingleBells, havana, twinkle ];

let lastNote; 
let lastNoteKey;

//TESTS
console.log(lastNote);
console.log(isPlayTune);
console.log(isPlayTune);


// EVENTS   
//detect play click
let playButton = document.querySelector(".play")
.addEventListener("click" , function() {
    reset();
    game();
})

//detect Play Tune click
let playTuneButton = document.querySelector(".play-tune")
.addEventListener("click" , function() {
    reset();
    randomTune();   
    tuneGame();
})

//detect repeat click
let repeatButton = document.querySelector(".repeat")
.addEventListener("click" , function() {
    if ( isPlay === true) {
        let noteRepeat = gamePattern[gamePattern.length-1];
        playNote(noteRepeat);
    } else if ( isPlayTune === true) {
        let tuneNoteRepeat = randomTuneSelected[randomTuneSelected.length-1];
        playNote(tuneNoteRepeat);
    }
}) 

for (let i = 0; i < keys.length; i++) { //detect key event
    keys[i].addEventListener("click", function(){
        keyClicked = this;  //identifying which key was clicked
        let keyClickedNote = keyClicked.classList[2]; //maybe hard-coding this isnt the best?
        playNote(keyClickedNote);
        //testing
        console.log(keyClickedNote);
        console.log(isPlayTune);
        console.log(isPlay);

        if ( isPlay === true) { 
            userPattern.push(keyClickedNote);
            clickCounter++;         
            if ( userPattern[clickCounter - 1] === gamePattern[clickCounter - 1] ){
                if ( turn === clickCounter) {    
                    handleTurn();  
                }           
            } else {
                handleLoss();
            }

        } else if (isPlayTune === true) {
            userPattern.push(keyClickedNote);
            clickCounter++;
            if ( clickCounter < randomTuneSelected.length ) {
                if ( userPattern[clickCounter - 1] === randomTuneSelected[clickCounter - 1] ){
                    
                    if ( turn === clickCounter) {    
                        handleTuneTurn();
                    }
                
                } else {
                    handleLoss();
                }
            } else {
                handleWin();
            }
        }
          
    }) 
}

//FUNCTIONS

game = () => {
    isPlay = true;
    randomNote();
    gamePattern.push(notePlayed);
    lastNoteKey = document.querySelector("."+ gamePattern[gamePattern.length - 1]);    
    playNote(notePlayed);
    title.innerHTML = "Turn " + turn;
}

tuneGame = () => {
    isPlayTune = true;

    playNote(randomTuneSelected[turn - 1]);
    lastNote = randomTuneSelected[randomTuneSelected.length - 1];
    lastNoteKey = document.querySelector("." + lastNote );    
    title.innerHTML = "Turn " + turn;
}

reset = () => {
    gamePattern = [];
    userPattern = [];
    turn = 1;
    clickCounter = 0;
    //this doesnt completely work yet
    // if (typeof lastNote !== 'undefined') {
    //     lastNoteKey.classList.remove("last-note");
    // }
    body.classList.remove("wrong");
    title.classList.remove("wrong");
    isPlay = false;
    isPlayTune = false;
}

randomNote = () => {
    let randomIndex = Math.floor(Math.random() * notes.length) //random numbers from 1-8
    notePlayed = notes[randomIndex];
}

randomTune = () => {
    let randomTuneIndex = Math.floor(Math.random() * tunes.length);
    randomTuneSelected = tunes[randomTuneIndex];
    //testing
    console.log(randomTuneSelected)
}

handleTurn = () => {
    clickCounter = 0;
    userPattern = [];
    turn++;
    setTimeout(function() {
        game();
    }, 1000);
}

handleTuneTurn = () => {
    clickCounter = 0;
    userPattern = [];
    turn++;
    setTimeout( function() {
        tuneGame();
    } , 1000);
}

handleLoss = () => {
        setTimeout( function() {
        playNote();
    } ,250);
    //lastNoteKey.classList.add("last-note");
    body.classList.add("wrong");
    title.classList.add("wrong");
    title.innerHTML = "Press play to try again";
}

handleWin = () => {
    body.classList.add("win");
    title.innerHTML = "YOU WON!! Press play to try again";
}

playNote = (notePlayed) => {
    
    let path;
    switch (notePlayed) {
        case "do1":
            path = "sounds/C4-piano.mp3";
            break;
        case "re":
            path = "sounds/D4-piano.mp3";
            break;
        case "mi":
            path = "sounds/E4-piano.mp3";
            break;
        case "fa":
            path = "sounds/F4-piano.mp3";
            break;
        case "sol":
            path = "sounds/G4-piano.mp3";
            break;
        case "la":
            path = "sounds/A4-piano.mp3";
            break;
        case "si":
            path = "sounds/B4-piano.mp3";
            break;
        case "do2":
            path = "sounds/C5-piano.mp3";
            break;
        default:
            path = "sounds/wrong.mp3";
            break;
    }
    let note = new Audio(path);
    note.play();
    //testing
    console.log(note);
}
