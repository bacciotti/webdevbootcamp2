var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/blog_demo");

// USER
var userSchema = new mongoose.Schema({
    email: String,
    name: String,
    posts: [postSchema]
});

var User = mongoose.model("User", userSchema);

// POST
var postSchema = new mongoose.Schema({
    title: String,
    content: String
});

var postModel = mongoose.model("Post", postSchema);

var newUser = new User({
    email: "hermione@hogwarts.edu",
    name: "Hermione Granger"
});

newUser.posts.push({
   title: "How to troll potions",
   content: "Just Kidding!!!"
});

newUser.save(function(err, user){
    if (err){
        console.log(err);
    } else {
        console.log(user);
    }
})