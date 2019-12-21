/*
File: Seacrh.js
Authors: Harsh Patel, Matthew Braden
Last Edited: October 18, 2019
Version: 2.0
*/

//Initialize Google Autocomplete
function init() {
  var input = document.getElementById('Search');
  var autocomplete = new google.maps.places.Autocomplete(input);
}
google.maps.event.addDomListener(window, 'load', init);


//initializes side nav
$(document).ready(function() {
  $('.sidenav').sidenav();
});

//initializes form options
$(document).ready(function() {
  $('select').formSelect();
});

//initialize tooltip informing user of geolocation
$(document).ready(function(){
  $('.tooltipped').tooltip({position: 'bottom', exitDelay: 3000});
  $( ".tooltipped" ).tooltip("open");
  $( ".tooltipped" ).tooltip("close");

});

//placeholder for seach input
var placehold = document.getElementById('placehold');

//get geolocation of user using HTML5 Geolocation services
$("#getLoc").click(function(){
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showLocation);
  } else {
    swal("Geolocation is not supported by this browser.");
  }
});

//remove placeholder and input geolocations latitude longitude of user into seacrh input
function showLocation(position) {
  $("#Search").val("Lat: " + position.coords.latitude + " Long: " + position.coords.longitude);
  placehold.parentNode.removeChild(placehold);

}
