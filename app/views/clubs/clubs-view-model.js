'use strict';

var Observable = require("data/observable").Observable;

class ClubsViewModel extends Observable {
	constructor(services) {
		super();
		this.services = services;
	}
}

module.exports = {
	create: function(services) {
		return new ClubsViewModel(services);
	}
};