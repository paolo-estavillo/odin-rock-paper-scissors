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

function game() {
    let playerSelection = "", computerSelection = "", result = "";
    let playerPoints = 0, computerPoints = 0;
    let cancelled = false;

    alert("Let's play Rock Paper Scissors!");

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

        alert(`${result}\nCurrent points:\nComputer: ${computerPoints}\nYou: ${playerPoints}`);
    }

    if (cancelled) {
        alert("Game cancelled. :(");
    } else if (playerPoints > computerPoints) {
        alert("You won this game! :)");
    } else if (computerPoints > playerPoints) {
        alert("You lost this game. :(");
    } else {
        alert("Draw match! :|");
    }
}

game();