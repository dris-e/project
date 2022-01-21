var pressed = {};

window.onkeydown = function(e) {
    pressed[e.keyCode] = e.type == 'keydown';
    pressed[e.key] = true;

    var player = document.getElementById("player");

    if (pressed[38] == true && pressed[40] == true || pressed[87] == true && pressed[83] == true) {
        player.style.marginTop = "44vh";
        pressed = {}; 
    } else if (pressed[38] == true || pressed[87] == true) {
        player.style.marginTop = "0vh";
        switchGravity(player, "light");
        setTimeout(function(){player.style.animationName = "";}, 500)
    } else if (pressed[40] == true || pressed[83] == true) {
        player.style.marginTop = "88vh";
        switchGravity(player, "dark");
    } 
};


function keepDark(arg, arg2) {
    var j = 0;
    setTimeout(function() {        
        if (j < 100000) { 
            var color = document.getElementsByClassName("color");
            for (let i = 0; i < color.length; i++) {
                color[i].style.backgroundColor = arg2;
                color[i].style.boxShadow = arg;
            }
            console.log("sus");
            keepDark();     
            j++;
        }
    }, 100)
}

function switchGravity(arg, color) {
    arg.style.animationName = "switch";
    arg.style.animationDuration = "0.5s";
    setTimeout(function(){arg.style.animationName = "";}, 500)

    if (color === "light") {
        arg.style.backgroundColor = "#D1D1D1";
        arg.style.boxShadow = "0px 0px 20px #1F1F1F";

        var background = document.getElementById("light-background");
        background.style.opacity = "0%";

        keepDark("0px 0px 20px rgba(31, 31, 31, 0.3)", "#D1D1D1");

        var backgroundTop = document.getElementById("background-top");
        backgroundTop.style.opacity = "0%";

        var backgroundBottom = document.getElementById("background-bottom");
        backgroundBottom.style.opacity = "0%";

    } else if (color === "dark") {
        arg.style.backgroundColor = "#1F1F1F";
        arg.style.boxShadow = "0px 0px 20px #D1D1D1";

        var background = document.getElementById("light-background");
        background.style.opacity = "100%";

        keepDark("0px 0px 20px rgba(209, 209, 209, 0.3)", "#1F1F1F");

        var backgroundTop = document.getElementById("background-top");
        backgroundTop.style.opacity = "100%";

        var backgroundBottom = document.getElementById("background-bottom");
        backgroundBottom.style.opacity = "100%";
    }
}

function runFunctions() {
    var ranTime = Math.floor(Math.random() * 1000);
    setTimeout(function() {
        newElem();
        runFunctions();
    }, ranTime);
}

var newArr;
var x = 0;
var y = 3;
function returnVar(var1, var2, var3) {
    var newArr = var3;
    setTimeout(function(){
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
    }, 100)

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
            window.onkeydown = function() {
            }
            break;
        }

        if (elem1.right < elem2.left || elem2.right < elem1.left) {
        } else if (elem1.bottom < elem2.top || elem2.bottom < elem1.top) {
        } else {
            y--;
            livesText.style.scale = "1.2";
            livesText.style.transform = "rotate(5deg)";
            setTimeout(function(){livesText.style.scale = "1"; livesText.style.transform = "rotate(0deg)";}, 700);
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
    /*
    else if (ranNum == 20) {
        addElem(container, "rare", divNum);
        document.getElementById("color" + divNum).style.marginTop = "54vh";
        document.getElementById("color" + divNum).innerHTML = "x2"
    } else if (ranNum == 21) {
        addElem(container, "rare", divNum);
        document.getElementById("color" + divNum).style.marginTop = "-2vh";
        document.getElementById("color" + divNum).innerHTML = "x2"
    } else if (ranNum == 19) {
        addElem(container, "bad", divNum);
        document.getElementById("color" + divNum).style.marginTop = "-2vh";
        document.getElementById("color" + divNum).innerHTML = "/2"
    } else if (ranNum == 22) {
        addElem(container, "bad", divNum);
        document.getElementById("color" + divNum).style.marginTop = "-2vh";
        document.getElementById("color" + divNum).innerHTML = "/2"
    } */

    return arr;
}

function addElem(cont, name, num) {
    var newElem = document.createElement("div");
    newElem.setAttribute("id", "color" + num);
    newElem.setAttribute("class", name);
    cont.appendChild(newElem);
    arr.push("color" + num);
}

