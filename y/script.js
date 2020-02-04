// Globala variabler
var database = firebase.database(); //Kontrollera om den används
var play = false;
//User variables
var nickname;
var image;
var score;
var bio;
var answeredQuestions = 0; //The 0 is a placeholder

//Variables related to questions and selecting questions
var questions;
var randomNumber;
var correctAnswer;

//Variables related to timelimits and points
var timeLimit;
var currentTime;
var startTime;
var points;
var maxTime;

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
    //readQuestions();
    fetchQuestions();
    document.getElementById('bioInput').addEventListener("keypress", function(e) {
        var key = e.keyCode;
        if (key === 13) {
            saveBio();
        }
    });
    document.getElementById('nickNameInput').addEventListener("keypress", function(e) {
        var key = e.keyCode;
        if (key === 13) {
            saveNick();
        }
    });
}



function fetchQuestions() {
    var datapath = firebase.database().ref('Questions/');
    datapath.once('value').then(putQuestionsInVar);
}
//Stoppar in frågorna i questions variabeln
function putQuestionsInVar(dataSnapshot) {
    questions = dataSnapshot.val();
    console.log('Questions downloaded.');
}


//Slumpar fram en fråga man inte svarat på.
function generateQuestion() {

    for (var i = 0; i <= questions.length; i++) {
        randomNumber = Math.round(Math.random() * questions.length);
        if (answeredQuestions[randomNumber] === false) {
            console.log("Question #" + randomNumber + " not answered.\nProceeding..");
            displayQuestion();

            break;
        }

    }
}


//Visar frågan på sidan och slumar positionen för svaren.
function displayQuestion() {
    for (i = 1; i < 5; i++) {
        document.getElementById('answer' + i).style.color = "white";
    }
    document.getElementById('blocker').style.display = "none";
    document.getElementById('home').style.display = "none";
    document.getElementById('home2').style.display = "none";
    document.getElementById('all').style.display = 'block';
    document.getElementById('loader').style.display = "none";

    var answerBoxOne = document.getElementById("answer1");
    var answerBoxTwo = document.getElementById("answer2");
    var answerBoxThree = document.getElementById("answer3");
    var answerBoxFour = document.getElementById("answer4");

    var positionGenerator = Math.ceil(Math.random() * 4);

    document.getElementById("question").innerHTML = questions[randomNumber].question;

    if (positionGenerator == 1) {
        correctAnswer = 1;
        answerBoxOne.innerHTML = questions[randomNumber].correct;
        answerBoxTwo.innerHTML = questions[randomNumber].wrong1;
        answerBoxThree.innerHTML = questions[randomNumber].wrong2;
        answerBoxFour.innerHTML = questions[randomNumber].wrong3;
    }
    if (positionGenerator == 2) {
        correctAnswer = 2;
        answerBoxTwo.innerHTML = questions[randomNumber].correct;
        answerBoxOne.innerHTML = questions[randomNumber].wrong1;
        answerBoxThree.innerHTML = questions[randomNumber].wrong2;
        answerBoxFour.innerHTML = questions[randomNumber].wrong3;
    }
    if (positionGenerator == 3) {
        correctAnswer = 3;
        answerBoxThree.innerHTML = questions[randomNumber].correct;
        answerBoxOne.innerHTML = questions[randomNumber].wrong1;
        answerBoxTwo.innerHTML = questions[randomNumber].wrong2;
        answerBoxFour.innerHTML = questions[randomNumber].wrong3;
    }
    if (positionGenerator == 4) {
        correctAnswer = 4;
        answerBoxFour.innerHTML = questions[randomNumber].correct;
        answerBoxOne.innerHTML = questions[randomNumber].wrong1;
        answerBoxTwo.innerHTML = questions[randomNumber].wrong2;
        answerBoxThree.innerHTML = questions[randomNumber].wrong3;
    }
    markQuestionAsSeen();
    timer();


}

//Kontrollerar om man svarat rätt eller fel.
function answer(chosenAlternative) {
    document.getElementById('blocker').style.display = "block";
    clearInterval(timeLimit);
    document.getElementById('circle').classList.remove("animateCircle");

    if (chosenAlternative === correctAnswer) {
        document.getElementById('answer' + chosenAlternative).style.color = "green";
        addScore();
    } else {
        var delayTime = window.setTimeout(loadingPage, 1500);
        document.getElementById('answer' + chosenAlternative).style.color = "red";
    }
}

//Lägger till poäng till ens score baserat på tiden som återstår
function addScore() {
    var user = firebase.auth().currentUser;
    var datapath = firebase.database().ref('users/' + user.uid);

    score = Math.floor(score) + (points * 10);
    datapath.update({

        score: score

    });

    document.getElementById('score').innerHTML = "Score: " + score;
    var delayTime = window.setTimeout(loadingPage, 1500);



}

//När en spelare sett en fråga så markeras den som sedd / besvarad
function markQuestionAsSeen() {
    var user = firebase.auth().currentUser;
    var datapath3 = firebase.database().ref('users/' + user.uid + '/answeredQuestions');

    datapath3.update({

        [randomNumber]: true

    });
    answeredQuestions[randomNumber] = true;


}


