const app = {};
// Location results array is populated inside the location details, here we call it

let lodgingID = null;
let lodgingID2 = null;
let campingID = null;
let campingID2 = null;
let restaurantID = null;
let restaurantID2 = null;



app.locationResults = [];
console.log(app.locationResults);
// console.log(app.locationResults);
// We can design the restaurant results to work exactly like the location results
// app.restaurants = [];
app.init = function () {
    
    app.events();
    // app.getLodgingID();
    // app.getCampgroundID();
    // app.getRestaurantID();
};

$(function(){
    app.init();
    // $('#title').hide();
});


// Setup landing page with button to initialize the app

    // build form1 - with options presented to the user with where they want to go on their trip

// Choose from 3 options

    // Create budget form with 2 - one cheaper and one a little more pricey

// Give the user an option of camping or staying at a hotel

// Take user inputs and contact the API to request data for accomodation request and restaurants


    // First API Request - places - textsearch
        // Grab name and place_id and store to variable

        // use name:, permanently_closed and formatted_address to filter out closed businesses and places like McDonalds
        // Grab top two results and save them to a variable 

    // Second API Request - places - place/details
        // Take place id to get information we want to display
        // Grab phone, address, website
    

// Display the top two results provided by the API to the user
                // Cannot search by rating or price level within the API
    // Create a sorting function to loop through array and order by rating
    // The user then selects their choice


// Then provide a map to the user for their destination 
    // if possible display directions



// Reveal options - 2 sets 

app.events = function () {

    // First Page -- choose a city
    
    $('#wasaga').on('click', function(e){
        e.preventDefault();
        const latLon = '44.523674, -80.015939';
        app.getLodgingID(latLon);
        app.getCampgroundID(latLon);
        app.getRestaurantID(latLon);
        // console.log(latLon);
        $('.page1').fadeOut('slow', function (){
            $('.page2').fadeIn('slow', function (){

            });
        });
    });
    $('#sauble').on('click', function(e){
        e.preventDefault();
        const latLon = '44.637599, -81.265622';
        app.getLodgingID(latLon);
        app.getCampgroundID(latLon);
        app.getRestaurantID(latLon);
        $('.page1').fadeOut('slow', function () {
            $('.page2').fadeIn('slow', function () {

            });
        });
        // console.log(latLon);

    });
    $('#tobermory').on('click', function(e){
        e.preventDefault();
        const latLon = '45.255908, -81.664490';
        app.getLodgingID(latLon);
        app.getCampgroundID(latLon);
        app.getRestaurantID(latLon);
        $('.page1').fadeOut('slow', function () {
            $('.page2').fadeIn('slow', function () {

            });
        });
        // console.log(latLon);
    });
    
    // Second Page choose camping or hotel
    

    $('.sleepChoice').on('click', function(e){
        e.preventDefault();
        const choice = this.id;   
        // console.log(this);        
        if (choice === 'camping') {
            // console.log(choice);
            // app.locationDetails(campingID);
            app.locationDetails(campingID);
            app.locationDetails(campingID2);
            app.locationDetails(restaurantID);
            app.locationDetails(restaurantID2);
            console.log(campingID, campingID2, restaurantID, restaurantID2);
        } else {    
            app.locationDetails(lodgingID);
            app.locationDetails(lodgingID2);
            app.locationDetails(restaurantID);
            app.locationDetails(restaurantID2);
            console.log(lodgingID, lodgingID2, restaurantID, restaurantID2);
        }
        $('.page2').fadeOut('slow', function () {
            $('.page3').fadeIn('slow', function () {

            });
        });
    });
};

