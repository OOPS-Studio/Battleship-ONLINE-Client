function board(x,xoff,whichBoard){
    var mouseInBoard = mouseX > x && mouseX < x + 395 && mouseY > 105 && mouseY < 500 && (mouseX + xoff) % 40 < 35 && (mouseY + 15) % 40 < 35;
    strokeWeight(1);
    fill(0,150,255);
    stroke(0,0,0);
    rect(x - 10,95,415,415);
    if(whichBoard){
        for(var i = 0;i < 10;i++){
            for(var j = 0;j < 10;j++){
                noFill();
                stroke(0,100,200);
                rect(x + i * 40,105 + j * 40,35,35);
                value = boards[whichBoard][j][i];
                if(value === 1){
                    noStroke();
                    fill(255,255,255);
                }else if(value === 3){
                    noStroke();
                    fill(0,0,255);
                }else if(value > 8){
                    noStroke();
                    fill(255,0,0);
                }else if(value > 3){
                    noStroke();
                    fill(150,150,150);
                }else{
                    stroke(0,200,230);
                }
                ellipse(17.5 + x + i * 40,122.5 + j * 40,20,20);
            }
        }
        fill(0,0,0);
        textSize(30);
        text("Your board",x + 198,535);
    }else{
        for(var i = 0;i < 10;i++){
            for(var j = 0;j < 10;j++){
                noFill();
                stroke(0,100,200);
                rect(x + i * 40,105 + j * 40,35,35);
                value = boards[whichBoard][j][i];
                if(value === 1){
                    noStroke();
                    fill(255,255,255);
                }else if(value === 3){
                    noStroke();
                    fill(0,0,255);
                }else if(value > 8){
                    noStroke();
                    fill(255,0,0);
                }else{
                    stroke(0,200,230);
                }
                ellipse(17.5 + x + i * 40,122.5 + j * 40,20,20);
            }
        }
        if(mouseInBoard){
            if(clicked){
                var iOB = [Math.floor((mouseY + 15) / 40) - 3,Math.floor((mouseX + 5) / 40) - 2];
                checkClick(iOB);
            }
            noStroke();
            fill(255,255,255,100);
            ellipse(17.5 + Math.floor((mouseX + 5) / 40) * 40 - xoff,17.5 + Math.floor((mouseY + 15) / 40) * 40 - 15,20,20);
        }
        fill(0,0,0);
        textSize(30);
        text("Opponent's board",x + 198,535);
    }
}