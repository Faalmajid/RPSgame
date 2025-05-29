//Creating the score object to track the game score
const score = {
  wins: 0,
  losses: 0,
  ties: 0,
};

//Adding an event listener to check if data is available in the local storage
window.addEventListener("storage", updateScore(), true);
//Generating the computer move [Using random number ]
//Then comparing user and computer moves
function generateComputerMove(userMove) {
  //Using random method to generate random value
  const randNumber = Math.random();
  //Creating a variable to hold computer move
  let computerMove = "";
  //Checking the random value to assign a move
  //Assumption [dividing random range into 3 sections]

  if (randNumber >= 0 && randNumber < 1 / 3) {
    computerMove = "Rock";
  } else if (randNumber >= 1 / 3 && randNumber < 2 / 3) {
    computerMove = "Paper";
  } else if (randNumber >= 2 / 3 && randNumber < 1) {
    computerMove = "Scissors";
  }

  //Printing the genrated computer move
  console.log(randNumber, " - ", computerMove);

  // CALLING THE MOVES COMPARISON FUNCTION
  compareMoves(computerMove, userMove);
}

//Creating a function to compare moves
function compareMoves(computerChoice, userChoice) {
  //Creating a variable to store comparison result
  let theResult = "";

  //Comparing user and computer moves
  if (computerChoice === userChoice) {
    theResult = "Tie";
  } else if (computerChoice === "Rock" && userChoice === "Paper") {
    theResult = "You win.";
  } else if (computerChoice === "Rock" && userChoice === "Scissors") {
    theResult = "You lose.";
  } else if (computerChoice === "Paper" && userChoice === "Rock") {
    theResult = "You lose.";
  } else if (computerChoice === "Paper" && userChoice === "Scissors") {
    theResult = "You win.";
  } else if (computerChoice === "Scissors" && userChoice === "Rock") {
    theResult = "You win.";
  } else if (computerChoice === "Scissors" && userChoice === "Paper") {
    theResult = "You lose.";
  }

  //Updating the game score
  if (theResult === "You win.") {
    score.wins += 1;
  } else if (theResult === "Tie") {
    score.ties += 1;
  } else if (theResult === "You lose.") {
    score.losses += 1;
  }

  //Storing the current score in the local storage oject
  //LocalStorage object works with "string" typed data, so we need to convert
  // the score object into string before adding it
  localStorage.setItem("score", JSON.stringify(score));
  //Display the result
  displayResults(theResult, computerChoice, userChoice);
}
function displayResults(
  aResult = "New Game",
  aComputerChoice = "No Move",
  aUserChoice = "No Move"
) {
  let theResultDisplay = document.querySelector(".jsResult");
  let theMovesDisplay = document.querySelector(".jsMoves");
  let theScoreDisplay = document.querySelector(".jsScore");
  theResultDisplay.innerHTML = aResult;
  theMovesDisplay.innerHTML = `You      
         <img class="moveIcon" src="./${aUserChoice}Final.png" alt="Rock" />
               <img class="moveIcon" src="./${aComputerChoice}Final.png" alt="Rock" />

 Computer`;

  theScoreDisplay.innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}.
        Ties: ${score.ties}.`;
}

//Creating a function to reset the game score
function resetCounters() {
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;

  //cLEARING THE LOCAL STORAGE
  localStorage.removeItem("score");
  //Informing the user
  // console.log(`The score has been reset. This is a fresh start. \nWins: ${score.wins}
  // , Losses: ${score.losses}, Ties: ${score.ties}`);    }
  displayResults();
}
// Adding a function to update the score object using the local storage
function updateScore() {
  //Getting the data from the local Storage object
  let newScore = JSON.parse(localStorage.getItem("score"));

  //checking if the score object is not null
  if (newScore === null) {
    alert("There is no saved score.");
  } else {
    alert("Saved score available");
    //updating the score object
    score.wins = newScore.wins;
    score.ties = newScore.ties;
    score.losses = newScore.losses;

    displayResults();
  }
}
