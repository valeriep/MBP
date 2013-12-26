"use strict";

/**
 * 
 * @constructor
 * @author ch4mp@c4-soft.com
 */
mbp.JsonConverter = function() {
    var instance = this;
    
    /**
     * @param {mbp.Resort} resort
     * @returns {String}
     */
    this.ResortToJson = function(resort) {
        var jsonResort = instance.ResortToJsonResort(resort);
        return instance.JsonResortToJson(jsonResort);
    };

    /**
     * @param {String} jsonString
     * @returns {mbp.Resort}
     */
    this.ResortFromJson = function(jsonString) {
        var jsonResort = instance.JsonResortFromJson(jsonString);
        return instance.JsonResortToResort(jsonResort);
    };
    
    /**
     * @private
     * @param {mbp.PisteMarks} pisteMarks
     * @returns {mbp.PisteMarks}
     */
    this.PisteMarksToJsonMarks = function(pisteMarks) {
        return pisteMarks;
    };
    
    /**
     * @private
     * @param {Object} jsonMarks
     * @returns {mbp.PisteMarks}
     */
    this.JsonMarksToPisteMarks = function(jsonMarks) {
        if(!jsonMarks) {
            return null;
        }
        return new mbp.PisteMarks(jsonMarks.snow, jsonMarks.sun, jsonMarks.access, jsonMarks.verticalDrop, jsonMarks.length, jsonMarks.view, jsonMarks.pisteId, jsonMarks.lastUpdate);
    };
    
    /**
     * @private
     * @param {mbp.Comment} comment
     * @returns {mbp.JsonComment}
     */
    this.CommentToJsonComment = function(comment) {
        if(!comment) {
            return null;
        }
        return new mbp.JsonComment(comment.id, comment.lastUpdate, comment.creatorId, comment.text, comment.accepted, comment.rejectCause);
    };
    
    /**
     * @private
     * @param {mbp.JsonComment} jsonComment
     * @returns {mbp.Comment}
     */
    this.JsonCommentToComment = function(jsonComment) {
        if(!jsonComment) {
            return null;
        }
        return new mbp.Comment(jsonComment.id, jsonComment.lastUpdate, null, jsonComment.creatorId, jsonComment.text, jsonComment.accepted, jsonComment.rejectCause);
    };
    
    /**
     * @private
     * @param {mbp.Piste} piste
     * @returns {mbp.JsonPiste}
     */
    this.PisteToJsonPiste = function(piste) {
        if(!piste) {
            return null;
        }
        var jsonPiste = new mbp.JsonPiste(
                piste.id,
                piste.lastUpdate,
                piste.creatorId,
                piste.name,
                piste.color,
                piste.description,
                piste.getImages(),
                piste.averageMarks,
                piste.marksCount,
                piste.accepted,
                piste.rejectCause,
                new Array(),
                {});
        
        piste.eachComment(function(comment) {
            var jsonComment = instance.CommentToJsonComment(comment);
            if(jsonComment) {
                jsonPiste.comments.push(jsonComment);
            }
        });
        
        piste.eachUserMarks(function(userId, usermarks) {
            if(userId) {
                jsonPiste.userMarks[userId] = instance.PisteMarksToJsonMarks(usermarks);
            }
        });
        
        return jsonPiste;
    };
    
    /**
     * @private
     * @param {mbp.JsonPiste} jsonPiste
     * @returns {mbp.Piste}
     */
    this.JsonPisteToPiste = function(jsonPiste) {
        if(!jsonPiste) {
            return null;
        }
        var averageMarks = instance.JsonMarksToPisteMarks(jsonPiste.averageMarks);
        var piste = new mbp.Piste(jsonPiste.id, jsonPiste.lastUpdate, null, jsonPiste.creatorId, jsonPiste.name, jsonPiste.color, jsonPiste.description, jsonPiste.images, averageMarks, jsonPiste.marksCount, jsonPiste.accepted, jsonPiste.rejectCause);
        var iComment = null, jsonComment, comment;
        for(iComment in jsonPiste.comments) {
            jsonComment = jsonPiste.comments[iComment];
            comment = instance.JsonCommentToComment(jsonComment);
            piste.addComment(comment);
        }
        var userId = null, jsonMarks, pisteMarks;
        for(userId in jsonPiste.userMarks) {
            jsonMarks = jsonPiste.userMarks[userId];
            pisteMarks = instance.JsonMarksToPisteMarks(jsonMarks);
            piste.addUserMarks(userId, pisteMarks);
        }
        return piste;
    };
    
    /**
     * @private
     * @param {mbp.Resort} resort
     * @returns {mbp.JsonResort}
     */
    this.ResortToJsonResort = function(resort) {
        if(!resort) {
            return null;
        }
        var jsonResort = new mbp.JsonResort(resort.id, resort.lastUpdate, resort.name, resort.country, resort.area, resort.lat, resort.lon, new Array());
        
        resort.eachPiste(function(piste) {
            jsonResort.pistes.push(instance.PisteToJsonPiste(piste));
        });
        
        return jsonResort;
    };
    
    /**
     * @private
     * @param {mbp.JsonResort} jsonResort
     * @returns {mbp.Resort}
     */
    this.JsonResortToResort = function(jsonResort) {
        if(!jsonResort) {
            return null;
        }
        var resort = new mbp.Resort(jsonResort.id, jsonResort.lastUpdate, jsonResort.name, jsonResort.country, jsonResort.area, jsonResort.lat, jsonResort.lon);
        var iPiste = null;
        for(iPiste in jsonResort.pistes) {
            resort.addPiste(instance.JsonPisteToPiste(jsonResort.pistes[iPiste]));
        }
        return resort;
    };
    
    /**
     * @private
     * @param {String} jsonString
     * @returns {mbp.JsonResort}
     */
    this.JsonResortFromJson = function(jsonString) {
        if(!jsonString) {
            return null;
        }
        var obj = JSON.parse(jsonString);
        if(!obj) {
            return null;
        }
        return new mbp.JsonResort(obj.id, obj.lastUpdate, obj.name, obj.country, obj.area, obj.lat, obj.lon, obj.pistes);
    };
    
    /**
     * @private
     * @param {mbp.JsonResort} jsonResort
     * @returns {String}
     */
    this.JsonResortToJson = function(jsonResort) {
        return JSON.stringify(jsonResort);
    };
    
};