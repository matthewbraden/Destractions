/*
File: comment.js
Authors: Harsh Patel, Matthew Braden
Last Edited: November 24, 2019
Version: 1.0
*/

//require mongoose
var mongoose = require("mongoose");

//make comments Schema
var commentSchema = mongoose.Schema({
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    username: String
  },
  text: String,
  rating: Number
});

//export comments schema to be used by other files
module.exports = mongoose.model("Comment", commentSchema);
