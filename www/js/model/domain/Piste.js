"use strict";

/**
 * @constructor
 * @param {String} id
 * @param {String} lastUpdate
 * @param {mbp.Resort} aResort
 * @param {String} creatorId
 * @param {String} name
 * @param {String} color
 * @param {String} description
 * @param {String} picture
 * @param {mbp.PisteMarks} marks
 * @param {Boolean} accepted
 * @param {String} rejectCause
 * @author ch4mp@c4-soft.com
 */
mbp.Piste = function(id, lastUpdate, aResort, creatorId, name, color, description, picture, marks, accepted, rejectCause) {
    var instance = this;

    /** @type String */
    this.id = id;
    
    /** @type String */
    this.lastUpdate = lastUpdate;

    /** @type String */
    this.creatorId = creatorId;

    /** @type String */
    this.name = name;

    /** @type String */
    this.color = color;

    /** @type String */
    this.description = description;

    /** @type String */
    this.picture = picture;

    /** @type Number */
    this.marks = marks;

    /** @type Boolean */
    this.accepted = accepted;

    /** @type String */
    this.rejectCause = rejectCause;

    /** @type mbp.Resort */
    var resort = null;

    /** a Map of mbp.Comment */
    var comments = {};

    /**
     * 
     * @param {mbp.Resort} aResort
     */
    this.setResort = function(aResort) {
        if (aResort != resort) {
            if (resort) {
                var tmp = resort;
                resort = null;
                tmp.removePiste(instance);
            }
            resort = aResort;
            if (resort) {
                resort.addPiste(instance);
            }
        }
    };

    /**
     * 
     * @returns {mbp.Resort}
     */
    this.getResort = function() {
        return resort;
    };

    /**
     * 
     * @param {mbp.Comment} comment
     */
    this.addComment = function(comment) {
        if (comment.getPiste() != instance) {
            comment.setPiste(instance);
        }
        comments[comment.id] = comment;
    };

    /**
     * 
     * @param {mbp.Comment} comment
     */
    this.removeComment = function(comment) {
        if (comment) {
            delete comments[comment.id];
            comment.setPiste(null);
        }
    };

    /**
     * 
     * @param {String} commentId
     * @return {mbp.Comment}
     */
    this.getComment = function(commentId) {
        return comments[commentId];
    };

    /**
     * 
     * @return {Array}
     */
    this.getCommentsIds = function() {
        var commentId = null;
        var commentsIds = Array();
        for (commentId in comments) {
            commentsIds.push(commentId);
        }
        return commentsIds;
    };
    
    /**
     * 
     * @param {Function} func what to do with each comments
     */
    this.eachComment = function(func) {
        var commentId = null;
        for(commentId in comments) {
            func(comments[commentId]);
        }
    };

    instance.setResort(aResort);
    Object.preventExtensions(this);
};

mbp.Piste.BLUE = 'blue';
mbp.Piste.GREEN = 'green';
mbp.Piste.RED = 'red';
mbp.Piste.BLACK = 'black';
mbp.Piste.COLORS = new Array(mbp.Piste.BLUE, mbp.Piste.GREEN, mbp.Piste.RED, mbp.Piste.BLACK);