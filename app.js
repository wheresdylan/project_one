

$(document).ready(function () {

    $(".container").hide();

    //food variables
    var BBQ = 193;
    var italian = 55;
    var chinese = 25;
    var thai = 95;
    var american = 1;
    var seafood = 83;
    var vietnamese = 99;
    var vegetarian = 308;
    var pizza = 82;
    var mexican = 73;
    var indian = 148;
    var desserts = 100;

    //location variables
    var zipCode = 78741;

    var locationLatitude;
    var locationLongitude;

    var radius = 1609.34;

    //restauraunt variables

    var averageCost;
    var restaurantId;
    var restaurantCuisines;
    var restaurantName;
    var restaurantMenuUrl;
    var priceRange;
    var address;
    var latitude;
    var longitude;
    var featuredImage;
    var aggregatedRating;
    var ratingText;


    // //locating the city id
    // var zomatoCityId = "https://developers.zomato.com/api/v2.1/cities?q=glasgow&apikey=b04b207197c3222be87ccd76e5531dbe";

    // $.ajax({
    //     url: zomatoCityId,
    //     method: "GET"
    // }).then(function(response){
    //     console.log(response);
    // });

    //google api
    var google = "https://maps.googleapis.com/maps/api/geocode/json?address=" + zipCode + "&key=AIzaSyA5r_QuTaaCHb-d0DBHlVBzB3rEtHJKt_o";

    //ajax call to get locations latitude and longitude depending on zipcode
    $.ajax({
        url: google,
        method: "GET"
    }).then(function (response) {

        // console.log(response);

        locationLatitude = response.results[0].geometry.location.lat;
        locationLongitude = response.results[0].geometry.location.lng;

        initMap(locationLatitude, locationLongitude);

        //url to the zomato api that gets restaurants near me 
        var zomatoNearMe = "https://developers.zomato.com/api/v2.1/search?entity_type=zone&count=10&lat=" + locationLatitude + "&lon=" + locationLongitude + "&radius=" + radius + ".4&cuisines=" + italian + "&apikey=b04b207197c3222be87ccd76e5531dbe";

        $.ajax({
            url: zomatoNearMe,
            method: "GET"
        }).then(function (response) {
            // console.log(response.restaurants[0].restaurant);

            for (var i = 0; i < 10; i++) {
                averageCost = (response.restaurants[i].restaurant.average_cost_for_two);
                restaurantId = (response.restaurants[i].restaurant.id);
                restaurantCuisines = (response.restaurants[i].restaurant.cuisines);
                restaurantName = (response.restaurants[i].restaurant.name);
                restaurantMenuUrl = (response.restaurants[i].restaurant.menu_url);
                priceRange = (response.restaurants[i].restaurant.price_range);
                address = (response.restaurants[i].restaurant.location.address);
                latitude = (response.restaurants[i].restaurant.location.latitude);
                longitude = (response.restaurants[i].restaurant.location.longitude);
                featuredImage = (response.restaurants[i].restaurant.featured_image);
                aggregatedRating = (response.restaurants[i].restaurant.user_rating.aggregate_rating);
                ratingText = (response.restaurants[i].restaurant.user_rating.rating_text);

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
                var zomatoReview = "https://api.zomato.com/v1/reviews.json/" + restaurantId + "/user?count=5&apikey=b04b207197c3222be87ccd76e5531dbe";

                $.ajax({
                    url: zomatoReview,
                    method: "GET"
                }).then(function (response) {
                    // console.log(response);
                });
            }
        });

    });




    //Cuisines near me with city id and longitude/latitude
    var zomatoCuiNearMe = "https://developers.zomato.com/api/v2.1/cuisines?city_id=7018&lat=48.1970&lon=106.6367&apikey=b04b207197c3222be87ccd76e5531dbe";

    $.ajax({
        url: zomatoCuiNearMe,
        method: "GET"
    }).then(function (response) {
        //  console.log(response);
    });

});


//this is where the map is displayed and populated

var zipCode = 78741;

var locationLatitude;
var locationLongitude;

var radius = 1609.34;

var BBQ = 193;
var italian = 55;
var chinese = 25;
var thai = 95;
var american = 1;
var seafood = 83;
var vietnamese = 99;
var vegetarian = 308;
var pizza = 82;
var mexican = 73;
var indian = 148;
var desserts = 100;


