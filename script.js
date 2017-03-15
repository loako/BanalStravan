

var req = new XMLHttpRequest();
var questionsObject;
var database = firebase.database();
var firebaseRoot = firebase.database().ref();
var datapath = firebase.database().ref("Questions");
var findAQuestion = firebase.database().ref("Questions/1");
var randomPicker;
var maxTime=10.1;

//console.log(findAQuestion.key);
findAQuestion.once("value", getSnapshot);

function getSnapshot(snapshot) {
    console.log("snapshot");
    console.log(snapshot.val());
    console.log(snapshot.val().correct);

}
//console.log(findAQuestion.val());

//console.log(firebaseRoot);
//console.log(datapath);
//console.log(findAQuestion);

console.log('Script running');
//Wait till all content is loaded, could be external fonts scripts from other servers etc....
if (document.readyState != 'loading') {
    onDocumentReady();
} else {
    document.addEventListener('DOMContentLoaded', onDocumentReady);
}

// Page is loaded! Now event can be wired-up
function onDocumentReady() {
    console.log('Document ready.');
    readQuestions();



}



function readQuestions() {
    var questionsURL = "https://banalstravan-3b02a.firebaseio.com/.json";
    req.open("GET", questionsURL, true);
    req.addEventListener("load", questionsHandler);
    req.send();
    interval();
}

function questionsHandler() {
    //console.log("req.response: " + req.response);
    questionsObject = JSON.parse(req.response);
    //console.log("Exercises Object: " + exercisesObject);

    var findUsername = Object.entries(questionsObject.Questions);
    console.log(findUsername);
    console.log(findUsername.length);
    req.removeEventListener("load", questionsHandler); // Stop listening
    pickQuestion();
    displayQuestion();
    nexter();
}

