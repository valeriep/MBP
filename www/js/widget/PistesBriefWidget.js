"use strict";

/**
 * Pistes brief Widget
 * @constructor
 * @author ch4mp@c4-soft.com
 */
mbp.PistesBriefWidget = function(app) {
    mbp.Widget.call(this, '#dot-mark-snippet, #dot-pistes-brief');// parent constructor
    var parentDisplay = this.display;// save reference to Widget display function to call it from overloading function

    /**
     * Triggers Widget display and registers UI & form event handlers
     * @param {Object} pistes mapped by id
     * @param {mb.User} user
     */
    this.display = function(pistes) {
        var iPiste = null;
        parentDisplay.call(this, pistes);
        jQuery('.piste-brief').unbind('click').click(function(event) {
            var pisteId = jQuery(this).attr('data-piste-id');
            var piste = null;
            for(iPiste in pistes) {
                if(pisteId == pistes[iPiste].id) {
                    piste = pistes[iPiste];
                    break;
                }
            }
            new mbp.PisteDetailWidget(app).display(piste);
            event.preventDefault();
            return false;
        });
    };

    Object.preventExtensions(this);
};