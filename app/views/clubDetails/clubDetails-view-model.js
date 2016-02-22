'use strict';

var Observable = require("data/observable").Observable;

var globalConstants = require('../../globalConstants');

class ClubDetailsViewModel extends Observable {
    constructor(club) {
        super();
        this.setData(club);
    }

    setData(club) {
        console.log("DAA");
        
        if (club.clubName) {
            this.clubName = club.Name;
        }
        else {
            this.clubName = globalConstants.defaultNoClubDetailsName;
        }
        if (club.SiteUrl) {
            this.siteUrl = club.SiteUrl;
        }
        else {
            this.siteUrl = globalConstants.defaultNoClubDetailsSiteUrl;
        }

        this.adress =club.Adress;
        this.phone = club.Phone;
        this.facebookUrl = club.FacebookUrl;
        this.twitterUrl = club.TwitterUrl;
        this.email = club.Email;
        this.capacity = club.Capacity;
        this.views = club.Views;
        this.rating = club.Rating;
        if (club.ProfilePicUrl) {
            this.profilePicUrl = club.ProfilePicUrl;
        }
        else {
            this.profilePicUrl = globalConstants.defaultNoClubDetailsProfileImageUrl;
        }
        if (club.photos.length == 2) {
            this.photo1Url = club.photos[0];
            this.photo2Url = club.photos[1];
        }
        else if (club.photos.length == 1) {
            this.photo1Url = club.photos[0];
            this.photo2Url =  this.photo2Url = globalConstants.defaultNoClubDetailsPhoto2Url;
        }
        else {
            this.photo1Url = globalConstants.defaultNoClubDetailsPhoto1Url;
            this.photo2Url = globalConstants.defaultNoClubDetailsPhoto2Url;
        }
     
    }
}

module.exports = {
    create: function(club) {
        return new ClubDetailsViewModel(club);
    }
};
