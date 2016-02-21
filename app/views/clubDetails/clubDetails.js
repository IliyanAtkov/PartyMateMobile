'use strict';

let services = require('../../services');
let page = require("ui/page");
let vm = require('./clubDetails-view-model');
var utilityModule = require("utils/utils");
var phone = require( "nativescript-phone" );

function pageNavigatedTo(args) {
  page = args.object;
  let club = args.context;

  page.bindingContext = vm.create(club.id, club.name, services);
}

function facebookTap() {
	let vm = page.bindingContext;
	utilityModule.openUrl(vm.facebookUrl);
}

function twitterTap() {
	 let vm = page.bindingContext;
	 utilityModule.openUrl(vm.twitterUrl);
}

function phoneTap() {
	let vm = page.bindingContext;
	phone.dial(vm.phone, true);
}

function siteTap() {
	let vm = page.bindingContext;
	utilityModule.openUrl(vm.siteUrl);
}

module.exports  = {
	pageNavigatedTo,
	facebookTap,
	twitterTap,
	phoneTap
};