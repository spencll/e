// Guessing Game
// Write a function called guessingGame which returns a function that allows you to guess a random whole number between 0 and 99. Every time you create a new game, it should select a new random number, and keep it secret from the player.
// Once the game has started, you can guess the number. The game should tell you whether your guess is too high, too low, or correct.
// After a correct guess, the game ends.
// let game = guessingGame();
// game(50); // "50 is too low!"
// game(90); // "90 is too high!"
// game(70); // "You win! You found 70 in 3 guesses."
// game(70); // "The game is over, you already won!"

// IIFE + Closure

function guessingGame() {
    // closure variables, secret 
    const winNum = Math.floor(Math.random()*100)
    let guessCount = 0 

    return function(guess){
        // Game already won
             if (guessCount === -1) return "The game is over, you already won!";
        guessCount ++;
        if (guess>winNum) return `${guess} is too high!`
        else if (guess<winNum) return `${guess} is too low!`
        // makes guessCount to -1 to prevent any more guesses
        else {
            const result = `You win! You found ${winNum} in ${guessCount} guesses.`;
            guessCount = -1; 
            return result;
        }
    }

}
module.exports = { guessingGame };
