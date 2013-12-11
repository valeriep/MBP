"use strict";

/**
 * Manages MyBestPistes persistence
 * @constructor
 * @author ch4mp@c4-soft.com
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
     * @param {mbp.MyBestPistes} appInstance 
     */
    this.restore = function(appInstance) {
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
        appInstance.user = user;
    };

    /**
     * Persists application state for later restore
     * @param {mbp.MyBestPistes} appInstance 
     */
    this.save = function(appInstance) {
        if (appInstance.user && appInstance.user.login) {
            store.setItem(this.keys.username, appInstance.user.login);
        } else {
            store.removeItem(this.keys.username);
        }
    };
};