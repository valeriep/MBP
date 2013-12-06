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

    var infoWidget = new mbp.PisteInfoWidget('#info');
    var imagesWidget = new mbp.PictureGalleryWidget('#images');
    var marksWidget = new mbp.PisteMarksWidget('#marks');
    var commentsWidget = new mbp.PisteCommentsWidget('#comments');
    var addMarksWidget = new mbp.AddPisteMarksWidget(app, '#add-marks', marksWidget);
    var addCommentWidget = new mbp.AddPisteCommentWidget(app, '#add-comment', commentsWidget);

    /**
     * Triggers Widget display and registers UI & form event handlers
     * @param {mb.Piste} piste
     */
    this.display = function(piste) {
        parentDisplay.call(this, piste);
        infoWidget.display(piste);
        imagesWidget.display(piste);
        marksWidget.display(piste);
        addMarksWidget.display(piste);
        addCommentWidget.display(piste);
        commentsWidget.display(piste);
    };

    Object.preventExtensions(this);
};