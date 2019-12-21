/*
File: SignUp.js
Authors: Harsh Patel, Matthew Braden
Last Edited: October 18, 2019
Version: 2.0
*/

//Initializes Sidenav
$(document).ready(function() {
  $('.sidenav').sidenav();
});

//Initializes materlize.css forms
$(document).ready(function() {
  $('select').formSelect();
});

//assign variables to input fields of the form
var fName = $("#first_Name");
var lName = $("#last_Name");
var email = $("#email");
var confirmEmail = $("#confirm_email");
var uName = $("#user_Name");
var password = $("#password");
var confirmPassword = $("#password_confirm");
var tourist = $("#tourist");
var tourGuide = $("#tourGuide");

//storing errors in validation
var errors = [];

// patterns used for passwords.
var UpperCaseChars = /[A-Z]/g;
var LowerCaseChars = /[a-z]/g;
var numbers = /[0-9]/g;
var pwLength = 6;

//check if the values of any fields are empty or null
function checkEmpty() {
  if (fName.val() === "" || fName.val() === null) {
    errors.push(" - First Name Field is empty");
  }
  if (lName.val() === "" || lName.val() === null) {
    errors.push(" - Last Name Field is empty");
  }
  if (email.val() === "" || email.val() === null) {
    errors.push(" - Email Field is empty");
  }
  if (confirmEmail.val() === "" || confirmEmail.val() === null) {
    errors.push(" - Confirm Email Field is empty");
  }
  if (uName.val() === "" || uName.val() === null) {
    errors.push(" - User Name Field is empty");
  }
  if (password.val() === "" || password.val() === null) {
    errors.push(" - Password Field is empty");
  }
  if (confirmPassword.val() === "" || confirmPassword.val() === null) {
    errors.push(" - Confirm Password Field is empty");
  }
  if (!(tourGuide.prop('checked') || tourist.prop('checked'))) {
    errors.push(" - Please Select if you are a tourist or tour guide.");
  }
}

//check if email matches correct format
function checkEmail() {
  if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.val()))) {
    errors.push(' - Email invalid format');
  }
}

//check if email matches confirm email field
function confirmE() {
  if ((email.val() !== confirmEmail.val())) {
    errors.push(' - Email confirmation does not match email');
  }
}

//check if password is of correct format
function checkPassword() {
  if (!(password.val().match(UpperCaseChars) &&
      password.val().match(LowerCaseChars) &&
      password.val().match(numbers) &&
      password.val().length >= pwLength)) {
    errors.push(' - Password Invalid. Must include 1 uppercase, 1 lowercase, 1 number, and minimum of 6 characters');
  }
}

//check if confirm password is the same as password field
function confirmPass() {
  if ((password.val() !== confirmPassword.val())) {
    errors.push(' - Password confirmation does not match password');
  }
}

//call form on submit
$('form').submit(function(e) {
  var form = this;
  //check validation conditions
  checkEmpty();
  checkEmail();
  confirmE();
  checkPassword();
  confirmPass();
  //check if there were any errors and alert user else skip to form submission
  if (errors.length > 0) {
    //prevent form from submitting
    e.preventDefault();
    //inform user of validation error in form
    swal("Problems with Inputted Information:\n" + errors.join('\n'));
    //set errors array to empty to check again
    errors = [];
  } else {
    //inform user they are successfully signed up then submit form
      form.submit();
  }
});
