var pressed = {};
var colors = ["red", "orange", "yellow", "green", "blue", "purple", "pink", "black", "grey"];

window.onkeydown = function(e) {
    var player = document.getElementById("player");
    switch (e.keyCode) {
        case 68:
            console.log("d");
            player.style.transform = "translate(10vw, 5vh)";
            break;
        case 70:
            console.log("f");
            player.style.transform = "translate(10vw, 30vh)";
            break;           
        case 74:
            console.log("j");
            player.style.transform = "translate(10vw, 50vh)";
            break;
        case 75:
            console.log("k");
            player.style.transform = "translate(10vw, 75vh)";
            break;
    }
    checkPoints();
};

function randomColor() {
    var r = Math.floor(Math.random() * 9);
    var ranCol = colors[r];
    return ranCol;
}

function changeColor() {
    var arr = [];
    var ranVar = Math.floor(Math.random() * 4);
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
    return ranVar;
} 

var passed = 0;

function checkPoints() {
    var player = document.getElementById("player");
    var pos;

    console.log(changeColor());

    switch (changeColor()) {
        case 0:
            pos = "matrix(1, 0, 0, 1, 48.79999923706055, 41)";
            break;
        case 1:
            pos = "matrix(1, 0, 0, 1, 48.79999923706055, 246)";
            break;
        case 2:
            pos =  "matrix(1, 0, 0, 1, 48.79999923706055, 410)";
            break;
        case 3:
            pos = "matrix(1, 0, 0, 1, 48.79999923706055, 615)";
            break;
    }

    var currentPos = getComputedStyle(player).transform;

    console.log(currentPos);
    console.log(pos);

    if (currentPos === pos) {
        passed++;
        changeColor();
    }

    console.log(passed);
}



