/*
File: app.js
Authors: Harsh Patel, Matthew Braden
Last Edited: November 24, 2019
Version: 1.0
*/

require('dotenv').config();
//Require and use express
var express = require("express");
var app = express();
//Require bodyParser to get input values from .ejs files
var bodyParser = require("body-parser");
//Require mongoose mongoDB database
var mongoose = require("mongoose");
//Requrie Scehma code from models files
var Attraction = require("./models/attraction");
var Comment = require("./models/comment");
//Require passport as an user authentication tool
var passport = require("passport");
var LocalStrategy = require("passport-local");
//Require User Schema form models files
var User = require("./models/user");
//Require appropriate routes to render and user functions in main app
var commentRoutes = require("./routes/comments");
var landmarkRoutes = require("./routes/landmarkAttractions");
var indexRoutes = require("./routes/index");

//connect to database
//"mongodb://localhost/destraction"
mongoose.connect("mongodb+srv://admin-harsh:admin-harsh@cluster0-kmz0m.mongodb.net/Destractions?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

//set view engine to .ejs to avoid typing .ejs in render statements
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
  extended: true
}));
//generate static css and javascript files in public folder to use
app.use(express.static(__dirname + "/public"));

//PASSPORT CONFIGURATION
app.use(require("express-session")({
  secret: "This will help encode the passwords for users!",
  resave: false,
  saveUninitialized: false
}));

//initialize and begin passport authentication sessions
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//make logged In User information available to all routes
app.use(function(req, res, next){
  res.locals.currentUser = req.user;
  next(); //move onto next route
});

//User the appropriate routs and their functionalities
app.use(indexRoutes);
app.use(commentRoutes);
app.use(landmarkRoutes);

//Render page on this server
var port = process.env.PORT;
if (port == null || port == ""){
  port = 3000;
}
app.listen(port);
