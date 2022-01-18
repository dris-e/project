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
    var status;

    var intervalOne = getInterval("interval-1") * 60;
    var intervalTwo = (getInterval("interval-2") * 60);
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
        if (intervalOne <= number) {
            work.play();
            work.fade(1.0, 0, 11000);
        }
        status = "work";
        timeStatus.innerHTML = status;
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
            rest.play();
            rest.fade(1.0, 0, 8000);
        }
        status = "rest";
        timeStatus.innerHTML = status;
    }
    
    document.getElementById("time-title").innerHTML = timeMin + ":" + timeSec + " | " + status;
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
    }, 5000)
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

var changeMode = function(arg) {
    var timer = document.getElementById("timer");
    var timerCount = document.getElementById("timer-countdown");
    var timerText = document.getElementById("timer-text");

    if (arg === 1) {
        timer.style.width = "97.5vw";
        timer.style.height = "90.5%";
        timer.style.transform = "translate(0vw, 0vh)"
        timer.style.marginTop = "-1%";
    
        timerCount.style.fontSize = "20vh";
        timerCount.style.transform = "translate(0%, 40%)";
    
        timerText.innerHTML = "&#60;timer&#62; (click window to minimize)";
    } else if (arg === 2) {
        timer.style.width = "30vw";
        timer.style.height = "47vh";
        timer.style.transform = "translate(35vw, 10vh)"
        timer.style.marginTop = "0";

        timerCount.style.fontSize = "10vh";
        timerCount.style.transform = "";

        timerText.innerHTML = "&#60;timer&#62;";
    }


    
}


var rest = new Howl({
    src: ["rest.mp3"],
    volume: 1.0,
    fadeOut: 1.0,
});

var work = new Howl({
    src: ["work.mp3"],
    volume: 1.0,
    fadeOut: 1.0,
});


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