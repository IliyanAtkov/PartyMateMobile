'use strict';

let Observable = require("data/observable").Observable;
let ObservableArray = require('data/observable-array').ObservableArray;

var globalConstants = require('../../globalConstants');

class ClubsViewModel extends Observable {
	constructor(services) {
		super();
		this.services = services;
		this.currentLocationClubText = globalConstants.noClubAvailableText;
		this.isLoading = true;

		this.clubImage = "http://www.google.com/images/errors/logo_sm_2.png";
		var club = new Observable();
		club.set("id", "1");
		club.set("name", "Club #1");
		club.set("image", "http://www.google.com/images/errors/logo_sm_2.png");

		var club2 = new Observable();
		club2.set("id", "2");
		club2.set("name", "Club #2");
		club2.set("image", "http://www.google.com/images/errors/logo_sm_2.png");

		this.clubs = new ObservableArray([]);
		this.clubs.push(club);
		this.clubs.push(club2);

		this.clubsToVisualize = new ObservableArray([]);
		for (var i = 0; i < this.clubs.length; i++) {
			this.clubsToVisualize.push(this.clubs.getItem(i));
		}
	}


}


module.exports = {
	create: function(services) {
		return new ClubsViewModel(services);
	}
};