"use strict";
/*    JavaScript 7th Edition
      Project 3
      Author: Dinesh Kumar Gummadavelli
      Date:   12/05/2025

      Filename: project3.js
*/

(function () {
  function trim(str) {
    return String(str || "").replace(/^\s+|\s+$/g, "");
  }

  function onReady(fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn);
    } else {
      fn();
    }
  }

  onReady(function () {
    var game = new BaseballGame();

    var keySpan   = document.getElementById("key");
    var guessSpan = document.getElementById("guess");
    var digitBtns = document.getElementsByClassName("digit");
    var newBtn    = document.getElementById("new");
    var tbodyStat = document.getElementById("tbody-stat");

  
    function showKey() {
      keySpan.textContent = game.getSecret();
    }

    function updateGuessDisplay() {
      guessSpan.textContent = game.getCurrentGuess();
    }

    function clearTable() {

      while (tbodyStat.firstChild) {
        tbodyStat.removeChild(tbodyStat.firstChild);
      }
    }

    function setDigitsEnabled(enabled) {
      var i;
      for (i = 0; i < digitBtns.length; i++) {
        digitBtns[i].disabled = !enabled;
        if (!enabled) {
          digitBtns[i].style.opacity = "0.5";
        } else {
          digitBtns[i].style.opacity = "1";
        }
      }
    }

    function handleDigitClick(evt) {
      var digit = trim(evt.target.textContent);
      if (digit === "") {
        return;
      }

      var result = game.addDigit(digit);
      updateGuessDisplay();


      if (result && typeof result === "object") {
        var tr = document.createElement("tr");

        var tdGuess   = document.createElement("td");
        var tdBalls   = document.createElement("td");
        var tdStrikes = document.createElement("td");

        tdGuess.textContent   = result.guess.split('').join(',');
        tdBalls.textContent   = result.balls;
        tdStrikes.textContent = result.strikes;

        tr.appendChild(tdGuess);
        tr.appendChild(tdBalls);
        tr.appendChild(tdStrikes);

        tbodyStat.appendChild(tr);


        updateGuessDisplay();


        if (result.strikes === 3) {
          alert("Strike out! The Key was " + game.getSecret() + ". Click New to start a new game.");
          setDigitsEnabled(false);
        }
      }
    }


    var i;
    for (i = 0; i < digitBtns.length; i++) {
      digitBtns[i].addEventListener("click", handleDigitClick);
    }


    newBtn.addEventListener("click", function () {
      game.newGame();
      showKey();
      updateGuessDisplay();
      clearTable();
      setDigitsEnabled(true);
    });

    // initial state
    setDigitsEnabled(false);
    guessSpan.textContent = "";

  });
})();
