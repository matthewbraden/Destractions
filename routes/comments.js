/*
File: comments.js
Authors: Harsh Patel, Matthew Braden
Last Edited: November 24, 2019
Version: 1.0
*/

//Require express and router
var express = require("express");
var router = express.Router();

//Require Attraction and Comment Schemas/model from models folder to user
var Attraction = require("../models/attraction");
var Comment = require("../models/comment");

//Check if user is logged in then proceed to post comment, middleware checks if user is logged in first 
router.post("/IndividualObject/:id", isLoggedIn, function(req, res){
  //find the attraction by id
  Attraction.findById(req.params.id, function(err, attraction){
    if(err){
      console.log(err);
      res.redirect("/landmarkObjects");
    }else{

      //get comment and rating from input
      var text = req.body.userComment;
      var rating = req.body.starRating;

      //push rating into this specific attraction array called ratings
      attraction.rating.push(rating);

      //calculate the average ratings by adding all and dividing by number of ratings present
      var sum = 0;
      for (var i = 0; i < attraction.rating.length; i++) {
        sum += parseInt(attraction.rating[i]);
      }
      var average = sum / attraction.rating.length;
      //store average rating in attraction.rating to one decimal place
      attraction.average = average.toFixed(1);

      //create new comment structure
      var newComment = {
        text: text,
        rating: rating
      };

      //create comment
      Comment.create(newComment, function(err, comment){
        if(err){
          console.log(err);
        }else{
          //set comment author id to user id
          comment.author.id = req.user._id;
          //set comment username to user username
          comment.author.username = req.user.username;
          //must save changes to comment before pushing
          comment.save();
          //push comment to appropriate attraction array called comments
          attraction.comments.push(comment);
          //must save after changes
          attraction.save();
          //redirect back to where comments will be posted
          res.redirect("/IndividualObject/" + attraction._id);
        }
      });
    }
  });
});

//check if user is logged in and proceed to next function else go to the login page
function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/login");
}

module.exports = router;
