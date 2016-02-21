'use strict';

let services = require('../../services');
let page = require("ui/page");
let vm = require('./clubDetails-view-model');
var utilityModule = require("utils/utils");
var phone = require( "nativescript-phone" );

function pageNavigatedTo(args) {
  page = args.object;
  let club = args.context;
  vm = vm.create(club.id, club.name, services);
  page.bindingContext = vm;
}

function facebookTap() {
	utilityModule.openUrl(vm.facebookUrl);
}


function twitterTap() {
	 utilityModule.openUrl(vm.twitterUrl);
}

function phoneTap() {
	phone.dial(vm.phone, true);
}

function siteTap() {
	utilityModule.openUrl(vm.siteUrl);
}

module.exports  = {
	pageNavigatedTo,
	facebookTap,
	twitterTap,
	phoneTap
};