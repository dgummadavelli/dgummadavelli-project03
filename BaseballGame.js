"use strict";
/*    JavaScript 7th Edition
      Project 3
      Author: Dinesh Kumar Gummadavelli
      Date:   12/05/2025

      Filename: BaseballGame.js
*/
// implement the class BaseballGame for game logic
class BaseballGame {
  constructor() {
    this.secret = "";
    this.currentGuess = "";
    this.history = [];
    this.newGame();
  }

  newGame() {

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


  getSecret() {
    return this.secret.split('').join(',');
  }


  getCurrentGuess() {
    return this.currentGuess;
  }


  addDigit(digit) {

    if (this.currentGuess.length >= 3) {
      return false;
    }


    if (this.currentGuess.indexOf(digit) !== -1) {
      return false;
    }

    this.currentGuess += digit;

    if (this.currentGuess.length === 3) {
      var result = this.checkGuess();
      this.history.push(result);

      this.currentGuess = "";
      return result;
    }

    return null;
  }

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
