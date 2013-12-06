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
 * @param {mbp.PisteMarks} averageMarks
 * @param {Number} marksCount
 * @param {Boolean} accepted
 * @param {String} rejectCause
 * @author ch4mp@c4-soft.com
 */
mbp.Piste = function(id, lastUpdate, aResort, creatorId, name, color, description, picture, averageMarks, marksCount, accepted, rejectCause) {
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

    /** @type mbp.PisteMarks */
    this.averageMarks = averageMarks;

    /** @type Number */
    this.marksCount = marksCount;

    /** @type Boolean */
    this.accepted = accepted;

    /** @type String */
    this.rejectCause = rejectCause;

    /** @type mbp.Resort */
    var resort = null;

    /** a Map of mbp.UserMark */
    var usersMarks = {};

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
        for (commentId in comments) {
            func(comments[commentId]);
        }
    };

    /**
     * 
     * @param {String} userId
     * @param {mbp.PisteMarks} marks
     */
    this.addUserMarks = function(userId, marks) {
        marks.pisteId = instance.id;
        marks.lastUpdate = null;
        usersMarks[userId] = marks;
    };

    /**
     * 
     * @param {String} userId
     */
    this.getUserMarks = function(userId) {
        return usersMarks[userId];
    };

    /**
     * 
     * @param {Function} func what to do with each user's piste marks
     */
    this.eachUserMarks = function(func) {
        var userId = null;
        for (userId in usersMarks) {
            func(userId, usersMarks[userId]);
        }
    };

    this.clone = function(resort) {
        var clone = new mbp.Piste(
                instance.id,
                instance.lastUpdate,
                resort,
                instance.creatorId,
                instance.name,
                instance.color,
                instance.description,
                instance.picture,
                instance.averageMarks.clone(),
                instance.marksCount,
                instance.accepted,
                instance.rejectCause);
        var commentId = null, userId = null;
        for(commentId in comments) {
            clone.addComment(comments[commentId].clone(clone));
        }
        for(userId in usersMarks) {
            clone.addUserMarks(userId, usersMarks[userId].clone());
        }
        
        return clone;
    };
    
    this.updateMarksAverage = function(userId, newUserMarks) {
        var prevUserMarks = instance.getUserMarks(userId);
        
        if(prevUserMarks) {
            instance.averageMarks.snow = updateAvg(instance.marksCount, instance.averageMarks.snow, prevUserMarks.snow, newUserMarks.snow);
            instance.averageMarks.sun = updateAvg(instance.marksCount, instance.averageMarks.sun, prevUserMarks.sun, newUserMarks.sun);
            instance.averageMarks.verticalDrop = updateAvg(instance.marksCount, instance.averageMarks.verticalDrop, prevUserMarks.verticalDrop, newUserMarks.verticalDrop);
            instance.averageMarks.length = updateAvg(instance.marksCount, instance.averageMarks.length, prevUserMarks.length, newUserMarks.length);
            instance.averageMarks.view = updateAvg(instance.marksCount, instance.averageMarks.view, prevUserMarks.view, newUserMarks.view);
        } else {
            instance.averageMarks.snow = addToAvg(instance.marksCount, instance.averageMarks.snow, newUserMarks.snow);
            instance.averageMarks.sun = addToAvg(instance.marksCount, instance.averageMarks.sun, newUserMarks.sun);
            instance.averageMarks.verticalDrop = addToAvg(instance.marksCount, instance.averageMarks.verticalDrop, newUserMarks.verticalDrop);
            instance.averageMarks.length = addToAvg(instance.marksCount, instance.averageMarks.length, newUserMarks.length);
            instance.averageMarks.view = addToAvg(instance.marksCount, instance.averageMarks.view, newUserMarks.view);
            instance.marksCount += 1;
        }
        instance.addUserMarks(userId, newUserMarks);
    };
    
    function updateAvg(cnt, prevAvg, prevVal, newVal) {
        return (cnt * prevAvg - prevVal + newVal) / cnt;
    };
    
    function addToAvg(cnt, avg, newVal) {
        return (cnt * avg + newVal) / (cnt + 1);
    };

    instance.setResort(aResort);
    Object.preventExtensions(this);
};

mbp.Piste.BLUE = 'blue';
mbp.Piste.GREEN = 'green';
mbp.Piste.RED = 'red';
mbp.Piste.BLACK = 'black';
mbp.Piste.COLORS = new Array(mbp.Piste.BLUE, mbp.Piste.GREEN, mbp.Piste.RED, mbp.Piste.BLACK);