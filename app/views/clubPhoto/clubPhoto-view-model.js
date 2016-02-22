'use strict';

var Observable = require("data/observable").Observable;
let ObservableArray = require('data/observable-array').ObservableArray;

var globalConstants = require('../../globalConstants');

class ClubPhotoViewModel extends Observable {
	constructor(club, services) {
		super();
		this.services = services;

		this.club = club;
		console.dir('~~~~ FROM CLUB PHOTO -' + this.club);
	}
}

module.exports = {
	create: function(club, services) {
		return new ClubPhotoViewModel(club, services);
	}
};