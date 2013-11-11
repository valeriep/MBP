"use strict";

/**
 * Pistes brief Widget
 * 
 * @constructor
 * @author Ch4mp
 * 
 */
mbp.PistesBriefWidget = function() {
    mbp.Widget.call(this, '#dot-mark-snippet, #dot-pistes-brief');// parent constructor
    var parentDisplay = this.display;// save reference to Widget display function to call it from overloading function

    /**
     * Triggers Widget display and registers UI & form event handlers
     * @param {mbp.Resort} resort
     */
    this.display = function(resort) {
        parentDisplay.call(this, resort);
    };

    Object.preventExtensions(this);
};