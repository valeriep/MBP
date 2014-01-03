"use strict";

mbp.LocalPisteMarksRepository = function() {
    var instance = this;
    var store = localStorage;
    var storeKeysPrefix = 'mbp.PisteMarks.';
    
    var markingUsersByPisteIdxKey = 'mbp.PisteMarks.ubp';
    var markingUsersByPisteIdx = parseJsonMap(markingUsersByPisteIdxKey);

    function parseJsonMap(key) {
        var tmp = store.getItem(key);
        return tmp ? JSON.parse(tmp) : {};
    }

    /**
     * Removes all stored pisteMarkss
     */
    this.clear = function() {
        var pisteId = null, userId = null;
        
        for(pisteId in markingUsersByPisteIdx) {
            for(userId in markingUsersByPisteIdx[pisteId]) {
                store.removeItem(storeKeysPrefix + pisteId + '.' + userId);
            }
        };
        markingUsersByPisteIdx = {};
        store.setItem(markingUsersByPisteIdxKey, JSON.stringify(markingUsersByPisteIdx));
    };
    
    /**
     * @param {mbp.User} userId
     * @param {mbp.PisteMarks} pisteMarks
     */
    this.savePisteMarks = function(userId, pisteMarks) {
        store.setItem(storeKeysPrefix + pisteMarks.pisteId + '.' + userId, JSON.stringify(pisteMarks));
        if(!markingUsersByPisteIdx.hasOwnProperty(pisteMarks.pisteId)) {
            markingUsersByPisteIdx[pisteMarks.pisteId] = new Array();
        }
        markingUsersByPisteIdx.push(userId);
        store.setItem(markingUsersByPisteIdxKey, JSON.stringify(markingUsersByPisteIdx));
    };
    
    /**
     * @param {String} pisteId
     * @param {String} userId
     * @param {Function} onPisteMarksRetrieved
     */
    this.getPisteMarksByPisteIdAndUserId = function(pisteId, userId, onPisteMarksRetrieved) {
        var jsonString = store.getItem(storeKeysPrefix + pisteId + '.' + userId), jsonObject;
        
        if(!jsonString) {
            onPisteMarksRetrieved(null);
            return;
        }
        
        jsonObject = JSON.parse(jsonString);
        onPisteMarksRetrieved(new mbp.PisteMarks(jsonObject));
    };

    /**
     * @param {String} pisteId
     * @param {Function} onPisteMarksRetrieved
     */
    this.getPisteMarksByPisteId = function(pisteId, onPisteMarksRetrieved) {
        var result = {}, userId = null;
        
        for(userId in markingUsersByPisteIdx[pisteId]) {
            instance.getPisteMarksByPisteIdAndUserId(pisteId, userId, function(pisteMarks) {
                result[userId] = pisteMarks;
            });
        }
        
        onPisteMarksRetrieved(result);
    };

    /**
     * finds pisteMarkss with no last update
     * @param {Function} send what to do with each pisteMarks to send
     */
    this.eachPisteMarksToSend = function(send) {
        var pisteId = null, userId = null;
        
        for(pisteId in markingUsersByPisteIdx) {
            for (userId in markingUsersByPisteIdx[pisteId]) {
                instance.getPisteMarksByPisteIdAndUserId(pisteId, userId, function(pisteMarks) {
                    if (!pisteMarks.lastUpdate) {
                        send(userId, pisteMarks);
                    }
                });
            }
        }
    };
};
