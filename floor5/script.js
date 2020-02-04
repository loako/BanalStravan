//Global variables
var highscore = {};
var userDatabase;
var leaderboardArray = [];

//#############################
console.log('Script running');
if (document.readyState != 'loading') {
    onDocumentReady();
} else {
    document.addEventListener('DOMContentLoaded', onDocumentReady);
}

function onDocumentReady() {
    compileHighscore();
    carousel();

}
// Compiles the highscore

function compileHighscore() {
    var datapath = firebase.database().ref('users/');
    datapath.once('value').then(putDataInVar);

}

function putDataInVar(dataSnapshot) {
    userDatabase = dataSnapshot.val();
    console.log(userDatabase);
    extractScore();
}

// This function extracts the score and nickname from each user and creates new objects with this information,
// puts it into the array leaderboardArray, which is then sorted by score.

function extractScore() {
    var a = 1;
    var aLeft = 4;
    for (var prop in userDatabase) {
        if (userDatabase.hasOwnProperty(prop)) {
            var localScore = (userDatabase[prop].score);
            var localNick = (userDatabase[prop].nickname);
            console.log("localScore: " + localScore);
            console.log(localNick);
            highscore[localScore] = localNick;
            leaderboardArray.unshift(new HighscoreObjects(localNick, localScore));
            //    console.log(leaderboardArray);
            //      leaderboardArray.sort(sortLeaderboard);
            console.log("leaderboardArray");
            console.log(leaderboardArray);
            leaderboardArray2 = leaderboardArray;
            leaderboardArray.reverse();
            console.log("leaderboardArray reversed");

            console.log(leaderboardArray);
        }
    }
    leaderboardArray.sort(function(a, b) {
        return parseFloat(a.score) - parseFloat(b.score);
    });

    for (i = leaderboardArray.length - 1; i > leaderboardArray.length - 4; i = i - 1) {
        var firstPlace = document.getElementById("firstPlace");
        var secondPlace = document.getElementById("secondPlace");
        var thirdPlace = document.getElementById("thirdPlace");

        if (i == leaderboardArray.length - 1) {
            firstPlace.innerHTML = a + ". " + leaderboardArray[i].nickname + ": " + leaderboardArray[i].score;
            a = a + 1;
        }
        if (i == leaderboardArray.length - 2) {
            secondPlace.innerHTML = a + ". " + leaderboardArray[i].nickname + ": " + leaderboardArray[i].score;
            a = a + 1;
        }
        if (i == leaderboardArray.length - 3) {
            thirdPlace.innerHTML = a + ". " + leaderboardArray[i].nickname + ": " + leaderboardArray[i].score;
            a = a + 1;
        }

    }
    console.log("leaderboardArray.length");
    console.log(leaderboardArray.length);
    console.log("leaderboardArray before removing top three");
    console.log(leaderboardArray);

    leaderboardArray.splice(leaderboardArray.length - 3, leaderboardArray.length - 1);
    var cutCount = 0;
    var leaderboardLeftArray = [];
    console.log("leaderboardArray.length after top three splice");
    console.log(leaderboardArray.length);
    var cuttingPoint = leaderboardArray.length / 2;
    console.log("cuttingPoint" + cuttingPoint);
    var leaderboardArrayLength = leaderboardArray.length;
    if (leaderboardArray.length % 2 == 1) {
        cuttingPoint = Math.ceil(leaderboardArray.length / 2);
        console.log("cuttingPoint after Math.ceil" + cuttingPoint);
    }
    leaderboardArray.reverse();
    leaderboardLeftArray = leaderboardArray.slice(0, cuttingPoint);
    console.log("leaderboardLeftArray");
    console.log(leaderboardLeftArray);
    console.log("leaderboardArray");
    console.log(leaderboardArray);

    //leaderboardArray.reverse();
    var arrayLengthForLoop = leaderboardArray.length;
    console.log("arrayLengthForLoop " + arrayLengthForLoop);
    var remainder = leaderboardArray.length - leaderboardLeftArray.length;
    console.log("remainder " + remainder);

    if (leaderboardArrayLength % 2 === 1) {
        leaderboardArray.splice(0, remainder + 1); // plus 1 or not? I guess not...
    } else {
        leaderboardArray.splice(0, remainder); // plus 1 or not? I guess not...
    }
    console.log("leaderboardArray after remainder removed");
    console.log(leaderboardArray);
    leaderboardLeftArray.reverse();
    leaderboardArray.reverse();

    var leftCounter = leaderboardLeftArray.length - 1;
    var rightCounter = leaderboardArray.length - 1;
    var aRight = aLeft + leaderboardLeftArray.length;



    for (i = arrayLengthForLoop; i > -1; i = i - 1) {
        console.log("arrayLengthForLoop " + arrayLengthForLoop);

        console.log("leftCounter " + leftCounter);

        console.log("i " + i);

        var highScorePositionLeftP = document.createElement("p");
        var highScorePositionRightP = document.createElement("p");
        toplistLeft.appendChild(highScorePositionLeftP);
        toplistRight.appendChild(highScorePositionRightP);
        highScorePositionLeftP.id = "highScorePositionLeftP";
        highScorePositionRightP.id = "highScorePositionRightP";
        highScorePositionLeftP.classList.add("highScorePositionP");
        highScorePositionRightP.classList.add("highScorePositionP");
        if (leftCounter > -1) {
            highScorePositionLeftP.innerHTML = aLeft + ". " + leaderboardLeftArray[leftCounter].nickname + ": " + leaderboardLeftArray[leftCounter].score;
            console.log(aLeft + ". " + leaderboardLeftArray[leftCounter].nickname + ": " + leaderboardLeftArray[leftCounter].score);

        } else {
            console.log("end");
        }
        if (rightCounter > -1) {

            highScorePositionRightP.innerHTML = aRight + ". " + leaderboardArray[rightCounter].nickname + ": " + leaderboardArray[rightCounter].score;
            console.log(aRight + ". " + leaderboardArray[rightCounter].nickname + ": " + leaderboardArray[rightCounter].score);
        }
        leftCounter = leftCounter - 1;
        rightCounter = rightCounter - 1;
        aLeft = aLeft + 1;
        aRight = aRight + 1;
        if (aRight > 25) {
            break;
        }
    }
}


function HighscoreObjects(localNick, localScore) {
    this.nickname = localNick;
    this.score = localScore;
}


function sortLeaderboard(a, b) {
    if (a.score < b.score)
        return -1;
    if (a.score > b.score)
        return 1;
    return 0;
}
// grab scores and save in new objects to array
function presentData() {
    var element = document.getElementById('highscoreDisplay');
    var keys = [];
    var a = 0;

    for (var k in highscore) {
        keys.push(k);
    }

    for (var prop in highscore) {
        if (highscore.hasOwnProperty(prop)) {

            element.insertAdjacentHTML('beforeend', (a + 1) + ". " + highscore[prop] + ' ' + Math.floor(keys[a]) + " Points <br>");
            a = a + 1;
        }
    }
}

// 1. Fetch score and nickname
// 2. Save into new object, named after score, with nick and score inside
// 3. Put in array
// 4. Sort array
// 5. Print in order

//slideshow with questions
var myIndex = 0;
carousel();

function carousel() {
    var i;
    var x = document.getElementsByClassName("mySlides");
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    myIndex++;
    if (myIndex > x.length) {
        myIndex = 1;
    }
    x[myIndex - 1].style.display = "block";
    setTimeout(carousel, 5000); // Change image every 5 seconds
}
