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
    var test="https://maps.googleapis.com/maps/api/directions/json?origin=13.0851998,80.2421413&destination=13.0408454,80.23";
    console.log(test);
   // var data = file_get_contents('https://maps.googleapis.com/maps/api/directions/json?origin=13.0851998,80.2421413&destination=13.0408454,80.23');
    //console.log(data);
    
    $.get('https://maps.googleapis.com/maps/api/directions/json?origin=13.0408454,80.2346172&destination=13.0408454,80.23', function(data) {
         console.log(data);
         console.log(data.routes[0].legs[0].steps);
        var steps=data.routes[0].legs[0].steps;
        var stepByStep ="|13.0408454,80.2346172";
        for(var i=0;i<steps.length;i++) {
            console.log()
            stepByStep =stepByStep +"|"+ steps[i].end_location.lat+','+steps[i].end_location.lng
        }
        //stepByStep=stepByStep +"|"+"13.0408454,80.23";
       // $("#myimage").attr('src','https://maps.googleapis.com/maps/api/staticmap?&size=300x300&maptype=roadmap&markers=color:blue%7Clabel:A%7C13.0408454,80.2346172&markers=color:green%7Clabel:B%7C13.0408454,80.23&markers=color:red%7Clabel:C%7C13.0408454,80.237&path=color:0x0000ff|weight:5'+stepByStep);
        
    });
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
    myApp.alert('Here comes test click');
    launchnavigator.isAppAvailable(launchnavigator.APP.GOOGLE_MAPS, function(isAvailable){
        var app;
        //myApp.alert('isAvailable');
       // myApp.alert(isAvailable);
        if(isAvailable){
            app = launchnavigator.APP.GOOGLE_MAPS;
        }else{
            console.warn("Google Maps not available - falling back to user selection");
            app = launchnavigator.APP.USER_SELECT;
        }
        launchnavigator.navigate([13.0408454,80.23], {
            app: app,
            start: "13.0408454,80.2346172"
        });
    });
})


$$(document).on('click', '#test_1', function (e) {
    myApp.alert('Here comes test click');
    launchnavigator.isAppAvailable(launchnavigator.APP.GOOGLE_MAPS, function(isAvailable){
        var app;
        //myApp.alert('isAvailable');
       // myApp.alert(isAvailable);
        if(!isAvailable){
            app = launchnavigator.APP.GOOGLE_MAPS;
        }else{
            myApp.alert('else');
            console.warn("Google Maps not available - falling back to user selection");
          //  app = launchnavigator.APP.USER_SELECT;
            window.open('https://www.google.com/maps/dir/13.0408454,80.2346172/13.0408454,80.23');
        }
       /* launchnavigator.navigate([13.0408454,80.23], {
            app: app,
            start: "13.0408454,80.2346172"
        });*/
    });
})