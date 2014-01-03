"use strict";

mbp.LocalCommentRepository = function() {
    var instance = this;
    var store = localStorage;
    var storeKeysPrefix = 'mbp.Comment.';
    
    var commentsByPisteIdxKey = 'mbp.Comment.cbp';
    var commentsByPisteIdx = parseJsonMap(commentsByPisteIdxKey);

    function parseJsonMap(key) {
        var tmp = store.getItem(key);
        return tmp ? JSON.parse(tmp) : {};
    }

    /**
     * Removes all stored comments
     */
    this.clear = function() {
        var pisteId = null, commentId = null;
        
        for(pisteId in commentsByPisteIdxKey) {
            for(commentId in commentsByPisteIdxKey[pisteId]) {
                store.removeItem(storeKeysPrefix + commentId);
            }
        };
        commentsByPisteIdx = {};
        store.setItem(commentsByPisteIdxKey, JSON.stringify(commentsByPisteIdx));
    };
    
    /**
     * @param {mbp.Comment} comment
     */
    this.saveComment = function(comment) {
        store.setItem(storeKeysPrefix + commentId, JSON.stringify(comment));
        if(!commentsByPisteIdx.hasOwnProperty(comment.pisteId)) {
            commentsByPisteIdx[comment.pisteId] = new Array();
        }
        commentsByPisteIdx.push(comment.id);
        store.setItem(commentsByPisteIdxKey, JSON.stringify(commentsByPisteIdx));
    };
    
    /**
     * @param {String} commentId
     * @param {Function} onCommentRetrieved
     */
    this.getCommentById = function(commentId, onCommentRetrieved) {
        var jsonString = store.getItem(storeKeysPrefix + commentId), jsonObject;
        
        if(!jsonString) {
            onCommentRetrieved(null);
            return;
        }
        
        jsonObject = JSON.parse(jsonString);
        onCommentRetrieved(new mbp.Comment(jsonObject));
    };

    /**
     * @param {String} pisteId
     * @param {Function} onCommentsRetrieved
     */
    this.getCommentsByResortId = function(pisteId, onCommentsRetrieved) {
        var comments = new Array(), commentId = null;
        
        for(commentId in commentsByPisteIdx[pisteId]) {
            instance.getPisteById(commentId, function(comment) {
                comments.push(comment);
            });
        }
        
        onCommentsRetrieved(comments);
    };

    /**
     * 
     * @param {String} userId
     * @param {Function} onCommentsRetrieved what to do with retrieved comments
     */
    this.getCommentsByCreator = function(userId, onCommentsRetrieved) {
        var comments = new Array(), pisteId = null, commentId = null;
        
        for(pisteId in commentsByPisteIdx) {
            for (commentId in commentsByPisteIdx[pisteId]) {
                if(comment.creatorId == userId) {
                    comments.push(comment);
                }
            }
        }
        
        onCommentsRetrieved(comments);
    };

    /**
     * finds comments with no last update
     * @param {Function} send what to do with each comment to send
     */
    this.eachCommentsToSend = function(send) {
        var pisteId = null, commentId = null;
        
        for(pisteId in commentsByPisteIdx) {
            for (commentId in commentsByPisteIdx[pisteId]) {
                if (!comment.lastUpdate) {
                    send(comment);
                }
            }
        }
    };
};
