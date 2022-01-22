var pressed = {};

window.onkeydown = function(e) {
    pressed[e.keyCode] = e.type == 'keydown';
    pressed[e.key] = true;

    var player = document.getElementById("player");

    if (pressed[38] == true && pressed[40] == true || pressed[87] == true && pressed[83] == true) {
        player.style.marginTop = "44vh";
        swoosh.play();
        pressed = {};
    } else if (pressed[38] == true || pressed[87] == true) {
        player.style.marginTop = "0vh";
        swoosh.play();
        switchGravity(player, "light");
        setTimeout(function(){player.style.animationName = "";}, 500);
    } else if (pressed[40] == true || pressed[83] == true) {
        player.style.marginTop = "88vh";
        swoosh.play();
        switchGravity(player, "dark");
    }
};

function touched(arg) {
    var player = document.getElementById("player");
    pressed[arg];
    pressed[arg] = true;

    console.log(pressed);
    if (pressed["top"] == true && pressed["bottom"] == true) {
        player.style.marginTop = "44vh";
        swoosh.play();
        pressed = {}; 
    } else if (pressed["top"] == true) {
        player.style.marginTop = "0vh";
        swoosh.play();
        switchGravity(player, "light");
    } else if (pressed["bottom"] == true) {
        player.style.marginTop = "88vh";
        swoosh.play();
        switchGravity(player, "dark");
    }
};

function keepDark() {
    var j = 0;
    setTimeout(function() {        
        if (j < 100000) { 
            var color = document.getElementsByClassName("color");
            for (let i = 0; i < color.length; i++) {
                color[i].style.backgroundColor = "#1F1F1F";
                color[i].style.boxShadow = "0px 0px 20px rgba(209, 209, 209, 0.3)";
            }
            keepDark();     
            j++;
        }
    }, 100)
};

function switchGravity(arg, color) {
    arg.style.animationName = "switch";
    arg.style.animationDuration = "0.5s";
    setTimeout(function(){arg.style.animationName = "";}, 500);

    if (color === "light") {
        arg.style.backgroundColor = "#D1D1D1";
        arg.style.boxShadow = "0px 0px 20px #1F1F1F";

        var background = document.getElementById("light-background");
        background.style.opacity = "0%";

        var backgroundTop = document.getElementById("background-top");
        backgroundTop.style.opacity = "0%";

        var backgroundBottom = document.getElementById("background-bottom");
        backgroundBottom.style.opacity = "0%";

    } else if (color === "dark") {
        arg.style.backgroundColor = "#1F1F1F";
        arg.style.boxShadow = "0px 0px 20px #D1D1D1";

        var background = document.getElementById("light-background");
        background.style.opacity = "100%";

        keepDark();

        var backgroundTop = document.getElementById("background-top");
        backgroundTop.style.opacity = "100%";

        var backgroundBottom = document.getElementById("background-bottom");
        backgroundBottom.style.opacity = "100%";
    }
};

function runFunctions() {
    var ranTime = Math.floor(Math.random() * 1000);
    setTimeout(function() {
        newElem();
        runFunctions();
    }, ranTime);
};

