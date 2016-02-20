'use strict';

var Observable = require("data/observable").Observable;

class AddPhotoViewModel extends Observable {
	constructor(services) {
		super();
		this.services = services;

	}
}

module.exports = {
	create: function(services) {
		return new AddPhotoViewModel(services);
	}
};