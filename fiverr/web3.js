function addElem(descrip, num, type, body) {
    var container = document.getElementById(body);
    var newElem = document.createElement(type);
    newElem.setAttribute("id", descrip + num);
    newElem.setAttribute("class", descrip);
    newElem.setAttribute("onchange", "updateTxt(" + "'" + descrip + "'" +")");
    newElem.setAttribute("ondblclick", "popElem(); window.location.reload();");
    container.appendChild(newElem);
}

var i = 0;
function addNum() {
    i++;
    var oldVal = parseInt(getCookie("num"));
    setCookie("num", oldVal + i);
    return i;
}

var j = 0;
function popElem() {
    var oldVal = parseInt(getCookie("num"));
    if (oldVal != 1) {
        j++;
        var oldComp = parseInt(getCookie("comp"));
        setCookie("comp", oldComp + j);
        setCookie("num", oldVal - 1);
    }
}

function checkMode() {
    var checkBox = document.getElementById("check-mode");
    if (checkBox.checked) {
        setCookie("check", true);
        var tasks = document.getElementsByClassName("task");
        var text = document.getElementsByClassName("container");
        /* for (let i = 0; i < tasks.length; i++) {
            tasks[i].style.color = "black";
            console.log(tasks[i]);
        }
        for (let j = 0; j < text.length; j++) {
            text[i].style.color = "white";
            console.log(text[i]);
        } */
    } else {
        setCookie("check", false);
    }
}

function taskVal() {
    var taskValue = document.getElementById("task-list").value;
    setCookie("taskVal-2", taskValue);
}

function updateTxt(descrip) {
    var num = parseInt(getCookie("num"));
    var textArr = [];
    for (let i = 0; i < num; i++) {
        var elem = document.getElementById(descrip + i);
        textArr.push(elem.value);
        /* var elemSave = getCookie("elemVal").split(",");
        if (num <= elemSave.length) {
            for (let j = 0; j < elemSave.length - num + 1; j++) {
                elemSave.shift();
            }
        } */
        setCookie("newElem", textArr);
        console.log(textArr);
        //setCookie("elemVal", elemSave.concat(textArr));
        //console.log(elemSave);
    }
}

function resetCookie() {
    setCookie("num", 1);
    setCookie("comp", 1);
    setCookie("newElem", )
}

function loadCookies(descrip1, type1, body1) {
    var x = parseInt(getCookie("num"));
    if (x) {
        for (let i = 0; i < x; i++) {
            addElem(descrip1, i, type1, body1);
        }
    }
    var y = getCookie("newElem").split(",");
    if (!y) {
        setCookie("newElem", []);
    } else {
        for (let i = 0; i < y.length; i++) {
            var elem = document.getElementById(descrip1 + i);
            elem.innerHTML = y[i];
            if (!y[i]) {
                elem.innerHTML = "";
            }
        }
    }
    var a = getCookie("taskVal-2");
    if (a) {
        var taskValue = document.getElementById("task-list");
        taskValue.innerHTML = a;
    }
    var z = parseInt(getCookie("comp"));
    if (!z) {
        setCookie("comp", 1);
    } else {
        //var compText = document.getElementById("comp-text");
        var totalText = document.getElementById("total-text");
        var percGraph = document.getElementById("perc-graph");
        var perc = Math.round((x / z) * 100);
        if (100 <= perc) {
            percGraph.style.width = 33 + "vw";
            totalText.innerHTML = 100 + "% completion rate";
        } else {
            percGraph.style.width = perc / 3 + "vw";
            totalText.innerHTML = perc + "% completion rate";
        }
        //compText.innerHTML = (z - 1) + " completed";
    }
    var b = getCookie("check");
    if (b) {
        document.getElementById("check-mode").checked = b;
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