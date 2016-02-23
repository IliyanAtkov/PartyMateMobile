'use strict';

var page = require("ui/page");
var view = require("ui/core/view");
var loader = require("nativescript-loading-indicator");
var utilityModule = require("utils/utils");
var sliderModule = require("ui/slider");
var cameraModule = require("camera");
var imageModule = require("ui/image");

var services = require('../../services');
var vm = require('./clubPhotos-view-model');
var connection = require("../../Helpers/connection");
var notifier = require("../../Helpers/notifier");
var globalConstants = require("../../globalConstants");
var navigator = require("../../Helpers/navigator");
var requester = require("../../Helpers/requester");

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
    navigator.navigateAnimated("./views/clubs/clubs");
}

function submitBtn(args) {
    var textView = view.getViewById(page, "userOpinion");
    if (textView.text != undefined && textView.text.count != 0) {
        // options = {
        //     data: {
        //         ClubId: 
        //     },
        //     headers: {
        //         "content-type" : "application/json"
        //     }
        // };
        // requester.post(globalConstants.baseUrl + "api/Clubs/All", options);
    }
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
