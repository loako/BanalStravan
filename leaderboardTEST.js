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
    for (var prop in userDatabase) {
        if (userDatabase.hasOwnProperty(prop)) {
            var localScore = (userDatabase[prop].score);
            var localNick = (userDatabase[prop].nickname);
            console.log("localScore: " + localScore);
            console.log(localNick);
            highscore[localScore] = localNick;
            leaderboardArray.unshift(new HighscoreObjects(localNick, localScore));
            console.log(leaderboardArray);
            //      leaderboardArray.sort(sortLeaderboard);
            console.log(leaderboardArray);
        }
    }
    leaderboardArray.sort(function(a, b) {
        return parseFloat(a.score) - parseFloat(b.score);
    });
    for (i = leaderboardArray.length - 1; i > -1 ; i = i - 1) {
        var highScorePositionP = document.createElement("p");
        highScorePositionP.classList.add("highScorePositionP");
        highScorePositionP.innerHTML = a + " " + leaderboardArray[i].nickname + ": " + leaderboardArray[i].score;
        document.getElementById("highscoreDisplay");
        highscoreDisplay.appendChild(highScorePositionP);
        a = a + 1;
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
