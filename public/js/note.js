/*
  JAVASCRIPT FOR A RECENT WEB-APP I'VE BEEN WORKING ON!
*/

interact('.draggable')
  .draggable({
    inertia: true,
    modifiers: [
        interact.modifiers.restrictRect({
          restriction: 'parent',
          endOnly: true
        })
      ],
    autoScroll: false,
    listeners: {
      move: dragMoveListener,
      end (event) {
      }
    }
})
.resizable({
    edges: { left: true, right: true, bottom: true, top: true },

    listeners: {
      move (event) {
        var target = event.target
        var x = (parseFloat(target.getAttribute('data-x')) || 0)
        var y = (parseFloat(target.getAttribute('data-y')) || 0)
        target.style.width = event.rect.width + 'px'
        target.style.height = event.rect.height + 'px'
        x += event.deltaRect.left
        y += event.deltaRect.top
        target.style.transform = 'translate(' + x + 'px,' + y + 'px)'
        target.setAttribute('data-x', x)
        target.setAttribute('data-y', y) 
      },
      end (event) {
        var target = event.target
        var x = (parseFloat(target.getAttribute('data-x')) || 0)
        var y = (parseFloat(target.getAttribute('data-y')) || 0)
        x += event.deltaRect.left
        y += event.deltaRect.top
        stretchArr.push([Math.round(event.rect.width), Math.round(event.rect.height), event.target.getAttribute('id')])
        var arrStr = getCookie("stretchCookie").split(",")
        setCookie("stretchCookie", arrStr.concat(stretchArr))
      }
    },
    modifiers: [
      interact.modifiers.restrictEdges({
        outer: 'parent'
      }),
      interact.modifiers.restrictSize({
        min: { width: 100, height: 100 },
        max: { width: 500, height: 500 }
      })
    ],
    inertia: true
  })
var posArr = []
function dragMoveListener (event) {
  var target = event.target
  var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
  var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy
  target.style.transform = 'translate(' + x + 'px, ' + y + 'px)'
  target.setAttribute('data-x', x)
  target.setAttribute('data-y', y)
    posArr.push([Math.round(x), Math.round(y), event.target.getAttribute('id')])
    var arrPos = getCookie("posCookie").split(",")
    setCookie("posCookie", arrPos.concat(posArr)) 
}

var stretchArr = [];

window.dragMoveListener = dragMoveListener

function addElement(type, descrip) {
    var element = document.createElement(type)
    element.className = descrip + ' draggable resizable'
    element.setAttribute('id', descrip + addI(descrip))
    var body = document.querySelector("body")
    body.appendChild(element)
}

var i = getCookie("iCookie")
//var arr = [];

function addI(descrip) {
    i++
    setCookie("iCookie", i)
    /* arr.push(descrip + i)
    setCookie("valCookie", arr)
    console.log(getCookie("valCookie")) */
    return i
} 

//push the latest value of the id to the cookie value

/*
var valCookie = getCookie("valCookie")
setCookie("valCookie", valCookie.concat(arr))
*/

function resetCookie() {
    setCookie("iCookie", 0)
    var elements = document.getElementsByClassName('note')
    while(elements.length > 0) {
        elements[0].parentNode.removeChild(elements[0])
    }
    setCookie("valCookie", "")
    setCookie("dataCookie", "")
    setCookie("testCookie", "")
    setCookie("newTestCookie", "")
    setCookie("stretchCookie", "")
}

var arr = []


function loadCookies() {
    var x = parseInt(getCookie("iCookie"))
    var newArr = []
    if (x) {
        for (let j = 0; j < x; j++) {
            var element = document.createElement("textarea")
            var noteId = "note" + j
            newArr.push(noteId)
            element.className = 'note draggable resizable'
            element.setAttribute('id', "note" + j)
            element.setAttribute('onchange', "logVal()")
            var body = document.querySelector("body")
            body.appendChild(element)
            arr.push("note" + j)
            setCookie("valCookie", arr)
            setCookie("testCookie", newArr)
        }
    }

    var y = getCookie("newTestCookie").split(",") 
    if (y) {
        var testVal = getCookie("testCookie").split(",")
        for (let j = 0; j < y.length; j++) {
            var elemVal = document.getElementById(testVal[j])
            elemVal.innerHTML = y[j]
        }
    }
}

function logVal() {
    var testArr = []
    var testVal = getCookie("testCookie").split(",")
    for (let i = 0; i < testVal.length; i++) {
        var elemVal = document.getElementById(testVal[i]).value
        testArr.push(elemVal)
        setCookie("newTestCookie", testArr)
    }
    var z = getCookie("stretchCookie").split(",")
    if (z) {
        console.log(z)
        console.log(parseInt(z[z.length - 3]), parseInt(z[z.length - 2]))

        var testVal = getCookie("testCookie").split(",")

        for (j = 0; j < testVal.length; j++) {
            if(z.indexOf(testVal[j]) !== -1){
                var valIndex = z.lastIndexOf(testVal[j])
                var target = document.getElementById("note" + j)
                var yPos = parseInt(z[valIndex - 1])
                var xPos = parseInt(z[valIndex - 2])
                target.style.width = xPos + 'px'
                target.style.height = yPos + 'px'
                console.log(xPos, yPos)
            } else {
                console.log("value does not exist")
            }
        }
    }
}

//cookies

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