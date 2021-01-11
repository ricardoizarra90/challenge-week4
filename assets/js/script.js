var quizWrapper = document.querySelector("#id-quiz-wrapper");
var quizContainer = document.querySelector("#id-quiz-container");
var startBtn = document.querySelector("#id-btn-start-quiz");
var startPage = document.querySelector("#id-start-page");
var quizPage = document.querySelector("#id-quiz-content");
var userAnswerResult = document.querySelector("#id-user-answer");
var submitPage = document.querySelector("#id-submit-page");
var highScorePage = document.querySelector("#id-high-scores");
var userHighScore = document.querySelector("#id-play-score");
var highScoreButtons = document.querySelector("#id-high-scores-buttons");
var playTime = document.querySelector("#id-play-time");
var viewHighScoresBtn = document.querySelector("#id-header-button");
const START = "start";
const USERANSWERS = "userAnswers";
const SUBMIT = "submit";
const HIGHSCORES = "viewHighScores";
const GOBACK = "goBack";
const CLRHIGHSCORES = "clrHighScores";
const CORRECT = "Correct!";
const WRONG = "Wrong!";
const BTNCLICKED = "BUTTON CLICKED!";
const QUESTIONS = 4;
const ANSWERS = 0;
const USERINPUT = 0;

var userScore = 0;
var questionNumber = 0;
var userAnswerResultStatus = false;
var startTime = 1500;
var highScoreArray = [];
var gameTimer;

var questions = {
  question1: {question: '1The condition in an if / else statement is enclosed with _____.', ans1: 'paranthesis', ans2: 'square brackets', ans3: 'quotes', ans4: 'curly brackets', answer: 'paranthesis'},
  question2: {question: '2Commonly used data types DO Not Include:', ans1: 'numbers', ans2: 'strings', ans3: 'booleans', ans4: 'alerts', answer: 'numbers'},
  question3: {question: '3Arrays in JavaScript can be use to store _____.', ans1: 'numbers and strings', ans2: 'other arrays', ans3: 'booleans', ans4: 'all of the above', answer: 'all of the above'},
  question4: {question: '4String values must be enclosed within _____ when being assigned to variables:', ans1: 'commas', ans2: 'curly brackets', ans3: 'quotes', ans4: 'parenthesis', answer: 'quotes'},
  question5: {question: '5A very useful tool used during development and debugging for printing content to the debugger is:', ans1: 'JavaScript', ans2: 'terminal/bash', ans3: 'for loops', ans4: 'console.log', answer: 'JavaScript'},
}
var questionBank = [];
for(var key in questions) {
  questionBank.push(questions[key]);
}

