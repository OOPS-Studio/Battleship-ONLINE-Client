var interval;
function draw(){};
function drawStuff(){
    if(typeof interval !== "undefined"){
        clearInterval(interval);
    }
    textAlign("center","middle");
    ctx.scale(canvas.width / 1000,canvas.width / 1000);
    function draw(){
        /*if(!connected){
            fill(0,0,0);
            noStroke();
            rect(400,225,200,150);
            fill(255,255,255);
            textSize(30);
            text("Connecting...",500,300);
        }else if(connected === "error"){
            fill(0,0,0);
            noStroke();
            rect(400,225,200,150);
            fill(255,255,255);
            textSize(30);
            text("ERROR!",500,300);
            textSize(15);
            fill(0,0,0);
            text("Something went wrong while connecting",500,385);
            text("to the webSocket server!",500,400);
        }*/
        handleScenes();
        testingSVG.display(0,0);
    }
    interval = setInterval(draw,1000 / get_frameRate);
    alreadyDrawing = true;
}
function resizeCanvas(){
    /*canvas.width = window.innerWidth * 0.75;
    canvas.height = canvas.width * 0.6;*/
    canvas.width = 1000;
    canvas.height = 600;
    drawStuff();
}
window.addEventListener("resize",resizeCanvas,false);
resizeCanvas();
