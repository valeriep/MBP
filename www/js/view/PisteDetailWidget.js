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
        parentDisplay.call(this, data);

        jQuery('#mark-popup').popup({
            beforeposition : function(event, ui) {
                jQuery('#snow').val(piste.averageMarks.snow).slider("refresh");
                jQuery('#sun').val(piste.averageMarks.sun).slider("refresh");
                jQuery('#vertical-drop').val(piste.averageMarks.verticalDrop).slider("refresh");
                jQuery('#length').val(piste.averageMarks.length).slider("refresh");
                jQuery('#view').val(piste.averageMarks.view).slider("refresh");
                jQuery(this).css('width', Math.floor(8 * jQuery(window).width() / 10).toString() + 'px');
            },
        });

        jQuery('#mark-form').submit(function() {
            jQuery('#mark-popup').popup("close");
            return false;
        });

        jQuery('#comment-popup').popup({
            beforeposition : function(event, ui) {
                jQuery(this).css('width', Math.floor(8 * jQuery(window).width() / 10).toString() + 'px');
            },
        });

        jQuery('#comment-form').submit(function() {
            jQuery('#comment-popup').popup("close");
            return false;
        });
    };

    Object.preventExtensions(this);
};