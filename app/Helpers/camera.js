var cameraModule = require("camera");
var Everlive = require('~/libs/everlive.all.min');
var el = new Everlive('hsofhjl84uwzldbi');

function takePicture(imageView) {
    return cameraModule.takePicture()
        .then(function(photo) {
            if (imageView) {
                imageView.imageSource = photo;
            }

            return photo;
        })
}; 

function savePicture(photo) {
    console.log(photo)
    console.dir(photo);
    var imageString = photo.toBase64String('.jpg', 100);
    var imageFile = {
        Filename: Math.random().toString(36).substring(2, 15) + ".jpg",
        ContentType: "image/jpeg",
        base64: imageString
    };

    el.Files.create(imageFile).then(function(response) {
        console.dir(response)
        var imageUri = response.result['Uri'];
        console.log(imageUri);

    });
}

module.exports = {
    takePicture: takePicture,
    savePicture: savePicture
}
