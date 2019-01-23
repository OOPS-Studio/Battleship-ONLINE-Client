var converts = ["one","two"];
function addText(data,author,player){
    var pastTexts = textArea.innerHTML;
    textArea.innerHTML = "<span class = \"" + converts[player] + "\">" + author + "</span>" + data + "<br>";
    textArea.innerHTML += pastTexts;
}

textBox.addEventListener("keydown",function(e){
    if(e.keyCode === 13){
        e.preventDefault();
    }
    if(e.keyCode === 13 && textBox.value !== ""){
        var toSend = {
            type: "text",
            value: textBox.value
        };
        connection.send(JSON.stringify(toSend));
        textBox.value = "";
    }
});