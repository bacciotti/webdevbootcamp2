var express = require("express");
var app = express();

app.get("/", function(req, res){
    res.send("Hi there, welcome to my assignment!");    
});

// speak
app.get("/speak/:animal", function(req, res){
    var sounds = {
        pig: "Oink!",
        cow: "Moo!",
        dog: "Woof Woof!",
        cat: "I hate you, human!",
        goldfish: "Makikarp! Magikarp!"
    }
    var animal = req.params.animal.toLowerCase();
    var sound = sounds[animal]

    res.send("The " + animal + " says \"" + sound + "\"");    
});

// repeat
app.get("/repeat/:str/:num", function(req, res){
    var str = req.params.str;
    var num = req.params.num;
    var ret = "";
    
    for (var i = 0; i < num; i++){
        ret += " " + str + " ";        
    }
    
    res.send(ret);
    
});

app.get("*", function(req, res){
    res.send("Sorry, page not found... What are you doing with your life?");
})

// Tell Express to listen for requests (start server)
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has started!!!");
});