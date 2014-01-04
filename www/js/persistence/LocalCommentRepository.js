"use strict";

/**
 * A repo to store locally created comments
 */
mbp.LocalCommentRepository = function() {
    var instance = this;
    var storeKeysPrefix = 'mbp.Comment.';

    var commentsByPisteIdxKey = 'mbp.Comment.cbp';
    var commentsByPisteIdx = parseJsonMap(commentsByPisteIdxKey);

    function parseJsonMap(key) {
        var tmp = localStorage.getItem(key);
        return tmp ? JSON.parse(tmp) : {};
    }

    /**
     * @param {String} commentId
     * @param {Function} onCommentRetrieved
     */
    this.getCommentById = function(commentId, onCommentRetrieved) {
        var jsonString = localStorage.getItem(storeKeysPrefix + commentId), jsonObject;

        if (!jsonString) {
            return null;
        }

        jsonObject = JSON.parse(jsonString);
        onCommentRetrieved(new mbp.Comment(jsonObject));
    };

    /**
     * Creates an ID for to be used in localStorage
     * @param {mbp.Comment} comment
     */
    this.createId = function(comment) {
        return comment.pisteId + '_' + new Date().getTime();
    };

    /**
     * Persists a comment in local storage (save new or update existing)
     * @param {mbp.Comment} comment
     */
    this.saveComment = function(comment) {
        if (!comment.id) {
            comment.id = instance.createId(comment);
        }
        localStorage.setItem(storeKeysPrefix + comment.id, JSON.stringify(comment));
        if (!commentsByPisteIdx.hasOwnProperty(comment.pisteId)) {
            commentsByPisteIdx[comment.pisteId] = {};
        }
        commentsByPisteIdx[comment.pisteId][comment.id] = comment.lastUpdate;
        localStorage.setItem(commentsByPisteIdxKey, JSON.stringify(commentsByPisteIdx));
    };

    this.getCommentsUpdatesByPisteId = function(pisteId) {

    };

    /**
     * Retrieves all comments from a given piste
     * @param {String} pisteId
     * @param {Function} onCommentsRetrieved
     */
    this.getCommentsByPisteId = function(pisteId, onCommentsRetrieved) {
        var comments = new Array(), commentId = null;

        for (commentId in commentsByPisteIdx[pisteId]) {
            instance.getCommentById(commentId, function(comment) {
                comments.push(comment);
            });
        }

        onCommentsRetrieved(comments);
    };

    /**
     * Retrieves all comments created by a given user
     * @param {String} userId
     * @param {Function} onCommentsRetrieved what to do with retrieved comments
     */
    this.getCommentsByCreatorId = function(userId, onCommentsRetrieved) {
        var comments = new Array(), pisteId = null, commentId = null;

        for (pisteId in commentsByPisteIdx) {
            for (commentId in commentsByPisteIdx[pisteId]) {
                instance.getCommentById(commentId, function(comment) {
                    if (comment.creatorId == userId) {
                        comments.push(comment);
                    }
                });
            }
        }

        onCommentsRetrieved(comments);
    };
    
    /**
     * removes all comments from the localStorage
     */
    this.clear = function() {
        var pisteId = null, commentId = null;

        for (pisteId in commentsByPisteIdx) {
            for (commentId in commentsByPisteIdx[pisteId]) {
                localStorage.removeItem(storeKeysPrefix + commentId);
            }
        }
        localStorage.setItem(commentsByPisteIdxKey, JSON.stringify({}));
    };

    /**
     * finds comments with no last update
     * @param {Function} f what to do with each comment
     */
    this.eachComment = function(f) {
        var pisteId = null, commentId = null;

        for (pisteId in commentsByPisteIdx) {
            for (commentId in commentsByPisteIdx[pisteId]) {
                instance.getCommentById(commentId, function(comment) {
                    f(comment);
                });
            }
        }
    };
};
