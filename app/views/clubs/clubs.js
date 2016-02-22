'use strict';

var page = require("ui/page");
var view = require("ui/core/view");
var loader = require("nativescript-loading-indicator");

var dialogs = require("ui/dialogs");
var services = require('../../services');
var geolocation = require("nativescript-geolocation");
var vm = require('./clubs-view-model')
    .create(services);
var ObservableArray = require('data/observable-array').ObservableArray;
var gestures = require("ui/gestures");
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
    if (page.android) {
        var layout = view.getViewById(page, "removeAutoFocus").android;
        layout.setFocusableInTouchMode(true);
        layout.setFocusable(true);
        searchBar.android.clearFocus();
    }

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

function enableLocation() {
    if (!geolocation.isEnabled()) {
        geolocation.enableLocationRequest();
    }
}


function refreshTap(args) {
    var listView = view.getViewById(page, "clubsListView");
    // ~~~~~~~~~~~~~~~~ ~~~~~~~~~~~~~~~~~ ~~~~~~~~~~~~~~~~~~ MUST UNCOMMENT THIS
    // if (!geolocation.isEnabled()) {
    //     dialogs.alert({
    //         title: globalConstants.noGPSTitle,
    //         message: globalConstants.noGPSMessage,
    //         okButtonText: globalConstants.OKButtonText
    //     }).then(function() {
    //         enableLocation();
    //     });

    //     return;
    // }

    if (!connection.isEnabled) {
        notifier.notify(globalConstants.noConnectionTitle, globalConstants.noConnectionMessage);
        return;
    }

    if (vm.clubs.length !== 0) {
        refreshClubInRange();
        return;
    }

    dialogs.alert({
        title: globalConstants.willStartWorkingWithDataTitle,
        message: globalConstants.fetchingClubsFromServerMessage,
        okButtonText: globalConstants.OKButtonText
    }).then(function() {
        loader.show();
        requester.get(globalConstants.baseUrl + "api/Clubs/All")
            .then(function(resultClubs) {
                for (var i = 0; i < resultClubs.length; i++) {
                    var clubToAdd = resultClubs[i];
                    vm.clubs.push(clubToAdd);
                    vm.clubsToVisualize.push(clubToAdd);
                }

                listView.refresh();

                loader.hide();
                refreshClubInRange();
            })
            .catch(function(err) {
                console.log("SOMETHING BAD FROM UPDATE CLUBS");
                console.log(err);
                loader.hide();
                notifier.notify(globalConstants.somethingBadHappenedTitle, globalConstants.somethingBadHappenedMessage);
            });
    });
}

function refreshClubInRange() {
    var nearestClub = null;
    var nearestClubDistance = null;
    vm.clubs.forEach(function(club) {
        var currentClubLocation = {
            latitude: club.Location.Latitude,
            longitude: club.Location.Longitude
        };

        var loc = currentClubLocation;

        var distance = geolocation.distance(currentClubLocation, loc);
        if (distance < globalConstants.rangeForClubsInMeters &&
            nearestClubDistance === null) {
            nearestClub = club;
            nearestClubDistance = distance;
            return;
        }

        if (distance < globalConstants.rangeForClubsInMeters &&
            distance < nearestClubDistance) {
            nearestClub = club;
            nearestClubDistance = distance;
        }
    });

    vm.currentClub.splice(0);
    if (nearestClub === null) {
        vm.currentClub.push({
            clubId: 0,
            clubImage: globalConstants.defaultNoClubImageUrl,
            clubName: globalConstants.noClubAvailableText
        });

        return;
    }

    vm.currentClub.push({
        clubId: nearestClub.Id,
        clubImage: nearestClub.ProfilePicUrl,
        clubName: nearestClub.Name
    });

    var currentClubListView = view.getViewById(page, "currentClubListView");
    currentClubListView.refresh();

    return;

    dialogs.alert({
        title: globalConstants.willStartWorkingWithDataTitle,
        message: globalConstants.updatingCurrentClubPositionMessage,
        okButtonText: globalConstants.OKButtonText
    }).then(function() {
        loader.show();
        geolocation.getCurrentLocation({
                desiredAccuracy: 3,
                updateDistance: 10,
                maximumAge: 3000,
                timeout: 99999
            }).then(function(loc) {
                if (loc) {
                    console.log("LAT: " + loc.latitude);
                    console.log("LONG: " + loc.longitude);
                    for (var i = 0; i < vm.clubs.length; i++) {
                        var currentClub = vm.clubs[i];
                        var currentClubLocation = {
                            latitude: currentClub.Location.Latitude,
                            longitude: currentClub.Location.Longitude
                        };

                        if (geolocation.distance(currentClubLocation, loc) < 200) {
                            vm.clubId = currentClub.Id;
                            vm.clubImage = currentClub.ProfilePicUrl;
                            vm.clubText = currentClub.Name;

                            console.dir("res : " + currentClub);
                            break;
                        }
                    }
                }

                loader.hide();
            })
            .catch(function(err) {
                console.log("THROWS ERR FROM REFRESH CLUB");
                loader.hide();
                notifier.notify(globalConstants.somethingBadHappenedTitle, globalConstants.somethingBadHappenedMessage);
            });
    }, function(e) {
        loader.hide();
        notifier.notify(globalConstants.somethingBadHappenedTitle, globalConstants.somethingBadHappenedMessage);
    });
}

function clubTap() {
    if (vm.currentClub.getItem(0).clubId === 0) {
        notifier.notify(globalConstants.noClubAvailableTitle, globalConstants.noClubAvailableMessage);
        return;
    }

    navigate.navigateAnimated("./views/clubDetails/clubDetails", vm.currentClub.getItem(0));
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
