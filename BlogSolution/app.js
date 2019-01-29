var express         = require("express"),
    methodOverride  = require("method-override"),
    expressSanitizer = require("express-sanitizer"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose");

//App config
mongoose.connect("mongodb://localhost/restful_blog_app");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(expressSanitizer());

// Mongoose/model config
var blogSchema = new mongoose.Schema({
   title: String,
   image: String,
   body: String,
   created: {type: Date, default: Date.now}
});

var Blog = mongoose.model("Blog", blogSchema);

//RESTful Routes
app.get("/", function(req, res) {
    res.redirect("/blogs");    
});

// Index
app.get("/blogs", function(req, res){
    Blog.find({}, function(err, blogs){
         if (err) {
             console.log("Error!");
         } else {
             res.render("index", {blogs: blogs});         
         }
     });
});

// New
app.get("/blogs/new", function(req, res){
     res.render("new");         
});

// Create
app.post("/blogs", function(req, res){
    // create blog
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.create(req.body.blog, function(err, newBlog){
        if (err){
          res.render("new");
        } else {
            res.redirect("/blogs");
        }
    });
});

//Show
app.get("/blogs/:id", function(req, res){
     Blog.findById(req.params.id, function(err, foundBlog){
         if(err){
             res.redirect("/blogs");
         } else {
             res.render("show", {blog: foundBlog});
         }
     });    
});

// Edit
app.get("/blogs/:id/edit", function(req, res){
    Blog.findById(req.params.id, function(err, foundBlog){
         if(err){
             res.redirect("/blogs");
         } else {
             res.render("edit", {blog: foundBlog});
         }
     });     
});

// Update
app.put("/blogs/:id", function(req, res){
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
        if(err){
            res.redirect("/blogs");    
        } else {
            res.redirect("/blogs/" + req.params.id);
        }
    });
});

// Destroy
app.delete("/blogs/:id", function(req, res){
    Blog.findByIdAndRemove(req.params.id, function(err){
       if (err){
           res.redirect("/blogs")
       } else {
           res.redirect("/blogs")
       }
    });
});


// Etc
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server is running.");
});

