function runMenuScene(){
    background(255,0,0);
    fill(0,0,0);
    textSize(50);
    textFont("arial black");
    for(var i = 0;i < 10;i++){
        text("BATTLESHIP",500 + Math.cos((2 * (i / 10)) * Math.PI) * 5,200 + Math.sin((2 * (i / 10)) * Math.PI) * 5);
    }
    fill(255,255,255);
    text("BATTLESHIP",500,200); 
}