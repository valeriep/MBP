"use strict";

/**
 * Piste detail Widget
 * @constructor
 * @author ch4mp@c4-soft.com
 */
mbp.PisteDetailWidget = function(app) {
    mbp.Widget.call(this, '#dot-mark-snippet, #dot-piste-detail');// parent constructor
    var parentDisplay = this.display;// save reference to Widget display function to call it from overloading function
    var instance = this;

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
                var initialMarks = piste.getUserMarks(user.id);
                if(!initialMarks || !user.isAuthenticated()) {
                    initialMarks = piste.averageMarks;
                }
                jQuery('#snow').val(initialMarks.snow).slider("refresh");
                jQuery('#sun').val(initialMarks.sun).slider("refresh");
                jQuery('#vertical-drop').val(initialMarks.verticalDrop).slider("refresh");
                jQuery('#length').val(initialMarks.length).slider("refresh");
                jQuery('#view').val(initialMarks.view).slider("refresh");
                jQuery(this).css('width', Math.floor(8 * jQuery(window).width() / 10).toString() + 'px');
            },
        });

        jQuery('#mark-form').unbind('submit').submit(
                function(data) {
                    var userMarks = new mbp.PisteMarks(
                            jQuery('#snow').val(),
                            jQuery('#sun').val(),
                            jQuery('#vertical-drop').val(),
                            jQuery('#length').val(),
                            jQuery('#view').val(),
                            piste.id,
                            null);
                    jQuery('#mark-popup').popup("close");
                    if (user.isAuthenticated()) {
                        var prevUserMarks = piste.getUserMarks(user.id);
                        piste.lastUpdate = null;
                        piste.addUserMarks(user.id, userMarks);
                        piste.averageMarks = computeMarksAverage(piste.averageMarks, piste.marksCount, prevUserMarks, userMarks);
                        if(!prevUserMarks) {
                            piste.marksCount += 1;
                        }
                        app.services.localResortRepo.saveResort(piste.getResort());
                        instance.display(piste, user);
                    }
                    return false;
                });

        jQuery('#comment-popup').popup({
            beforeposition : function(event, ui) {
                jQuery(this).css('width', Math.floor(8 * jQuery(window).width() / 10).toString() + 'px');
            },
        });

        jQuery('#comment-form').unbind('submit').submit(function() {
            jQuery('#comment-popup').popup("close");
            var text = jQuery('#new-comment-text').val();
            if (text && user.isAuthenticated()) {
                piste.lastUpdate = null;
                new mbp.Comment(piste.id + jQuery.now(), null, piste, user.id, text, null, null);
                mbp.LocalResortRepository.getInstance().saveResort(piste.getResort());
                jQuery('#new-comment-text').val('');
                instance.display(piste, user);
            }
            return false;
        });
    };
    
    function computeMarksAverage(prevAvg, prevMarksCnt, prevUserMarks, newUserMarks) {
        var averageMarks = new mbp.PisteMarks(0, 0, 0, 0, 0, prevAvg.pisteId, null);
        if(prevUserMarks) {
            averageMarks.snow = (prevMarksCnt * prevAvg.snow - prevUserMarks.snow + newUserMarks.snow) / prevMarksCnt;
            averageMarks.sun = (prevMarksCnt * prevAvg.sun - prevUserMarks.sun + newUserMarks.sun) / prevMarksCnt;
            averageMarks.verticalDrop = (prevMarksCnt * prevAvg.verticalDrop - prevUserMarks.verticalDrop + newUserMarks.verticalDrop) / prevMarksCnt;
            averageMarks.length = (prevMarksCnt * prevAvg.length - prevUserMarks.length + newUserMarks.length) / prevMarksCnt;
            averageMarks.view = (prevMarksCnt * prevAvg.view - prevUserMarks.view + newUserMarks.view) / prevMarksCnt;
        } else {
            averageMarks.snow = (prevMarksCnt * prevAvg.snow + newUserMarks.snow) / (prevMarksCnt + 1);
            averageMarks.sun = (prevMarksCnt * prevAvg.sun + newUserMarks.sun) / (prevMarksCnt + 1);
            averageMarks.verticalDrop = (prevMarksCnt * prevAvg.verticalDrop + newUserMarks.verticalDrop) / (prevMarksCnt + 1);
            averageMarks.length = (prevMarksCnt * prevAvg.length + newUserMarks.length) / (prevMarksCnt + 1);
            averageMarks.view = (prevMarksCnt * prevAvg.view + newUserMarks.view) / (prevMarksCnt + 1);
        }
        return averageMarks;
    }

    Object.preventExtensions(this);
};