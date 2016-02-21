'use strict';

var http = require('http');

function send(method, url, options) {
    options = options || {};

    var headers = options.headers || {},
        data = options.data || undefined;

    var result;
    var promise = new Promise(function(resolve, reject) {
        http.request({
            url: url,
            method: method,
            headers: headers,
            content: JSON.stringify(data)
        }).then(function(response) {
            console.log(response);
            result = response.content.toJSON();
            resolve(result);
        }, function(error) {
            console.log("ERROR FROM REQUESTER -" + error);
            var result = error.content.toJSON();
            var errorMessage = result['error_description'];
            reject(errorMessage);
        });

    });

    return promise;
}

function get(url, options) {
    return send('GET', url, options);
}

// { "Content-Type": "application/json" }
function post(url, options) {
    return send('POST', url, options);
}

function put(url, options) {
    return send('PUT', url, options);
}

function del(url, options) {
    return send('DELETE', url, options);
}

module.exports = {
    get: get,
    post: post,
    put: put,
    delete: del
};
