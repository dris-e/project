class AdjustInterval {
    constructor(workFunc, interval, errorFunc) {
        var that = this;
        var expected, timeout;
        this.interval = interval;

        this.start = function () {
            expected = Date.now() + this.interval;
            timeout = setTimeout(step, this.interval);
        };

        this.stop = function () {
            clearTimeout(timeout);
        };

        function step() {
            var drift = Date.now() - expected;
            if (drift > that.interval) {
                if (errorFunc)
                    errorFunc();
            }
            workFunc();
            expected += that.interval;
            timeout = setTimeout(step, Math.max(0, that.interval - drift));
        }
    }
}

var number = 0;
var numberTwo = 0;
var isSwitched; 

var doWork = function() {

    var timeMin;
    var timeSec;

    var timeStatus = document.getElementById("timer-status");

    var intervalOne = getInterval("interval-1") * 60;
    var intervalTwo = (getInterval("interval-2") * 60) + 1;
    console.log(intervalOne, intervalTwo);


    if (intervalOne <= number) {
        isSwitched = true;
    } else {
        isSwitched = false;
    }

    if (isSwitched === false) {
        number++
        timeMin = Math.floor((intervalOne - number) % 3600 / 60);
        timeSec =  Math.floor((intervalOne - number) % 60);
        if (timeSec < 10) {
            timeSec = "0" + Math.floor((intervalOne - number) % 60);
        }
        timeStatus.innerHTML = "work";
        numberTwo = 0;
    } else {
        numberTwo++;
        console.log("switch");
        timeMin = Math.floor((intervalTwo - numberTwo) % 3600 / 60);
        timeSec =  Math.floor((intervalTwo - numberTwo) % 60);
        if (timeSec < 10) {
            timeSec = "0" + Math.floor((intervalTwo - numberTwo) % 60);
        }
        if (intervalTwo <= numberTwo) {
            number = 0;
            console.log("yeah");
            isSwitched = false;
        }
        timeStatus.innerHTML = "rest";
    }
    
    document.getElementById("time-title").innerHTML = timeMin + ":" + timeSec;
    document.getElementById("timer-countdown").innerHTML = timeMin + ":" + timeSec;
};

var error = function() {
    console.warn("drift big");
    document.getElementById("time-title").innerHTML = "please keep &#60;time&#62; open";
};

var ticker = new AdjustInterval(doWork, 1000, error);

var getInterval = function(id) {
    var elemVal = document.getElementById(id);
    var elem = elemVal.value;
    if (elem === null || elem === "" || isNaN(elem) == true || parseInt(elem) === 0) {
        elemVal.placeholder = "please enter a non-zero number!";
        return 5;
    } else {
        return elemVal.value;
    }
};

var timerAnimation = function() {
    var timerBox = document.getElementById("timer");
    var timerCount = document.getElementById("timer-countdown");
    var timerStatus = document.getElementById("timer-status");
    var textStatus = document.getElementById("status-text");
    
    timerBox.style.height = "47vh";
    timerCount.style.opacity = "1";
    timerStatus.style.opacity = "1";
    textStatus.style.opacity = "1";
}

var setDelay = function() {
    var startButton = document.getElementById("start-button");
    setTimeout(function(){
        startButton.disabled = false;
        startButton.style.opacity = "100%";
    }, 10000)
    startButton.disabled = true;
    startButton.style.opacity = "50%";
}

var expandLog = function(height) {
    var changeLog = document.getElementById("changelog");
    var logText = document.getElementById("changelog-text");

    changeLog.style.height = height + "vh";
    logText.style.opacity = "1";

    changeLog.addEventListener("mouseleave", function(){
        changeLog.style.height = "0vh";
        logText.style.opacity = "0";
    })
}

/* 
ticker.start();
ticker.stop();


ticker.interval = 99;
*/

//add sound effects
//add cookies
//add animations and timer
//add favicons and x/minimize on borders
//make sure value isn't over 60 /done
//option to add more intervals