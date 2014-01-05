"use strict";

/**
 * @constructor
 * @author ch4mp@c4-soft.com
 */
mbp.SynchronizationService = function() {
    var instance = this, lastUpdate = localStorage.getItem('mbp.sync.lastUpdate') || '';
    
    /**
     * 
     * @param {mbp.Piste} piste
     */
    this.uploadPiste = function(piste) {
        var answer = app.seolanRepo.addPiste(piste);
        
        app.localPisteRepo.removePiste(piste.id);
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
        app.localPisteRepo.getPisteById(marks.pisteId, function(piste) {
            app.localPisteRepo.savePiste(piste);
        });
    };
    
    /**
     * 
     * @param {mbp.Comment} comment
     */
    this.uploadComment = function(comment) {
        var answer = app.seolanRepo.addComment(comment);
        comment.id = answer.id;
        comment.lastUpdate = answer.lastUpdate;
    };

    this.updateLocalResorts = function() {
        var lastUpdateRefreshed = false, i = null;
        
        //process resorts (one page at a time)
        app.seolanRepo.getAllResorts(lastUpdate, function(answer) {
            if(!lastUpdateRefreshed) {
                lastUpdate = answer.timestamp;
                lastUpdateRefreshed = true;
            }
            for(i in answer.resorts) {
                app.localResortRepo.saveResort(new mbp.Resort(answer.resorts[i]));
            }
        });
    };

    this.updateLocalPistes = function() {
        app.seolanRepo.getAllPistes(lastUpdate, function(remotePistes) {
            var i = null;
            for(i in remotePistes) {
                app.localPisteRepo.savePiste(new mbp.Piste(remotePistes[i]));
            }
        });
    };

    this.run = function() {
        if (app.device.isOnline()) {
            app.localPisteRepo.eachPistesToSend(instance.uploadPiste);
            app.localPisteRepo.eachPisteMarksToSend(instance.uploadPisteMarks);
            app.localCommentRepo.eachComment(instance.uploadComment);
            app.localCommentRepo.clear();
            instance.updateLocalResorts();
            instance.updateLocalPistes();
            localStorage.setItem('mbp.sync.lastUpdate', lastUpdate);
        }
    };
};