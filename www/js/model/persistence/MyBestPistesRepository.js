"use strict";

/**
 * Manages MyBestPistes persistence
 * @constructor
 * @author ch4mp@c4-soft.Com
 */
mbp.MyBestPistesRepository = function() {
    var store = localStorage;

    /**
     * @private
     */
    this.keys = {
        username : 'mbp.username'
    };

    /**
     * Restores application state as it was at last save
     * @param {mbp.MyBestPistes} app 
     */
    this.restore = function(app) {
        var user;
        var username = store.getItem(this.keys.username);
        if (!username || 'string' != typeof username) {
            user = null;
        } else {
            var userRepo = new mbp.UserRepository();
            user = userRepo.get(username);
            if(!user) {
                user = new mbp.User(null, username);
            }
        }
        app.user = user;
    };

    /**
     * Persists application state for later restore
     * @param {mbp.MyBestPistes} app 
     */
    this.save = function(app) {
        if (app.user && app.user.login) {
            store.setItem(this.keys.username, app.user.login);
        } else {
            store.removeItem(this.keys.username);
        }
    };
};