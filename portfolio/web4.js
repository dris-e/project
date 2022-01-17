var pressed = {};
var arr = [];

window.onkeydown = function(e) {
    if (pressed[e]) return;
    pressed[e] = e.timeStamp;
    sound.play();
};

window.onkeyup = function(e) {
    if (!pressed[e]) return;
    var duration = (e.timeStamp - pressed[e]) / 1000;
    var output = document.getElementById('text-output');
    var modeBox = document.getElementById("mode");
    var dur = document.getElementById("dur");
    var durOutput = document.getElementById("duration-output");
    if (e.keyCode == 8) {
        output.value = output.value.slice(0,-1);
        window.location.reload();
    }
    if (dur.checked === true) {
        durOutput.innerHTML = ((e.timeStamp - pressed[e]) / 1000).toFixed(3);;
    } else {
        durOutput.innerHTML = null;
    }
    if (modeBox.checked === true) {
        if (duration <= 0.5) {
            output.innerHTML += ".";
        } else if (duration <= 0.8) {
            output.innerHTML += "-";
        } else if (duration < 0.1) {
            output.innerHTML += " ";
        } else if (1.2 <= duration) {
            output.innerHTML += "/";
        }
    } else {
        if (duration <= 0.2) {
            output.innerHTML += ".";
        } else if (duration <= 0.5) {
            output.innerHTML += "-";
        } else if (duration < 0.7) {
            output.innerHTML += " ";
        } else if (0.7 <= duration) {
            output.innerHTML += "/";
        }
    }
    sound.pause();
    pressed[e] = 0;
    setCookie("morseValue", output.value);
};

var sound = new Howl({
    src: ["morse.mp3"],
    volume: 1.0,
    loop: true,
});

function resetCookies() {
    setCookie("morseValue", );
    setCookie("mode", );
    setCookie("dur", );
}

function checkMode() {
    var mode = document.getElementById("mode");
    if (mode.checked) {
        setCookie("mode", true);
    } else {
        setCookie("mode", false);
    }
    var dur = document.getElementById("dur")
    if (dur.checked) {
        setCookie("dur", true);
    } else {
        setCookie("dur", false);
    }
}

function loadCookies() {
    var x = getCookie("morseValue");
    var output = document.getElementById('text-output');
    var newArr = [];
    if (x) {
        output.innerHTML = x;
        newArr = x.split(" ");
        console.log(newArr);
        for (let i = 0; i < newArr.length; i++) {
            var translate = document.getElementById("translate-output");
            var morse = [".-", "-...", "-.-.", "-..", ".", "..-.", "--.", "....", "..", ".---", "-.-",".-..", "--", "-.", "---", ".--.", "--.-", ".-.", "...", "-", "..-", "...-", ".--", "-..-", "-.--", "--..", ".----", "..---", "...--", "....--", ".....", "-....", "--...", "---..", "----.", "-----", "/"];
            var translated = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", " "];
            for (let j = 0; j < morse.length; j++) {
                console.log(newArr[i]);
                switch (newArr[i]) {
                    case morse[j]:
                        translate.innerHTML += translated[j];
                        break;
                }
            }
        }
    }
    var y = getCookie("mode");
    var z = getCookie("dur");
    if (y || z) {
        document.getElementById("mode").checked = y;
        document.getElementById("dur").checked = z;
        checkMode();
    }
}

function setCookie(name, value) {
    var expires = "";
    var date = new Date();
    date.setTime(date.getTime() + (1000*24*60*60*1000));
    expires = "; expires=" + date.toUTCString();
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}
function eraseCookie(name) {   
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

//change dots to unicode
//add timing key
//explain everything
//add morse code key
//add animations
//add challenge mode
//add changelog

/* 
0-0.2 "."

0.2-0.5 "-"

0.5-0.7 " "

>0.7 "/"
*/