app.displayResults = function () {
    // We have created a forEach loop to iterate through the location results array, populated in locationResults and defined globally above
    app.locationResults.forEach(function (location, index) {
        // console.log(location);
        
        // Here we defined these variables a second time to keep the code consistent because they are limited in scope to the functions they were defined in
        const locationName = location.name;
        const locationAddress = location.formatted_address;
        const locationWebsite = location.website;
        const locationPhone = location.international_phone_number;
        
        // This creates the text inside the elements in the index.html to display our results for the user
        $(`#name${index + 1}`).text(`${locationName}`);
        $(`#address${index + 1}`).text(`${locationAddress}`);
        $(`#website${index + 1}`).text(`${locationWebsite}`);
        $(`#phone${index + 1}`).text(`${locationPhone}`);
    }) 
};

// Performing an AJAX request to obtain hotels in Wasaga Beach.
app.getLodgingID = function (location) {
    $.ajax({
        url: 'http://proxy.hackeryou.com',
        dataType: 'json',
        method: 'GET',
        data: {
            reqUrl: 'https://maps.googleapis.com/maps/api/place/textsearch/json',
            params: {
                key: 'AIzaSyAjM2iAW0ZIFyotMj1JJV53Inq595q54kw',
                location: location,
                type: 'lodging',
                rating: 1
            },
            proxyHeaders: {
                'Some-Header': 'goes here'
            },
            xmlToJSON: false,
            useCache: false
        }
    }).then(function (res) {
        // Storing the results from our API requests into apiResults using key/value of type:lodging(apiResults.results[0].name/formatted_address/place_id)
        const lodgingResults = res;
        lodgingID = (lodgingResults.results[0].place_id);
        lodgingID2 = (lodgingResults.results[1].place_id);
    });
};

// Performing API Request for campgrounds in Wasaga beach using key/value of type: campground (apiResults.results[0].name/formatted_address/place_id)
app.getCampgroundID = function (location) {
    $.ajax({
        url: 'http://proxy.hackeryou.com',
        dataType: 'json',
        method: 'GET',
        data: {
            reqUrl: 'https://maps.googleapis.com/maps/api/place/textsearch/json',
            params: {
                key: 'AIzaSyAjM2iAW0ZIFyotMj1JJV53Inq595q54kw',
                location: location,
                type: 'campground',
                rating: 4
            },
            proxyHeaders: {
                'Some-Header': 'goes here'
            },
            xmlToJSON: false,
            useCache: false
        }
    }).then(function (res) {
        const campingResults = res;
        // console.log(campingResults);
        // console.log(campingID);
        campingID = (campingResults.results[0].place_id);

        
        campingID2 = (campingResults.results[1].place_id);
    });
};

app.getRestaurantID = function (location) {
    $.ajax({
        url: 'http://proxy.hackeryou.com',
        dataType: 'json',
        method: 'GET',
        data: {
            reqUrl: 'https://maps.googleapis.com/maps/api/place/textsearch/json',
            params: {
                key: 'AIzaSyAjM2iAW0ZIFyotMj1JJV53Inq595q54kw',
                location: location,
                type: 'restaurant',
                rating: 4
            },
            proxyHeaders: {
                'Some-Header': 'goes here'
            },
            xmlToJSON: false,
            useCache: false
        }
    }).then(function (res) {
        const restaurantResults = res;
        // console.log(apiResults);
        restaurantID = restaurantResults.results[0].place_id;
        restaurantID2 = (restaurantResults.results[1].place_id);
    });
};

// Performing an API request from the google place details library to obtain the name, phone number, website
app.locationDetails = function (placeid) {
    $.ajax({
        url: 'http://proxy.hackeryou.com',
        dataType: 'json',
        method: 'GET',
        data: {
            reqUrl: 'https://maps.googleapis.com/maps/api/place/details/json',
            params: {
                key: 'AIzaSyAjM2iAW0ZIFyotMj1JJV53Inq595q54kw',
                placeid: placeid
            },
            proxyHeaders: {
                'Some-Header': 'goes here'
            },
            xmlToJSON: false,
            useCache: false
        }
    }).then(function (res) {
        // const apiResults = res;
        // console.log(res);
        app.locationResults.push(res.result);

        app.displayResults();
        console.log(displayResults);

    });
}
