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
        var iPiste = null;
        parentDisplay.call(this, pistes);
        $('.piste-brief').on('click', function(event) {
            var pisteId = $(this).attr('data-piste-id');
            var piste = null;
            for(iPiste in pistes) {
                if(pisteId == pistes[iPiste].id) {
                    piste = pistes[iPiste];
                    break;
                }
            }
            new mbp.PisteDetailWidget().display(piste);
            event.preventDefault();
            return false;
        });
    };

    Object.preventExtensions(this);
};