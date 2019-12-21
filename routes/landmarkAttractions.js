/*
File: landmarkAttractions.js
Authors: Harsh Patel, Matthew Braden
Last Edited: November 24, 2019
Version: 1.0
*/

//require express
var express = require("express");
//require router
var router = express.Router();
//require mongoose models of Attraction for mongodb
var Attraction = require("../models/attraction");
//Geocoder from google with node.js
var NodeGeocoder = require("node-geocoder");

//Geocoder API and information
var options = {
  provider: 'google',
  httpAdapter: 'https',
  apiKey: process.env.GEOCODER_API_KEY,
  formatter: null
};

//initialize geocoder
var geocoder = NodeGeocoder(options);

//landmarkObjects route - Show attractions based on search filters
router.get("/landmarkObjects", function(req, res) {
  //variable display message if no queries returned
  var noMatch = null;
  //logic for query search by name
  if (req.query.Search) {
    //regex match
    var regex = new RegExp(escapeRegex(req.query.Search), 'gi');
    //Filter by Name
    Attraction.find({name: regex}, function(err, allAttractions) {
      if (err) {
        console.log(err);
      } else {
        //if no queries returned from name then search by location
        if(allAttractions.length < 1){
          //filter by location
          Attraction.find({address: regex}, function(err, allAttractions) {
            if (err) {
              console.log(err);
            } else {
              //if no results found then make noMatch equal to error message else just render
              if(allAttractions.length < 1){
                noMatch = "no attractions or landmarks found as a result of this search query. Please try a different search.";
              }
              //render the page with the appropriate results
              res.render("landmarkObjects.ejs", {
                attractions: allAttractions,
                noMatch: noMatch
              });
            }
          });
        } else{ //else just render
          res.render("landmarkObjects.ejs", {
            attractions: allAttractions,
            noMatch: noMatch
          });
        }
      }
    });
    //if search bar is not chosen then check if ratings dropdown was chosen by user
  } else if (req.query.starpicker) {
    // Finds the rating searched for
    var rating = parseInt(req.query.starpicker);
    // Finds all attractions with ratings greater or equal
    Attraction.find({'average': {$gte: rating}}, function(err, allAttractions){
      if(err){
        console.log(err);
      } else{
        if(allAttractions.length < 1){
          noMatch = "no attractions or landmarks found as a result of this search query. Please try a different search.";
        }
        res.render("landmarkObjects.ejs", {
          attractions: allAttractions,
          noMatch: noMatch
        });
      }
    });
    //else render all of the attractions if search bar was not filled in or ratings was not filled in
  } else {
    Attraction.find({}, function(err, allAttractions) {
      if (err) {
        console.log(err);
      } else {
        if(allAttractions.length < 1){
          noMatch = "no attractions or landmarks in database.";
        }
        res.render("landmarkObjects.ejs", {
          attractions: allAttractions,
          noMatch: noMatch
        });
      }
    });
  }
});

//CREATE NEW ATTRACTIONS OR LANDMARKS
router.post("/landmarkObjects", isLoggedIn, function(req, res) {
  var name = req.body.Name; //needs to match the name field on input box in HTML
  var image = req.body.Image;
  var description = req.body.Description;
  var location = req.body.location;
  var author = {
    id: req.user._id,
    username: req.user.username
  };
  //geocode the longitude and latitude points based on address
  geocoder.geocode(location, function(err, data){
    if(err){
      res.redirect("/upload");
    }else{
      var latitude = data[0].latitude;
      var longitude = data[0].longitude;
      var newObject = {
        name: name,
        img: image,
        descrip: description,
        latitude: latitude,
        longitude: longitude,
        address: location,
        author: author
      };
      Attraction.create(newObject, function(err, newlyCreated) {
        if (err) {
          console.log(err);
        } else {
          res.redirect("/landmarkObjects");
        }
      });
    }
  });
});

//Individual Landmarks pages
router.get("/IndividualObject/:id", function(req, res) {
  //.populate will find the comments in the comments table with comment id and populate the comment section of attraction with author and text for that comment
  Attraction.findById(req.params.id).populate("comments").exec(function(err, foundAttraction) {
    if (err) {
      console.log(err);
    } else {
      res.render("IndividualObject.ejs", {
        attraction: foundAttraction
      });
    }
  });
});

//FORM TO CREATE NEW OBJECT only for logged in users
router.get("/upload", isLoggedIn, function(req, res) {
  res.render("upload.ejs");
});

router.post("/IndividualObject/:id/del", checkCampgroundOwnership, function(req, res){
  Attraction.findByIdAndRemove(req.params.id, function(err){
    if(err){
      res.redirect("/landmarkObjects");
    } else{
      res.redirect("/landmarkObjects");
    }
  });
});

//check if user is logged in, authenticate, else redirect to login
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

// This function was found at https://stackoverflow.com/questions/38421664/fuzzy-searching-with-mongodb
function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

//Checking Attraction ownership to delete_form
function checkCampgroundOwnership(req, res, next){
  if (req.isAuthenticated()){
        Attraction.findById(req.params.id, function(err, foundAttraction){
            if (err) {
                res.redirect("/landmarkObjects");
            }
            else {
                if (foundAttraction.author.id.equals(req.user._id)) {
                    next();
                }
                else {
                    res.redirect("/landmarkObjects");
                }
            }
        });
    }
    else {
        res.redirect("/landmarkObjects");
    }
}

//export all routers
module.exports = router;