function removeAllChildNodes(parent) {
  while(parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
};

function clearPage(parent) {
  if(parent.hasChildNodes()) {
    parent.remove();
  }
};

function getStartPage() {
  
  removeAllChildNodes(startPage);
  removeAllChildNodes(quizContainer);
  
  var startPageHeading = document.createElement("h1");
  startPageHeading.innerText ="Coding Quiz Challenge";

  var startPageText = document.createElement("p");
  startPageText.innerText = "Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your socre/time by ten seconds!";

  var startPageButton = document.createElement("button");
  startPageButton.className ="btn";
  startPageButton.innerText ="Start Quiz";
  startPageButton.setAttribute("data-btn", "start");

  startPage.append(startPageHeading, startPageText, startPageButton);
  quizContainer.append(startPage);
  startPageButton.addEventListener("click", btnHandler);
  questionNumber = 0;
  userScore = 0;
  startTime = 100; 
};

function getPages() {
  if (questionNumber === 0) {
    gameTimer = setInterval(function() {
      if(startTime <= 0) {
        getSubmitPage();
      }
      playTime.innerText = startTime;
      startTime--;
    }, 1000);
  }
  if (questionNumber < questionBank.length) {
    
    getQuestionPage();
  }
  else {

    getSubmitPage();
  }
};

function getQuestionPage(){
  removeAllChildNodes(startPage);
  removeAllChildNodes(quizPage);

  var quizPageContainer = document.createElement("div");
  quizPageContainer.className ="quiz-page-container";

  var quizPageQuestions = document.createElement("div");
  quizPageQuestions.className = "quiz-content-question";
  
  var quizPageButtons = document.createElement("div");
  quizPageButtons.className = "quiz-content-buttons"

  var question = document.createElement("h1");
  question.className = "questions-items";
  question.innerHTML = questionBank[questionNumber].question;
  quizPageQuestions.append(question);

  // temp variables
  var x, i = 1;
  for(x in questionBank[questionNumber]) {
    if(x === 'ans1' ||x === 'ans2' ||x === 'ans3' ||x === 'ans4') {
      var btnItem = document.createElement("button");
      btnItem.className = "btn-ans";
      btnItem.innerHTML = i + ". " +questionBank[questionNumber][x];
      btnItem.setAttribute("data-btn-ans", questionBank[questionNumber][x]);
      btnItem.setAttribute("data-btn", USERANSWERS);
      quizPageButtons.appendChild(btnItem);
      btnItem.addEventListener("click",btnHandler);
      i++;
    }
  }
  quizPageContainer.append(quizPageQuestions, quizPageButtons);
  quizPage.append(quizPageContainer);
  quizContainer.insertBefore(quizPage,quizContainer.firstChild);
};

function checkAnswer(userAnswer) {
  var result = false;
  console.log("userAnswer: " +userAnswer);
  console.log("answer: "+questionBank[questionNumber].answer);
  console.log("questionNumber: "+ questionNumber);
  if(userAnswer === questionBank[questionNumber].answer){
    result = true;
    userScore++;
  }
  else {
    result = false;
    startTime -= 10; 
  }
  printResult(result);
  questionNumber++;
}

function printResult(userAnswerStatus){

  removeAllChildNodes(userAnswerResult);
  var userAnswerStatusContent = document.createElement("h3");
  userAnswerStatusContent.className = "user-answer-status-content";
  
  if(userAnswerStatus === true) {
    userAnswerStatusContent.innerHTML = CORRECT;
  }
  else {  
    userAnswerStatusContent.innerHTML = WRONG;
  }
  userAnswerResult.append(userAnswerStatusContent);
  quizContainer.append(userAnswerResult);

};

function getSubmitPage() {

  clearInterval(gameTimer);
  playTime.innerText = 0;

  removeAllChildNodes(quizPage);
  removeAllChildNodes(submitPage);
  
  var submitPageContainer = document.createElement("div");
  submitPageContainer.className = "submit-page-container";

  var submitPageHeading = document.createElement("h2");
  submitPageHeading.innerHTML = "All done!";

  var submitPageInfo = document.createElement("p");
  submitPageInfo.innerHTML = "Your final score is <span id='id-user-score'>"+String(userScore)+"</span>";
  
  var submitPageBoxContainer = document.createElement("form");
  submitPageBoxContainer.className = "submit-page-box-container";
  submitPageBoxContainer.setAttribute("id", "id-submit-page-box-container");
  submitPageBoxContainer.innerHTML =
    "Enter initials: "+
    "<input type='text' id='userInitial'>" +
    "<input type='submit' id='id-btn-submit' class='btn' value='submit' data-btn='submit'>";

  submitPageContainer.append(submitPageHeading, submitPageInfo, submitPageBoxContainer);
  submitPage.append(submitPageContainer);
  quizContainer.insertBefore(submitPage,quizContainer.firstChild);

  document.querySelector("#id-btn-submit").addEventListener("click", btnHandler);  
};

function getHighScorePage(userView) {

  clearInterval(gameTimer);
  playTime.innerText = 0;


  console.log(userView);
  if(!userView) {
    var userScoreInfo = document.querySelector("input[id='userInitial']").value;
    var userDataObj = {
      userName: userScoreInfo,
      score: userScore
    };
    highScoreArray.push(userDataObj);
    saveHighScores();
  }

  var highScoreData = loadHighScores();

  if(highScoreData) {
    highScoreData.sort(compare);
  }

  removeAllChildNodes(quizContainer);
  removeAllChildNodes(highScorePage);
  
  var highScorePageContainer = document.createElement("div");
  highScorePageContainer.className = "high-score-page-container";

  var highScoreButtons = document.createElement("div");
  highScoreButtons.className = "high-score-buttons";  

  var highScoresHeading = document.createElement("h2");
  highScoresHeading.innerHTML = "High scores";


  var highScoreLists = document.createElement("ol");
  highScoreLists.setAttribute("id", "id-high-score-lists")

  for (var i =0; i < highScoreData.length; i++) {
    var highScoreli = document.createElement("li");
    highScoreli.innerHTML = highScoreData[i].userName + " - " +highScoreData[i].score;
    highScoreLists.append(highScoreli);
  }

  var goBackBtn = document.createElement("button");
  goBackBtn.className = "btn";
  goBackBtn.innerText = "Go back";
  goBackBtn.setAttribute("data-btn",GOBACK);

  var clearHighScoresBtn = document.createElement("button");
  clearHighScoresBtn.className =  "btn";
  clearHighScoresBtn.innerText = "Clear high scores";
  clearHighScoresBtn.setAttribute("data-btn",CLRHIGHSCORES);

  highScorePageContainer.insertBefore(highScoresHeading, highScorePageContainer.firstChild);
  highScorePageContainer.append(highScoreLists);
  highScoreButtons.append(goBackBtn, clearHighScoresBtn);
  highScorePageContainer.append(highScoreButtons);
  highScorePage.append(highScorePageContainer);
  quizContainer.append(highScorePage);

  goBackBtn.addEventListener("click",btnHandler);
  clearHighScoresBtn.addEventListener("click",btnHandler);
};

function clearHighScore() {
  localStorage.clear();
  var highscores = document.querySelector("#id-high-score-lists");
  removeAllChildNodes(highscores);
};

function btnHandler(event) {
  event.preventDefault();
  var userBtnStatus = event.target.getAttribute("data-btn");
  var userBtnAns = event.target.getAttribute("data-btn-ans");
  var userView = event.target.getAttribute("data-view");
  switch(userBtnStatus) {
    case START:
      getPages();
      break;
    case USERANSWERS:
    
      userAnswerResultStatus = checkAnswer(userBtnAns);
      getPages();
      break;
    case SUBMIT:
      getHighScorePage();
      break;
    case HIGHSCORES:
      getHighScorePage(userView);
      break;
    case GOBACK:
      getStartPage();
      break;
    case CLRHIGHSCORES:
      clearHighScore();
      break;
    default :
      break;                            
  }
}

function saveHighScores() {
  localStorage.setItem("highScores", JSON.stringify(highScoreArray));
  console.log("saved");
};

function loadHighScores() {
  var savedHighScores = localStorage.getItem("highScores");
  if(!savedHighScores) {
    return false;
  }
  console.log("save tasks found!");

  savedHighScores = JSON.parse(savedHighScores);
  return savedHighScores;
}

function compare(a,b) {
  var result = 0;
  if (a.score < b.score) {
    result = 1;
  }
  else {
    result = -1;
  }
  return result;
}

window.onload = getStartPage();

viewHighScoresBtn.addEventListener("click", btnHandler)