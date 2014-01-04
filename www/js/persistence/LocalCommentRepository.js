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
    
    this.createId = function(comment) {
        return comment.pisteId + '_' + new Date().getTime();
    };
    
    /**
     * @param {mbp.Comment} comment
     */
    this.saveComment = function(comment) {
        if(!comment.id) {
            comment.id = instance.createId(comment);
        }
        store.setItem(storeKeysPrefix + comment.id, JSON.stringify(comment));
        if(!commentsByPisteIdx.hasOwnProperty(comment.pisteId)) {
            commentsByPisteIdx[comment.pisteId] = new Array();
        }
        commentsByPisteIdx[comment.pisteId].push(comment.id);
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
    this.getCommentsByPisteId = function(pisteId, onCommentsRetrieved) {
        var comments = new Array(), i = null;
        
        for(i in commentsByPisteIdx[pisteId]) {
            instance.getCommentById(commentsByPisteIdx[pisteId][i], function(comment) {
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
    this.getCommentsByCreatorId = function(userId, onCommentsRetrieved) {
        var comments = new Array(), pisteId = null, i = null;
        
        for(pisteId in commentsByPisteIdx) {
            for (i in commentsByPisteIdx[pisteId]) {
                instance.getCommentById(commentsByPisteIdx[pisteId][i], function(comment) {
                    if(comment.creatorId == userId) {
                        comments.push(comment);
                    }
                });
            }
        }
        
        onCommentsRetrieved(comments);
    };

    /**
     * finds comments with no last update
     * @param {Function} send what to do with each comment to send
     */
    this.eachCommentsToSend = function(send) {
        var pisteId = null, i = null;
        
        for(pisteId in commentsByPisteIdx) {
            for (i in commentsByPisteIdx[pisteId]) {
                instance.getCommentById(commentsByPisteIdx[pisteId][i], function(comment) {
                    if (!comment.lastUpdate) {
                        send(comment);
                    }
                });
            }
        }
    };
};