var newArr;
var x = 0;
var y = 3;
function returnVar(var1, var2, var3) {
    var newArr = var3;
    setTimeout(function() {
        for (let i = 0; i < 1; i++) {
            if (!newArr) {
                null;
            } else {
                var cont = newArr[i];

                /* var click = false;
                document.getElementById("pause-button").addEventListener("click", function pauseFunc(){
                    setTimeout(function(){
                        document.getElementById(cont).style.marginLeft = getComputedStyle(document.getElementById(cont)).marginLeft;
                        pauseFunc();
                    }, 10);
                }); */
    
                document.getElementById(cont).style.marginLeft = "-" + ((var2 * 1/5) + 30) + "vw";
                newArr.shift()
            }
        }
    }, 100);

    for (let i = 0; i < var1; i++) {
        var elem1 = document.getElementById("player").getBoundingClientRect();
        var elem2 = document.getElementById("color" + i).getBoundingClientRect();
        var elem3 = document.getElementById("background-top").getBoundingClientRect();
        var elem4 = document.getElementById("background-bottom").getBoundingClientRect();

        var pointsText = document.getElementById("points-text");
        var livesText = document.getElementById("lives-text")

        if (y === 0) {
            var gameText = document.getElementById("game-text");
            var newGame = document.getElementById("new-button");
            gameText.innerHTML = "game over";
            gameText.style.opacity = "1";
            newGame.style.opacity = "1";

            var touchTop = document.getElementById("touch-top");
            var touchBottom = document.getElementById("touch-bottom");

            touchTop.style.pointerEvents = "none";
            touchBottom.style.pointerEvents = "none";

            var highScore = document.getElementById("high-score");
            highScore.style.opacity = "1";
            var getScore = getCookie("highScore");
            if (x > getScore) {
                setCookie("highScore", x);
            } else {
            }

            highScore.innerHTML = "high score: " + getCookie("highScore");

            soundtrack.pause();
            window.onkeydown = function() {
            }
            break;
        }

        var player = document.getElementById("player");

        if (elem1.right < elem2.left || elem2.right < elem1.left) {
        } else if (elem1.bottom < elem2.top || elem2.bottom < elem1.top) {
        } else {
            y--;
            damage.play();
            player.style.backgroundColor = "#FF6F59";
            livesText.style.scale = "1.2";
            livesText.style.transform = "rotate(5deg)";
            setTimeout(function(){livesText.style.scale = "1"; livesText.style.transform = "rotate(0deg)";}, 700);
            player.style.animationName = "switch";
            player.style.animationDuration = "0.5s";
            setTimeout(function(){player.style.animationName = ""; player.style.backgroundColor = "auto";}, 500);
        }

        if (elem1.right < elem3.left || elem3.right < elem1.left) {
        } else if (elem1.bottom < elem3.top || elem3.bottom < elem1.top) {
        } else {
            x += 1;
            pointsText.style.scale = "1.2";
            pointsText.style.transform = "rotate(5deg)";
            setTimeout(function(){pointsText.style.scale = "1"; pointsText.style.transform = "rotate(0deg)";}, 700);
        }

        if (elem1.right < elem4.left || elem4.right < elem1.left) {
        } else if (elem1.bottom < elem4.top || elem4.bottom < elem1.top) {
        } else {
            x += 1;
            pointsText.style.scale = "1.2";
            pointsText.style.transform = "rotate(5deg)";
            setTimeout(function(){pointsText.style.scale = "1"; pointsText.style.transform = "rotate(0deg)";}, 700);
        }

        pointsText.innerHTML = "score: " + x;
        livesText.innerHTML = "lives: " + y;
    }
}

var i = -1;
var j = -1;
var l = 90;
function addI(type) {
    if (type === 0) {
        i++;
        return i;
    } else if (type === 1) {
        j++
        return j;
    } else if (type === 2) {
        l++;
        return l;
    }
} 

var arr = [];
var arrTwo = [];
function newElem() {
    var container = document.createElement("div");
    var mainContainer = document.getElementById("mainContainer");
    var contNum = addI(1);
    container.setAttribute("id", "container" + contNum);
    container.setAttribute("class", "container");
    container.style.marginLeft = addI(2) + "vw";
    mainContainer.appendChild(container);
    arrTwo.push("container" + contNum);

    var ranNum = Math.floor(Math.random() * 40);

    var divNum = addI(0);
    returnVar(divNum, contNum, arrTwo);

    if (ranNum > 20) {
        addElem(container, "color", divNum);
        document.getElementById("color" + divNum).style.marginTop = "55vh";
    } else if (ranNum <= 20) {
        addElem(container, "color", divNum);
        document.getElementById("color" + divNum).style.marginTop = "0vh";
    }

    document.getElementById("color" + divNum).style.width = (ranNum / 2) + 10 + "vw";

    return arr;
}

function addElem(cont, name, num) {
    var newElem = document.createElement("div");
    newElem.setAttribute("id", "color" + num);
    newElem.setAttribute("class", name);
    cont.appendChild(newElem);
    arr.push("color" + num);
}

var soundtrack = new Howl({
    src: ["soundtrack.mp3"],
    volume: 1.0,
    loop: true,
    autoplay: true,
});

var damage = new Howl({
    src: ["damage.mp3"],
    volume: 1.0,
});

var swoosh = new Howl({
    src: ["woosh.mp3"],
    volume: 0.6,
});

function loadCookies() {
    var x = getCookie("highScore");
    if (!x) {
        setCookie("highScore", 0);
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