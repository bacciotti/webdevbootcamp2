var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");

var campgrounds = [
        {name: "Salmon Creek", image: "https://pixabay.com/get/e837b1072af4003ed1584d05fb1d4e97e07ee3d21cac104496f6c07da4eeb5b9_340.jpg"},
        {name: "Granite Hill", image: "https://pixabay.com/get/e83db50a21f4073ed1584d05fb1d4e97e07ee3d21cac104496f6c07da4eeb5b9_340.jpg"},
        {name: "Mountain Goat's Rest", image: "https://pixabay.com/get/e83db7072ef6053ed1584d05fb1d4e97e07ee3d21cac104496f6c07da4eeb5b9_340.jpg"}
    ];

app.get("/", function(req, res){
    res.render("landing");
});

app.get("/campgrounds", function(req, res){
    res.render("campgrounds", {campgrounds: campgrounds});
});

app.post("/campgrounds", function(req, res){
    res.send("YOU HIT THE POST ROUTE!");
   // get data from form and add to campgrounds array
   var name = req.body.name;
   var image = req.body.image;
   var newCampground = {name: name, image: image}
   campgrounds.push(newCampground);
   
   // redirect back to campgrounds page
   res.redirect("/campgrounds"); //The default is a GET request.
});

app.get("/campgrounds/new", function(req, res) {
   res.render("new.ejs");
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("YelpCamp Server has started!");
})