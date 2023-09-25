function Answer(answerText) {
  this.answerText = answerText;
}

function Question(questionNo, questionText, answerChoices, rightAnswer) {
  this.questionNo = questionNo;
  this.questionText = questionText;
  this.answerChoices = answerChoices;
  this.rightAnswer = rightAnswer;

  this.isUserAnswerCorrect = function (userSelectedAnswer) {
    if (rightAnswer.answerText == userSelectedAnswer) {
      console.log("Correct Answer");
      return true;
    } else {
      console.log("Wrong answer");
      return false;
    }
  };
}

var answerFunctions = new Answer("Functions");
var answerXHTML = new Answer("XHTML");
var answerCSS = new Answer("CSS");
var answerHTML = new Answer("HTML");

var question1 = new Question(
  1,
  "Javascript Support",
  [answerFunctions, answerXHTML, answerCSS, answerHTML],
  answerFunctions
);

var answerJQuery = new Answer("JQuery");
var answerXML = new Answer("XML");

var question2 = new Question(
  2,
  "Which language is used for styling web pages?",
  [answerHTML, answerJQuery, answerCSS, answerXML],
  answerCSS
);

var answerPythonScript = new Answer("Python Script");
var answerDjango = new Answer("Django");
var answerNodeJS = new Answer("Node JS");

var question3 = new Question(
  3,
  "Which is not a Javascript framework?",
  [answerPythonScript, answerJQuery, answerDjango, answerNodeJS],
  answerPythonScript
);

var answerPHP = new Answer("PHP");
var answerJS = new Answer("JS");
var answerAll = new Answer("All");

var question4 = new Question(
  4,
  "Which is used to connect to Database?",
  [answerPHP, answerHTML, answerJS, answerAll],
  answerPHP
);

var answerLanguage = new Answer("Language");
var answerProgrammingLanguage = new Answer("Programming Language");
var answerDevelopment = new Answer("Development");

var question5 = new Question(
  5,
  "Java Script is a ",
  [answerLanguage, answerProgrammingLanguage, answerDevelopment, answerAll],
  answerProgrammingLanguage
);

function QuizResult(questionAnswersObj) {
  this.questionAnswersObj = questionAnswersObj;
  this.score = 0;

  this.getScore = function () {
    return this.score;
  };

  this.incrementScore = function () {
    console.log("Score is incremented...");
    this.score++;
  };

  this.calculatePercentage = function () {
    console.log("questionAnswersObj" + questionAnswersObj);
    console.log("questionAnswersObj" + this.questionAnswersObj.length);

    var percentage = (this.score / this.questionAnswersObj.length) * 100;
    console.log("Percentage " + percentage);
    return percentage;
  };
}

function QuizApplication(questionAnswersObj) {
  this.questionAnswersObj = questionAnswersObj;
  this.quizResult = new QuizResult(this.questionAnswersObj);
  this.pageIndex = 0;

  this.load = function () {
    this.attachListeners();
    this.displayQuizPage();
  };

  this.attachListeners = function () {
    var qaPairObj = this.questionAnswersObj[this.pageIndex];
    var answerChoices = qaPairObj.answerChoices;
    console.log("Number of answers is " + answerChoices.length);

    var currentQuizAppObj = this;

    for (var index = 0; index < answerChoices.length; index++) {
      var buttonId = "btn" + index;
      var answerChoiceButton = document.getElementById(buttonId);
      this.addEventListener(answerChoiceButton, currentQuizAppObj);
    }
  };

  this.addEventListener = function (answerChoiceButton, currentQuizAppObj) {
    answerChoiceButton.onclick = function (event) {
      var target = event.currentTarget;
      console.log("Button is clicked " + target);
      var userSelectedAnswer = target.children[0].innerHTML;
      console.log("User selected text " + userSelectedAnswer);
      var qaPairObj =
        currentQuizAppObj.questionAnswersObj[currentQuizAppObj.pageIndex];
      var outcome = qaPairObj.isUserAnswerCorrect(userSelectedAnswer);

      if (outcome) {
        currentQuizAppObj.quizResult.incrementScore();
      } else {
        // Do nothing
      }

      currentQuizAppObj.next();
    };
  };

  this.next = function () {
    if (this.isLastQuestionAnswerPair()) {
      this.displayResultPage();
    } else {
      this.displayNextQuizPage();
    }
  };

  this.displayNextQuizPage = function () {
    this.pageIndex++;
    this.attachListeners();
    this.displayQuizPage();
  };

  this.displayResultPage = function () {
    var quizElement = document.getElementById("quiz");
    var content =
      "<h1>Result </h1><h2 id='score'>Your score : " +
      this.quizResult.getScore() +
      ". Percentage is " +
      this.quizResult.calculatePercentage() +
      " </h2>";
    quizElement.innerHTML = content;
  };

  this.displayQuizPage = function () {
    this.displayQASection();
    this.displayProgressSection();
  };

  this.displayQASection = function () {
    var qaPairObj = this.questionAnswersObj[this.pageIndex];
    var questionElement = document.getElementById("question");
    questionElement.innerText = qaPairObj.questionText;
    var answerChoices = qaPairObj.answerChoices;
    console.log("Number of answers is " + answerChoices.length);

    for (var index = 0; index < answerChoices.length; index++) {
      var answerChoiceObj = answerChoices[index];
      var identifier = "choice" + index;
      var answerChoiceElement = document.getElementById(identifier);
      answerChoiceElement.innerText = answerChoiceObj.answerText;
    }
  };

  this.displayProgressSection = function () {
    var progressElement = document.getElementById("progress");
    var qaPairObj = this.questionAnswersObj[this.pageIndex];
    var progressText =
      "Question " + qaPairObj.questionNo + " of " + questionAnswersObj.length;
    progressElement.innerText = progressText;
  };

  this.isLastQuestionAnswerPair = function () {
    if (this.pageIndex == this.questionAnswersObj.length - 1) {
      return true;
    } else {
      return false;
    }
  };
}

var javascriptQuizApp = new QuizApplication([
  question1,
  question2,
  question3,
  question4,
  question5,
]);
javascriptQuizApp.load();
