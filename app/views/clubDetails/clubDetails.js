'use strict';

var page = require("ui/page");
var loader = require("nativescript-loading-indicator");
var phone = require("nativescript-phone");
var utilityModule = require("utils/utils");

var services = require('../../services');
var vm = require('./clubDetails-view-model');

var connection = require("../../Helpers/connection");
var notifier = require("../../Helpers/notifier");
var globalConstants = require("../../globalConstants");

function pageNavigatedTo(args) {
    page = args.object;
    var club = args.context;
    console.log("Club " + club);
    console.dir(club);
    loader.show();
    services.clubs.getClubDetails(club)
        .then(function(details) {
        //	console.dir(details);
        	console.log("succeess getClubDetails");
        	page.bindingContext = vm.create(details);
            loader.hide();
        })
        .catch(function(err) {
            console.dir("IN CLUB DETAILS ERR" + err);
            loader.hide();
        });
}

function facebookTap() {
    var vm = page.bindingContext;
    utilityModule.openUrl(vm.facebookUrl);
}

function twitterTap() {
    var vm = page.bindingContext;
    utilityModule.openUrl(vm.twitterUrl);
}

function phoneTap() {
    var vm = page.bindingContext;
    console.log("phone ", vm.phone);
    phone.dial(vm.phone, true);
}

function siteTap() {
    var vm = page.bindingContext;
    utilityModule.openUrl(vm.siteUrl);
}

module.exports = {
    pageNavigatedTo,
    facebookTap,
    twitterTap,
    phoneTap
};
