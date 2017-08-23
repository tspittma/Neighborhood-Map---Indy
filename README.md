## Neighborhood-Map
*Udacity project with knockout JS framework and google maps API.
[link](https://tspittma.github.io/Neighborhood-Map---Indy/)

## Setup
* Clone or [download](https://github.com/cardvark/neighborhood-map-udacity/archive/master.zip) the repo.
* Extract files.

## Run
* Open index.html in browser

## Expected Functionality
* Google map loaded from Maps API.
* Map markers located at Points of Interest (Venues)
* Points of interest data loaded via Foursquare API (image, links, geo location data).
* API errors are handled with warning message at top of page
* Points of Interest markers all present upon page load
* Points of Interest markers can be filtered via a Dropdown filter menu (Locations)
* Page is responsive. Navbar is hidden and toggleable with hamburger when viewing on mobile (screens smaller than 768px width).
* Page is built using Knockout JS.

## Changes
* css file:
	added overflow-y propert to nav to make the list of Indy locations scrollable for better responsiveness
	replaced em font units with responsive font units (vm) to fix the issue of the "Hide Details" text spilling over

* main.js file: 

	removed jQuery statements to get the place details from: 

		document.getElementById('placeInfo').classList.remove('hidden');

	now handled by Knockout.js within the ViewModel variable to get the div place details by adding:
	
		this.shouldShowMessage = ko.observable(false); 

        self.shouldShowMessage(true);

* index.html file - updated div 

	from jQuery handling
	
		<div id="placeInfo" class="hidden">

	to knockout handling

		<div id="placeInfo" data-bind="visible: shouldShowMessage">

* updated indy logo to banner look
* removed all h1 tags from html file except for 1
* removed image style from html; used only css file for styles

## 5 Interesting Locations - Indianapolis, IN - Powered by Foursquare
* BJs Restaurant and Brewhouse - https://foursquare.com/v/bjs-restaurant-and-brewhouse/4b5a4469f964a520bfb828e3
* Dave & Busters - https://foursquare.com/v/dave--busters/4ae3a06df964a5206b9721e3/menu
* King Ribs - https://foursquare.com/v/king-ribs/4b6b03ddf964a520bbec2be3/menu
* Red Lobster - https://foursquare.com/v/red-lobster/4af05b6cf964a5206edb21e3/menu
* Ricks Cafe Boatyard - https://foursquare.com/v/ricks-cafe-boatyard/4ad92541f964a520831821e3

## Attributions
* [Google Maps API](https://developers.google.com/maps/)
* [Foursquare API](https://developer.foursquare.com/)
* [Bootsnipp](http://bootsnipp.com/snippets/featured/admin-side-menu) for responsive navbar.

## Sourcing
* Project Resources - https://github.com/cardvark/neighborhood-map-udacity
* Indy Hoosier Icon - https://pbs.twimg.com/profile_images/451102362581487616/Lcw0Ckk2_normal.png
* Foursquare Logo - https://foursquare.com/
