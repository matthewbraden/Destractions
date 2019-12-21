/*
File: attraction.js
Authors: Harsh Patel, Matthew Braden
Last Edited: November 24, 2019
Version: 1.0
*/

//require mongoose
var mongoose = require("mongoose");

//make the landmark schema with the appropriate information to store
var landmarkSchema = new mongoose.Schema({
  name: String,
  img: String,
  descrip: String,
  latitude: Number,
  longitude: Number,
  address: String,
  rating: [],
  average: Number,
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId, //type mongoose Id
      ref: "User" //with reference to user model
    },
    username: String
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId, //array of comment ID's
      ref: "Comment" //Name of the model
    }
  ]
});

//export Schema to be used in other files
module.exports = mongoose.model("Attraction", landmarkSchema);
