var questions = [
    {
      title: "What is Super Tuesday?",
      multiChoice: ["A holiday", "A primary election day", "Sports championship", "I don't know"],
      answer: "A primary election day"
    },
  
    {
      title: "Which state has the biggest impact on election results on Super Tuesday?",
      multiChoice: ["California", "Texas", "Iowa", "New Hampshire"],
      answer: "California"
    },
  
    {
      title: "Which candidate is appearing on ballots for the first time Super Tuesday?",
      multiChoice: ["Elizabeth Warren", "Mike Bloomberg", "Bernie Sanders", "Joe Biden"],
      answer: "Mike Bloomberg"
    },
  
    {
      title: "Which of the following states will not vote on Super Tuesday?",
      multiChoice: ["Maine", "Colorado", "Utah", "Maryland"],
      answer: "Maryland"
    }
  ];
  
let secondsLeft = 76;


let timer = document.getElementById("timer");


let scoresDiv = document.getElementById("scores-div");

let buttonsDiv = document.getElementById("buttons")


let viewScoresBtn = document.getElementById("view-scores")


let startButton = document.getElementById("start-button");
startButton.addEventListener("click", setTime);



var questionDiv = document.getElementById("question-div");


let results = document.getElementById("results");

var choices0 = document.getElementById("choices0");
var choices1 = document.getElementById("choices1");
var choices2 = document.getElementById("choices2");
var choices3 = document.getElementById("choices3");


var choiceArr = [choices0, choices1, choices2, choices3];

let emptyArray = [];

let storedArray = JSON.parse(window.localStorage.getItem("highScores"));


var questionCount = 0;


let score = 0

function setTime() {
  displayQuestions();
  let timerInterval = setInterval(function() {
    secondsLeft--;
    timer.textContent = "";
    timer.textContent = "Time: " + secondsLeft;
    if (secondsLeft <= 0 || questionCount === questions.length) {
      clearInterval(timerInterval);
      captureUserScore();
    } 
  }, 1000);
}

function displayQuestions() {
  removeEls(startButton);
  questionDiv.innerHTML = questions[questionCount].title;
  for (let i = 0; i < questions[questionCount].multiChoice.length; i++) {
    let el = document.createElement("button");
    el.innerText = questions[questionCount].multiChoice[i];
    el.setAttribute("data-id", i);
    el.addEventListener("click", function(event) {
      event.stopPropagation();
      if (el.innerText === questions[questionCount].answer) {
        score += secondsLeft;
        console.log(score);
      } else {
        score -= 10;
        secondsLeft = secondsLeft - 15;
        console.log(score);
      }
      choiceArr[questionCount].remove();
      questionDiv.innerHTML = "";
      questionCount++;
      if (questionCount === questions.length) {

        return;
      } else {
        displayQuestions();
      }
    });
    choiceArr[questionCount].append(el);
  }
}

function captureUserScore() {
  timer.remove();

  
  let initialsInput = document.createElement("input");
  let postScoreBtn = document.createElement("input");

  results.innerHTML = `You scored ${score} points! Enter initials: `;
  initialsInput.setAttribute("type","text");
  postScoreBtn.setAttribute("type", "button");
  postScoreBtn.setAttribute("value", "Post My Score!");
  postScoreBtn.addEventListener("click", function(event) {
    event.preventDefault();
    let scoresArray = defineScoresArray(storedArray,emptyArray)

    let initials = initialsInput.value;
    let userAndScore = {
      initials: initials,
      score: score,
    } 

    scoresArray.push(userAndScore);
    saveScores(scoresArray);
    displayAllScores();
    clearScoresBtn();
    goBackBtn();
    viewScoresBtn.remove();
  })
  results.append(initialsInput);  
  results.append(postScoreBtn);

}

const saveScores = (array) => {
  window.localStorage.setItem("highScores", JSON.stringify(array));
}

const defineScoresArray = (arr1, arr2) => {
  if(arr1 !== null) {
    return arr1
  } else {
    return arr2
  }
}

const removeEls = (...els) => {
  for (let el of els) el.remove();
}

function displayAllScores() {
  removeEls(timer, startButton, results);
  let scoresArray = defineScoresArray(storedArray, emptyArray);

  scoresArray.forEach(obj => {
    let initials = obj.initials;
    let storedScore = obj.score;
    let resultsP = document.createElement("p");
    resultsP.innerText = `${initials}: ${storedScore}`;
    scoresDiv.append(resultsP);
  });

}
  