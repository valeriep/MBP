"use strict";

/**
 * 
 * @constructor
 * @author ch4mp@c4-soft.com
 */
mbp.SeolanRepository = function() {
    var pageSize = 1000;

    /**
     * 
     * @param {String} lastUpdate
     * @param {Function} onSummariesRetrieved
     */
    this.getAllResorts = function(lastUpdate, onSummariesRetrieved) {
        var seolanService = new mbp.SeolanService(47, 'browseJson' + (lastUpdate ? '&lastUpdate=' + escape(lastUpdate) : ''), pageSize);
        var result, i = null, resorts = new Array(), page = 0;
        
        do {
            result = seolanService.getObject({}, 30000, page);
            page = page + 1;
            for (i in result.resorts) {
                resorts.push(new mbp.Resort(result.resorts[i]));
            }
    
            onSummariesRetrieved({
                'timestamp' : result.timestamp,
                'resorts' : resorts
            });
        } while(result.resorts.length == pageSize)
    };

    /**
     * Retrieves pistes but doesn't link them to resort
     * @param {String} lastUpdate
     * @param {Function} onPistesRetrieved
     */
    this.getAllPistes = function(lastUpdate, onPistesRetrieved) {
        var seolanService = new mbp.SeolanService(40, 'browseJson' + (lastUpdate ? '&lastUpdate=' + escape(lastUpdate) : ''), pageSize);
        var result = seolanService.getObject({}, 30000), i = null, pistes = {}, piste, page = 0;

        do {
            result = seolanService.getObject({}, 30000, page);
            page = page + 1;
            for (i in result) {
                piste = new mbp.Piste(result[i]);
                piste.averageMarks = new mbp.PisteMarks(result[i].averageMarks);
                if (!pistes.hasOwnProperty(result[i].resortId)) {
                    pistes[result[i].resortId] = {};
                }
                pistes[result[i].resortId][piste.id] = piste;
            }
    
            onPistesRetrieved(pistes);
        } while(result.length == pageSize)
    };

    /**
     * 
     * @param {mbp.Piste} piste
     */
    this.addPiste = function(piste) {
        //FIXME implement
        return {
            id : piste.id,
            lastUpdate : null,
        };
    };
    
    /**
     * 
     * @param {String} pisteId
     * @param {Number} page
     * @param {Function} onImagesRetrieved
     */
    this.getPisteImagesPage = function(pisteId, page, onImagesRetrieved) {
        var seolanService = new mbp.SeolanService(49, 'browseJson&pisteId=' + pisteId, 10);
        var result = seolanService.getObject({}, 10000, page);

        onImagesRetrieved(result);
    };
    
    /**
     * 
     * @param {String} pisteId
     * @param {Number} page
     * @param {Function} onCommentsRetrieved
     */
    this.getPisteCommentsPage = function(pisteId, page, onCommentsRetrieved) {
        var seolanService = new mbp.SeolanService(63, 'browseJson&pisteId=' + pisteId, 20);
        var result = seolanService.getObject({}, 10000, page), i = null, comments = {}, comment;

        for (i in result) {
            comment = new mbp.Comment(result[i]);
            if (!comments.hasOwnProperty(result[i].resortId)) {
                comments[result[i].pisteId] = new Array();
            }
            comments[result[i].pisteId].push(comment);
        }

        onCommentsRetrieved(comments);
    };

    /**
     * 
     * @param {mbp.Comment} comment
     */
    this.addComment = function(comment) {
        //FIXME implement
        return {
            id : comment.id,
            lastUpdate : null,
        };
    };
    
    /**
     * 
     * @param {String} pisteId
     * @param {String} userId
     * @param {Function} onPisteMarksRetrieved
     */
    this.getPisteMarks = function(pisteId, userId, onPisteMarksRetrieved) {
        var seolanService = new mbp.SeolanService(42, 'browseJson&pisteId=' + pisteId + '&userId=' + userId, 1);
        var result = seolanService.getObject({}, 10000, 0);

        onPisteMarksRetrieved(result);
    };

    /**
     * 
     * @param {String} userId
     * @param {mbp.PisteMarks} marks
     */
    this.addMarks = function(userId, marks) {
        //FIXME implement
        return {
            lastUpdate : null,
        };
    };
};