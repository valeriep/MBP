"use strict";

/**
 * Piste detail Widget
 * @constructor
 * @author ch4mp@c4-soft.com
 */
mbp.PisteDetailWidget = function() {
    mbp.Widget.call(this, '#dot-piste-detail');// parent constructor
    var parentDisplay = this.show;// save reference to Widget display function to call it from overloading function
    var currentPiste = null;

    var infoWidget = new mbp.PisteInfoWidget('#piste-detail .info');
    var imagesWidget = new mbp.PictureGalleryWidget('#piste-detail .images');
    var marksWidget = new mbp.PisteMarksWidget('#piste-detail .marks');
    var commentsWidget = new mbp.PisteCommentsWidget('#piste-detail .comments');
    var addMarksWidget = new mbp.AddPisteMarksWidget('#piste-detail .add-marks', marksWidget);
    var addCommentWidget = new mbp.AddPisteCommentWidget('#piste-detail .add-comment', commentsWidget);
    var pictureWidget = new mbp.PicturePopupWidget('#piste-detail .picture-popup', selectedPictureChanged);

    /**
     * Triggers Widget display and registers UI & form event handlers
     * @param {mb.Piste} piste
     */
    this.show = function(piste) {
        currentPiste = piste;
        parentDisplay.call(this, piste);
        infoWidget.show(piste);
        imagesWidget.show(piste);
        marksWidget.show(piste);
        addMarksWidget.show(piste);
        addCommentWidget.show(piste);
        commentsWidget.show(piste);
        pictureWidget.show();
    };
    
    function selectedPictureChanged(pictureSrc) {
        if(currentPiste) {
            currentPiste.picture = pictureSrc;
            app.localResortRepo.saveResort(currentPiste.getResort());
            imagesWidget.show(currentPiste);
        }
    }

    Object.preventExtensions(this);
};