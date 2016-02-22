'use strict';

let Observable = require("data/observable").Observable;
let ObservableArray = require('data/observable-array').ObservableArray;

var globalConstants = require('../../globalConstants');
 
class ClubPhotosViewModel extends Observable {
	constructor(club, services) {
		super();
		this.services = services;

		this.clubName = club.clubName;
		this.clubProfileImage = club.clubImage;

		this.photos = new ObservableArray([]);
	}
}


module.exports = {
	create: function(club, services) {
		return new ClubPhotosViewModel(club, services);
	}
};