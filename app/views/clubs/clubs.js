'use strict';

let services = require('../../services');
let view = require("ui/core/view");
let page = require("ui/page");
let frameModule = require('ui/frame');
var geolocation = require("nativescript-geolocation");
let vm = require('./clubs-view-model')
	.create(services);

function pageLoaded(args) {
	page = args.object;
	page.bindingContext = vm;
	attachSeachBar();
	setClubText();
}

function enableLocationTap() {
    if (!geolocation.isEnabled()) {
        geolocation.enableLocationRequest();
    }
}

function setClubText() {
	var clubTextLabel = view.getViewById(page, "clubText");

	if (geolocation.isEnabled == true) {
		if (!clubTextLabel.text) {
			clubTextLabel.text = "You are not in club at the moment";
		}
	}
	else {
		if(!clubTextLabel.text) {
			clubTextLabel.text = "Tap to turn on GPS";
		}
	}
}

function clubTextTap() {
	enableLocationTap();
	getLocation();
}

function getLocation() {
    var location = geolocation.getCurrentLocation({desiredAccuracy: 3, updateDistance: 10, maximumAge: 3000, timeout: 20000}).
    then(function(loc) {
        if (loc) {
            console.log("Current location is: " + loc.latitude);
        }
    }, function(e){
        console.log("Error: " + e.message);
    });
}

function attachSeachBar() {
	let searchBar = view.getViewById(page, "searchBar");
	searchBar.on('propertyChange', function(args) {
		vm.clubs
		console.log("Search for " + args.object.text);
	});
}


function tapped(args) {
	let topmost = frameModule.topmost();
	let tappedClub = vm.clubs[args.index];
	let clubDetails = {
    	moduleName: "./views/clubDetails/clubDetails",
    	context: { tappedClub },
    	animated: true
	};
	topmost.navigate(clubDetails);
}

module.exports = {
	pageLoaded,
	tapped,
	clubTextTap
};