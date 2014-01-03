"use strict";

/**
 * @constructor
 * @author ch4mp@c4-soft.com
 */
mbp.SynchronizationService = function() {
    var lastUpdate = localStorage.getItem('mbp.sync.lastUpdate') || '';
    
    /**
     * 
     * @param {mbp.Piste} piste
     */
    this.uploadPiste = function(piste) {
        var answer = app.seolanRepo.addPiste(piste);
        piste.id = answer.id;
        piste.lastUpdate = answer.lastUpdate;
        app.localPisteRepo.savePiste(piste);
    };

    /**
     * 
     * @param {Number} userId
     * @param {mbp.PisteMarks} marks
     */
    this.uploadPisteMarks = function(userId, marks) {
        var answer = app.seolanRepo.addMarks(userId, marks);
        marks.lastUpdate = answer.lastUpdate;
        app.localMarksRepo.savePisteMarks(userId, marks);
    };
    
    /**
     * 
     * @param {mbp.Comment} comment
     */
    this.uploadComment = function(comment) {
        var answer = app.seolanRepo.addComment(comment);
        comment.id = answer.id;
        comment.lastUpdate = answer.lastUpdate;
        app.localCommentRepo.saveComment(comment);
    };

    this.updateLocalResorts = function() {
        var lastUpdateRefreshed = false, i = null;
        
        //process resorts (one page at a time)
        app.seolanRepo.getAllResorts(lastUpdate, function(answer) {
            if(!lastUpdateRefreshed) {
                lastUpdate = answer.timestamp;
                lastUpdateRefreshed = true;
            }
            for(i in remoteResorts) {
                app.localResortRepo.saveResort(new mbp.Resort(remoteResorts[i]));
            }
        });
    };

    this.updateLocalPistes = function() {
        app.seolanRepo.getAllPistes(lastUpdate, function(remotePistes) {
            var resortId = null, pisteId = null;
            for(resortId in remotePistes) {
                for(pisteId in remotePistes[resortId]) {
                    app.localPisteRepo.savePiste(new mbp.Piste(remotePistes[resortId][pisteId]));
                }
            }
        });
    };

    this.run = function() {
        if (app.device.isOnline()) {
            app.localPisteRepo.eachPistesToSend(uploadPiste);
            app.localMarksRepo.eachPisteMarksToSend(uploadPisteMarks);
            app.localCommentRepo.eachCommentsToSend(uploadComment);
            updateLocalResorts();
            updateLocalPistes();
            localStorage.setItem('mbp.sync.lastUpdate', lastUpdate);
        }
    };
};