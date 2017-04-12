// Initialize app
var myApp = new Framework7();


// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we want to use dynamic navbar, we need to enable it for this view:
    dynamicNavbar: true
});

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
    console.log("Device is ready!");
});


// Now we need to run the code that will be executed only for About page.

// Option 1. Using page callback for page (for "about" page in this case) (recommended way):
myApp.onPageInit('about', function (page) {
    // Do something here for "about" page
    
})

// Option 2. Using one 'pageInit' event handler for all pages:
$$(document).on('pageInit', function (e) {
    // Get page data from event data
    var page = e.detail.page;

    if (page.name === 'about') {
        // Following code will be executed for page with data-page attribute equal to "about"
        myApp.alert('Here comes About page');
    }
})

// Option 2. Using live 'pageInit' event handlers for each page
$$(document).on('pageInit', '.page[data-page="about"]', function (e) {
    // Following code will be executed for page with data-page attribute equal to "about"
    myApp.alert('Here comes About page');
})

$$(document).on('click', '#test', function (e) {
    var platform = device.platform.toLowerCase();
    var scheme ="";
    if(platform == "android") {
         scheme = 'com.google.android.apps.maps';
    } else if(platform == "ios") {
         scheme = 'maps://';
    } else {
        scheme = 'comgooglemaps';
    }
    
    appAvailability.check(
        scheme,       // URI Scheme or Package Name 
        function() {  // Success callback 
            var addressLongLat = '53.22921909999999,-4.129498000000012';
            if(platform == "android") {
                window.open("geo:"+addressLongLat+"?q="+addressLongLat);
            } else if(platform == "ios") {
                window.open("http://maps.apple.com/?q="+addressLongLat, '_system');
            }
        },
        function() {  // Error callback 
            var addressLongLat = $(this).attr('lat')+','+$(this).attr('lng');
            var addressLongLat = '53.22921909999999,-4.129498000000012';
            window.open("http://maps.google.com/?q="+addressLongLat, '_system');
        }
    );
})

