"use strict";

/**
 * @constructor
 * @author ch4mp@c4-soft.com
 */
mbp.SynchronizationService = function() {
    var instance = this, lastUpdate = localStorage.getItem('mbp.sync.lastUpdate') || '';

    /**
     * Replaces -in local resort- the record with local ID with one having remote ID and update timestamp
     * @param {mbp.Piste} piste
     */
    this.uploadPiste = function(piste) {
        app.seolanRepo.addPiste(piste, function(answer) {
            app.localPisteRepo.removePiste(piste.id);
            piste.id = answer.id;
            piste.lastUpdate = answer.lastUpdate;
            app.localPisteRepo.savePiste(piste);
        });
    };

    /**
     * Pushes user marks with null lastUpdate to the server and sets lastUpdate to what the server returns
     * @param {Number} userId
     * @param {mbp.PisteMarks} marks
     */
    this.uploadPisteMarks = function(userId, marks) {
        app.seolanRepo.addMarks(userId, marks, function(answer) {
            marks.lastUpdate = answer.lastUpdate;
            app.localPisteRepo.getPisteById(marks.pisteId, function(piste) {
                piste.userMarks[userId] = marks;
                app.localPisteRepo.savePiste(piste);
            });
        });
    };

    /**
     * 
     * @param {mbp.Comment} comment
     */
    this.uploadComment = function(comment) {
        app.seolanRepo.addComment(comment);
    };

    this.updateLocalResorts = function() {
        var lastUpdateRefreshed = false, i = null;

        // process resorts (one page at a time)
        app.seolanRepo.getAllResorts(lastUpdate, function(answer) {
            if (!lastUpdateRefreshed) {
                lastUpdate = answer.timestamp;
                lastUpdateRefreshed = true;
            }
            for (i in answer.resorts) {
                app.localResortRepo.saveResort(new mbp.Resort(answer.resorts[i]));
            }
        });
    };

    this.updateLocalPistes = function() {
        app.seolanRepo.getAllPistes(lastUpdate, function(remotePistes) {
            var i = null;
            for (i in remotePistes) {
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