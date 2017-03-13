maxTime=10;
console.log('Script running');
if (document.readyState != 'loading') {
    onDocumentReady();
} else {
    document.addEventListener('DOMContentLoaded', onDocumentReady);
}

function onDocumentReady() {
  interval();

}

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
