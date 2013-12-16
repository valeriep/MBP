"use strict";

/**
 * Add piste marks widget
 * @constructor
 * @param {String} jQuerySelector where to insert widget content
 * @param {mbp.PisteMarksWidget} marksWidget
 * @author ch4mp@c4-soft.com
 */
mbp.AddPisteMarksWidget = function(jQuerySelector, marksWidget) {
    mbp.Widget.call(this, '#dot-piste-add-marks', jQuerySelector);// parent constructor
    var parentDisplay = this.show;// save reference to Widget display function to call it from overloading function

    /**
     * Triggers Widget display and registers UI & form event handlers
     * @param {mb.Piste} piste
     */
    this.show = function(piste) {
        var data = Object.create(piste);
        data.user = app.user;
        parentDisplay.call(this, data);

        jQuery('#marks-popup').popup({
            beforeposition : function(event, ui) {
                var initialMarks = piste.getUserMarks(app.user.id);
                if (!initialMarks || !app.user.isAuthenticated()) {
                    initialMarks = piste.averageMarks;
                }
                jQuery('#snow').val(initialMarks.snow).slider("refresh");
                jQuery('#sun').val(initialMarks.sun).slider("refresh");
                jQuery('#access').val(initialMarks.access).slider("refresh");
                jQuery('#vertical-drop').val(initialMarks.verticalDrop).slider("refresh");
                jQuery('#length').val(initialMarks.length).slider("refresh");
                jQuery('#view').val(initialMarks.view).slider("refresh");
                jQuery(this).css('width', Math.floor(8 * jQuery(window).width() / 10).toString() + 'px');
            },
        });

        jQuery('#marks-form').unbind('submit').submit(
                function(data) {
                    var userMarks = new mbp.PisteMarks(
                            jQuery('#snow').val(),
                            jQuery('#sun').val(),
                            jQuery('#access').val(),
                            jQuery('#vertical-drop').val(),
                            jQuery('#length').val(),
                            jQuery('#view').val(),
                            piste.id,
                            null);
                    jQuery('#marks-popup').popup("close");
                    if (app.user.isAuthenticated()) {
                        piste.lastUpdate = null;
                        piste.updateMarksAverage(app.user.id, userMarks);
                        app.localResortRepo.saveResort(piste.getResort());
                        marksWidget.show(piste);
                    }
                    return false;
                });
    };

    Object.preventExtensions(this);
};