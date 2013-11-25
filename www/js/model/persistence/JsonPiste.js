"use strict";

mbp.JsonPiste = function(id, lastUpdate, creatorId, name, color, description, picture, averageMarks, marksCount, accepted, rejectCause, comments) {
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
};