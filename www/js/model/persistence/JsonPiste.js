"use strict";

mbp.JsonPiste = function(id, lastUpdate, creatorId, name, color, description, picture, marks, accepted, rejectCause, comments) {
    this.id = id;
    this.lastUpdate = lastUpdate;
    this.creatorId = creatorId;
    this.name = name;
    this.color = color;
    this.description = description;
    this.picture = picture;
    this.marks = marks;
    this.accepted = accepted;
    this.rejectCause = rejectCause;
    this.comments = comments;
};