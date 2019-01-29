//Make sure window.webSocket is defined
window.WebSocket = window.WebSocket || window.MozWebSocket;

//If the prevous step worked, we can begin
if(window.WebSocket){
    
    //Open a new websocket on the heroku server
    var connection = new WebSocket("ws://dry-everglades-38816.herokuapp.com");
    
    //When the connection opens, set connected to "true"
    connection.onopen = function(){
        connected = true;
    };
    
    //If there's an error (for example if the server isn't up at the time), tell the console and set connected to "error"
    connection.onerror = function(error){
        connected = "error";
        console.log("%cERROR: Unable to establish connection with webSocket server!","color: red;");
    };
    
    //If we get a message...
    connection.onmessage = function(message){ 
        //Make sure the message is in valid JSON format
        try{
            //Parse the message
            var json = JSON.parse(message.data);
            
        } catch(e){
            //If the JSON is invalid, log it and exit
            console.log("Invalid JSON: ", message.data);
            return;
        }
        
        //If the JSON "text" key is defined, it's a "text", and we 
        if( typeof json.text !== "undefined" ){
            
            //Add a "text" based on the JSON data collected earlier
            addText(json.text,json.author,json.player);
            
        } 
        
        //If the JSON "movex" key is defined, it's a move, and we should treat it as such
        else if ( typeof json.movex !== "undefined" ) {
            //Figure out which board to put it on
            var plotTo = 1;
            if( index === json.author ){
                plotTo = 0;
            }
            
            //Add the result to the appropriate board's matrix
            boards[ plotTo ][ json.movey ][ json.movex ] = json.result;
            
            //If the result was a miss, play the "miss" sound
            if(json.result === 1){
                missSound.play();
            }
            
            //If the JSON result is between 8 and 14, it's a hit
            if( json.result > 8 && json.result < 14 ){
                
                //If a ship was sunk...
                if(json.sunk){
                    //Play the sink sound
                    sinkSound.play();
                    
                    //Keep track of all spots on the sunken ship
                    var spots = [];
                    
                    //For each row in the board...
                    for(var i = 0; i < boards[plotTo].length; i++){
                        
                        //For each column in each row...
                        for(var j = 0; j < boards[plotTo][i].length; j++){
                            //If the value at that spot is the same as that of the result, it is on the sunk ship
                            if( boards[ plotTo ][ i ][ j ] === json.result ){
                                //Add it to our spots
                                spots.push( [i,j] );
                            }
                        }
                    }
                    
                    //For each spot...
                    for(var i = 0; i < spots.length; i++){
                        //Set the value of that spot to represent a sunk ship
                        boards[ plotTo ][ spots[i][0] ][ spots[i][1] ] = 3;
                    }
                
                }
                
                //Otherwise, just play the regular hit sound
                else{
                    hitSound.play();
                }
            }
            
            //Change the turn
            if( turn === 0 ){
                turn = 1;
            }else{
                turn = 0;
            }
            
        }
        
        //If it's not a text or a move, it's a board
        else if( typeof json.board !== "undefined" ){
            //Put the board into the game
            boards[1] = json.board;
            index = json.index;
        }
    };
    
    
} 

//If the WebSocket didn't work, the browser doesn't support it
else {
    connected = "error";
    console.log("Sorry! Your web browser doesn't support webSockets! ;( You can always switch to a different browser and it'll work just great :)");
}
