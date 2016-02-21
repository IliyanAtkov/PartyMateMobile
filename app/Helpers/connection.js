'use strict';

var connectivity = require("connectivity");

function isAvailable() {
    var hasConnection = false;
    var connectionType = connectivity.getConnectionType();
    switch (connectionType) {
        case connectivity.connectionType.none:
            hasConnection = true;
            break;
    }
    return hasConnection;
}

module.exports = {
	isAvailable: isAvailable
}