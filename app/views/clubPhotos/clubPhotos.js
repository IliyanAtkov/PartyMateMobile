'use strict';

var page = require("ui/page");
var view = require("ui/core/view");
var loader = require("nativescript-loading-indicator");
var utilityModule = require("utils/utils");
var sliderModule = require("ui/slider");

var services = require('../../services');
var vm = require('./clubPhotos-view-model');
var connection = require("../../Helpers/connection");
var notifier = require("../../Helpers/notifier");
var globalConstants = require("../../globalConstants");
var navigate = require("../../Helpers/navigator");
var requester = require("../../Helpers/requester");
var camera = require("../../Helpers/camera");

function pageNavigatedTo(args) {
    page = args.object;
    var club = args.context;
    page.bindingContext = vm.create(club, services);
    var slider = new sliderModule.Slider();
    slider.maxValue = 5;
    slider.value = 3;
    slider.minValue = 1;
    // loader.show();
    // services.clubs.getClubDetails(club)
    //     .then(function(details) {
    //         //   console.dir(details); 


    //         console.log("succeess getClubDetails");
    //         page.bindingContext = vm.create(details);
    //         loader.hide();
    //     }) 
    //     .catch(function(err) {
    //         console.dir("IN CLUB DETAILS ERR" + err);
    //         loader.hide();
    //     });  
    // }
}

function indexChange(args) {
    if (args.newIndex === 1) {

    }
    if (args.newIndex === 2) {

    }
    if (args.newIndex === 3) {

    }
}

function backButtonTap(args) {
    navigate.navigateAnimated("./views/clubs/clubs");
}

function submitBtn(args) {
    var textView = view.getViewById(page, "userOpinion");
    let vm = page.bindingContext;
    console.log("ID " + vm.clubId);
    if (textView.text !== undefined && textView.text.count !== 0) {
        var options = {
            data: {
                "ClubId": "1",
                "Content": "MN IAKO",
                "Rating": 5
            },
            headers: {
                "Content-Type": "application/json"
            }
        };

        requester.post(globalConstants.baseUrl + "api/Clubs/Review", options)
            .then(function(resultClubs) {
                console.log("Da");
                console.dir(resultClubs);
            })
            .catch(function(err) {
                console.log(err.statusCode);
                console.dir(err);
                console.log("SOMETHING BAD FROM REVIEW CLUBS");
                // loader.hide();
                // notifier.notify(globalConstants.somethingBadHappenedTitle, globalConstants.somethingBadHappenedMessage);
            });
        // var contenta = JSON.stringify({
        //            "clubId": 1,
        //            "Content": "ADADJIADJDJIADD",
        //            "Rating": 5
        //         });
        // console.log(contenta);
        // if (textView.text !== undefined && textView.text.count !== 0) {
        //     fetch("http://partymate.apphb.com/api/Clubs/Test", {
        //         method: "POST",
        //         headers: {
        //             "Content-Type": "application/json"
        //         },
        //         content: JSON.stringify({
        //            "clubId": 1,
        //            "Content": "ADADJIADJDJIADD",
        //            "Rating": 5
        //         })
        //     }).then(function(r) {
        //         console.log("HIEJRAE");
        //         return r.json();
        //     }).then(function(r) {
        //         console.log("AHDJAX");
        //         console.dir(r);
        //     }, function(e) {
        //         console.dir(e);
        //         console.log("Error occurred " + e);
        //    });
        // http.request({
        //         url: globalConstants.baseUrl + "api/Clubs/Review",
        //         method: "POST",
        //         content: JSON.stringify({
        //             "clubId": "1",
        //             "Content": "ADADJIADJDJIADD",
        //             "Rating": 5
        //         }),
        //         headers: JSON.stringify({
        //             "Content-Type": "application/json"
        //         })
        //     })
        //     .then(function(response) {
        //         console.dir(response);
        //         if (response.statusCode === 200) {
        //             success(response);
        //         } else {
        //             error(response);
        //         }
        //     }).catch(function(error) {
        //         console.log('error');
        //         console.log(error);
        //         throw new Error(JSON.stringify(error.content));
        //     });
        // requester.post(globalConstants.baseUrl + "api/Clubs/Review", options)
        // .then(function(resultClubs) {
        //     console.log("Da");
        //     console.dir(resultClubs);
        // })
        //  .catch(function(err) {
        //     console.log(err.statusCode);
        //             console.dir(err);
        //          console.log("SOMETHING BAD FROM REVIEW CLUBS");
        //          // loader.hide();
        //          // notifier.notify(globalConstants.somethingBadHappenedTitle, globalConstants.somethingBadHappenedMessage);
        //      });
    }
}

function dislikeTap(args) {

}

function likeTap(args) {

}

function openCameraTap() {
    camera.takePicture(page.bindingContext.addImagePreview);
}

function uploadImageTap() {

}

module.exports = {
    pageNavigatedTo,
    indexChange,
    backButtonTap,
    dislikeTap,
    likeTap,
    openCameraTap,
    uploadImageTap
};
