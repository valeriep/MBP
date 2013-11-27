"use strict";

/**
 * 
 * @constructor
 * @param {String} id
 * @param {String} lastUpdate
 * @param {String} creatorId
 * @param {String} text
 * @param {Boolean} accepted
 * @param {String} rejectCause
 * @author ch4mp@c4-soft.com
 */
mbp.JsonComment = function(id, lastUpdate, creatorId, text, accepted, rejectCause) {
    this.id = id;
    this.lastUpdate = lastUpdate;
    this.creatorId = creatorId;
    this.text = text;
    this.accepted = accepted;
    this.rejectCause = rejectCause;
};