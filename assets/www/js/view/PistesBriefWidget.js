"use strict";

/**
 * Pistes brief Widget
 * 
 * @constructor
 * @param {mbp.Resort} resort
 * @author Ch4mp
 * 
 */
mbp.PistesBriefWidget = function(resort) {
    mbp.Widget.call(this, '#dot-mark-snippet, #dot-pistes-brief');// parent constructor
    var parentDisplay = this.display;// save reference to Widget display function to call it from overloading function

    /**
     * @returns {Object} template variable data
     */
    this.createTemplateData = function() {
        return resort;
    };

    /**
     * Triggers Widget display and registers UI & form event handlers
     */
    this.display = function() {
        parentDisplay.call(this);
    };

    Object.preventExtensions(this);
};