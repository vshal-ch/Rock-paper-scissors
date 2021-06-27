const rulesButton = document.querySelector(".rules-button");
const rules = document.querySelector(".rule-back");
const closeButton = document.querySelector(".cross");
const gameBlock = document.querySelector(".game-block");
const blocks = document.querySelectorAll(".block");
const matchBlock = document.querySelector(".match-block");
const yourBlock = document.querySelector(".your-pick .block");
const yourBlockImage = document.querySelector(".your-pick-image");
const compBlockImage = document.querySelector(".comp-pick-image");
const compBlock = document.querySelector(".comp-pick .block");
const resultText = document.querySelector(".result-text");
const playAgainButton = document.querySelector(".play-again-button");
const scoreText = document.querySelector(".score");
const historyList = document.querySelector(".history-list");
const historyCap = document.querySelector('.history-block>p');

let selected;
let images = ["paper", "scissors", "rock"];
let rand;
startScore();
startHistory();

function hadleClick() {
  selected = this.dataset.name;
  gameBlock.classList.remove("active");
  matchBlock.classList.add("active");

  yourBlock.classList.add(`${selected}-block`);
  yourBlockImage.src = `./images/icon-${selected}.svg`;

  setTimeout(() => {
    rand = images[getRandom(3)];
    addHistory(selected + " " + rand + ";");
    compBlockImage.src = `./images/icon-${rand}.svg`;
    compBlock.classList.add(`${rand}-block`);
    setTimeout(() => {
      decideWinner();
    }, 500);
  }, 1500);
}

function decideWinner() {
  let result;
  if (selected == rand) {
    result = "DRAWN";
  } else if (selected == "paper" && rand == "scissors") {
    compBlock.classList.add("won");
    addScore(-1);
    result = "YOU LOSE";
  } else if (selected == "scissors" && rand == "paper") {
    yourBlock.classList.add("won");
    addScore(1);
    result = "YOU WIN";
  } else if (selected == "scissors" && rand == "rock") {
    compBlock.classList.add("won");
    addScore(-1);
    result = "YOU LOSE";
  } else if (selected == "rock" && rand == "scissors") {
    yourBlock.classList.add("won");
    addScore(1);
    result = "YOU WIN";
  } else if (selected == "rock" && rand == "paper") {
    compBlock.classList.add("won");
    addScore(-1);
    result = "YOU LOSE";
  } else if (selected == "paper" && rand == "rock") {
    yourBlock.classList.add("won");
    addScore(1);
    result = "YOU WIN";
  }

  setTimeout(() => {
    resultText.textContent = result;
    matchBlock.classList.add("result");
    playAgainButton.addEventListener("click", restartGame);
  }, 1000);
}

function restartGame() {
  yourBlock.classList.remove(`${selected}-block`);
  yourBlockImage.src = `./images/icon-close.svg`;
  compBlockImage.src = `./images/icon-close.svg`;
  compBlock.classList.remove(`${rand}-block`);
  compBlock.classList.remove("won");
  yourBlock.classList.remove("won");
  matchBlock.classList.remove("result");
  matchBlock.classList.remove("active");
  gameBlock.classList.add("active");
  selected = null;
  rand = null;
}

function startScore() {
  if (localStorage.score == undefined) {
    localStorage.score = 0;
  } else {
    scoreText.textContent = localStorage.score;
  }
}

function addScore(n) {
  let tempScore = parseInt(localStorage.score);
  tempScore = tempScore + n;
  localStorage.score = tempScore;
  scoreText.textContent = localStorage.score;
}

function startHistory() {
  if (localStorage.history == undefined) {
    localStorage.history = "";
  } 
  else if (localStorage.history != "") {
    let str = localStorage.history;
    if(str.slice(-1) == ';'){
      str = str.substring(0, str.length - 1);
    }
    let array = str.split(";");
    historyCap.textContent = "HISTORY";
    historyList.innerHTML = '';
    array.forEach((item) => {
      let plays = item.split(" ");
      historyList.innerHTML += `<li class="history-item">
    <div class="your-side">
      <p class="your-item">YOU</p>
      <img src="./images/icon-${plays[0]}.svg" alt="yourplay" class="your-play">
    </div>
    <div class="comp-side">
      <p class="com-item">COM</p>
      <img src="./images/icon-${plays[1]}.svg" alt="complay" class="com-play">
    </div>
  </li>`;
    });
  }
}

function addHistory(history) {
  let array = [];
  if(localStorage.history ==''){
    localStorage.history = history;
    array[0] = localStorage.history.substring(0, localStorage.history.length-1);
  }
  else{
    if(history.slice(-1) == ';'){
      history = history.substring(0, history.length - 1);
    }
    let str = localStorage.history;
    if(str.slice(-1) == ';'){
      str = str.substring(0, str.length - 1);
    }
    array = str.split(";");   
    if (array.length >= 5) {
      array.pop();
    }
    array.push(history);
    console.log(array);    
    str = array.join(';');
    localStorage.history = str;
  }
  historyCap.textContent = "HISTORY";
  historyList.innerHTML = '';
  array.forEach((item) => {
    let plays = item.split(" ");
    historyList.innerHTML += `<li class="history-item">
    <div class="your-side">
      <p class="your-item">YOU</p>
      <img src="./images/icon-${plays[0]}.svg" alt="yourplay" class="your-play">
    </div>
    <div class="comp-side">
      <p class="com-item">COM</p>
      <img src="./images/icon-${plays[1]}.svg" alt="complay" class="com-play">
    </div>
  </li>`;
  });
}

rulesButton.addEventListener("click", () => {
  rules.classList.add("active");
});
closeButton.addEventListener("click", () => {
  rules.classList.remove("active");
});
rules.addEventListener("click", () => {
  rules.classList.remove("active");
});

blocks.forEach((block) => {
  block.addEventListener("click", hadleClick);
});

function getRandom(n) {
  let l = Math.floor(Math.random() * n);
  return l;
}
