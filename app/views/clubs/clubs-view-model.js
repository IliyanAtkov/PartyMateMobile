'use strict';

var Observable = require("data/observable").Observable;

class ClubsViewModel extends Observable {
	constructor(services) {
		super();
		this.services = services;
		this.clubImage = "http://www.google.com/images/errors/logo_sm_2.png";
		//this.clubText = "You are not in the club at the moment";

		var club = {
			id: '1',
			name: "Club #1",
			image: "http://www.google.com/images/errors/logo_sm_2.png"
		};
		var club2 = {
			id: '1',
			name: "Club #2",
			image: "http://www.google.com/images/errors/logo_sm_2.png"
		};
			var club3 = {
				id: '1',
			name: "Club #1",
			image: "http://www.google.com/images/errors/logo_sm_2.png"
		};
		var club4 = {
			id: '1',
			name: "Club #2",
			image: "http://www.google.com/images/errors/logo_sm_2.png"
		};

	var club5 = {
		id: '1',
			name: "Club #1",
			image: "http://www.google.com/images/errors/logo_sm_2.png"
		};
		var club6 = {
			id: '1',
			name: "Club #2",
			image: "http://www.google.com/images/errors/logo_sm_2.png"
		};

	var club7 = {
		id: '1',
			name: "Club #1",
			image: "http://www.google.com/images/errors/logo_sm_2.png"
		};
		var club8 = {
			id: '1',
			name: "Club #2",
			image: "http://www.google.com/images/errors/logo_sm_2.png"
		};

	var club9 = {
		id: '1',
			name: "Club #1",
			image: "http://www.google.com/images/errors/logo_sm_2.png"
		};
		var club10 = {
			id: '1',
			name: "Club #2",
			image: "http://www.google.com/images/errors/logo_sm_2.png"
		};


		this.clubs = [];
		this.clubs[0] = club;
		this.clubs[1] = club2;
		this.clubs[2] = club3;
		this.clubs[3] = club4;
		this.clubs[4] = club5;
		this.clubs[5] = club6;
		this.clubs[6] = club7;
		this.clubs[7] = club8;
		this.clubs[8] = club9;
		this.clubs[9] = club10;
	}
}

module.exports = {
	create: function(services) {
		return new ClubsViewModel(services);
	}
};