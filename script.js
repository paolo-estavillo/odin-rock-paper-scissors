// Global variables
const choices = ["rock", "paper", "scissors"];

function computerPlay() {
    /*Returns a random element from the choices array
        Input: None
        Input Type: None

        Output: an element from the choice array
        Output Type: string
    */

    return choices[Math.floor(Math.random()*choices.length)];
}

function playRound(playerSelection, computerSelection) {
    let player = playerSelection.toLowerCase();
    let computer = computerSelection.toLowerCase();

    let player_index = choices.indexOf(player);
    let computer_index = choices.indexOf(computer);

    if (computer_index == player_index) {
        return `Draw!\nYou and computer played ${computer}.`;
    } else if (computer_index == ((player_index + 1) % 3)) {
        return `You Lose!\nComputer played ${computerSelection}.\nYou played ${playerSelection}.`;
    } else {
        return `You Win!\nComputer played ${computerSelection}.\nYou played ${playerSelection}.`;
    }

}

function checkInput(playerSelection) {

    if (playerSelection === null) {
        return true;
    }

    playerSelection = playerSelection.toLowerCase();
    let index = choices.indexOf(playerSelection);

    return index != -1;
}

/* function game() {
    let playerSelection = "", computerSelection = "", result = "";
    let playerPoints = 0, computerPoints = 0;
    let cancelled = false;

    console.log("Let's play Rock Paper Scissors!");

    for (let i = 0; i < 5; ++i) {
        
        playerSelection = prompt("Enter an input among the three:\nRock, Paper, Scissors");
        while (!checkInput(playerSelection)) {
            playerSelection = prompt("Invalid Input!\nEnter an input among the three:\nRock, Paper, Scissors");
        }
        
        if (playerSelection == null) {
            cancelled = true;
            break;
        }

        computerSelection = computerPlay();
        result = playRound(playerSelection, computerSelection);

        if (result.startsWith("You Lose!")) {
            computerPoints++;
        } else if (result.startsWith("You Win!")) {
            playerPoints++;
        } else {
            // Draw. Do nothing
        }

        console.log(`${result}\nCurrent points:\nComputer: ${computerPoints}\nYou: ${playerPoints}`);
    }

    if (cancelled) {
        console.log("Game cancelled. :(");
    } else if (playerPoints > computerPoints) {
        console.log("You won this game! :)");
    } else if (computerPoints > playerPoints) {
        console.log("You lost this game. :(");
    } else {
        console.log("Draw match! :|");
    }
}
game(); */

function updateHandDisplay(user, selection) {
    let userHand = document.querySelector(user);

    let userHandSelection = document.querySelector(`${user} .handSelection`);

    if (userHandSelection === null) {
        userHandSelection = document.createElement('div');
        userHandSelection.classList.add('handSelection');
        userHandSelection.textContent = selection;
        userHand.appendChild(userHandSelection);
    } else {
        userHandSelection.textContent = selection;
    }
}

function updateUserScore(user) {
    let userScore = document.querySelector(`.${user}Score .score`);
    let newScore = Number(userScore.textContent) + 1;
    userScore.textContent = `${newScore}`;
}

function updateScoreBoard(result) {
    if (result.startsWith('You Win!')) {
        // Update player's score
        updateUserScore('player')
    } else if (result.startsWith('You Lose!')) {
        // Update computer's score
        updateUserScore('computer');
    }

    // Update Round Number
    let roundNumber = document.querySelector('#roundNumber');
    let newRound = Number(roundNumber.textContent) + 1;
    roundNumber.textContent = `${newRound}`;
}

function inputHandler(e) {

    let playerSelection = this.textContent.toLowerCase();
    let computerSelection = computerPlay();

    // Update the player hand displayed
    updateHandDisplay('.playerHand', playerSelection);

    // Update the computer hand displayed
    updateHandDisplay('.computerHand', computerSelection);

    // Get the result of the round
    let result = playRound(playerSelection, computerSelection);

    // Update the scoreboard
    updateScoreBoard(result);

    // Check if the game is finished
    let playerScore = document.querySelector('.playerScore .score');
    let computerScore = document.querySelector('.computerScore .score');
    playerScore = Number(playerScore.textContent);
    computerScore = Number(computerScore.textContent);

    if ((computerScore >= 5) ||(playerScore >= 5)) {
        // game is finished
        let box = document.querySelector('.box');
        let boxFooter = document.createElement('div');
        
        if (computerScore >= 5) {
            boxFooter.textContent = "You Lost!";
        } else {
            boxFooter.textContent = "You Won!";
        }

        boxFooter.style['text-align'] = 'center';
        boxFooter.style['font-weight'] = 'bold';

        box.appendChild(boxFooter);

        let buttons = document.querySelectorAll('.buttons button');
        buttons.forEach(button => {
            button.disabled = true;
        })
    }
}

// console.log(document.querySelector('.roundWrapper').textContent);

let buttons = document.querySelectorAll(".buttons button");
buttons.forEach((button) => {
    button.addEventListener("click", inputHandler);
})