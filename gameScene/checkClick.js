function checkClick(iOB){
    if(turn === index){
        var toSend = {
            type: "move",
            movex: iOB[1],
            movey: iOB[0]
        };
        connection.send(JSON.stringify(toSend));
    }
}