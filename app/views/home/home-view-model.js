'use strict';

var Observable = require("data/observable").Observable;

class HomeViewModel extends Observable {
	constructor(services) {
		super();
	}
}

module.exports = {
	create: function(services) {
		return new HomeViewModel(services);
	}
};