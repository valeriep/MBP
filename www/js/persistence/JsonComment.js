"use strict";

/**
 * 
 * @constructor
 * @param {String} id
 * @param {String} lastUpdate
 * @param {String} creatorId
 * @param {String} text
 * @param {Boolean} accepted
 * @author ch4mp@c4-soft.com
 */
mbp.JsonComment = function(id, lastUpdate, creatorId, text, accepted) {
    this.id = id;
    this.lastUpdate = lastUpdate;
    this.creatorId = creatorId;
    this.text = text;
    this.accepted = accepted;
};