"use strict";

/**
 * 
 * 
 * @Author ch4mp@c4-soft.com
 */

mbp.SeolanUserRepository = function() {
    var store = sessionStorage;

    this.get = function(login) {
        var userString = store.getItem(login);
        if(!userString) {
            return;
        }
        var userData = JSON.parse(userString);
        if(!userData) {
            return;
        }
        return new mbp.SeolanUser(login, userData.pwd);
    };

    this.save = function(user) {
        if(!(user instanceof mbp.SeolanUser)) {
            throw "invalid user";
        }
        var userString = JSON.stringify(user);
        store.setItem(user.getLogin(), userString);
    };
    
    Object.preventExtensions(this);
};