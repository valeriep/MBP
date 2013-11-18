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
     * @param {Object} pistes mapped by id
     */
    this.display = function(pistes) {
        var pistesArr = new Array(), pisteId = null;
        for(pisteId in pistes) {
            pistesArr.push(pistes[pisteId]);
        }
        parentDisplay.call(this, pistesArr);
        $('.piste-brief').on('click', function() {
            var pisteId = $(this).attr('data-piste-id');
            var piste = pistes[pisteId];
            new mbp.PisteDetailWidget().display(piste);
            return false;
        });
    };

    Object.preventExtensions(this);
};