function initMap(x,y) {
    // Map options
    var options = {
        zoom: 10,
        center: { lat: x, lng: y }
    }

    // New map
    var map = new google.maps.Map(document.getElementById('map'), options);

    markMap();

    // Add Marker Function
    function addMarker(props) {
        var marker = new google.maps.Marker({
            position: props.coords,
            map: map,
            //icon:props.iconImage
        });

        // Check content
        if (props.content) {
            var infoWindow = new google.maps.InfoWindow({
                content: props.content
            });

            marker.addListener('click', function () {
                infoWindow.open(map, marker);
            });
        }
    }

    function markMap() {
        var google = "https://maps.googleapis.com/maps/api/geocode/json?address=" + zipCode + "&key=AIzaSyA5r_QuTaaCHb-d0DBHlVBzB3rEtHJKt_o";

        //ajax call to get locations latitude and longitude depending on zipcode
        $.ajax({
            url: google,
            method: "GET"
        }).then(function (response) {

             console.log(response);

            locationLatitude = response.results[0].geometry.location.lat;
            locationLongitude = response.results[0].geometry.location.lng;
            

            //url to the zomato api that gets restaurants near me 
            var zomatoNearMe = "https://developers.zomato.com/api/v2.1/search?entity_type=zone&count=10&lat=" + locationLatitude + "&lon=" + locationLongitude + "&radius=" + radius + ".4&cuisines=" + italian + "&apikey=b04b207197c3222be87ccd76e5531dbe";

            $.ajax({
                url: zomatoNearMe,
                method: "GET"
            }).then(function (response) {

                    //array of markers
                    var markers = [

                        {
                            coords: { lat: parseFloat(response.restaurants[0].restaurant.location.latitude), lng:parseFloat(response.restaurants[0].restaurant.location.longitude) },
                            content: '<h1>' + response.restaurants[0].restaurant.name + '</h1>'
                        },
                        {
                            coords: { lat: parseFloat(response.restaurants[1].restaurant.location.latitude), lng:parseFloat(response.restaurants[1].restaurant.location.longitude) },
                            content: '<h1>' + response.restaurants[1].restaurant.name + '</h1>'
                        },
                        {
                            coords: { lat: parseFloat(response.restaurants[2].restaurant.location.latitude), lng:parseFloat(response.restaurants[2].restaurant.location.longitude) },
                            content: '<h1>' + response.restaurants[2].restaurant.name + '</h1>'
                        },
                        {
                            coords: { lat: parseFloat(response.restaurants[3].restaurant.location.latitude), lng:parseFloat(response.restaurants[3].restaurant.location.longitude) },
                            content: '<h1>' + response.restaurants[3].restaurant.name + '</h1>'
                        },
                        {
                            coords: { lat: parseFloat(response.restaurants[4].restaurant.location.latitude), lng:parseFloat(response.restaurants[4].restaurant.location.longitude) },
                            content: '<h1>' + response.restaurants[4].restaurant.name + '</h1>'
                        },
                        {
                            coords: { lat: parseFloat(response.restaurants[5].restaurant.location.latitude), lng:parseFloat(response.restaurants[5].restaurant.location.longitude) },
                            content: '<h1>' + response.restaurants[5].restaurant.name + '</h1>'
                        },
                        {
                            coords: { lat: parseFloat(response.restaurants[6].restaurant.location.latitude), lng:parseFloat(response.restaurants[6].restaurant.location.longitude) },
                            content: '<h1>' + response.restaurants[6].restaurant.name + '</h1>'
                        },
                        {
                            coords: { lat: parseFloat(response.restaurants[7].restaurant.location.latitude), lng:parseFloat(response.restaurants[7].restaurant.location.longitude) },
                            content: '<h1>' + response.restaurants[7].restaurant.name + '</h1>'
                        },
                        {
                            coords: { lat: parseFloat(response.restaurants[8].restaurant.location.latitude), lng:parseFloat(response.restaurants[8].restaurant.location.longitude) },
                            content: '<h1>' + response.restaurants[8].restaurant.name + '</h1>'
                        },
                        {
                            coords: { lat: parseFloat(response.restaurants[9].restaurant.location.latitude), lng:parseFloat(response.restaurants[9].restaurant.location.longitude) },
                            content: '<h1>' + response.restaurants[9].restaurant.name + '</h1>'
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









