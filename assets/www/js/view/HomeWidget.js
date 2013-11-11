"use strict";

/**
 * Home Widget
 * 
 * @constructor
 * @author Ch4mp
 * 
 */
mbp.HomeWidget = function(onLogout) {
    mbp.Widget.call(this, '#dot-home');// parent constructor
    var parentDisplay = this.display;// save reference to Widget display function to call it from overloading function

    /**
     * Triggers Widget display
     * @param {mbp.User} user User to authenticate. If provided it is used to fill "username" field
     */
    this.display = function(user) {
        parentDisplay.call(this, user);
        $('.logout').click(function() {
            onLogout();
        });
    };

    Object.preventExtensions(this);
};