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
        var username = store.getItem(this.keys.username);
        if(username && 'string' == typeof username) {
            app.user = new mbp.User(username);
        }
    };

    /**
     * Persists application state for later restore
     * @param {mbp.MyBestPistes} app 
     */
    this.save = function(app) {
        if (app.user && app.user.getLogin()) {
            store.setItem(this.keys.username, app.user.getLogin());
        } else {
            store.removeItem(this.keys.username);
        }
    };
};