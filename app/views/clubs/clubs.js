'use strict';

var page = require("ui/page");
var view = require("ui/core/view");

var services = require('../../services');
var geolocation = require("nativescript-geolocation");
var vm = require('./clubs-view-model')
    .create(services);
var ObservableArray = require('data/observable-array').ObservableArray;

var navigate = require("../../Helpers/navigator");
var connection = require("../../Helpers/connection");
var notifier = require("../../Helpers/notifier");
var globalConstants = require("../../globalConstants");
var dialogs = require("ui/dialogs");
var requester = require("../../Helpers/requester");

function pageLoaded(args) {
    page = args.object;
    page.bindingContext = vm;
    attachSeachBar();
    setTimeout(function() {
        setCurrentLocationClubText();
    }, 500);
}

function attachSeachBar() {
    let searchBar = view.getViewById(page, "searchBar");
    searchBar.on('propertyChange', function(args) {
        vm.clubsToVisualize.splice(0);
        vm.clubs.forEach(function(c) {
            var index = c.get('name').toLowerCase().indexOf(args.object.text);
            if (index > -1) {
                vm.clubsToVisualize.push(c);
            }

        });
    });
}

function setCurrentLocationClubText() {
    var clubTextLabel = view.getViewById(page, "clubText");
    if (geolocation.isEnabled === true) {
        if (!connection.isEnabled) {
            notifier.notify(globalConstants.noConnectionTitle, globalConstants.noConnectionMessage);
            return;
        }



        // MAKE REQUEST
        // UPDATE CLUB TEXT
    } else {
        //         var clubs;
        //    requester.get(globalConstants.baseUrl + "api/Clubs/All")
        //    .then(function(result) {
        //    	console.log(result);
        //    })
        //    .catch(function(err) {
        //    	console.log(err);
        //    });
        // notifier.notify(globalConstants.noGPSTitle, globalConstants.noGPSMessage);
        //    clubTextLabel.text = globalConstants.tapToTurnGPS;
    }
}

function getLocation() {
    geolocation.getCurrentLocation({ desiredAccuracy: 3, updateDistance: 10, maximumAge: 3000, timeout: 99999 }).
    then(function(loc) {
        if (loc) {
            console.log("latitude + " + loc.latitude + " longitude" + loc.longitude);
        }
    }, function(e) {
        console.log("Error: " + e.message);
    });
}

function currentLocationClubTap() {
    enableLocationTap();
    getLocation();
}

function enableLocationTap() {
    if (!geolocation.isEnabled()) {
        geolocation.enableLocationRequest();
    }
}

function refreshTap(args) {

}

function clubsItemTap(args) {
    let tappedClub = vm.clubs.getItem(args.index);
    navigate.navigateAnimated("./views/clubDetails/clubDetails", tappedClub);
}

module.exports = {
    pageLoaded,
    clubsItemTap,
    currentLocationClubTap,
    refreshTap
};
