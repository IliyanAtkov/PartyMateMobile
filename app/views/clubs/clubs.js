'use strict';

var page = require("ui/page");
var view = require("ui/core/view");
var loader = require("nativescript-loading-indicator");

var dialogs = require("ui/dialogs");
//loader.hide();

var services = require('../../services');
var geolocation = require("nativescript-geolocation");
var vm = require('./clubs-view-model')
    .create(services);
var ObservableArray = require('data/observable-array').ObservableArray;

var navigate = require("../../Helpers/navigator");
var connection = require("../../Helpers/connection");
var notifier = require("../../Helpers/notifier");
var globalConstants = require("../../globalConstants");
var requester = require("../../Helpers/requester");

var initialPageLoad = true;

function pageLoaded(args) {
    page = args.object;
    page.bindingContext = vm;
    prepareSeachBar();
    setTimeout(function() {
        if (initialPageLoad) {
        	initialPageLoad = false;
            refreshTap();
        }
    }, 500);
}

function prepareSeachBar() {
    let searchBar = view.getViewById(page, "searchBar");
    searchBar.on('propertyChange', function(args) {
        vm.clubsToVisualize.splice(0);
        vm.clubs.forEach(function(c) {
            var index = c.Name.toLowerCase().indexOf(args.object.text);
            if (index > -1) {
                vm.clubsToVisualize.push(c);
            }
        });
    });
}

function enableLocationTap() {
    if (!geolocation.isEnabled()) {
        geolocation.enableLocationRequest();
    }
}

function refreshTap(args) {
    var listView = view.getViewById(page, "clubsListView");
    if (geolocation.isEnabled === false) {
        notifier.notify(globalConstants.noGPSTitle, globalConstants.noGPSMessage);
        return;
    }

    if (!connection.isEnabled) {
        notifier.notify(globalConstants.noConnectionTitle, globalConstants.noConnectionMessage);
        return;
    }

    loader.show();
    if (vm.clubs.length !== 0) {
        refreshClubsInRange();
        return;
    }

    dialogs.alert({
        title: globalConstants.willStartWorkingWithDataTitle,
        message: globalConstants.fetchingClubsFromServerMessage,
        okButtonText: globalConstants.OKButtonText
    }).then(function() {
        requester.get(globalConstants.baseUrl + "api/Clubs/All")
            .then(function(resultClubs) {
                for (var i = 0; i < resultClubs.length; i++) {
                    var clubToAdd = resultClubs[i];
                    vm.clubs.push(clubToAdd);
                    vm.clubsToVisualize.push(clubToAdd);
                }

                listView.refresh();

                loader.hide(); 
                refreshClubsInRange();
            })
            .catch(function(err) {
                console.log("SOMETHING BAD FROM UPDATE CLUBS");
                console.log(err);
                loader.hide();
                notifier.notify(globalConstants.somethingBadHappenedTitle, globalConstants.somethingBadHappenedMessage);
            });
    });
}

function refreshClubsInRange() {
    dialogs.alert({
        title: globalConstants.willStartWorkingWithDataTitle,
        message: globalConstants.updatingCurrentClubPositionMessage,
        okButtonText: globalConstants.OKButtonText
    }).then(function() {
    	loader.show();
        geolocation.getCurrentLocation({ desiredAccuracy: 3, updateDistance: 10, maximumAge: 3000, timeout: 99999 }).
        then(function(loc) {
            if (loc) {
                var options = {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    data: {
                    	"Latitude": loc.latitude,
                    	"Longitude": loc.longitude
                    }
                };

                requester.post(globalConstants.baseUrl + "api/Clubs/inRange", options)
                    .then(function(result) {
                        loader.hide();
                        if (result !== null) {
                        	vm.clubId = result.Id;
                        	vm.clubImage = result.ProfilePicUrl;
                        	vm.clubText = result.Name;
                        }
                    })
                    .catch(function(err) {
                        console.log("THROWS ERR FROM REFRESH CLUB");
                        loader.hide();
                        notifier.notify(globalConstants.somethingBadHappenedTitle, globalConstants.somethingBadHappenedMessage);
                    });
            }
        }, function(e) {
            loader.hide();
            notifier.notify(globalConstants.somethingBadHappenedTitle, globalConstants.somethingBadHappenedMessage);
        });
    });
}

function clubTap() {
	if (vm.clubId === null) {
		notifier.notify(globalConstants.noClubAvailableTitle, globalConstants.noClubAvailableMessage)
		return;
	}

	navigate.navigateAnimated("./views/clubDetails/clubDetails", vm.clubId);
}

function clubsItemTap(args) {
    let tappedClub = vm.clubs.getItem(args.index);
    navigate.navigateAnimated("./views/clubDetails/clubDetails", tappedClub);
}

module.exports = {
    pageLoaded,
    clubsItemTap,
    clubTap,
    refreshTap
};
