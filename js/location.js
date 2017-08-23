// Yummy food places in Indianapolis, IN

var indyLocations = [
    {
        name: 'BJs Restaurant and Brewhouse',
        location: {
            lat: 39.634053,
            lng: -86.121570
        }
    },
    {
        name: 'Dave & Busters',
        location: {
            lat: 39.908253,
            lng: -86.072852
        }
    },
    {
        name: 'King Ribs',
        location: {
            lat: 39.787384,
            lng: -86.212547
        }
    },
    {
        name: 'Red Lobster',
        location: {
            lat: 39.905896,
            lng: -86.056935
        }
    },
    {
        name: 'Ricks Cafe Boatyard',
        location: {
            lat: 39.827694,
            lng: -86.300620
        }
    }
];

var Place = function (placeObj) {

    this.name = ko.observable(placeObj.name);
    this.location = ko.observable(placeObj.location);
    
};