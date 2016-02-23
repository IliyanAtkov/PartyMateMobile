'use strict';

var connectivity = require("connectivity");

function isEnabled() {
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
	isEnabled: isEnabled
};