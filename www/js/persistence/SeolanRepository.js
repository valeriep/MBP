"use strict";

/**
 * 
 * @constructor
 * @author ch4mp@c4-soft.com
 */
mbp.SeolanRepository = function() {
    var pageSize = 1000;
    var pageSizeComments = 20;

    /**
     * 
     * @param {String} lastUpdate
     * @param {Function} onSummariesRetrieved
     */
    this.getAllResorts = function(lastUpdate, onSummariesRetrieved) {
        var seolanService = new mbp.SeolanService(47, 'browseJson');
        var result, i = null, resorts, page = 0;
        
        var data = {first:0,pagesize:pageSize};
        if(lastUpdate) data.lastUpdate = escape(lastUpdate);
        
        do {
            resorts = new Array();
            data.first = page*pageSize;
            result = seolanService.getObject(data, 30000);
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
        var seolanService = new mbp.SeolanService(40, 'browseJson');
        var result, i = null, pistes, page = 0, piste;
        
        var data = {first:0,pagesize:pageSize};
        if(lastUpdate) data.lastUpdate = escape(lastUpdate);
        
        do {
            pistes = new Array();
            data.first = page*pageSize;
            result = seolanService.getObject(data, 30000);
            page = page + 1;
            for (i in result) {
                piste = new mbp.Piste(result[i]);
                piste.averageMarks.pisteId = piste.id;
                piste.averageMarks.lastUpdate = piste.lastUpdate;
                pistes.push(piste);
            }
    
            onPistesRetrieved(pistes);
        } while(result.length == pageSize)
    };

    /**
     * 
     * @param {mbp.Piste} piste
     * @param {Function} onPisteAdded
     */
    this.addPiste = function(piste, onPisteAdded) {
    	//var seolanService = new mbp.SeolanService(40, 'procInsertJson');
        
    	//FIXME implement
        onPisteAdded( {
            id : piste.id,
            lastUpdate : null,
        });
    };
    
    /**
     * 
     * @param {String} pisteId
     * @param {Function} onImagesRetrieved
     */
    this.getImagesPageByPisteId = function(pisteId, page, onImagesRetrieved) {
        var seolanService = new mbp.SeolanService(49, 'browseJson');
        var result, page = 0;
        var data = {pagesize:10,pisteId:pisteId,first:0};
        do {
        	data.first = page*10;
        	result = seolanService.getObject(data, 10000);
            page++;
            onImagesRetrieved(result);
        } while(result.length == 10)

    };

    /**
     * 
     * @param {String} pisteId
     * @param {?} image
     * @param {Function} onImageAdded
     */
    this.addImage = function(pisteId, image, onImageAdded) {
        //FIXME implement
        onImageAdded({
            src : image
        });
    };
    
    /**
     * 
     * @param {String} pisteId
     * @param {Number} page
     * @param {Function} onCommentsRetrieved
     */
    this.getCommentsPageByPisteId = function(pisteId, page, onCommentsRetrieved) {
        var seolanService = new mbp.SeolanService(63, 'browseJson');
        
        var data = {pisteId:pisteId,first:page*pageSizeComments,pagesize:pageSizeComments};
        
        var result = seolanService.getObject(data, 10000), i = null, comments = [], comment;

        for (i in result) {
            comment = new mbp.Comment(result[i]);
            comment.pisteId = pisteId;
            comments.push(comment);
        }

        onCommentsRetrieved(comments);
    };

    /**
     * 
     * @param {mbp.Comment} comment
     */
    this.addComment = function(comment) {
        //FIXME implement
    };
    
    /**
     * 
     * @param {String} userId
     * @param {Function} onPisteMarksRetrieved
     */
    this.getPisteMarksByUserId = function(userId, onPisteMarksRetrieved) {
        var seolanService = new mbp.SeolanService(42, 'browseJson');
        var data = {first:0,mbpUserId:userId,pagesize:pageSize};
        var result, page = 0, marks, pisteId = null;

        do {
            marks = {};
            data.first = page*pageSize;
            result = seolanService.getObject(data, 10000);
            page++;
            
            for(pisteId in result) {
                marks[pisteId] = new mbp.PisteMarks(result[pisteId]);
            }
            onPisteMarksRetrieved(marks);
        } while(result.length == pageSize)
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