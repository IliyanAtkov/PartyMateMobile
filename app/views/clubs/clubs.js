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

 var location = undefined;
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
     console.log("SSSSSS");
 }


 function refreshTap(args) {
     var listView = view.getViewById(page, "clubsListView");

     // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ UNCOMMENT THIS
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

 function updateCurrentClub(location) {
     var nearestClub = null;
     var nearestClubDistance = null;
     vm.clubs.forEach(function(club) {
         var currentClubLocation = {
             latitude: club.Location.Latitude,
             longitude: club.Location.Longitude
         };

         var location = currentClubLocation; // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ REMOVE THIS

         var distance = geolocation.distance(currentClubLocation, location);
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
             Id: 0,
             clubImage: globalConstants.defaultNoClubImageUrl,
             clubName: globalConstants.noClubAvailableText
         });

         return;
     }

     vm.currentClub.push({
         Id: nearestClub.Id,
         clubImage: nearestClub.ProfilePicUrl,
         clubName: nearestClub.Name
     });

     var currentClubListView = view.getViewById(page, "currentClubListView");
     currentClubListView.refresh();
 }

 function refreshClubInRange() {

     // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ REMOVE THIS
     updateCurrentClub();
     return;
     // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

     dialogs.alert({
         title: globalConstants.willStartWorkingWithDataTitle,
         message: globalConstants.updatingCurrentClubPositionMessage,
         okButtonText: globalConstants.OKButtonText
     }).then(function() {
         loader.show();
         geolocation.getCurrentLocation({
             desiredAccuracy: 2,
             updateDistance: 10,
             maximumAge: 3000,
             timeout: 99999
         }).then(function(loc) {
             if (loc) {
                 location = loc;
                 updateCurrentClub(loc);
                 loader.hide();
             }
         }).catch(function(err) {
             console.log("THROWS ERR FROM REFRESH CLUB in range");
             console.dir(err);
             loader.hide();
             notifier.notify(globalConstants.somethingBadHappenedTitle, globalConstants.somethingBadHappenedMessage);
         });
     }, function(e) {
         loader.hide();
         notifier.notify(globalConstants.somethingBadHappenedTitle, globalConstants.somethingBadHappenedMessage);
     });
 }

 function clubTap() {
     // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ REMOVE THIS
     loader.show();
     if (vm.currentClub.getItem(0).Id === 0) {
         notifier.notify(globalConstants.noClubAvailableTitle, globalConstants.noClubAvailableMessage);
         return;
     }

     loader.hide();
     navigate.navigateAnimated("./views/clubPhotos/clubPhotos", vm.currentClub.getItem(0));
     return;
     // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

     loader.show();
     geolocation.getCurrentLocation({
         desiredAccuracy: 2,
         updateDistance: 10,
         maximumAge: 3000,
         timeout: 99999
     }).then(function(loc) {
         if (loc) {
             updateCurrentClub(loc);
             if (vm.currentClub.getItem(0).Id === 0) {
                 notifier.notify(globalConstants.noClubAvailableTitle, globalConstants.noClubAvailableMessage);
                 return;
             }

             loader.hide();
             var navEntry = {
                 moduleName: "./views/clubPhotos/clubPhotos",
                 context: vm.currentClub.getItem(0),
                 animated: true,
                 navigationTransition: {
                     transition: "flip",
                     duration: 350,
                     curve: "easeIn"
                 },
                 backstackVisible: false
             };

             navigate.navigateWithEntry(navEntry);
         }
     }).catch(function(err) {
         console.log("THROWS ERR FROM REFRESH CLUB in clubTap");
         console.dir(err);
         loader.hide();
         notifier.notify(globalConstants.somethingBadHappenedTitle, globalConstants.somethingBadHappenedMessage);
     });
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