function displayProfile() {
    document.getElementById("profilePage").style.display = "block";
    document.getElementById("all").style.display = "none";
    document.getElementById("loader").style.display = "none";
    document.getElementById("home").style.display = "none";
    document.getElementById("home2").style.display = "none";


}

function displayNone() {
    var all = document.getElementById("all");
    var loading = document.getElementById("loader");
    var home = document.getElementById('home');
    all.style.display = "none";

    loading.style.display = "block";

}



function goBack() {
    clearInterval(timeLimit);
    document.getElementById('circle').style.display = "none";
    document.getElementById('all').style.display = "none";
    document.getElementById("profilePage").style.display = "none";
    document.getElementById("home").style.display = "block";
    document.getElementById("home2").style.display = "block";

}

//Sköter tidtagningen vid frågorna.
function timer() {
    startTime = new Date().getTime();
    maxTime = new Date(startTime + 10000).getTime();
    timeLimit = window.setInterval(calculateTime, 100);

    //Resets the visual part of the timer (the cirlce to it's starting values)
    document.getElementById("circle").style = "background-color:#008C00;";
    document.getElementById('circle').style.display = "block";
    document.getElementById('circle').classList.add("animateCircle");

    function calculateTime() {
        currentTime = new Date().getTime();
        document.getElementById("timed").innerHTML = ((new Date(maxTime - currentTime)) / 1000).toFixed(1);
        //Points används vid poängräkning i addScore
        points = ((new Date(maxTime - currentTime)) / 1000).toFixed(1);
        if (currentTime >= maxTime) {
            document.getElementById('blocker').style.display = "block";
            clearInterval(timeLimit);
            document.getElementById("timed").innerHTML = "0.0";
            document.getElementById("circle").style = "background-color:#f41a1a;";
            document.getElementById('circle').classList.remove("animateCircle");

            //var delayTime = window.setTimeout(generateQuestion, 1500);
            var delayTime = window.setTimeout(loadingPage, 1500);

        }
    }
}

//Displays a loadingpage so the player has time to breathe in between questions
function loadingPage() {
    document.getElementById('circle').style.display = "none";
    document.getElementById('loader').style.display = "block";
    document.getElementById('all').style.display = "none";
    var delayTime = window.setTimeout(generateQuestion, 1500);
}


//#############################################################################
//LOGIN / LOGOUT NEDAN

//Get the provider that helps us with Google login.
//If you havnet got a Gmail account it is time to get one!
var provider = new firebase.auth.GoogleAuthProvider();
//Login

function login() {
    firebase.auth().signInWithPopup(provider).then(function(result) {
        console.log("Logged in");
        fetchUser();
        document.getElementById("home").style.display = "block";
        document.getElementById("home2").style.display = "block";
        document.getElementById("logInSec").style.display = "none";
        //Google analytics
        successFullLogin()
        //Slut på google analytics


    }).catch(function(error) {
        console.log("Unsuccessful login");
        console.log(error.message);
        //Google analytics
        failedLogin();
        //Slut google analytic
    });
}
//Logout
function logout() {
    firebase.auth().signOut().then(function() {
        console.log("Signed Out");
        location.reload();

    }).catch(function(error) {
        console.log("Unsuccessful logout");
    });
}


//Uploads the latest google image and then fetches the users data
function fetchUser() {
    var user = firebase.auth().currentUser;

    if (user) {
        var datapath = firebase.database().ref('users/' + user.uid);

        datapath.update({

            image: user.photoURL

        }).then(function() {
            console.log('Saving IMG succeeded');
        }).catch(function(error) {
            console.log('Saving IMG failed');
        });
        //Hämtar datan och skickar sedan vidare den till applyDataToVars
        datapath.once('value').then(applyDataToVars);

    }

}
// Tar datan från dataSnapshoten och lagrar den lokalt i rätt variabel för att
// sedan skicka vidare datan till en kontrollfunktion
function applyDataToVars(dataSnapshot) {

    nickname = dataSnapshot.val().nickname;
    image = dataSnapshot.val().image;
    score = dataSnapshot.val().score;
    bio = dataSnapshot.val().bio;
    answeredQuestions = dataSnapshot.val().answeredQuestions;

    controlData();
}


