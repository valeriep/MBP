"use strict";

slopes.SlopesRepository = function(app) {
    if (!(app instanceof slopes.Slopes)) {
        throw new Error('Constructor called with invalid app argument: ' + app);
    }

    var store = localStorage;

    var keys = {
        username : 'seolan.username'
    };

    this.restore = function() {
        var username = store.getItem(keys.username);
        app.user = new slopes.SeolanUser('string' == typeof username ? username : undefined);
    };

    this.save = function() {
        if (app.user && app.user.getLogin()) {
            store.setItem(keys.username, app.user.getLogin());
        } else {
            store.removeItem(keys.username);
        }
    };
};