/* function getNum() {
    ranNum = (Math.floor(Math.random() * 10) + 1),
    arr = newElem();

    for (let i = 0; i < arr.length; i++) {
        var ranDec = Math.floor(Math.random() * 4),
        ranVar = Math.floor((Math.random() * 10) + 1),
        player = document.getElementById("player"),
        front;

        if (ranDec === 0) {
            front = "x";
        } else if (ranDec === 1) {
            front = "+";
        } else if (ranDec === 2) {
            front = "/";
        } else {
            front = "-";
        }

        var elem = document.getElementById(arr[i]);
        elem.innerHTML = front + ranVar;

        returnVar(front, ranVar);
    }


} */

/* function isTouching() {
    var player = document.getElementById("player"),
    pos,
    points = 0,
    total = 3;

    /* switch () {
        case 0:
            pos = 15;
            break;
        case 1:
            pos = 75;
            break;
        case 2:
            pos =  45;
            break;
        case 3:
            pos = 65;
            break;
    }

    var currentPos = Math.round(parseInt(getComputedStyle(player).marginTop) * (100 / document.documentElement.clientHeight));

    if (currentPos === pos) {
        points++;
    } else {
        total--;
    }
    console.log(currentPos);
    console.log(points);
    return points;
} */

/*
            if (ranVar / 10 > parseInt(getComputedStyle(player).scale)) {
                player.style.scale = parseInt(getComputedStyle(player).scale) * ranVar;
            } else {
                player.style.scale = parseInt(getComputedStyle(player).scale) * ranVar / 100;
            }
*/








/*
var pressed = {};
var colors = ["red", "orange", "yellow", "green", "blue", "purple", "pink", "black", "grey"];

window.onkeydown = function(e) {
    var player = document.getElementById("player");
    switch (e.keyCode) {
        case 68:
            player.style.marginTop = "0vh";
            checkPoints();
            changeColor(newRanVar);
            break;
        case 70:
            player.style.marginTop = "20vh";
            checkPoints();
            changeColor(newRanVar);
            break;           
        case 74:
            player.style.marginTop = "45vh";
            checkPoints();
            changeColor(newRanVar);
            break;
        case 75:
            player.style.marginTop = "65vh";
            checkPoints();
            changeColor(newRanVar);
            break;
    }
};

function randomColor() {
    var r = Math.floor(Math.random() * 9);
    var ranCol = colors[r];
    return ranCol;
}

function ranVar() {
    var ranVar = Math.floor(Math.random() * 4);
    return ranVar;
}

function newVar() {
    newRanVar = ranVar();
}

var newRanVar = ranVar();
console.log(newRanVar);

var i = 5000;
function changeColor(arg) {
    i -= 100;
    var arr = [];
    var ranVar = arg;
    for (let i = 0; i < 4; i++) {
        var elem = document.getElementsByClassName("color");
        var player = document.getElementById("player");
        var playerText = document.getElementById("player-text");

        var ranNum = randomColor(); 
        elem[i].style.backgroundColor = ranNum;

        player.style.backgroundColor = randomColor();
        playerText.innerHTML = randomColor();

        arr.push(ranNum);

        if (i === ranVar) {
            playerText.style.color = arr[ranVar];
        } 
    }
    var container = document.getElementById("container-1");
    container.style.marginLeft = "-10vw";
    container.style.transition = "margin-left, " + i; 
    setTimeout(function(){container.style.marginLeft = "90vw";}, i);

} 

var passed = 0;
var lives = 3;

function checkPoints() {
    var player = document.getElementById("player");
    var pos;

    switch (newRanVar) {
        case 0:
            pos = 0;
            break;
        case 1:
            pos = 20;
            break;
        case 2:
            pos =  45;
            break;
        case 3:
            pos = 65;
            break;
    }

    var currentPos = parseInt(getComputedStyle(player).marginTop) * (100 / document.documentElement.clientHeight);;

    console.log(currentPos);
    console.log(pos);

    if (currentPos === pos) {
        passed += 2;
        lives++;
        newVar();
    } else {
        lives--;
    }
    
    document.getElementById("game-score").innerHTML = "score: " + passed;
    document.getElementById("game-lives").innerHTML = "lives: " + lives;
}
*/




