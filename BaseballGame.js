"use strict";

// implement the class BaseballGame for game logic
class BaseballGame {
  constructor() {
    this.secret = "";
    this.currentGuess = "";
    this.history = [];
    this.newGame();
  }

  // generate a new secret key and reset state
  newGame() {
    // Algorithm from your sketch: three different digits 0–9
    var n1 = Math.floor(Math.random() * 10);

    var n2;
    do {
      n2 = Math.floor(Math.random() * 10);
    } while (n2 === n1);

    var n3;
    do {
      n3 = Math.floor(Math.random() * 10);
    } while (n3 === n1 || n3 === n2);

    this.secret = "" + n1 + n2 + n3;
    this.currentGuess = "";
    this.history = [];
  }

  // return current secret (for display in the page)
  getSecret() {
    return this.secret.split('').join(',');
  }

  // return the current (partial) guess string
  getCurrentGuess() {
    return this.currentGuess;
  }

  // add a digit to the current guess.
  // returns:
  //   null              -> guess not complete yet
  //   {guess, balls, strikes} -> when 3 digits entered
  //   false             -> digit ignored (duplicate or too many)
  addDigit(digit) {
    // ignore if we already have 3 digits
    if (this.currentGuess.length >= 3) {
      return false;
    }

    // do not allow repeated digits
    if (this.currentGuess.indexOf(digit) !== -1) {
      return false;
    }

    this.currentGuess += digit;

    if (this.currentGuess.length === 3) {
      var result = this.checkGuess();
      this.history.push(result);
      // reset guess for next round
      this.currentGuess = "";
      return result;
    }

    return null;
  }

  // compare currentGuess to secret and return balls/strikes
  checkGuess() {
    var guess = this.currentGuess;
    var balls = 0;
    var strikes = 0;
    var i;

    for (i = 0; i < 3; i++) {
      var gChar = guess.charAt(i);
      var sChar = this.secret.charAt(i);

      if (gChar === sChar) {
        strikes++;
      } else if (this.secret.indexOf(gChar) !== -1) {
        balls++;
      }
    }

    return {
      guess: guess,
      balls: balls,
      strikes: strikes
    };
  }
}
