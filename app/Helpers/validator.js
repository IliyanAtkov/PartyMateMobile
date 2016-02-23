'use strict';

var validatorModule = {
    isValidEmail: function(email) {
        var emailRegex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        return emailRegex.test(email);
    },

    isValidPassword: function(password) {
        return password && typeof password === 'string' &&
            password.length >= 6 && password.length <= 20;
    }
};

module.exports = validatorModule;
