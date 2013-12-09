"use strict";

/**
 * Piste detail Widget
 * @constructor
 * @param {mbp.MyBestPistes} app
 * @author ch4mp@c4-soft.com
 */
mbp.PisteDetailWidget = function(app) {
    mbp.Widget.call(this, '#dot-piste-detail');// parent constructor
    var parentDisplay = this.display;// save reference to Widget display function to call it from overloading function
    var currentPiste = null;

    var infoWidget = new mbp.PisteInfoWidget('#piste-detail .info');
    var imagesWidget = new mbp.PictureGalleryWidget('#piste-detail .images');
    var marksWidget = new mbp.PisteMarksWidget('#piste-detail .marks');
    var commentsWidget = new mbp.PisteCommentsWidget('#piste-detail .comments');
    var addMarksWidget = new mbp.AddPisteMarksWidget(app, '#piste-detail .add-marks', marksWidget);
    var addCommentWidget = new mbp.AddPisteCommentWidget(app, '#piste-detail .add-comment', commentsWidget);
    var pictureWidget = new mbp.PicturePopupWidget(app, '#piste-detail .picture-popup', selectedPictureChanged);

    /**
     * Triggers Widget display and registers UI & form event handlers
     * @param {mb.Piste} piste
     */
    this.display = function(piste) {
        currentPiste = piste;
        parentDisplay.call(this, piste);
        infoWidget.display(piste);
        imagesWidget.display(piste);
        marksWidget.display(piste);
        addMarksWidget.display(piste);
        addCommentWidget.display(piste);
        commentsWidget.display(piste);
        pictureWidget.display();
    };
    
    function selectedPictureChanged(pictureSrc) {
        if(currentPiste) {
            currentPiste.picture = pictureSrc;
            app.services.localResortRepo.saveResort(currentPiste.getResort());
        }
    }

    Object.preventExtensions(this);
};