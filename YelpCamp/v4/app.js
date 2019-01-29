var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    Campground  = require("./models/campground"),
    Comment     = require("./models/comment"),
    seedDB      = require("./seeds");


seedDB();
mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");


// Campground.create({
//     name: "Boteco do Zé",
//     image: "http://www.artigosdeboteco.com.br/wp-content/uploads/2017/02/215-1-600x600.jpg",
//     description: "Chove lá fora. Aqui dentro só pinga!"
// }, function(err, newlyCreated) {
//     if (err){
//         console.log(err);
//     }
// })

app.get("/", function(req, res){
    res.render("landing");
});

app.get("/campgrounds", function(req, res){
    // Get all campgrounds from DB
    Campground.find({}, function (err, allCampgrounds) {
        if (err){
            console.log(err);
        } else {
            res.render("campgrounds/index", {campgrounds: allCampgrounds});        
        }
    });
});

app.post("/campgrounds", function(req, res){
    res.send("YOU HIT THE POST ROUTE!");
   // get data from form and add to campgrounds array
   var name = req.body.name;
   var image = req.body.image;
   var description = req.body.description;
   var newCampground = {name: name, image: image, description: description}
   
   // Create a new cg e save to db
   Campground.create(newCampground, function(err, newlyCreated){
       if(err){
           console.log(err);
       } else {
           res.redirect("/campgrounds");
       }
   })
});

app.get("/campgrounds/new", function(req, res) {
   res.render("campgrounds/new");
});

app.get("/campgrounds/:id", function(req, res) {
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            console.log(foundCampground);
            res.render("campgrounds/show", {campground: foundCampground})            
        }
    });
});



// =========================================================
// COMMENTS ROUTES
// =========================================================
app.get("/campgrounds/:id/comments/new", function(req, res) {
    
    Campground.findById(req.params.id,function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            res.render("comments/new", {campground: campground});
        }
    });
});

app.post("/campgrounds/:id/comments", function(req, res) {
    
    Campground.findById(req.params.id,function(err, campground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            Comment.create(req.body.comment, function(err, comment){
                if (err){
                    console.log(err);
                } else {
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/" + campground._id);
                }
            });
            res.render("comments/new", {campground: campground});
        }
    });
})

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("YelpCamp Server has started!");
})