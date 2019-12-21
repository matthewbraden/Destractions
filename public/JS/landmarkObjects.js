/*
File: landmarkObjects.js
Authors: Harsh Patel, Matthew Braden
Last Edited: November 18, 2019
Version: 3.0
*/

//Initializes Side Nav
$(document).ready(function() {
  $('.sidenav').sidenav();
});

//Initializes Tabs
$(document).ready(function() {
  $('ul.tabs').tabs();
});

//Show Note message - IMPORTANT
$(document).ready(function() {
  swal("Note:", "If the map shows a blank map please click the RED MARKER to activate the map. This is a known bug with Google Chrome, but maps should load perfectly on other browsers such as Microsoft Edge or Firefox.", "info");
});
