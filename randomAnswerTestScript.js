var req = new XMLHttpRequest();
var questionsObject;
var database = firebase.database();
var firebaseRoot = firebase.database().ref();
var datapath = firebase.database().ref("Questions");
var findAQuestion = firebase.database().ref("Questions/1");
var randomPicker;

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
}

function pickQuestion() {
    var questionsLength = questionsObject.Questions;
    console.log(questionsLength.length);
    randomPicker = Math.round(Math.random() * questionsLength.length);
    console.log("Random Picker: " + randomPicker);
    console.log(questionsObject.Questions[randomPicker].question);
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
        if (positionGenerator == 1) {
            answerBoxOne.classList.add("correctGreen");
        } else {
            answerBoxOne.classList.add("wrongRed");
        }
    });
    answerBoxTwo.addEventListener("click", function() {
        if (positionGenerator == 2) {
            answerBoxTwo.classList.add("correctGreen");
        } else {
            answerBoxTwo.classList.add("wrongRed");
        }
    });
    answerBoxThree.addEventListener("click", function() {
        if (positionGenerator == 3) {
            answerBoxThree.classList.add("correctGreen");
        } else {
            answerBoxThree.classList.add("wrongRed");
        }
    });
    answerBoxFour.addEventListener("click", function() {
        if (positionGenerator == 4) {
            answerBoxFour.classList.add("correctGreen");
        } else {
            answerBoxFour.classList.add("wrongRed");
        }
    });
}
