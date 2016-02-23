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
var camera = require("../../Helpers/camera");

function pageNavigatedTo(args) {
    page = args.object;
    var club = args.context;
    page.bindingContext = vm.create(club, services);
    loadImages();
    var slider = new sliderModule.Slider();
    slider.maxValue = 5;
    slider.value = 3;
    slider.minValue = 1;
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
    loader.show();
    let vm = page.bindingContext;
    requester.get(globalConstants.baseUrl + "api/Clubs/HiddenImages/" + vm.clubId)
        .then(function(resultClubs) {

            // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ FIX THIS
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
                "ClubId": 1,
                "Content": "MN IAKOWQWEQWE",
                "Rating": 5
            },
            headers: {
                "Content-Type": "application/json"
            }
        }

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
    }
}

function dislikeTap(args) {
    //services.images.rateClubImage(imageId, -1)
    // .then(function(result) {
    //     // change value
    // })
    // .catch(function(err) {
    //     // alert
    // });
}

function likeTap(args) {
    //services.images.rateClubImage(imageId, 1);
}


function openCameraTap() {
    camera.takePicture()
        .then(function(photo) {
            console.log(photo);
            page.bindingContext.addImagePreview = photo;
        });

    // cameraModule.takePicture()
    //     .then(function(photo) {
    //         page.bindingContext.addImagePreview = photo; // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ FIX THIS BINDING

    //     });

}

// function savePicture(photo) {
//     console.log(photo)
//     console.dir(photo);
//     var imageString = photo.toBase64String('.jpg', 100);
//     var imageFile = {
//         Filename: Math.random().toString(36).substring(2, 15) + ".jpg",
//         ContentType: "image/jpeg",
//         base64: imageString
//     };

//     el.Files.create(imageFile).then(function(response) {
//         console.dir(response)
//         var imageUri = response.result['Uri'];
//         console.log(imageUri);

//     });
// }

function uploadImageTap() {
    camera.savePicture(page.bindingContext.addImagePreview);
}

module.exports = {
    pageNavigatedTo,
    indexChange,
    backButtonTap,
    dislikeTap,
    likeTap,
    openCameraTap,
    uploadImageTap,
    submitBtn
};
