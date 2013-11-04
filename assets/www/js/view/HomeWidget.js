"use strict";

/**
 * Home Widget
 * 
 * @constructor
 * @param {mbp.User} user User to authenticate. If provided it is used to fill "username" field
 * @author Ch4mp
 * 
 */
mbp.HomeWidget = function(user) {
    mbp.Widget.call(this, '#dot-home');// parent constructor
    var parentDisplay = this.display;// save reference to Widget display function to call it from overloading function

    /**
     * @returns {Object} template variable data
     */
    this.createTemplateData = function() {
        return {
            username : user ? user.getLogin() : undefined
        };
    };

    /**
     * Triggers Widget display
     */
    this.display = function() {
        parentDisplay.call(this);
    };

    Object.preventExtensions(this);
};