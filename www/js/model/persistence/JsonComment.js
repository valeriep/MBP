"use strict";

mbp.JsonComment = function(id, lastUpdate, creatorId, text, marks, accepted, rejectCause) {
    this.id = id;
    this.lastUpdate = lastUpdate;
    this.creatorId = creatorId;
    this.text = text;
    this.marks = marks;
    this.accepted = accepted;
    this.rejectCause = rejectCause;
};