"use strict";

/**
 * Pistes brief Widget
 * @constructor
 * @param {String} hookSelector
 * @param {Function} onPisteSelected
 * @author ch4mp@c4-soft.com
 */
mbp.PistesBriefWidget = function(hookSelector, onPisteSelected) {
    mbp.Widget.call(this, '#dot-mark-snippet, #dot-pistes-brief', hookSelector);// parent constructor
    var parentShow = this.show;// save reference to Widget display function to call it from overloading function

    /**
     * Triggers Widget display and registers UI & form event handlers
     * @param {Object} data pistes and resorts data
     */
    this.show = function(data) {
        var iPiste = null;
        parentShow.call(this, data);
        jQuery('.piste-brief').unbind('click').click(function(event) {
            event.preventDefault();
            var pisteId = jQuery(this).attr('data-piste-id');
            var piste = null;
            for(iPiste in data.pistes) {
                if(pisteId == data.pistes[iPiste].id) {
                    piste = data.pistes[iPiste];
                    break;
                }
            }
            onPisteSelected(piste);
            return false;
        });
    };

    Object.preventExtensions(this);
};