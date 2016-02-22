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
var navigator = require("../../Helpers/navigator");


function pageNavigatedTo(args) {
    page = args.object;
    var club = args.context;
    loader.show();
    services.clubs.getClubDetails(club)
        .then(function(details) {
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
    phone.dial(vm.phone, true);
}

function siteTap() {
    var vm = page.bindingContext;
    utilityModule.openUrl(vm.siteUrl);
}

function backButtonTap() {
    navigator.navigateAnimated("./views/clubs/clubs");
}

module.exports = {
    pageNavigatedTo,
    facebookTap,
    twitterTap,
    phoneTap,
    siteTap,
    backButtonTap
};
