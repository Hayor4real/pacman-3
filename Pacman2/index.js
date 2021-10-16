const width = 28;
const scoreDisplay = document.getElementById("score");
const grid = document.querySelector(".grid");
const messageSection = document.querySelector(".message-section");
const messageTitle = document.getElementById("Message-title");
const btnContinue = document.getElementById("btn-continue");
const pacmanSpeed = 300 //same as the speed of the ghost
const directions = [1, -1, width, -width];
const initialPacmanIndex = 490;


let won = false;
let ghostScared = false;
let pacmanCurrentIndex = initialPacmanIndex;
let direction = 0;
let squares = []
let intervalCheckwall = "";
let intervalPacmanMove = "";
let score = 0;


// 0 - pacdots,
// 1 - wall,
// 2 - ghost, 
// 3 -powerpellets,
// 4 - empty


const layout = [
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1,
  1, 0, 1, 1, 1, 1, 0, 1, 1, 3, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 3, 1, 1, 0,
  1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
  1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1,
  1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 0, 1, 1,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 2, 2, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  0, 1, 1, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1, 4, 4, 4, 4, 4, 4, 0, 0, 0, 4, 1, 2, 2, 2, 2, 2,
  2, 1, 4, 0, 0, 0, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 1, 1, 0, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
  1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4,
  4, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
  1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 3, 0, 0, 1, 1, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 3, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
  1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0,
  0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
];

// checks wall before moving
// @param rotation is direction of pacman


const checkWall = (rotation) => {
    return layout[pacmanCurrentIndex +rotation] === 1;
};

// checks game over

const checkGameover = () => {
    if(
        squares[pacmanCurrentIndex].classList.contains("ghost") && 
        squares[pacmanCurrentIndex].classList.contains(".scared")
    ){
        gameOver();
    }
}  
// checks win

const checkForWinning = () => {
    if(score >= 500) {
        won = true;
        stopAll()
        messageTitle.textContent = "YOU WON";
    }
}

// Event function when pacman ate apple

const pacmanAteApple = () => {
    squares[pacmanCurrentIndex].classList.contains("pac-dot")
    score += 5
    scoreDisplay.innerHTML = score;
}

// Event function when pacman ate power pellet


const pacmanAtePowerPellet = () => {
    ghostScared = true;
    squares[pacmanCurrentIndex].classList.contains("power-pellet")
    score += 10
    scoreDisplay.innerHTML = score;
    ghost.forEach((ghost) => {
        ghost.atePowerPellet()
    })
   setTimeout(() => {
       ghostScared = false;
       ghosts.forEach(ghost => {
           ghost.isScared = false;
       });
   },150000);
}

const addClassToPacman = () => {
switch (direction) {
    case 1:
        squares[pacmanCurrentIndex].classList.add("pacman", "rotate-right");
        break;
    case -1:
        squares[pacmanCurrentIndex].classList.add("pacman", "rotate-left");
        break;
    case width:
         squares[pacmanCurrentIndex].classList.add("pacman", "rotate-bottom");
         break;
    case -width:
        squares[pacmanCurrentIndex].classList.add("pacman", "rotate-up" );
        break;

}


}


// According to the direction adds pacman proper classes



// continue when the user clicks continue

const continueGame = () =>{
    messageSection.classList.add(display-none);
    move();
    ghosts.forEach((ghost) => {
        ghost.move()
    });

};

// Event function runs after game over

const gameOver = (ghost = null)=> {
if(ghost) {
    ghost.resetGhost();
}
    squares[pacmanCurrentIndex].classList = ""
    pacmanCurrentIndex = initialPacmanIndex
    messageTitle.innerHTML = "The Game is Over"
    stopAll()

};

// stops ghosts and pacman

const stopAll = () => {
    ghosts.forEach((ghost) => {
        clearInterval(ghost.timeId)
    });
    clearInterval(intervalPacmanMove);
    messageSection.classList.remove("display-none")
}


// moves pacman

const move = () => {
intervalPacmanMove = setInterval(()=>{
    won ? "": checkForWinning();
    squares[pacmanCurrentIndex].classList.remove("pacman","rotate-top","rotate-bottom",
    "rotate-left", "rotate-right");

if (direction === 1 && pacmanCurrentIndex === 391) {
    pacmanCurrentIndex = 364;
}
else if (direction === -1 && pacmanCurrentIndex === 364) {
    pacmanCurrentIndex = 391;
}
else {
    if(checkWall(direction)){
        direction = 0;
    }
    pacmanCurrentIndex += direction
}

addClassToPacman()
if(squares[pacmanCurrentIndex].classList.contains("pac-dot")){
    pacmanAteApple();
}
if(squares[pacmanCurrentIndex].classList.contains("power-pellet")) {
    pacmanAtePowerPellet();
}

if (!ghostScared && squares[pacmanCurrentIndex].classList.contains("ghost")) {
    gameOver()
}

}, pacmanSpeed)
};

// creates Board child divs
// push the div into the square Array
// 0 - pacdots,
// 1 - wall,
// 2 - ghost, 
// 3 -powerpellets,
// 4 - empty

const createBoard = () => {
for (let i in layout) {
    let newDiv = document.createElement("div")
    grid.appendChild(newDiv)
    squares.push(newDiv)
    if(layout[i] === 0){
        squares[i].classList.add("pac-dot", "inside-game")
    }

    else if(layout[i] === 1) {
        squares[i].classList.add("wall")
    }

    else if(layout[i] === 2) {
        squares[i].classList.add("ghost")
    }
    else if(layout[i] === 3) {
        squares[i].classList.add("power-pellet")
    }

     else if(layout[i] === 4) {
        squares[i].classList.add("empty")
    }

}

squares[pacmanCurrentIndex].classList.add("pacman")
move(); 

};

// memories clicking arrow buttons
// when user click arrow buttons
// if there's a wall in that direction
// it movesd when possible


const changeDirectionWhenPossible = (rotation) => {
    if (intervalCheckwall) {
        clearInterval(intervalCheckWall);
    }
    intervalCheckwall = setInterval(() => {
        if(!checkWall(rotation)) {
            direction = rotation;
            clearInterval(intervalCheckWall)
        }
    }, pacmanSpeed / 2)
}

function controls(e) {
    switch(e.key){
       case "Arrow Up":
           if(
               pacmanCurrentIndex - width >= 0 ) pacmanCurrentIndex -= width
            break
    case "Arrow Down":
        if(
            pacmanCurrentIndex + width < width * width) pacmanCurrentIndex +=width
            break
    case "Arrow Right":
        if ( pacmanCurrentIndex % width < width -1) pacmanCurrentIndex += 1
        break
    case "Arrow Left":
        if (pacmanCurrentIndex % width != 0) pacmanCurrentIndex -= 1
        break
    }
}

document.addEventListener("keyup", control);
btnContinue.addEventListener("click", continueGame)

createBoard()








