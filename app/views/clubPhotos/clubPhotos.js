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

var viewModel;

function pageNavigatedTo(args) {
    page = args.object;
    var club = args.context;
    viewModel = vm.create(club, services);
    page.bindingContext = viewModel;
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
        .then(function(resultImages) {
            for (var i = 0; i < resultImages.length; i++) {
                var imageToAdd = resultImages[i];

                if (imageToAdd !== undefined && imageToAdd.Path.length !== 0) {
                    imageToAdd.Id = i;
                    vm.photos.push(imageToAdd);
                }
            }

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
    var image = args.object;
    var item = image.bindingContext;

    services.images.rateClubImage(item.Id, 1)
        .then(function(result) {
            console.log("RES: " + result);
            this.item.likes = result;
        })
        .catch(function(err) {
            console.log("ERR dislike");
            console.dir(err);
        });
}

function likeTap(args) {
    var image = args.object;
    var item = image.bindingContext;

    services.images.rateClubImage(item.Id, 1)
        .then(function(result) {
            console.log("RES: " + result);
            this.item.likes = result;
        })
        .catch(function(err) {
            console.log("ERR dislike");
            console.dir(err);
        });
}


function openCameraTap() {
    camera.takePicture()
        .then(function(photo) {
            console.log(photo);
            viewModel.addImagePreview = photo;
        });
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