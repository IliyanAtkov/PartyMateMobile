'use strict';

var Observable = require("data/observable").Observable;

class ClubDetailsViewModel extends Observable {
	constructor(services) {
		super();
		this.services = services;
	}
}

module.exports = {
	create: function(services) {
		return new ClubDetailsViewModel(services);
	}
};