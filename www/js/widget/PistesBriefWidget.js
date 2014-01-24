"use strict";

/**
 * Pistes brief Widget
 * 
 * @constructor
 * @param {String}
 *            hookSelector
 * @param {Function}
 *            onPisteSelected
 * @author ch4mp@c4-soft.com
 */
mbp.PistesBriefWidget = function(hookSelector, onPisteSelected) {
    mbp.Widget.call(this, '#dot-mark-snippet, #dot-pistes-brief', hookSelector);// parent
                                                                                // constructor
    var parentShow = this.show;// save reference to Widget display function to
                                // call it from overloading function

    /**
     * Triggers Widget display and registers UI & form event handlers
     * 
     * @param {Array} pistes
     */
    this.show = function(pistes) {
        var resorts = {}, iPiste = null;
        // FIXME find a way to navigate through pages
        pistes.splice(20);
        for (iPiste in pistes) {
            if (!resorts.hasOwnProperty(pistes[iPiste].resortId)) {
                app.localResortRepo.getResortById(pistes[iPiste].resortId, function(resort) {
                    resorts[pistes[iPiste].resortId] = resort;
                });
            }
        }
        parentShow.call(this, {
            resorts : resorts,
            pistes : pistes
        });
        jQuery('.piste-brief').unbind('click').click(function(event) {
            event.preventDefault();
            var pisteId = jQuery(this).attr('data-piste-id');
            var piste = null;
            for (iPiste in pistes) {
                if (pisteId == pistes[iPiste].id) {
                    piste = pistes[iPiste];
                    break;
                }
            }
            onPisteSelected(piste);
            return false;
        });
    };

    Object.preventExtensions(this);
};