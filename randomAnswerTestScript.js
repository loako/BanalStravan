console.log('Script running');
//Wait till all content is loaded, could be external fonts scripts from other servers etc....
if (document.readyState != 'loading'){
  onDocumentReady();
} else {
  document.addEventListener('DOMContentLoaded', onDocumentReady);
}

// Page is loaded! Now event can be wired-up
function onDocumentReady() {
  console.log('Document ready.');
  displayQuestion();
}


function displayQuestion() {
  var question = "Who wrote Anna Karenina?";
  var correct = "Leo Tolstoy";
  var wrong1 = "Fyodor Dostoyevsky";
  var wrong2 = "Alexander Pushkin";
  var wrong3 = "Anton Chekov";

  var answerBoxOne = document.getElementById("answer1");
  var answerBoxTwo = document.getElementById("answer2");
  var answerBoxThree = document.getElementById("answer3");
  var answerBoxFour = document.getElementById("answer4");
  console.log(answerBoxOne);

  var positionGenerator = Math.ceil(Math.random() * 4);
  console.log(positionGenerator);

  document.getElementById("question").innerHTML = question;
  if (positionGenerator == 1) {
    document.getElementById("answer1").innerHTML = correct;
    document.getElementById("answer2").innerHTML = wrong1;
    document.getElementById("answer3").innerHTML = wrong2;
    document.getElementById("answer4").innerHTML = wrong3;

  }
  if (positionGenerator == 2) {
    document.getElementById("answer2").innerHTML = correct;
    document.getElementById("answer1").innerHTML = wrong1;
    document.getElementById("answer3").innerHTML = wrong2;
    document.getElementById("answer4").innerHTML = wrong3;
  }
  if (positionGenerator == 3) {
    document.getElementById("answer3").innerHTML = correct;
    document.getElementById("answer1").innerHTML = wrong1;
    document.getElementById("answer2").innerHTML = wrong2;
    document.getElementById("answer4").innerHTML = wrong3;
  }
  if (positionGenerator == 4) {
    document.getElementById("answer4").innerHTML = correct;
    document.getElementById("answer1").innerHTML = wrong1;
    document.getElementById("answer2").innerHTML = wrong2;
    document.getElementById("answer3").innerHTML = wrong3;
  }
}
