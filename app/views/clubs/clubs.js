'use strict';

let services = require('../../services');
let view = require("ui/core/view");
let page = require("ui/page");
let vm = require('./clubs-view-model')
	.create(services);

let frameModule = require('ui/frame');

function pageLoaded(args) {
	page = args.object;
	page.bindingContext = vm;
	attachSeachBar();
}

function attachSeachBar() {
	let searchBar = view.getViewById(page, "searchBar");
	searchBar.on('propertyChange', function(args) {
		console.log("Search for " + args.object.text);
	});
}

function tapped(args) {
	let topmost = frameModule.topmost();
	let tappedClub = vm.clubs[args.index];
	let clubDetails = {
    	moduleName: "./views/clubDetails/clubDetails",
    	context: { tappedClub },
    	animated: true
	};
	topmost.navigate(clubDetails);
}

module.exports = {
	pageLoaded,
	tapped
};