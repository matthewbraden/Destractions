/*
File: IndividualObject.js
Authors: Harsh Patel, Matthew Braden
Last Edited: November 18, 2019
Version: 3.0
*/

//Initializes Side Nav
$(document).ready(function() {
  $('.sidenav').sidenav();
});

//initializes form options
$(document).ready(function() {
  $('select').formSelect();
});

//Initializes Collapsible
$(document).ready(function() {
  $('.collapsible').collapsible();
});

//Initializes textarea auto resize
$('#textarea1').val();
M.textareaAutoResize($('#textarea1'));

//Initializes modal
$(document).ready(function() {
  $('.modal').modal();
});

//Get username and password input fields
var comments = $("#textarea1");
var author = $("#author");
var ratings = $("#ratingStar");

//stroing errors in validation
errors = [];

//check if any input fields are empty
function checkEmpty() {
  if (comments.val() === null || comments.val() === "") {
    errors.push("The comments field is empty.");
  }
  if (author.val() === null || author.val() === "") {
    errors.push("The author field is empty.");
  }
  if (ratings.val() === null || ratings.val() === "") {
    errors.push("The ratings field is empty.");
  }
}

//Check authentication when submit is clicked
$('#comment-form').submit(function(e) {
  var form = this;
  checkEmpty();
  //check if there are any errors or jump to else loop and submit form
  if (errors.length > 0) {
    //prevent form from submitting
    e.preventDefault();
    //error message with possible errors in form validation
    swal("Comment Failed!", "Problems with Inputted Information:\n" + errors.join('\n'), "error");
    //set errors list to empty
    errors = [];
  } else {
    //inform user authentication and validation was Successful then submit form and redirect to search.html
    //(For future when we need to authenicate users but for now check validation)
    form.submit();
  }
});

//delete form confirmation
$('#delete_form').submit(function(e) {
  var form = this;
  e.preventDefault();
  swal({
    title: "Are you sure?",
    text: "Once deleted, you will not be able to recover this Landmark!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then(function(willDelete) {
    if (willDelete) {
      form.submit();
    } else {
      swal("Not Deleted!");
    }
  });

});
