'use strict';

var dialogs = require("ui/dialogs");
var globalConstants = require('../globalConstants');

function notify(title, message) {
    var options = {
        title: title,
        message: message,
        okButtonText: globalConstants.OKButtonText
    };

    dialogs.alert(options);
}

module.exports = {
    notify: notify
}