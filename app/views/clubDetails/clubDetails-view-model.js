'use strict';

var Observable = require("data/observable").Observable;

var globalConstants = require('../../globalConstants');

class ClubDetailsViewModel extends Observable {
    constructor(club, services) {
        super();
        this.services = services;
        this.club = club;
    }
}

module.exports = {
    create: function(club, services) {
        return new ClubDetailsViewModel(club, services);
    },
    load: function(details) {
    	if (!details) {
        	// SET DEFAULT VALUES
            this.name = globalConstants.defaultNoClubDetailsName;
            // this.adress = details.Adress;
            // this.phone = details.Phone;
            this.siteUrl = globalConstants.defaultNoClubDetailsSiteUrl;
            // this.facebookUrl = details.FacebookUrl;
            // this.twitterUrl = details.TwitterUrl;
            // this.email = details.Email;
            // this.capacity = details.Capacity;
            // this.views = details.Views;
            // this.rating = details.Rating;

            this.profilePicUrl = globalConstants.defaultNoClubDetailsProfileImageUrl;
            this.photo1Url = globalConstants.defaultNoClubDetailsPhoto1Url;
            this.photo2Url = globalConstants.defaultNoClubDetailsPhoto2Url;
            return;
        }

		console.log("HERE");
        this.name = details.Name; 
        this.adress = details.Adress;
        this.phone = details.Phone;
        this.siteUrl = details.SiteUrl;
        this.facebookUrl = details.FacebookUrl;
        this.twitterUrl = details.TwitterUrl;
        this.email = details.Email;
        this.capacity = details.Capacity;
        this.views = details.Views;
        this.rating = details.Rating;

        this.profilePicUrl = details.ProfilePicUrl;
        if (details.photos.length === 1) {
            this.photo1Url = details.photos[0];
        } else if (details.photos.length === 2) {
            this.photo1Url = details.photos[0];
            this.photo2Url = details.photos[1];
        }

        console.log(this.name);
        // for (var i = 0; i < details.photos; i++) {
        //     var photoUrl = details.photos[i];
        //     // TODO: load more than three photos
        // }
    }
};