function pickQuestion() {
    var questionsLength = questionsObject.Questions;
    console.log(questionsLength.length);
    randomPicker = Math.round(Math.random() * questionsLength.length);
    console.log("Random Picker: " + randomPicker);
    console.log(questionsObject.Questions[randomPicker].question);
}
function nexter(){
  var next=document.getElementById("next");
  var load=document.getElementById("loadAnimation");

  next.addEventListener("click", function() {
    all.style.display="none";
    load.style.display="block";

    setTimeout(location.reload.bind(location), 1500);
  });
}
function displayNone(){
    var all=document.getElementById("all");
    var load=document.getElementById("loadAnimation");
    var loading=document.getElementById("loader");
    all.style.display="none";
    load.style.display="block";
    loading.style.display="block";

}
function displayQuestion() {

    var currentQuestion = questionsObject.Questions;

    var answerBoxOne = document.getElementById("answer1");
    var answerBoxTwo = document.getElementById("answer2");
    var answerBoxThree = document.getElementById("answer3");
    var answerBoxFour = document.getElementById("answer4");

    console.log(answerBoxOne);

    var positionGenerator = Math.ceil(Math.random() * 4);
    console.log(positionGenerator);

    document.getElementById("question").innerHTML = currentQuestion[randomPicker].question;
    if (positionGenerator == 1) {
        answerBoxOne.innerHTML = currentQuestion[randomPicker].correct;
        answerBoxTwo.innerHTML = currentQuestion[randomPicker].wrong1;
        answerBoxThree.innerHTML = currentQuestion[randomPicker].wrong2;
        answerBoxFour.innerHTML = currentQuestion[randomPicker].wrong3;
    }
    if (positionGenerator == 2) {
        answerBoxTwo.innerHTML = currentQuestion[randomPicker].correct;
        answerBoxOne.innerHTML = currentQuestion[randomPicker].wrong1;
        answerBoxThree.innerHTML = currentQuestion[randomPicker].wrong2;
        answerBoxFour.innerHTML = currentQuestion[randomPicker].wrong3;
    }
    if (positionGenerator == 3) {
        answerBoxThree.innerHTML = currentQuestion[randomPicker].correct;
        answerBoxOne.innerHTML = currentQuestion[randomPicker].wrong1;
        answerBoxTwo.innerHTML = currentQuestion[randomPicker].wrong2;
        answerBoxFour.innerHTML = currentQuestion[randomPicker].wrong3;
    }
    if (positionGenerator == 4) {
        answerBoxFour.innerHTML = currentQuestion[randomPicker].correct;
        answerBoxOne.innerHTML = currentQuestion[randomPicker].wrong1;
        answerBoxTwo.innerHTML = currentQuestion[randomPicker].wrong2;
        answerBoxThree.innerHTML = currentQuestion[randomPicker].wrong3;
    }

    answerBoxOne.addEventListener("click", function() {
      console.log("hej");
      var all=document.getElementById("all");
      var load=document.getElementById("loadAnimation");
      var block=document.getElementById("blocker");
        if (positionGenerator == 1) {
            answerBoxOne.style.color="green";
            var wait=window.setTimeout(displayNone, 2500);
            block.style.display="block";




        } else {
            answerBoxOne.style.color="red";

              var wait2=window.setTimeout(displayNone, 2500);
block.style.display="block";

        }
    });

    answerBoxTwo.addEventListener("click", function() {
      var all=document.getElementById("all");
      var load=document.getElementById("loadAnimation");
      var block=document.getElementById("blocker");
        if (positionGenerator == 2) {
            answerBoxTwo.style.color="green";
var wait=window.setTimeout(displayNone, 2500);
block.style.display="block";
        } else {
            answerBoxTwo.style.color="red";
var wait2=window.setTimeout(displayNone, 2500);
block.style.display="block";

        }
    });
    answerBoxThree.addEventListener("click", function() {
      var all=document.getElementById("all");
      var load=document.getElementById("loadAnimation");
      var block=document.getElementById("blocker");
        if (positionGenerator == 3) {
            answerBoxThree.style.color="green";

        var wait=window.setTimeout(displayNone, 2500);
block.style.display="block";
        } else {
            answerBoxThree.style.color="red";

        var wait2=window.setTimeout(displayNone, 2500);
block.style.display="block";
        }
    });
    answerBoxFour.addEventListener("click", function() {
      var all=document.getElementById("all");
      var load=document.getElementById("loadAnimation");
      var block=document.getElementById("blocker");
        if (positionGenerator == 4) {
            answerBoxFour.style.color="green";

          var wait=window.setTimeout(displayNone, 2500);
block.style.display="block";
        } else {
            answerBoxFour.style.color="red";

          var wait2=window.setTimeout(displayNone, 2500);
          block.style.display="block";
        }
    });
}
function interval() {
    var timer = setInterval(calcTime, 100);


    function calcTime() {

      //  maxTime = Math.round(((maxTime - 0.1) * 10) / 10);
        maxTime = maxTime - 0.1;
        maxTime = maxTime.toFixed(1);

  var cir=document.getElementById("circle");
        console.log(maxTime);
        var min = Math.floor(maxTime / 60);
        var sec = Math.floor(maxTime % 60);
        var all=document.getElementById("all");
        var load=document.getElementById("loadAnimation");
        var loading=document.getElementById("loader");

        document.getElementById("timed").innerHTML = maxTime;


        if (maxTime <0) {
            clearInterval(timer);
            all.style.display="none";
            load.style.display="block";
            loading.style.display="block";

            setTimeout(location.reload.bind(location), 1500);


        }
        if (maxTime<=6){
          cir.style.background=" #AFAE00";

        }
        if (maxTime<=3){
          cir.style.background=" #AF1100";

        }


    }
}
function calculate(){
var maxTime=11;
  correct=document.getElementById("answer4");
  if (correct){
    document.getElementById("score").innerHTML= "Score: "+maxTime*10+ " pts";
  }
}
