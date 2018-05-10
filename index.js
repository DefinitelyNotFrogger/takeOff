$(function(){
    app.init();
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
// Wasaga Beach - place search by rating



// Performing an AJAX request to obtain hotels in Wasaga Beach.
$.ajax({
    url: 'http://proxy.hackeryou.com',
    dataType: 'json',
    method: 'GET',
    data: {
        reqUrl: 'https://maps.googleapis.com/maps/api/place/textsearch/json',
        params: {
            key: 'AIzaSyDkC7Jzq5mfFbeQ0sKeUn-j8gtYTsliPT4',
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
    const apiResults = res;
    // console.log(apiResults);
    // console.log(apiResults.results[0].name);
    // console.log(apiResults.results[0].formatted_address);
    // console.log(apiResults.results[0].place_id);
    
});


// Performing API Request for campgrounds in Wasaga beach using key/value of type: campground (apiResults.results[0].name/formatted_address/place_id)
$.ajax({
    url: 'http://proxy.hackeryou.com',
    dataType: 'json',
    method: 'GET',
    data: {
        reqUrl: 'https://maps.googleapis.com/maps/api/place/textsearch/json',
        params: {
            key: 'AIzaSyDkC7Jzq5mfFbeQ0sKeUn-j8gtYTsliPT4',
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
    const apiResults = res;
    console.log(apiResults);
    // console.log(apiResults.results[0].name);
    // console.log(apiResults.results[0].formatted_address);
    // console.log(apiResults.results[0].place_id);
    const campingID = apiResults.results[0].place_id;
    console.log(campingID);

    
});

// Performing an API request from the google place details library to obtain the name, phone number, website
$.ajax({
    url: 'http://proxy.hackeryou.com',
    dataType: 'json',
    method: 'GET',
    data: {
        reqUrl: 'https://maps.googleapis.com/maps/api/place/details/json',
        params: {
            placeid: ''
        },
        proxyHeaders: {
            'Some-Header': 'goes here'
        },
        xmlToJSON: false,
        useCache: false
    }
}).then(function (res) {
    const apiResults = res;
    // console.log(apiResults);
    console.log(apiResults.results[0].name);
    console.log(apiResults.results[0].formatted_address);
    console.log(apiResults.results[0].place_id);
});
// Tobermory - place search by rating
// $.ajax({
//     url: 'http://proxy.hackeryou.com',
//     dataType: 'json',
//     method: 'GET',
//     data: {
//         reqUrl: 'https://maps.googleapis.com/maps/api/place/textsearch/json',
//         params: {
//             key: 'AIzaSyDkC7Jzq5mfFbeQ0sKeUn-j8gtYTsliPT4',
//             location: '45.255908,-81.664490',
//             type: 'restaurant',
//             rating: 5
//         },
//         proxyHeaders: {
//             'Some-Header': 'goes here'
//         },
//         xmlToJSON: false,
//         useCache: false
//     }
// }).then(function (res) {

// });

// // Sauble Beach - place search by rating
// $.ajax({
//     url: 'http://proxy.hackeryou.com',
//     dataType: 'json',
//     method: 'GET',
//     data: {
//         reqUrl: 'https://maps.googleapis.com/maps/api/place/textsearch/json',
//         params: {
//             key: 'AIzaSyDkC7Jzq5mfFbeQ0sKeUn-j8gtYTsliPT4',
//             location: '44.633912,-81.264285',
//             type: 'restaurant',
//             rating: 5
//         },
//         proxyHeaders: {
//             'Some-Header': 'goes here'
//         },
//         xmlToJSON: false,
//         useCache: false
//     }
// }).then(function (res) {

// });

// Sauble Beach - nearby search
// $.ajax({
//     url: 'http://proxy.hackeryou.com',
//     dataType: 'json',
//     method: 'GET',
//     data: {
//         reqUrl: 'https://maps.googleapis.com/maps/api/place/nearbysearch/json',
//         params: {
//             key: 'AIzaSyDkC7Jzq5mfFbeQ0sKeUn-j8gtYTsliPT4',
//             location: '44.633912,-81.264285',
//             radius: 5000
//         },
//         proxyHeaders: {
//             'Some-Header': 'goes here'
//         },
//         xmlToJSON: false,
//         useCache: false
//     }
// }).then(function (res) {

// });

