'use strict';

let Observable = require("data/observable").Observable;
let ObservableArray = require('data/observable-array').ObservableArray;

var globalConstants = require('../../globalConstants');

class ClubsViewModel extends Observable {
	constructor(services) {
		super();
		this.services = services;

		this.clubId = 0;
        this.clubImage = globalConstants.defaultNoClubImageUrl;
        this.clubName = globalConstants.noClubAvailableText;
        
		this.clubs = new ObservableArray([]);
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