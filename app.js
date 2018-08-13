// jQuery(document).ready(function ($) {
//     $('#submitUserChoice').on('click', function () {
//         $('#coin').show();
//         var flipResult = Math.random();
//         $('#coin').removeClass();
//         setTimeout(function () {
//             if (flipResult <= 0.5) {
//                 $('#coin').addClass('heads');
//                 console.log('it is head');
//             }
//             else {
//                 $('#coin').addClass('tails');
//                 console.log('it is tails');
//             }
//         }, 100);
//     });
// });

$(document).ready(function () {
    // $(".getStarted").on("click", function () {
    //     // showUserForm();
    //     newBackground();
    //     console.log("GET STARTED")
    //     $('#welcomePage').hide();
    //     $('#userChoiceFormTwo').hide();
    //     $('#userChoiceForm').show();
    // })

    /// THIS SECTION SETS BACKGROUNDS RANDOMLY (AND INCLUDES THE OLD PAGE CLEARS)
    var randBG = Math.floor(Math.random() * 12) + 1;
    var newBG = $(".bg").attr("style", "background-image: linear-gradient(to right, rgb(35, 37, 40), transparent 10%,transparent 44%, rgb(35, 37, 40) 48%, rgb(35, 37, 40) 52%, transparent 56%,transparent 90%,rgb(35, 37, 40) 100%), url('assets/images/splice" + randBG + ".jpg');");


    function newRandBG() {
        randBG = Math.floor(Math.random() * 12) + 1;
    }
    function newBackground() {
        newRandBG();
        newBG = $(".bg").attr("style", "background-image: linear-gradient(to right, rgb(35, 37, 40), transparent 10%,transparent 44%, rgb(35, 37, 40) 48%, rgb(35, 37, 40) 52%, transparent 56%,transparent 90%,rgb(35, 37, 40) 100%), url('assets/images/splice" + randBG + ".jpg');");
    }
    function newBackgroundPlain() {
        newRandBG();
        newBG = $(".bg").attr("style", "background-image: linear-gradient(to right, rgb(35, 37, 40), transparent 10%, transparent 90%,rgb(35, 37, 40) 100%), url('assets/images/splice" + randBG + ".jpg');");
    }

    function showUserDecision() {
        event.preventDefault();
        $('#welcomePage').hide();
        $('#userChoiceFormTwo').hide();
        $('#userChoiceForm').hide();
        $('#userResult').show();
        newBG = newBG;
    }


    //food object

    var radius;


    $("#submitZipCode").on("click", function () {
        // showUserDecision();
        event.preventDefault();
        console.log("SUBMIT ZIP")
        $('#welcomePage').hide();
        $('#userChoiceFormTwo').hide();
        $('#userChoiceForm').show();
        newBackground();



        zipCode = $("#zip").val().trim();
        radius = $("#distance").val().trim();
        radius = radius * 1609.344;

        // //populating the array with userinput cuisines
        // var emptyCuisineArray = [];
        // for (var t = 0; t < 5; t++) {
        //     //emptyCuisineArray.push(userChoiceOne)
        //     //emptyCuisineArray.push(userChoiceTwo)
        //     //emptyCuisineArray.push(secondChoiceOne)
        //     //emptyCuisineArray.push(secondChoiceTwo)
        // }



        var google = "https://maps.googleapis.com/maps/api/geocode/json?address=" + zipCode + "&key=AIzaSyA5r_QuTaaCHb-d0DBHlVBzB3rEtHJKt_o";

        //ajax call to get locations latitude and longitude depending on zipcode
        $.ajax({
            url: google,
            method: "GET"
        }).then(function (response) {

            // console.log(response);

            var locationLatitude = response.results[0].geometry.location.lat;
            var locationLongitude = response.results[0].geometry.location.lng;


            //array ofdefault cuisines
            var restaurantArray = ['BBQ', 'Italian', 'Chinese', 'Thai', 'American', 'Seafood', 'Vietnamese', 'Vegetarian', 'Pizza', 'Mexican', 'Indian', 'Desserts'];


            // cuisines near me
            var zomatoCuiNearMe = "https://developers.zomato.com/api/v2.1/cuisines?lat=" + locationLatitude + "&lon=" + locationLongitude + "&apikey=df0e8b14ef12c3734454e5a4082ff386";

            $.ajax({
                url: zomatoCuiNearMe,
                method: "GET"
            }).then(function (response) {

                var emptyRestarauntArray = [];

                //populating an array with the cuisines in my area
                for (var r = 0; r < response.cuisines.length; r++) {
                    if (restaurantArray.includes(response.cuisines[r].cuisine.cuisine_name)) {
                        emptyRestarauntArray.push(response.cuisines[r].cuisine.cuisine_name)
                    }
                }

                for (var t = 0; t < emptyRestarauntArray.length; t++) {
                    var dropDownItem = $("<a>");
                    dropDownItem.addClass("dropdown-item");

                    dropDownItem.html(emptyRestarauntArray[t]);

                    $(".dropdown-menu").append(dropDownItem);
                }
                $('#userChoiceFormTwo').show();

                console.log($(".dropdown-menu :selected").text());
            });

            $("#submitUserChoice").on("click", function () {
                // Code to flip before the decision is made!!
                //debugger;
                $('#coinDisplay').show();
                var flipResult = Math.random();
                $('#coin').removeClass();
                setTimeout(function () {
                    if (flipResult <= 0.5) {
                        $('#coin').addClass('heads');
                    }
                    else {
                        $('#coin').addClass('tails');
                    }
                    
                }, 100);
               
                newBackgroundPlain();
                showUserDecision();

                initMap(locationLatitude, locationLongitude, zipCode, radius);


                //url to the zomato api that gets restaurants near me 
                var zomatoNearMe = "https://developers.zomato.com/api/v2.1/search?entity_type=zone&count=10&lat=" + locationLatitude + "&lon=" + locationLongitude + "&radius=" + radius + ".4&cuisines=" + foodObj.italian + "&apikey=df0e8b14ef12c3734454e5a4082ff386";

                $.ajax({
                    url: zomatoNearMe,
                    method: "GET"
                }).then(function (response) {

                    console.log(response);

                    for (var i = 0; i < 10; i++) {
                        var averageCost = (response.restaurants[i].restaurant.average_cost_for_two);
                        var restaurantId = (response.restaurants[i].restaurant.id);
                        var restaurantCuisines = (response.restaurants[i].restaurant.cuisines);
                        var restaurantName = (response.restaurants[i].restaurant.name);
                        var restaurantMenuUrl = (response.restaurants[i].restaurant.menu_url);
                        var priceRange = (response.restaurants[i].restaurant.price_range);
                        var address = (response.restaurants[i].restaurant.location.address);
                        var latitude = (response.restaurants[i].restaurant.location.latitude);
                        var longitude = (response.restaurants[i].restaurant.location.longitude);
                        var featuredImage = (response.restaurants[i].restaurant.featured_image);
                        var aggregatedRating = (response.restaurants[i].restaurant.user_rating.aggregate_rating);
                        var ratingText = (response.restaurants[i].restaurant.user_rating.rating_text);

                        // console.log(averageCost);
                        // console.log(restaurantId);
                        // console.log(restaurantCuisines);
                        // console.log(restaurantName);
                        // console.log(restaurantMenuUrl);
                        // console.log(priceRange);
                        // console.log(address);
                        // console.log(latitude);
                        // console.log(longitude);
                        // console.log(featuredImage);
                        // console.log(aggregatedRating);
                        // console.log(ratingText);
                        // console.log("END OF RESTAURANT");

                        //review for a certain restaurant with id
                        var zomatoReview = "https://api.zomato.com/v1/reviews.json/" + restaurantId + "/user?count=5&apikey=df0e8b14ef12c3734454e5a4082ff386";

                        $.ajax({
                            url: zomatoReview,
                            method: "GET"
                        }).then(function (response) {
                            // console.log(response);
                        });
                    }
                });

            });

        });

    });
});


