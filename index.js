const app = {};
// Location results array is populated inside the location details, here we call it 
app.locationResults = [];
// We can design the restaurant results to work exactly like the location results
app.restaurants = [];
app.init = function () {
    // app.getLodgingID();
    app.getCampgroundID();
    // app.getRestaurantID();
};

$(function(){
    app.init();
});

const key = number => 
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

app.displayResults = function () {
    // We have created a forEach loop to iterate through the location results array, populated in locationResults and defined globally above
    app.locationResults.forEach(function (location, index) {
        console.log(location);
        
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
                location: '44.523674,-80.015939',
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
        const placeID = (lodgingResults.results[0].place_id);
        app.locationDetails(placeID);
        const placeID2 = (lodgingResults.results[1].place_id);
        app.locationDetails(placeID2);
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
                location: '44.523674,-80.015939',
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
        const campingID = (campingResults.results[0].place_id);
        app.locationDetails(campingID);
        const campingID2 = (campingResults.results[1].place_id);
        app.locationDetails(campingID2);
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
                location: '44.523674,-80.015939',
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

        const restaurantID = restaurantResults.results[0].place_id;
        // console.log(restaurantID);
        app.locationDetails(restaurantID);
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
        console.log(res);
        app.locationResults.push(res.result);

        // console.log(campingName);
        // const campingAddress = res.result.formatted_address;
        // console.log(campingAddress);
        // const campingWebsite = res.result.website;
        // console.log(campingWebsite);
        // const campingPhone = res.result.international_phone_number;
        // console.log(campingPhone);

        app.displayResults();

    });
}
