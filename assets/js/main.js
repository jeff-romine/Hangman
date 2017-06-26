/**
 * Created by jeffromine on 6/25/17.
 */


var wordTable = {
  "magnolia": {
    title: "Sugar Magnolia",
    src: "https://www.youtube.com/embed/nkKuhAxcH7g"
  },
  "althea": {
    title: "Althea",
    src: "https://www.youtube.com/embed/N7lMxNfb7rw"
  },
  "brokedown": {
    title: "Brokedown Palace",
    src: "https://www.youtube.com/embed/A9uyMjzmT3k"
  },
  "palace": {
    title: "Brokedown Palace",
    src: "https://www.youtube.com/embed/A9uyMjzmT3k"
  },
  "begonias": {
    title: "Scarlet Begonias",
    src: "https://www.youtube.com/embed/xgPLFYNEL1A"
  },
  "scarlet": {
    title: "Scarlet Begonias",
    src: "https://www.youtube.com/embed/xgPLFYNEL1A"
  }
};

var state = "init";
var currentWordArr;
var lettersGuessed = new Set();
var guessesRemaining = 10;
var correctLetterCount = 0;
var displayWordArr;
var words = Object.keys(wordTable);

function setElementTextById(id, value) {
  document.getElementById(id).textContent = value;
}

function refreshGameArea() {
  setElementTextById("display-word", displayWordArr.join(" "));
  setElementTextById("guesses-remaining", "" + guessesRemaining);
  setElementTextById("letters-guessed", Array.from(lettersGuessed).join(","));
}

function updateDisplay(videoData) {
  "use strict";
  var iframeElement = document.getElementById("youtube-iframe");
  var placeHolder = document.getElementById("youtube-iframe-placeholder");

  iframeElement.src = videoData.src;
  placeHolder.style.display = "none";
  iframeElement.style.display = "block";
}

function isAlpha(ch){
  return /^[A-Z]$/i.test(ch);
}

document.onkeyup = function (event) {

  var letter = event.key.toUpperCase();

  if (state === "init") {
    currentWordArr = Array.from(words[Math.floor(Math.random() * words.length)].toUpperCase());
    displayWordArr = currentWordArr.map((x) => "_");
    lettersGuessed = new Set();
    guessesRemaining = 12;
    correctLetterCount = 0;
    
    refreshGameArea();
    state = "playing";
  }
  else if (state === "playing") {

    if ((letter.length) > 1 || !isAlpha(letter)) {
      return;
    }
    if (!lettersGuessed.has(letter)) {
      lettersGuessed.add(letter);

      if (currentWordArr.includes(letter)) {
        for (var i = 0; i < currentWordArr.length; i++) {
          if (currentWordArr[i] == letter) {
            if (displayWordArr[i] !== "_") {
              console.log("ERROR: \"" + letter + "\" has already been replaced in display word");
            }
            displayWordArr[i] = letter;
            correctLetterCount++;
            guessesRemaining--;
          }
        }
      }
      else {
        guessesRemaining--;
      }

      if (correctLetterCount == currentWordArr.length) {
        updateDisplay(wordTable[currentWordArr.join("").toLowerCase()]);
        state = "init";
      }
      else if (0 === guessesRemaining) {
        state = "lost";
      }

    }
    refreshGameArea();
  }
}
