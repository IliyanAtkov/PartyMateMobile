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
                    console.dir(imageToAdd);
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
    var slider = view.getViewById(page, "sliderReview");
    console.dir(slider);
    // ~~~~~~~~~~~~~~~~~~~~~~~~
    let vm = page.bindingContext;
    console.log("ID " + vm.clubId);
    if (textView.text !== undefined && textView.text.count !== 0) {
        var options = {
            data: {
                "ClubId": vm.clubId,
                "Content": textView.text,
                "Rating": 5
            },
            headers: {
                "Content-Type": "application/json"
            }
        }
    }

    requester.post(globalConstants.baseUrl + "api/Clubs/Review", options)
        .then(function(result) {
            console.log("Da");
            console.dir(resultClubs);
            notifier.notify("Club reviewed!", "That was important.");
        })
        .catch(function(err) {
            console.log(err.statusCode);
            console.dir(err);
            console.log("SOMETHING BAD FROM REVIEW CLUBS");
            // loader.hide();
            // notifier.notify(globalConstants.somethingBadHappenedTitle, globalConstants.somethingBadHappenedMessage);
        });
}

function dislikeTap(args) {
    var image = args.object;
    var item = image.bindingContext;

    services.images.rateClubImage(item.Id, -1)
        .then(function(result) {
            console.log("RES: " + result);
            this.item.likes = result;
            view.getViewById(page, "photosListView").refresh();
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
            view.getViewById(page, "photosListView").refresh();
        })
        .catch(function(err) {
            console.log("ERR like");
            console.dir(err);
        });
}


function openCameraTap() {
    camera.takePicture()
        .then(function(photo) {
            viewModel.addImagePreview = photo;
        });
}

function uploadImageTap() {
    camera.savePicture(page.bindingContext.addImagePreview)
        .then(function(link) {
            services.images.addImageLink(link)
                .then(function(res) {
                    notifier.notify("Yay!", "Image added!");
                    view.getViewById(page, "photosListView").refresh();
                })
                .catch(function(err) {
                    notifier.notify("Woah!", "Bad things happened!");
                });
        })
        .catch(function(err) {
            console.log("BAD ERROR FROM UPLOAD IMAGE TAP")
            console.dir(err);
        });
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
