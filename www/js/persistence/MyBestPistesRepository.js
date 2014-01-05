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
        userId : 'mbp.userId'
    };

    /**
     * Restores application state as it was at last save
     * @param {mbp.MyBestPistes} appInstance 
     */
    this.restore = function(appInstance) {
        var user;
        var userId = store.getItem(this.keys.userId);
        if (!userId || 'string' != typeof userId) {
            user = null;
        } else {
            var userRepo = new mbp.LocalUserRepository();
            user = userRepo.get(userId);
            if(!user) {
                user = new mbp.User();
                user.id = userId;
                user.login = userId;
            }
        }
        appInstance.user = user;
    };

    /**
     * Persists application state for later restore
     * @param {mbp.MyBestPistes} appInstance 
     */
    this.save = function(appInstance) {
        if (appInstance.user && appInstance.user.id) {
            store.setItem(this.keys.userId, appInstance.user.id);
        } else {
            store.removeItem(this.keys.userId);
        }
    };
};