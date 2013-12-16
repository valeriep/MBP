"use strict";

/**
 * Piste detail Widget
 * @constructor
 * @param {String} jQuerySelector where to insert widget content
 * @param {mbp.PisteCommentsWidget} commentsWidget
 * @author ch4mp@c4-soft.com
 */
mbp.AddPisteCommentWidget = function(jQuerySelector, commentsWidget) {
    mbp.Widget.call(this, '#dot-piste-add-comment', jQuerySelector);// parent constructor
    var parentShow = this.show;// save reference to Widget display function to call it from overloading function

    /**
     * Triggers Widget display and registers UI & form event handlers
     * @param {mb.Piste} piste
     */
    this.show = function(piste) {
        var data = Object.create(piste);
        data.user = app.user;
        parentShow.call(this, data);

        jQuery('#comment-popup').popup({
            beforeposition : function(event, ui) {
                jQuery(this).css('width', Math.floor(8 * jQuery(window).width() / 10).toString() + 'px');
            },
        });

        jQuery('#comment-form').unbind('submit').submit(function() {
            jQuery('#comment-popup').popup("close");
            var text = mbp.sanitize(jQuery('#new-comment-text').val());
            if (text && app.user.isAuthenticated()) {
                piste.lastUpdate = null;
                new mbp.Comment(piste.id + jQuery.now(), null, piste, app.user.id, text, null, null);
                app.localResortRepo.saveResort(piste.getResort());
                jQuery('#new-comment-text').val('');
                commentsWidget.show(piste);
            }
            return false;
        });
    };

    Object.preventExtensions(this);
};