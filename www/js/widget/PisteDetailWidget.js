"use strict";

/**
 * Piste detail Widget
 * @constructor
 * @param {String} hookSelector
 * @author ch4mp@c4-soft.com
 */
mbp.PisteDetailWidget = function(hookSelector) {
    mbp.Widget.call(this, '#dot-piste-detail', hookSelector);// parent constructor
    var instance = this, parentShow = this.show;// save reference to Widget display function to
                                // call it from overloading function
    /** @type mbp.Piste */
    var currentPiste = null;

    var infoWidget = new mbp.PisteInfoWidget(instance.getJQuerySelector() + ' .piste-detail .info');
    var imagesWidget = new mbp.PictureGalleryWidget(instance.getJQuerySelector() + ' .piste-detail .images');
    var marksWidget = new mbp.PisteMarksWidget(instance.getJQuerySelector() + ' .piste-detail .marks');
    var commentsWidget = new mbp.PisteCommentsWidget(instance.getJQuerySelector() + ' .piste-detail .comments');
    var addMarksWidget = new mbp.AddPisteMarksWidget(instance.getJQuerySelector() + ' .piste-detail .add-marks', marksWidget);
    var addCommentWidget = new mbp.AddPisteCommentWidget(instance.getJQuerySelector() + ' .piste-detail .add-comment', commentsWidget);
    var pictureWidget = new mbp.PicturePopupWidget(instance.getJQuerySelector() + ' .piste-detail .picture-popup', selectedPictureChanged);

    /**
     * Triggers Widget display and registers UI & form event handlers
     * @param {mb.Piste} piste
     */
    this.show = function(piste) {
        app.localResortRepo.getResortById(piste.resortId, function(resort) {
            currentPiste = piste;
            parentShow.call(this);
            infoWidget.show({
                resort : resort,
                piste : piste
            });
            imagesWidget.show(piste);
            marksWidget.show(piste);
            addMarksWidget.show(piste);
            addCommentWidget.show({
                user : app.user
            });
            pictureWidget.show();
        });
        if(app.device.isOnline()) {
            app.seolanRepo.getCommentsPageByPisteId(piste.id, 0, function(comments) { 
                commentsWidget.show(comments);
            });
        }
    };

    function selectedPictureChanged(pictureSrc) {
        if (currentPiste) {
            currentPiste.images.push(pictureSrc);
            app.localPisteRepo.savePiste(currentPiste);
            imagesWidget.show(currentPiste);
        }
    }

    Object.preventExtensions(this);
};