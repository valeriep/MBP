"use strict";

mbp.JsonConverter = function() {
    var instance = this;
    var localcommentKeys = Object.keys(new mbp.JsonComment());
    var commentKeys = Object.keys(new mbp.Comment());
    var localpisteKeys = Object.keys(new mbp.JsonPiste());
    var pisteKeys = Object.keys(new mbp.Piste());
    var localresortKeys = Object.keys(new mbp.JsonResort());
    var resortKeys = Object.keys(new mbp.Resort());

    localcommentKeys = JSON.stringify(localcommentKeys);
    commentKeys.splice(commentKeys.indexOf('getPiste'), 1);
    commentKeys.splice(commentKeys.indexOf('setPiste'), 1);
    commentKeys = JSON.stringify(commentKeys);
    if(localcommentKeys !== commentKeys) {
        throw new Error('JsonComment and Comment definitions are not synchronized: JsonComment' + JSON.stringify(localcommentKeys) + ', Comment' + JSON.stringify(commentKeys));
    }
    
    localpisteKeys.splice(localpisteKeys.indexOf('comments'), 1);
    localpisteKeys = JSON.stringify(localpisteKeys);
    pisteKeys.splice(pisteKeys.indexOf('getComment'), 1);
    pisteKeys.splice(pisteKeys.indexOf('addComment'), 1);
    pisteKeys.splice(pisteKeys.indexOf('eachComment'), 1);
    pisteKeys.splice(pisteKeys.indexOf('removeComment'), 1);
    pisteKeys.splice(pisteKeys.indexOf('getCommentsIds'), 1);
    pisteKeys.splice(pisteKeys.indexOf('getResort'), 1);
    pisteKeys.splice(pisteKeys.indexOf('setResort'), 1);
    pisteKeys = JSON.stringify(pisteKeys);
    if(localpisteKeys !== pisteKeys) {
        throw new Error('JsonPiste and Piste definitions are not synchronized: JsonPiste' + localpisteKeys + ', Piste' + pisteKeys);
    }

    localresortKeys.splice(localresortKeys.indexOf('pistes'), 1);
    localresortKeys = JSON.stringify(localresortKeys);
    resortKeys.splice(resortKeys.indexOf('getPiste'), 1);
    resortKeys.splice(resortKeys.indexOf('addPiste'), 1);
    resortKeys.splice(resortKeys.indexOf('removePiste'), 1);
    resortKeys.splice(resortKeys.indexOf('eachPiste'), 1);
    resortKeys.splice(resortKeys.indexOf('getPistesIds'), 1);
    resortKeys = JSON.stringify(resortKeys);
    if(localresortKeys !== resortKeys) {
        throw new Error('JsonResort and Resort definitions are not synchronized: JsonResort' + localresortKeys + ', Resort' + resortKeys);
    }
    
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
     * @param {mbp.Comment} comment
     * @returns {mbp.JsonComment}
     */
    this.CommentToJsonComment = function(comment) {
        return new mbp.JsonComment(comment.id, comment.lastUpdate, comment.creatorId, comment.text, comment.marks, comment.accepted, comment.rejectCause);
    };
    
    /**
     * @private
     * @param {mbp.JsonComment} jsonComment
     * @returns {mbp.Comment}
     */
    this.JsonCommentToComment = function(jsonComment) {
        var marks = new mbp.PisteMarks(jsonComment.marks.snow, jsonComment.marks.sun, jsonComment.marks.slope, jsonComment.marks.length, jsonComment.marks.view, jsonComment.marks.average);
        return new mbp.Comment(jsonComment.id, jsonComment.lastUpdate, null, jsonComment.creatorId, jsonComment.text, marks, jsonComment.accepted, jsonComment.rejectCause);
    };
    
    /**
     * @private
     * @param {mbp.Piste} piste
     * @returns {mbp.JsonPiste}
     */
    this.PisteToJsonPiste = function(piste) {
        var jsonPiste = new mbp.JsonPiste(piste.id, piste.lastUpdate, piste.creatorId, piste.name, piste.color, piste.description, piste.picture, piste.marks, piste.accepted, piste.rejectCause, new Array());
        
        piste.eachComment(function(comment) {
            jsonPiste.comments.push(instance.CommentToJsonComment(comment));
        });
        
        return jsonPiste;
    };
    
    /**
     * @private
     * @param {mbp.JsonPiste} jsonPiste
     * @returns {mbp.Piste}
     */
    this.JsonPisteToPiste = function(jsonPiste) {
        var marks = new mbp.PisteMarks(jsonPiste.marks.snow, jsonPiste.marks.sun, jsonPiste.marks.slope, jsonPiste.marks.length, jsonPiste.marks.view, jsonPiste.marks.average);
        var piste = new mbp.Piste(jsonPiste.id, jsonPiste.lastUpdate, null, jsonPiste.creatorId, jsonPiste.name, jsonPiste.color, jsonPiste.description, jsonPiste.picture, marks, jsonPiste.accepted, jsonPiste.rejectCause);
        var iComment = null, jsonComment, comment;
        for(iComment in jsonPiste.comments) {
            jsonComment = jsonPiste.comments[iComment];
            comment = instance.JsonCommentToComment(jsonComment);
            piste.addComment(comment);
        }
        return piste;
    };
    
    /**
     * @private
     * @param {mbp.Resort} resort
     * @returns {mbp.JsonResort}
     */
    this.ResortToJsonResort = function(resort) {
        var jsonResort = new mbp.JsonResort(resort.id, resort.lastUpdate, resort.name, resort.country, resort.massif, new Array());
        
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
        var resort = new mbp.Resort(jsonResort.id, jsonResort.lastUpdate, jsonResort.name, jsonResort.country, jsonResort.massif)
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
        var obj = JSON.parse(jsonString);
        return new mbp.JsonResort(obj.id, obj.lastUpdate, obj.name, obj.country, obj.massif, obj.pistes);
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