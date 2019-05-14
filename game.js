
var choices = ["antenna", "comms", "gun", "rocket"];
var gamePattern = [];
var userPattern = [];
var gameInProgress = false;
var level = 0;
var highscore = 0;
var arrayPosition;

$(document).keydown(function(event) {

  if (level === 0 && event.which === 80) {

    nextSequence();

  }

});

$("button").click(function() {

  if (gameInProgress) {

    gameInProgress = false;

    var userChoice = $(this).attr("id");
    userPattern.push(userChoice);

    $("#" + userChoice).css("background-color", "#fff");
    setTimeout(function() {
      $("#" + userChoice).css("background-color", "");
    }, 100);

    var audio = new Audio("sounds/" + userChoice + ".mp3");
    audio.play();

    checkAnswer();

  }

});

function nextSequence() {

  level++;
  $("h2").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  gamePattern.push(choices[randomNumber]);

  $("#" + choices[randomNumber]).css("background-color", "#fff");
  setTimeout(function() {
    $("#" + choices[randomNumber]).css("background-color", "");
  }, 100);

  var audio = new Audio("sounds/" + choices[randomNumber] + ".mp3");
  audio.play();

  gameInProgress = true;

}

function checkAnswer() {

  arrayPosition = userPattern.length - 1;

  if (userPattern[arrayPosition] === gamePattern[arrayPosition]) {

    if (userPattern.length === gamePattern.length) {

      userPattern = [];

      setTimeout(function() {

        nextSequence();

      }, 1000);

    }
    else {

      gameInProgress = true;

    }

  }
  else {

    if (level > highscore) {

      highscore = level - 1;
      $(".highscore-text").text("Highscore: " + highscore);

    }

    gamePattern = [];
    userPattern = [];
    level = 0;
    gameInProgress = false;

    $("h2").text("Press 'P' key to start game");

    $("body").css("background-color", "#8A0707");
    setTimeout(function() {
      $("body").css("background-color", "");
    }, 200);

    var audio = new Audio("sounds/wrong.mp3");
    audio.play();

  }

}
