"use strict";

/**
 * Piste detail Widget
 * @constructor
 * @author ch4mp@c4-soft.com
 */
mbp.PisteDetailWidget = function() {
    mbp.Widget.call(this, '#dot-mark-snippet, #dot-piste-detail');// parent constructor
    var parentDisplay = this.display;// save reference to Widget display function to call it from overloading function

    /**
     * Triggers Widget display and registers UI & form event handlers
     * @param {mb.Piste} piste
     * @param {mb.User} user
     */
    this.display = function(piste, user) {
        var data = Object.create(piste);
        data.user = user;
        data.minWidth = Math.floor(3 * jQuery(window).width() / 4).toString() + 'px';
        parentDisplay.call(this, data);
    };

    Object.preventExtensions(this);
};