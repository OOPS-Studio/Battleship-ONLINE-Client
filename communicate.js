window.WebSocket = window.WebSocket || window.MozWebSocket;
if(window.WebSocket){
    var connection = new WebSocket("ws://dry-everglades-38816.herokuapp.com");
    connection.onopen = function(){
        connected = true;
    };
    connection.onerror = function(error){
        connected = "error";
        console.log("%cERROR: Unable to establish connection with webSocket server!","color: red;");
    };
    connection.onmessage = function(message){ 
        try{
            var json = JSON.parse(message.data);
        }catch(e){
            console.log("Invalid JSON: ", message.data);
            return;
        }
        if(typeof json.text !== "undefined"){
            addText(json.text,json.author,json.player);
        }else if(typeof json.movex !== "undefined"){
            var plotTo = 1;
            if(index === json.author){
                plotTo = 0;
            }
            boards[plotTo][json.movey][json.movex] = json.result;
            if(json.result === 1){
                missSound.play();
            }
            if(json.result > 8 && json.result < 14){
                if(!json.sunk){
                    hitSound.play();
                }else{
                    sinkSound.play();
                }
                var spots = [];
                if(json.sunk){
                    for(var i = 0;i < boards[plotTo].length;i++){
                        for(var j = 0;j < boards[plotTo][i].length;j++){
                            if(boards[plotTo][i][j] === json.result){
                                spots.push([i,j]);
                            }
                        }
                    }
                    for(var i = 0;i < spots.length;i++){
                        boards[plotTo][spots[i][0]][spots[i][1]] = 3;
                    }
                }
            }
            if(turn === 0){
                turn = 1;
            }else{
                turn = 0;
            }
        }else if(typeof json.board !== "undefined"){
            boards[1] = json.board;
            index = json.index;
        }
    };
}else{
    connected = "error";
    console.log("Sorry! Your web browser doesn't support webSockets! ;( You can always switch to a different browser and it'll work just great :)");
}