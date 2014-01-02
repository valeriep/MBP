"use strict";

/**
 * 
 * @constructor
 * @author ch4mp@c4-soft.com
 */
mbp.SeolanResortRepository = function() {
    var pageSize = 1000;

    /**
     * 
     * @param {String} lastUpdate
     * @param {Function} onSummariesRetrieved
     */
    this.getAllResorts = function(lastUpdate, onSummariesRetrieved) {
        var seolanService = new mbp.SeolanService(47, 'browseJson' + (lastUpdate ? '&lastUpdate=' + escape(lastUpdate) : ''), pageSize);
        var result, i = null, resorts = new Array(), jsonResort, page = 0;
        
        do {
            result = seolanService.getObject({}, 30000, page);
            page = page + 1;
            for (i in result.resorts) {
                jsonResort = result.resorts[i];
                resorts.push(new mbp.Resort(jsonResort.id, jsonResort.lastUpdate, jsonResort.name, jsonResort.country, jsonResort.area, jsonResort.lat, jsonResort.lon));
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
                piste = new mbp.Piste();
                piste.id = result[i].id;
                piste.lastUpdate = result[i].lastUpdate;
                piste.creatorId = result[i].creatorId;
                piste.name = result[i].name;
                piste.color = result[i].color;
                piste.description = result[i].description;
                piste.averageMarks = new mbp.PisteMarks(
                        result[i].averageMarks.snow,
                        result[i].averageMarks.sun,
                        result[i].averageMarks.access,
                        result[i].averageMarks.verticalDrop,
                        result[i].averageMarks.length,
                        result[i].averageMarks.view,
                        result[i].id);
                piste.marksCount = result[i].marksCount;
                piste.accepted = result[i].accepted;
                if (!pistes.hasOwnProperty(result[i].resortId)) {
                    pistes[result[i].resortId] = new Array();
                }
                pistes[result[i].resortId].push(piste);
            }
    
            onPistesRetrieved(pistes);
        } while(result.length == pageSize)
    };

    /**
     * 
     * @param {mbp.Piste} piste
     */
    this.addPiste = function(piste) {
    };

    /**
     * 
     * @param {String} userId
     * @param {mbp.PisteMarks} marks
     */
    this.addMarks = function(userId, marks) {
    };

    /**
     * 
     * @param {mbp.Comment} comment
     */
    this.addComment = function(comment) {
    };
};