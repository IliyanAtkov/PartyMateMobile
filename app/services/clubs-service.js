var requester = require("../Helpers/requester");
var globalConstants = require("../globalConstants");

function getAllClubs() {

}


function getClubDetails(club) {
    var promise = new Promise(function(resolve, reject) {
        requester.get(globalConstants.baseUrl + "api/Clubs/Details/" + club.Id)
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
    //getAll: getAllClubs,
    getClubDetails: getClubDetails
}
