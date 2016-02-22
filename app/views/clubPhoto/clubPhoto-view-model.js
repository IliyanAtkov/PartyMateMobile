'use strict';

var Observable = require("data/observable").Observable;
let ObservableArray = require('data/observable-array').ObservableArray;

var globalConstants = require('../../globalConstants');

class ClubPhotoViewModel extends Observable {
	constructor(id, services) {
		super();
		this.services = services;

		this.id = id;
	}
}

module.exports = {
	create: function(id, services) {
		return new ClubPhotoViewModel(id, services);
	}
};