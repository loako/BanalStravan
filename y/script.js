maxTime=10;
console.log('Script running');
if (document.readyState != 'loading') {
    onDocumentReady();
} else {
    document.addEventListener('DOMContentLoaded', onDocumentReady);
}

function onDocumentReady() {
  //interval();

}

//##################################################################################
//LOGIN / LOGOUT NEDAN

//Get the provider that helps us with Google login.
//If you havnet got a Gmail account it is time to get one!
var nickName ="";
var provider = new firebase.auth.GoogleAuthProvider();
//I skipped the onDocumentLoaded to make the code simpler add if you need it
//Login

function LOGIN() {
  firebase.auth().signInWithPopup(provider).then(function(result) {
        console.log("Logged in");
        SAVEIMG();

    }).catch(function(error) {
        console.log("Unsuccessful login");
        console.log(error.message);
    });
}
//Logout
function LOGOUT() {
    firebase.auth().signOut().then(function() {
        console.log("Signed Out");

    }).catch(function(error) {
        console.log("Unsuccessful logout");
    });
}


//Save IMG to firebase
function SAVEIMG() {
    //Get the user will be null/false if not logged in
    var user = firebase.auth().currentUser;
    if (user) {
        var datapath = firebase.database().ref('users/' + user.uid);
        var photoURL = user.photoURL;
        datapath.update({

            image: photoURL

        }).then(function() {
            console.log('Saving IMG succeeded');
        }).catch(function(error) {
            console.log('Saving IMG failed');
        });
    }
}

//Save NICK to firebase
function SAVENICK(){
  //Get the user will be null/false if not logged in
  var user = firebase.auth().currentUser;
  if (user) {
      var datapath = firebase.database().ref('users/' + user.uid);
      var currentNick = firebase.database().ref('users/'+user.uid+"nickname");
      if(currentNick===""){
        console.log("null");
      }
      var nick_name = document.getElementById('nickNameInput').value;

      datapath.update({

          nickname:   nick_name

      }).then(function() {
          console.log('Saving NICK succeeded');
      }).catch(function(error) {
          console.log('Saving NICK failed');
      });
  }
}

//Save NICK to firebase
function SAVEBIO(){
  //Get the user will be null/false if not logged in
  var user = firebase.auth().currentUser;
  if (user) {
      var datapath = firebase.database().ref('users/' + user.uid);
      var biography = document.getElementById('bioInput').value;
      datapath.update({

          bio:   biography

      }).then(function() {
          console.log('Saving BIO succeeded');
      }).catch(function(error) {
          console.log('Saving BIO failed');
      });
  }
}
//Function to get a random number so messeges and nicks gets different in this example
function getRandomInteger(max) {
    return Math.round(Math.random() * max);
}


//##########################################################################################
//Timer nedan
function interval() {
    var timer = setInterval(calcTime2, 1000);
    var maxTime = 10;
    var meter = document.getElementById('meter');
    meter.value = maxTime;

    meter.max = 10;
    meter.optimum = 10;
    meter.high = 6;
    meter.low = 3;

    function calcTime2() {
        maxTime = maxTime - 1;
        console.log(maxTime);
        var min = Math.floor(maxTime / 60);
        var sec = Math.floor(maxTime % 60);
        document.getElementById("timer").innerHTML =  (sec < 10 ? '0' + sec : sec);


        if (maxTime === 0) {
            clearInterval(timer);


        }

    }
}
