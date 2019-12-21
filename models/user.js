/*
File: user.js
Authors: Harsh Patel, Matthew Braden
Last Edited: November 24, 2019
Version: 1.0
*/

//require mongoose and passport for authentication purposes
var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

//make user schema
var UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  fName: String,
  lName: String,
  email: String
});

//set authentication to user schema to save password as a hash
UserSchema.plugin(passportLocalMongoose);

//export User schema to be used in other files
module.exports = mongoose.model("User", UserSchema);
