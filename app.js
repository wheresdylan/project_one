
//Initialize Firebase:

  var config = {
    apiKey: "AIzaSyDbC3qvRjfbGRJhzUKcHHHG2xaFemji7qI",
    authDomain: "project-one-our-food-decider.firebaseapp.com",
    databaseURL: "https://project-one-our-food-decider.firebaseio.com",
    projectId: "project-one-our-food-decider",
    storageBucket: "project-one-our-food-decider.appspot.com",
    messagingSenderId: "666666151675"
  };
  firebase.initializeApp(config);



//Setting the reference for the firebase database:
var db = firebase.database();



//Setting variables for the user's choice inputs:
    
        var userOneChoiceOne = $("#user1-Choice1");
        var userOneChoiceTwo = $("#user1-Choice2");
        var userTwoChoiceOne = $("#user2-Choice1");
        var userTwoChoiceTwo = $("#user2-Choice2");

// var userOneChoiceOne = "BBQ";
// var userOneChoiceTwo = "chinese";
// var userTwoChoiceOne = "indian";
// var userTwoChoiceTwo = "vegetarian";


//Document ready check
$(document).ready();


//Pushing those values into the firebase database (for now).
$(document).on("click", "#submit", function(){
    console.log("Click worked, should push user values to the db)")
    db.ref().push({
        u1c1: userOneChoiceOne,
        u1c2: userOneChoiceTwo,
        u2c1: userTwoChoiceOne,
        u2c2: userTwoChoiceTwo,
    });
});