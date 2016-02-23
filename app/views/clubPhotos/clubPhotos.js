'use strict';

var page = require("ui/page");
var view = require("ui/core/view");
var loader = require("nativescript-loading-indicator");
var utilityModule = require("utils/utils");
var sliderModule = require("ui/slider");
var cameraModule = require("camera");
var imageModule = require("ui/image");
 var dialogs = require("ui/dialogs");
var services = require('../../services');
var vm = require('./clubPhotos-view-model');
var connection = require("../../Helpers/connection");
var notifier = require("../../Helpers/notifier");
var globalConstants = require("../../globalConstants");
var navigate = require("../../Helpers/navigator");
var requester = require("../../Helpers/requester");

function pageNavigatedTo(args) {
    page = args.object;
    var club = args.context;
    page.bindingContext = vm.create(club, services);
    loadImages();
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

function loadImages() {
     dialogs.alert({
         title: globalConstants.willStartWorkingWithDataTitle,
         message: globalConstants.fetchingClubsFromServerMessage,
         okButtonText: globalConstants.OKButtonText
     }).then(function() {
         loader.show();
         let vm = page.bindingContext;
         requester.get(globalConstants.baseUrl + "api/Clubs/HiddenImages/" + vm.clubId)
             .then(function(resultClubs) {
                console.log("MQU");
                // console.dir(resultClubs);
                //  for (var i = 0; i < resultClubs.length; i++) {
                //      var clubToAdd = resultClubs[i];

                //      var ratingAsImgSrc;

                //      clubToAdd.Rating = ratingAsImgSrc;
                //      vm.clubs.push(clubToAdd);
                //      vm.clubsToVisualize.push(clubToAdd);
                //  }

                 loader.hide();
             })
             .catch(function(err) {
                 console.log("SOMETHING BAD FROM hidden images");
                 console.dir(err);
                 loader.hide();
                 notifier.notify(globalConstants.somethingBadHappenedTitle, globalConstants.somethingBadHappenedMessage);
             });
     });
}
function backButtonTap(args) {
    navigate.navigateAnimated("./views/clubs/clubs");
}

function submitBtn(args) {
    var textView = view.getViewById(page, "userOpinion");
    let vm = page.bindingContext;
    console.log("ID " + vm.clubId);
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
//    }
}

function dislikeTap(args) {

}

function likeTap(args) {

}


function openCameraTap() {
    cameraModule.takePicture().then(function(picture) {
        //console.dir(picture);
        var imgString = picture.toBase64String();
        //console.log(imgString);
        // var options = {
        //     headers: {
        //         "Content-Type": "application/json"
        //     },
        //     data: "OT CLUB PHOTOS"
        // }

        // requester.post(globalConstants.baseUrl + "api/Clubs/Test", options)
        // .then(function(res) {
        //     console.log("BEFORE PIC ");
        //     console.dir(res);

        // }).catch(function(err) {
        //     console.log("BEFORE ERR PIC " + err)
        //     console.dir(err);
        // });

        // var options = {
        //     headers: {
        //         "Content-Type": "application/json"
        //     },
        //     data: {
        //         ClubId: 1,
        //         Content: imgString
        //     }
        // };

        // console.log("~~~~AFTER OPTIONS")
        // requester.post(globalConstants.baseUrl + "api/Clubs/HiddenImages", options)
        // .then(function(res) {
        //     console.log("~~RES");
        //     console.dir(res);
        // })
        // .catch(function(err) {
        //     console.log("~~ERR");
        //     console.dir(err);
        // })


        // console.log("~~~~AFTER REQ")
        var image = new imageModule.Image();
        image.imageSource = picture;
    });
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