//this is where the map is displayed and populated

var foodObj =
{
    BBQ: 193,
    italian: 55,
    chinese: 25,
    thai: 95,
    american: 1,
    seafood: 83,
    vietnamese: 99,
    vegetarian: 308,
    pizza: 82,
    mexican: 73,
    indian: 148,
    desserts: 100
}


function initMap(x, y, zip, rad) {
    // Map options
    var options = {
        zoom: 12,
        center: { lat: x, lng: y }
    }

    // New map
    var map = new google.maps.Map(document.getElementById('map'), options);

    markMap(zip, rad);

    // Add Marker Function
    function addMarker(props) {
        var marker = new google.maps.Marker({
            position: props.coords,
            map: map,
            url: props.url
            //icon:props.iconImage
        });

        // Check content
        if (props.content) {
            var infoWindow = new google.maps.InfoWindow({
                content: props.content
            });

            marker.addListener('mouseover', function () {
                infoWindow.open(map, marker);
            });

            marker.addListener('mouseout', function () {
                infoWindow.close();
            });

            marker.addListener('click', function () {
                window.open(this.url, '_blank');

            });

        }
    }

    function markMap(zip, rad) {
        console.log(zip)
        console.log(rad)
        var google = "https://maps.googleapis.com/maps/api/geocode/json?address=" + zip + "&key=AIzaSyA5r_QuTaaCHb-d0DBHlVBzB3rEtHJKt_o";

        //ajax call to get locations latitude and longitude depending on zipcode
        $.ajax({
            url: google,
            method: "GET"
        }).then(function (response) {

            console.log(response);

            var locationLatitude = response.results[0].geometry.location.lat;
            var locationLongitude = response.results[0].geometry.location.lng;


            //url to the zomato api that gets restaurants near me 
            var zomatoNearMe = "https://developers.zomato.com/api/v2.1/search?entity_type=zone&count=10&lat=" + locationLatitude + "&lon=" + locationLongitude + "&radius=" + rad + ".4&cuisines=" + foodObj.italian + "&apikey=df0e8b14ef12c3734454e5a4082ff386";

            $.ajax({
                url: zomatoNearMe,
                method: "GET"
            }).then(function (response) {

                //array of markers
                var markers = [

                    {
                        coords: { lat: parseFloat(response.restaurants[0].restaurant.location.latitude), lng: parseFloat(response.restaurants[0].restaurant.location.longitude) },
                        content: '<h5>' + response.restaurants[0].restaurant.name + '</h5>',
                        url: response.restaurants[0].restaurant.url
                    },
                    {
                        coords: { lat: parseFloat(response.restaurants[1].restaurant.location.latitude), lng: parseFloat(response.restaurants[1].restaurant.location.longitude) },
                        content: '<h5>' + response.restaurants[1].restaurant.name + '</h5>',
                        url: response.restaurants[1].restaurant.url
                    },
                    {
                        coords: { lat: parseFloat(response.restaurants[2].restaurant.location.latitude), lng: parseFloat(response.restaurants[2].restaurant.location.longitude) },
                        content: '<h5>' + response.restaurants[2].restaurant.name + '</h5>',
                        url: response.restaurants[2].restaurant.url
                    },
                    {
                        coords: { lat: parseFloat(response.restaurants[3].restaurant.location.latitude), lng: parseFloat(response.restaurants[3].restaurant.location.longitude) },
                        content: '<h5>' + response.restaurants[3].restaurant.name + '</h5>',
                        url: response.restaurants[3].restaurant.url
                    },
                    {
                        coords: { lat: parseFloat(response.restaurants[4].restaurant.location.latitude), lng: parseFloat(response.restaurants[4].restaurant.location.longitude) },
                        content: '<h5>' + response.restaurants[4].restaurant.name + '</h5>',
                        url: response.restaurants[4].restaurant.url
                    },
                    {
                        coords: { lat: parseFloat(response.restaurants[5].restaurant.location.latitude), lng: parseFloat(response.restaurants[5].restaurant.location.longitude) },
                        content: '<h5>' + response.restaurants[5].restaurant.name + '</h5>',
                        url: response.restaurants[5].restaurant.url
                    },
                    {
                        coords: { lat: parseFloat(response.restaurants[6].restaurant.location.latitude), lng: parseFloat(response.restaurants[6].restaurant.location.longitude) },
                        content: '<h5>' + response.restaurants[6].restaurant.name + '</h5>',
                        url: response.restaurants[6].restaurant.url

                    },
                    {
                        coords: { lat: parseFloat(response.restaurants[7].restaurant.location.latitude), lng: parseFloat(response.restaurants[7].restaurant.location.longitude) },
                        content: '<h5>' + response.restaurants[7].restaurant.name + '</h5>',
                        url: response.restaurants[7].restaurant.url
                    },
                    {
                        coords: { lat: parseFloat(response.restaurants[8].restaurant.location.latitude), lng: parseFloat(response.restaurants[8].restaurant.location.longitude) },
                        content: '<h5>' + response.restaurants[8].restaurant.name + '</h5>',
                        url: response.restaurants[8].restaurant.url
                    },
                    {
                        coords: { lat: parseFloat(response.restaurants[9].restaurant.location.latitude), lng: parseFloat(response.restaurants[9].restaurant.location.longitude) },
                        content: '<h5>' + response.restaurants[9].restaurant.name + '</h5>',
                        url: response.restaurants[9].restaurant.url
                    }

                ];

                //populating the markers

                for (var i = 0; i < markers.length; i++) {
                    // Add marker
                    addMarker(markers[i]);
                }

            });

        });
    }
}









