"use strict";

/**
 * 
 * @constructor
 * @param {String} id
 * @param {String} lastUpdate
 * @param {String} creatorId
 * @param {String} name
 * @param {String} color
 * @param {String} description
 * @param {String} picture
 * @param {mbp.PisteMarks} averageMarks
 * @param {Number} marksCount
 * @param {Boolean} accepted
 * @param {String} rejectCause
 * @param {Array} comments
 * @param {Object} userMarks a map of {mbp.PisteMarks} by userId
 * @author ch4mp@c4-soft.com
 */
mbp.JsonPiste = function(id, lastUpdate, creatorId, name, color, description, picture, averageMarks, marksCount, accepted, rejectCause, comments, userMarks) {
    this.id = id;
    this.lastUpdate = lastUpdate;
    this.creatorId = creatorId;
    this.name = name;
    this.color = color;
    this.description = description;
    this.picture = picture;
    this.averageMarks = averageMarks;
    this.marksCount = marksCount;
    this.accepted = accepted;
    this.rejectCause = rejectCause;
    this.comments = comments;
    this.userMarks = userMarks;
};