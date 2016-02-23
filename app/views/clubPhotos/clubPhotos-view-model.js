'use strict';

let Observable = require("data/observable").Observable;
let ObservableArray = require('data/observable-array').ObservableArray;

var globalConstants = require('../../globalConstants');
 
class ClubPhotosViewModel extends Observable {
	constructor(club, services) {
		super();
		this.services = services;
		this.clubId = club.Id;
		this.clubName = club.clubName;
		this.clubProfileImage = club.clubImage;
		this.sliderValue = 1;
		this.photos = new ObservableArray([]);
var image1 = new Observable();
		image1.set("image", "http://tips.betdownload.com/cf/images/ndh/2013/12/create-a-shutdown-or-restart-your-desktop-icons-1.jpg");
				var image2 = new Observable();
		image2.set("image", "http://tips.betdownload.com/cf/images/ndh/2013/12/create-a-shutdown-or-restart-your-desktop-icons-1.jpg");
				var image3 = new Observable();
		image3.set("image", "http://tips.betdownload.com/cf/images/ndh/2013/12/create-a-shutdown-or-restart-your-desktop-icons-1.jpg");
				var image4 = new Observable();
		image4.set("image", "http://tips.betdownload.com/cf/images/ndh/2013/12/create-a-shutdown-or-restart-your-desktop-icons-1.jpg");
		this.photos.push(image1);
		this.photos.push(image2);
		this.photos.push(image3);
		this.photos.push(image4);
	}
}


module.exports = {
	create: function(club, services) {
		return new ClubPhotosViewModel(club, services);
	}
};
