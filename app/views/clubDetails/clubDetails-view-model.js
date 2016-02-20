'use strict';

var Observable = require("data/observable").Observable;

class ClubDetailsViewModel extends Observable {
	constructor(id, name, services) {
		super();
		this.services = services;
		this.name = name;
		this.id = id;
		this.loadDetails();
	}

	gettedData() {
		return {
			"adress": "Studenski grad 3",
			"capacity": "15",
			"facebookUrl": "faceeee",
			"twitterUrl": "twitter",
			"siteUrl": "htpp://www.bestsite.com",
			"phone": 0877777777,
		};
	}


	loadDetails() {
		let res = this.gettedData();
		this.adress = res.adress;
		this.capacity = res.capacity;
		this.facebookUrl = res.facebookUrl;
		this.twitterUrl = res.twitterUrl;
		this.phone = res.phone;
		this.siteUrl = res.siteUrl;
	}
}

module.exports = {
	create: function(id, name, services) {
		return new ClubDetailsViewModel(id, name, services);
	}
};