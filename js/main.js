// Main map file containing the ViewModel

function init(error) {

    var map = null;

    if (!error) {
        // Map creation
        map = initMap();

    } else {
        console.log($);
        alert('Error loading Google Map. Please refresh the page and try again.');
    }
    // ViewModel creation
    var vM = new ViewModel(indyLocations, map);
    ko.applyBindings(vM);

}

// ViewModel class creation that links models and views
// Code based on Knockout documentation
var ViewModel = function (indyLocations, map) {

        this.shouldShowMessage = ko.observable(false);  

    var self = this;
    
    self.menuState = ko.observable('menu');
    self.navHidden = ko.observable(true);

    self.toggleNav = function() {
        self.menuState(self.menuState() === 'menu' ? 'close menu' : 'menu');
        self.navHidden(!self.navHidden());
    };

    // Knockout observable indyLocations creation
    self.indyLocations = ko.observableArray();

    indyLocations.forEach(function (indpls) {
        self.indyLocations().push(new Place(indpls));
    });

    self.showInputBox = function () {
        self.filterClicked(!self.filterClicked());
    };

    self.indyLocations().forEach(function (indpls) {
        if (map !== null) {
            indpls.marker = new google.maps.Marker({
                position: indpls.location(),
                title: indpls.name()
            });
        }
    });

    // Code that shows markers for places on the map
    self.placeMarkers = function(indyLocations) {
        indyLocations.forEach(function (indpls) {
            indpls.marker.setMap(map);
        });
        if (indyLocations.length > 0) {
            map.setCenter(getCenter(indyLocations));
        }
    };

    self.addEvents = function() {
        self.indyLocations().forEach(function (indpls) {
            indpls.marker.addListener('click', function() {
                self.setHighlightedPlace(indpls);
            });
        });
    };

    if (map !== null) {
        self.placeMarkers(self.indyLocations());
        self.addEvents();
    }

    // Markers for each place is visible upon map launch
    self.visibleIndyLocations = ko.observableArray(self.indyLocations());

    // Filter that allows users to input text based on food places listed
    // Computed observable code based on Knockout documentation
    self.indyLocationsFilter = ko.pureComputed({
        read: function() {
            return "";
        },
        write: function(value) {

            self.visibleIndyLocations([]);

            // Loop through food places based on user input
            // Returns filter results via listing filtered places and map markers
            self.indyLocations().forEach(function (indpls) {
                indpls.marker.setVisible(false);
                if (indpls.name().toLowerCase().includes(value.toLowerCase())) {
                    self.visibleIndyLocations.push(indpls);
                    indpls.marker.setVisible(true);
                }
            });
        },
        owner: self
    });

    self.highlightedPlace = ko.observable({name: ""});

    // Returns a popup info display containing food details
    // Clickable menu link to foursquare website
    self.highlightedPlaceName = ko.observable("");
    self.highlightedPlaceAddress = ko.observable();
    self.highlightedPlacePhone = ko.observable();
    self.highlightedPlaceCheckins = ko.observable();
    self.highlightedPlaceUsers = ko.observable();
    self.highlightedPlaceMenuLink = ko.observable();
    self.highlightedPlaceVenueLink = ko.observable();

    self.setHighlightedPlace = function (indpls) {

        // Halt marker drop
        if (self.highlightedPlace().marker) {
            self.highlightedPlace().marker.setAnimation(null);
        }

        // Returns place details following successful map loads
        if (document.getElementsByClassName('gm-err-container').length === 0) {

            // Focus in on indy location
            // Illustrated via a dropping map marker
            self.highlightedPlace(indpls);
            self.highlightedPlace().marker.setAnimation(google.maps.Animation.DROP);

            // Div - gets the place details
            self.shouldShowMessage(true);

            // Code to keep the map centered
            map.panTo(self.highlightedPlace().marker.getPosition());

            self.getPlaceInfo(indpls);
            
        }
    };

    self.apiSuccess = ko.observable(false);

    self.getPlaceInfo = function (indpls) {

        // Retrieve place details from Foursquare API
        // Source: https://developer.foursquare.com/docs/venues/venues
        // My unique client and secret IDs provided by foursquare
        var url = 'https://api.foursquare.com/v2/venues/search?' +
        'll=' + indpls.location().lat + ', ' + indpls.location().lng +
        '&client_id=UEF3M4MPPV10JNBDLOM4VPOP4TBYCFE02DDJTGPN30CS1VSU' +
        '&client_secret=OZU5WGRA4GONU2YNIGEF3EEZOOIK5VX34GF2WZ4K3YDGFPAB' +
        '&v=20170731' +
        '&limit=1';

        // AJAX Code
        $.ajax(url, {
            success: function (data) {
                if (data.response.venues.length > 0) {
                    self.apiSuccess(true);
                    var venue = data.response.venues[0];
                    self.highlightedPlaceName(venue.name ? venue.name : 'No address found');
                    self.highlightedPlaceAddress(venue.location.address ? venue.location.address : 'No address available');
                    self.highlightedPlacePhone(venue.contact.formattedPhone ? venue.contact.formattedPhone : 'No phone # available');
                    self.highlightedPlaceCheckins(venue.stats.checkinsCount ? venue.stats.checkinsCount : '0');
                    self.highlightedPlaceUsers(venue.stats.usersCount ? venue.stats.usersCount : '0');
                    self.highlightedPlaceMenuLink(venue.hasMenu ?  venue.menu.url : false);
                    self.highlightedPlaceVenueLink('https://foursquare.com/v/' + venue.id);
                } else {
                    self.apiSuccess(false);
                }
            },
            error: function () {
                self.apiSuccess(false);
            }
        });
    };

    self.removeHighlightedPlace = function () {
        self.highlightedPlace().marker.setAnimation(null);
        self.shouldShowMessage(false);
        self.highlightedPlace("");

        map.panTo(getCenter(self.indyLocations()));

    };
};