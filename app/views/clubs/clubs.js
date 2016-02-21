'use strict';

let services = require('../../services');
let view = require("ui/core/view");
let page = require("ui/page");
var geolocation = require("nativescript-geolocation");
let vm = require('./clubs-view-model')
	.create(services);
let navigate = require("../../Helpers/navigator");
let ObservableArray = require('data/observable-array').ObservableArray;


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

	if (geolocation.isEnabled === true) {
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
    geolocation.getCurrentLocation({desiredAccuracy: 3, updateDistance: 10, maximumAge: 3000, timeout: 20000}).
    then(function(loc) {
        if (loc) {
            console.log("latitude + " + loc.latitude + " longitude" + loc.longitude);
        }
    }, function(e){
        console.log("Error: " + e.message);
    });

}

function attachSeachBar() {
	let searchBar = view.getViewById(page, "searchBar");
	searchBar.on('propertyChange', function(args) {
		console.log("Search for " + args.object.text);

		vm.clubsToVisualize.splice(0);
		vm.clubs.forEach(function(c) {
				var index = c.get('name').toLowerCase().indexOf(args.object.text);
			if (index > -1) {
				vm.clubsToVisualize.push(c);
			}
			
		});

		
	console.log(vm.clubs.length);

	//	vm.clubsToVisualize.push(filtered);
	//	console.dir(vm.clubs);
	});
}

function refreshTap(args) {

}

function clubsItemTap(args) {

	let tappedClub = vm.clubs.getItem(args.index);
	console.dir(tappedClub);
	console.log(args.index);
	navigate.navigateAnimated("./views/clubDetails/clubDetails", tappedClub);
}

module.exports = {
	pageLoaded,
	clubsItemTap,
	clubTextTap,
	refreshTap
};