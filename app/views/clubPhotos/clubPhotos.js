'use strict';

var page = require("ui/page");
var view = require("ui/core/view");
var loader = require("nativescript-loading-indicator");
var utilityModule = require("utils/utils");

var services = require('../../services');
var vm = require('./clubPhotos-view-model');
var connection = require("../../Helpers/connection");
var notifier = require("../../Helpers/notifier");
var globalConstants = require("../../globalConstants");
var navigator = require("../../Helpers/navigator");

function pageNavigatedTo(args) {
    page = args.object;
    var club = args.context;
    page.bindingContext = vm.create(club, services);

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
        
    }
}

function dislikeTap(args) {

}

function likeTap(args) {

}


module.exports = {
    pageNavigatedTo,
    indexChange,
    backButtonTap,
    dislikeTap,
    likeTap
};
