"use strict";

/**
 * Manages User persistence
 * @constructor
 * @author ch4mp@c4-soft.com
 */
mbp.LocalUserRepository = function() {
    var store = localStorage;
    var storeKeysPrefix = 'mbp.User.';

    /**
     * Retrieve a User from the local data-store. Password is not persisted and as so set to what is given as parameter
     * @param {String} id
     * @param {String} password
     * @return {mbp.User} Persisted user whose username is 'id', null otherwise
     */
    this.get = function(id, password) {
        var userString = store.getItem(storeKeysPrefix + id);
        if(!userString) {
            return null; //no entry in data store with provided id
        }
        
        var userData = JSON.parse(userString);
        if(!userData) {
            return null; //invalid entry in data store with provided id
        }
        
        var user = new mbp.User(userData);
        user.pwd = password || null;
        return user;
    };

    /**
     * Persists a user into the local data-store. For security reasons, password is excluded.
     * @param {mbp.User} user
     * @throw {Error} if user is not instance of mbp.User
     */
    this.save = function(user) {
        if(!(user instanceof mbp.User)) {
            throw new Error("invalid user");
        }
        var tmp = user.pwd;
        user.pwd = null; //remove password before serialization
        var userString = JSON.stringify(user);
        user.pwd = tmp; //restore password after serialization
        store.setItem(storeKeysPrefix + user.id, userString);
    };
    
    Object.preventExtensions(this);
};