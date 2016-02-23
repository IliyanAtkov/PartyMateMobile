'use strict';

var requester = require("../Helpers/requester");
var globalConstants = require("../globalConstants");

function addImageLink(clubId, link) {
    var promise = new Promise(function(resolve, reject) {
        var options = {
            headers: {
                "Content-Type": "application/json"
            },
            data: {
                "ClubId": clubId,
                "Path": link
            }
        };
        requester.post(globalConstants.baseUrl + "api/Clubs/HiddenImages", options)
            .then(function(resultDetails) {
                resolve(resultDetails);
            })
            .catch(function(err) {
                reject(err);
            });
    });

    return promise;
}

function rateClubImage(imageId, rating) {
    // TODO: check for rating value then make request

    var promise = new Promise(function(resolve, reject) {
        var options = {
            headers: {
                "Content-Type": "application/json"
            },
            data: {
                "ImageId": imageId,
                "Rating": rating
            }
        };
        
        requester.post(globalConstants.baseUrl + "api/Hidden/Vote", options)
            .then(function(resultDetails) {
                resolve(resultDetails);
            })
            .catch(function(err) {
                reject(err);
            });
    });

    return promise;
}

module.exports = {
    rateClubImage: rateClubImage,
    addImageLink: addImageLink
};
