function runGameScene(){
    background(255,0,0);
    fill(0,0,0);
    textSize(30);
    if(turn === index){
        text("Your turn",500,50);
        if(frameCount % 60 < 40){
            textSize(15);
            text("Launch a torpedo!",500,70);
        }
    }else{
        text("Opponent's turn",500,50);
        textSize(15);
        text("(Brace yourself...)",500,70);
    }
    board(75,5,0);
    board(520,0,1);
    
    frameCount++;
    clicked = false;
}