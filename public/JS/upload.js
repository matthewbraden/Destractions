/*
File: Upload.js
Authors: Harsh Patel, Matthew Braden
Last Edited: October 18, 2019
Version: 2.0
*/

//Location Autofill with google maps API
function init() {
  var input = document.getElementById('location');
  var autocomplete = new google.maps.places.Autocomplete(input);
}

google.maps.event.addDomListener(window, 'load', init);

$(document).ready(function() {
  swal("Note:", "Latitude and Longitude Points are Optional as we will use the address provided for geolocation.", "info");
});

//Initializes Sidenav
$(document).ready(function() {
  $('.sidenav').sidenav();
});

//Initializes materlize.css forms
$(document).ready(function() {
  $('select').formSelect();
});

//character Counter Initializes
$(document).ready(function() {
  $('input#Name, textarea#textarea2').characterCounter();
});
