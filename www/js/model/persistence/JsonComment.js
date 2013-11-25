"use strict";

mbp.JsonComment = function(id, lastUpdate, creatorId, text, accepted, rejectCause) {
    this.id = id;
    this.lastUpdate = lastUpdate;
    this.creatorId = creatorId;
    this.text = text;
    this.accepted = accepted;
    this.rejectCause = rejectCause;
};