// Kontrollerar den hämtade användardatan och fyller i "placeholder" data där det behövs.
function controlData() {
    var user = firebase.auth().currentUser;
    var datapath = firebase.database().ref('users/' + user.uid);

    if (nickname == null) {
        console.log("Nick is null. Assigning new nick");
        nickname = user.displayName;
        datapath.update({
            nickname: user.displayName
        }).then(function() {
            console.log('Saving NICK succeeded');
        }).catch(function(error) {
            console.log('Saving NICK failed');
        });
    }
    if (bio == null) {
        console.log("Bio is null. Assigning bio");
        var fillerBio = "This user has not written a bio.";
        bio = fillerBio;
        datapath.update({
            bio: fillerBio
        }).then(function() {
            console.log('Saving BIO succeeded');
        }).catch(function(error) {
            console.log('Saving BIO failed');
        });

    }
    if (score == null) {

        datapath.update({
            score: 0
        }).then(function() {
            console.log('Creating score succeeded');
        }).catch(function(error) {
            console.log('Creating score failed');
        });
    }
    if (answeredQuestions == null) {
        console.log('No answered questions on record. Creating record.');
        var datapath1 = firebase.database().ref('users/' + user.uid + '/answeredQuestions');

        for (var i = 0; i < questions.length; i++) {
            datapath1.update({
                [i]: false
            });
        }
        fetchUser();
    }

    if (answeredQuestions != undefined) {
        if (answeredQuestions.length < questions.length) {
            var datapath2 = firebase.database().ref('users/' + user.uid + '/answeredQuestions');
            for (var ii = answeredQuestions.length; ii < questions.length; ii++) {
                datapath2.update({
                    [ii]: false
                });
            }
        }
    } else {
        console.log("This user has an image, a bio and a nickname!");
    }
    displayUser();
}

// Save BIO to firebase
function saveBio() {
    //Get the user will be null/false if not logged in
    var user = firebase.auth().currentUser;
    if (user) {
        var datapath = firebase.database().ref('users/' + user.uid);
        var biography = document.getElementById('bioInput').value;
        bio = biography;
        datapath.update({

            bio: biography

        }).then(function() {
            console.log('Saving BIO succeeded');
        }).catch(function(error) {
            console.log('Saving BIO failed');
        });
    }
    displayUser();

}

// Save NICK to firebase
function saveNick() {
    //Get the user will be null/false if not logged in
    var user = firebase.auth().currentUser;
    if (user) {
        var datapath = firebase.database().ref('users/' + user.uid);
        var newNick = document.getElementById('nickNameInput').value;
        nickname = newNick;
        datapath.update({

            nickname: newNick

        }).then(function() {
            console.log('Saving NICKNAME succeeded');
        }).catch(function(error) {
            console.log('Saving NICKNAME failed');
        });
    }
    displayUser();

}

// Displays the userdata for the user
function displayUser() {
    document.getElementById('imageContainer').style = "display:block;";
    document.getElementById('userImage').src = image;
    document.getElementById('displayNickname').innerHTML = nickname;
    document.getElementById('displayBio').innerHTML = bio;

    if (image.length < 1) {
        document.getElementById('imageContainer').style = "display:none;";

    }

}

function glitch() {
    document.getElementById('Layer_2').style.opacity = "0.5";
}

// Delete the account
function deleteAccount() {
    var element = document.getElementById('deleteAccountInput').value;
    if (element === "DELETE") {
        console.log("Deleting Account");
        var user = firebase.auth().currentUser;
        if (user) {
            var datapath = firebase.database().ref('users/' + user.uid);
            nickname = "";
            image = "";
            score = "";
            bio = "";
            datapath.remove().then(displayUser).then(logout);
            document.getElementById('deleteFeedback').style = "color:red;";
            document.getElementById('deleteFeedback').innerHTML = "Account deleted.";
        }
    } else {
        document.getElementById('deleteAccountInput').value = "";
        document.getElementById('deleteAccountInput').placeholder = "You did not type DELETE";
    }
}
//#################BONUS##########################################
//Musik medan man spelar.
function soundEffect() {

    if (play === false) {
        soundFile = document.createElement("audio");
        soundFile.preload = "auto";
        var src = document.createElement("source");
        src.src = "music/banalmusic.mp3"; // enter name of mp3 here
        soundFile.appendChild(src);
        soundFile.load();
        volume = soundFile.volume = 0.800000;
        soundFile.loop = true;
        soundFile.play();
    }
    play = true;
}

function play() {
    if (play === false) {
        soundFile.currentTime = 0.01;
        soundFile.volume = volume;
    }
    play = true;

}

//#############################################################################
// GOOGLE analytics
//#############################################################################
var backtomenu = false;

function failedLogin() {
  console.log("Skickar misslyckat login data");
  ga('send', {
  hitType: 'event',
  eventCategory: 'Login',
  eventAction: 'Failed Login',
  eventLabel: 'The user did not login'
  });
}


document.getElementById('sendNickName').addEventListener('click', function(e) {
    ga('send', {
      hitType: 'event',
      eventCategory: 'Profile Nickname',
      eventAction: 'Save',
      eventLabel: 'Saved a new nickname'
    });
});


document.getElementById('back').addEventListener('click', function(e) {
  backtomenu = true;
});


document.getElementById('scoreButton').addEventListener('click', function(e) {
    if(backtomenu===true){
      console.log('Skickar data om leaderboarden');
      ga('send', {
      hitType: 'event',
      eventCategory: 'Navigation',
      eventAction: 'Play Then Leaderboard',
      eventLabel: 'Played then leaderboard'
    });
  }
});


function successFullLogin(){
  console.log("Skickar lyckat login data");

  ga('send', {
  hitType: 'event',
  eventCategory: 'Login',
  eventAction: 'Successful Login',
  eventLabel: 'The user logged in'
  });
}
