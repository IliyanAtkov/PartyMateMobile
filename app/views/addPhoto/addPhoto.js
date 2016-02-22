'use strict';

var page = require("ui/page");
var loader = require("nativescript-loading-indicator");
var utilityModule = require("utils/utils");

var services = require('../../services');
// var vm = require('./clubPhotos-view-model');

var connection = require("../../Helpers/connection");
var notifier = require("../../Helpers/notifier");
var globalConstants = require("../../globalConstants");
var navigate = require("../../Helpers/navigator");

function pageNavigatedTo(args) {
 
 
    page = args.object;
    var clubPhotos = args.context;
    console.log("Club photos");
    // loader.show();
    // services.clubs.getClubDetails(club)
    //     .then(function(details) {
    //         //	console.dir(details);
    //         console.log("succeess getClubDetails");
    //         page.bindingContext = vm.create(details);
    //         loader.hide();
    //     })
    //     .catch(function(err) {
    //         console.dir("IN CLUB DETAILS ERR" + err);
    //         loader.hide();
    //     });
    //}

}

function indexChange(args) {
    if (args.newIndex === 1) {
        console.log("DAMM");
          navigate.navigateAnimated("./views/clubPhoto/clubPhoto");
    }
}


module.exports = {
    pageNavigatedTo,
    indexChange
    };