cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/org.apache.cordova.network-information/www/network.js",
        "id": "org.apache.cordova.network-information.network",
        "clobbers": [
            "navigator.connection",
            "navigator.network.connection"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.network-information/www/Connection.js",
        "id": "org.apache.cordova.network-information.Connection",
        "clobbers": [
            "Connection"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.network-information/src/firefoxos/NetworkProxy.js",
        "id": "org.apache.cordova.network-information.NetworkProxy",
        "runs": true
    },
    {
        "file": "plugins/org.apache.cordova.geolocation/src/firefoxos/GeolocationProxy.js",
        "id": "org.apache.cordova.geolocation.GeolocationProxy",
        "runs": true
    }
]
});