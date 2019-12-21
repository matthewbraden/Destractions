/*
File: login.js
Authors: Harsh Patel, Matthew Braden
Last Edited: October 18, 2019
Version: 2.0
*/

//Trigger sidenav
$(document).ready(function() {
  $('.sidenav').sidenav();
});

//trigger materlize.css forms
$(document).ready(function() {
  $('select').formSelect();
});

//Get username and password input fields
var userName = $("#user_Name");
var password = $("#password");

//stroing errors in validation
errors = [];

//check if any input fields are empty
function checkEmpty() {
  if (userName.val() === null || userName.val() === "") {
    errors.push("The userName field is empty.");
  }
  if (password.val() === null || password.val() === "") {
    errors.push("The password field is empty.");
  }
}

//Check authentication when submit is clicked
$('form').submit(function(e) {
  var form = this;
  checkEmpty();
  //check if there are any errors or jump to else loop and submit form
  if (errors.length > 0) {
    //prevent form from submitting
    e.preventDefault();
    //error message with possible errors in form validation
    swal("Login Failed!", "Problems with Inputted Information:\n" + errors.join('\n'), "error");
    //set errors list to empty
    errors = [];
  } else {
    //inform user authentication and validation was Successful then submit form and redirect to search.html
    //(For future when we need to authenicate users but for now check validation)
    form.submit();
  }
});
