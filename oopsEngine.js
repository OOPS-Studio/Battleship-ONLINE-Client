/*
CONNECTING OOPS! Engine to your canvas:
Step one: Give your canvas element an id of "canvas"
Step two: Sometime after your canvas element is defined, but before you import/run your JavaScript, add the following line to your HTML "<script src = "oopsEngine.js"></script>"
Step three: You're done! XD It's that easy! :)
IMPORTANT NOTES:
-Your canvas must have the id "canvas" to use OOPS! Engine.
-You do not need to re-connect to the canvas (var canvas = document.getElementById... etc.) context after you import OOPS! Engine. Although it's not bad practice to do so.
-You will be able to make reference to your canvas element as "canvas", although you can manually override this easily.
-Your canvas will be given a tabIndex of "0"
*/
var canvas = document.getElementById("canvas");
canvas.tabIndex = "0";
var ctx = canvas.getContext("2d");
var isStroke = true;
var isFill = true;
var mouseX = 0;
var mouseY = 0;
var pmouseX = 0;
var pmouseY = 0;
var get_frameRate = 50;
var get_textFont = "Arial";
var get_textSize = "20";
var mouseIsPressed = false;
var keysPressed = [];
var mouseButton = 0;
var get_strokeStyle = "";
var get_fillStyle = "";
var get_strokeWidth = "";
var alreadyDrawing = false;
function mouseClicked(){}

canvas.addEventListener("click",function(){
    mouseClicked();
});

canvas.addEventListener("mousemove",function(e){
    pmouseX = mouseX;
    pmouseY = mouseY;
    var canvasPos = canvas.getBoundingClientRect();
    mouseX = (e.clientX - canvasPos.x) * (1000 / canvas.width);
    mouseY = (e.clientY - canvasPos.y) * (1000 / canvas.width);
});

canvas.addEventListener("mousedown",function(e){
    mouseIsPressed = true;
    mouseButton = e.button;
});

canvas.addEventListener("mouseup",function(){
    mouseIsPressed = false;
});

canvas.addEventListener("keydown",function(e){
    keysPressed[e.keyCode] = true;
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
});

canvas.addEventListener("keyup",function(e){
    keysPressed[e.keyCode] = false;
});

function checkForDraw(){
    if(typeof(draw) === "function" && !alreadyDrawing){
        setInterval(draw,1000 / get_frameRate);
    }
} 

setTimeout(checkForDraw,1000);

function frameRate(fr){
    get_frameRate = fr;
}

function random(min,max){
    max -= min;
    return((Math.random() * max) + min);
}

function dist(x1,y1,x2,y2){
    x1 -= x2;
    y1 -= y2;
    return(Math.sqrt(x1 * x1 + y1 * y1));
}

function d2r(degrees){
    return((degrees / 180) * Math.PI);
}

function strokeIf(){
    if(isStroke){
        ctx.stroke();
    }
}

function fillIf(){
    if(isFill){
        ctx.fill();
    }
}

function line(x1,y1,x2,y2){
    ctx.beginPath();
    ctx.moveTo(x1,y1);
    ctx.lineTo(x2,y2);
    strokeIf();
}

function rect(x,y,w,h){
    ctx.beginPath();
    if(isFill){
        ctx.fillRect(x,y,w,h);
    }
    if(isStroke){
        ctx.strokeRect(x,y,w,h);
    }
    strokeIf();
}

function arc(x,y,w,h,start,stop){
    ctx.beginPath();
    ctx.arc(x,y,0,0,Math.PI * 2);
    ctx.ellipse(x,y,w / 2,h / 2,0,d2r(start),d2r(stop));
    strokeIf();
    fillIf();
}

function ellipse(x,y,w,h){
    ctx.beginPath();
    ctx.ellipse(x,y,w / 2,h / 2,0,0,Math.PI * 2);
    strokeIf();
    fillIf();
}

function backBackground(r,g,b){
    canvas.style.background = "rgb(" + r + "," + g + "," + b + ")";
}

function background(r,g,b){
    var previousFill = ctx.fillStyle;
    ctx.save();
    ctx.setTransform(1,0,0,1,0,0);
    ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = previousFill;
    ctx.restore();
}

function text(label,x,y){
    ctx.fillText(label,x,y);
}

function textAlign(x,y){
    ctx.textAlign = x;
    ctx.textBaseline = y;
}

function textSize(s){
    get_textSize = s;
    ctx.font = s + "px " + get_textFont;
}

function textFont(f){
    get_textFont = f;
    ctx.font = get_textSize + "px " + f;
}

function fill(r,g,b,a){
    a = a / 255 || 1;
    ctx.fillStyle = "rgba(" + r + "," + g + "," + b + "," + a + ")";
    isFill = true;
    get_fillStyle = ctx.fillStyle;
}

function noFill(){
    isFill = false;
}

function stroke(r,g,b,a){
    a = a / 255 || 1;
    ctx.strokeStyle = "rgba(" + r + "," + g + "," + b + "," + a + ")";
    isStroke = true;
    get_strokeStyle = ctx.strokeStyle;
}

function strokeWeight(w){
    ctx.lineWidth = w;
    get_strokeWidth = ctx.lineWidth;
}

function noStroke(){
    isStroke = false;
}

function cursor(curs){
    canvas.style.cursor = curs;
}
function sound(src,type,vol){
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.type = type;
    this.sound.volume = vol;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.currentTime = 0;
        this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
    }
}

function svgImage(src){
    this.img = new Image();
    this.img.src = src;
    this.display = function(x,y){
        ctx.drawImage(this.img,x,y);
    }
}