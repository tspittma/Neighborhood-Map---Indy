// My Unique Google Map Key
// var apiKey = 'AIzaSyA5ebPkqVjByODtJ-sYWFTFS_aW6s2Rf44';

// Google Map object creation
// Display set is center
// Code based on Google Maps API documentation for Indianapolis neighborhood
function initMap() {

    var map;

    var indy = new google.maps.LatLng(39.634053, -86.121570);

    // Create the map and zoom in
    // Code based on Google Maps lat/lng object literal and controls documentation
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: {lat: -86, lng: 39},
        disableDefaultUI: true
    });

    // Re-center map upon resizing
    map.addListener('resize', function () {
        map.setCenter(indy);
    });

    return map;
}

// Returns the average of a markers for placess
function getCenter(indyLocations) {

    var lat = 0;
    var lng = 0;

    var size = indyLocations.length;

    indyLocations.forEach(function (place) {
        lat += place.marker.position.lat();
        lng += place.marker.position.lng();
    });

    return new google.maps.LatLng(lat/size, lng/size);
}