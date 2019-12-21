/*
File: index.js
Authors: Harsh Patel, Matthew Braden
Last Edited: November 24, 2019
Version: 1.0
*/

//require express and router
var express = require("express");
var router = express.Router();
//require passport for authentication
var passport = require("passport");
//require the User mongoose model
var User = require("../models/user");

//home route
router.get("/", function(req, res) {
  res.render("home.ejs", {currentUser: req.user});
});

//Search Routes
router.get("/search", function(req, res) {
  res.render("search.ejs");
});

//AUTH Routes
router.get("/login", function(req, res) {
  res.render("login.ejs");
});

//sign up route
router.get("/SignUp", function(req, res) {
  res.render("SignUp.ejs");
});

//will handle sign Up logic for authentication and storing password
router.post("/SignUp", function(req, res){
  //get information from input to be inputted into schema
  var newUser = new User({username: req.body.username, fName: req.body.firstName, lName: req.body.lastName, email: req.body.email});
  //register the User and Hash the pssword
  User.register(newUser, req.body.password, function(err, user){
    if(err){
      //if error go back to signup
      console.log(err);
      return res.render("SignUp.ejs");
    } else{
      //authenticate and then redirect to search with the user logged in
      passport.authenticate("local")(req, res, function(){
        res.redirect("/search");
      });
    }
  });
});

//will handle login logic
router.post("/login", passport.authenticate("local",
  {
    //if login successful go to search page else back to login
    successRedirect: "/search",
    failureRedirect: "/login"
   }), function(req, res){

});

//Logout logic
router.get("/logout", function(req, res){
  req.logout();
  res.redirect("/");
});

//check if user is loggedIn and redirect to login if not
function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/login");
}

module.exports = router;
