/*
GAME FUNCTION:
- Player must guess a number between a min and max
- Player gets a certain amount of guesses
- Notify player of guesses remaining
- Notify the player of the correct answer if loose
- Let player choose to play again
*/

// Game Values
let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;

// UI Elements
const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');

// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// Play again event listener
// it needs to be mousedown bc what happens with 'click' is as soon as when click submit it's already in effect with the play again, thats already there. as soon as we release the mouse button it basically clicks on play again automatically
game.addEventListener('mousedown', function(e){
  if (e.target.className === 'play-again'){
    window.location.reload();
  }
});

// Listen for guess
guessBtn.addEventListener('click', function(){
  // we need to parseInt because what is in the input is a string, and we will need to compare the number
  let guess = parseInt(guessInput.value);
  
  // Validate
  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter a number between ${min} and ${max}`, 'red');
  }

  // Check if won
  if (guess === winningNum) {
    // Game over - WON
    gameOver(true, `${winningNum} is correct, YOU WIN!`);

  } else {
    // Wrong number
    guessesLeft -= 1;

    if (guessesLeft === 0) {
      // Game over - LOST
      gameOver(false, `Game Over, you lost. The correct number was ${winningNum}.`);

    } else {
      // Game continues - answer wrong

      // Change border color
      guessInput.style.borderColor = 'red';

      // Clear input
      guessInput.value = '';

      // Tell user its the wrong number
      setMessage(`${guess} is not correct, ${guessesLeft} guesses left.`, 'red');
    }
  }
});

// Game over
function gameOver(won, msg){
  let color;
  won === true ? color = 'green' : color = 'red';

  // Disable input
  guessInput.disabled = true;
  // Change border color
  guessInput.style.borderColor = color;
  // Set text color
  message.style.color = color;
  // Set message
  setMessage(msg);

  // Play again?
  guessBtn.value = 'Play Again';
  guessBtn.className += 'play-again'; // append
}

// Get Random Number
function getRandomNum(min, max){
  return Math.floor(Math.random()*(max-min+1)+min);
  // ((10 - 1) + 1) + 1 = 10 - in this case, bc we defined max to 10 and min to 1 
}

// Set message
function setMessage(msg, color) {
  // passing color here will get the second parameter from the setMessage
  message.style.color = color;
  message.textContent = msg;
}