"use strict";

/**
 * Manages MyBestPistes persistence
 * @constructor
 * @param {mbp.MyBestPistes} app 
 * @author ch4mp@c4-soft.Com
 */
mbp.MyBestPistesRepository = function(app) {
    var store = localStorage;

    /**
     * Restores application state as it was at last save
     */
    this.restore = function() {
        var username = store.getItem(this.keys.username);
        app.user = new mbp.User('string' == typeof username ? username : undefined);
    };

    /**
     * Persists application state for later restore
     */
    this.save = function() {
        if (app.user && app.user.getLogin()) {
            store.setItem(this.keys.username, app.user.getLogin());
        } else {
            store.removeItem(this.keys.username);
        }
    };
};

mbp.MyBestPistesRepository.keys = {
    username : 'mbp.username'
};