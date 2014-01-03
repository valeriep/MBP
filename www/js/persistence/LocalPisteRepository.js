"use strict";

mbp.LocalPisteRepository = function() {
    var instance = this;
    var store = localStorage;
    var storeKeysPrefix = 'mbp.Piste.';
    
    var pistesByResortIdxKey = 'mbp.Piste.pbr';
    var pistesByResortIdx = parseJsonMap(pistesByResortIdxKey);

    function parseJsonMap(key) {
        var tmp = store.getItem(key);
        return tmp ? JSON.parse(tmp) : {};
    }

    /**
     * Removes all stored pistes
     */
    this.clear = function() {
        var resortId = null, pisteId = null;
        
        for(resortId in pistesByResortIdxKey) {
            for(pisteId in pistesByResortIdxKey[resortId]) {
                store.removeItem(storeKeysPrefix + pisteId);
            }
        };
        pistesByResortIdx = {};
        store.setItem(pistesByResortIdxKey, JSON.stringify(pistesByResortIdx));
    };
    
    /**
     * @param {mbp.Piste} piste
     */
    this.savePiste = function(piste) {
        store.setItem(storeKeysPrefix + pisteId, JSON.stringify(piste));
        if(!pistesByResortIdx.hasOwnProperty(piste.resortId)) {
            pistesByResortIdx[piste.resortId] = new Array();
        }
        pistesByResortIdx.push(piste.id);
        store.setItem(pistesByResortIdxKey, JSON.stringify(pistesByResortIdx));
    };
    
    /**
     * @param {String} pisteId
     * @param {Function} onPisteRetrieved
     */
    this.getPisteById = function(pisteId, onPisteRetrieved) {
        var jsonString = store.getItem(storeKeysPrefix + pisteId), jsonObject;
        
        if(!jsonString) {
            onPisteRetrieved(null);
            return;
        }
        
        jsonObject = JSON.parse(jsonString);
        onPisteRetrieved(new mbp.Piste(jsonObject));
    };

    /**
     * @param {String} resortId
     * @param {Function} onPistesRetrieved
     */
    this.getPistesByResortId = function(resortId, onPistesRetrieved) {
        var pistes = {}, pisteId = null;
        
        for(pisteId in pistesByResortIdx[resortId]) {
            instance.getPisteById(pisteId, function(piste) {
                pistes[piste.id] = piste;
            });
        }
        
        onPistesRetrieved(pistes);
    };
    
    /**
     * 
     * @param {mbp.PisteCriteria} criteria
     * @param {Function} onPistesRetrieved what to do with retrieved pistes
     */
    this.getPistesByCriteria = function(criteria, onPistesRetrieved) {
        var result = new Array(), resortIds = criteria.resortIds || Object.keys(pistesByResortIdx), resortId = null;
        
        for(resortId in resortIds) {
            instance.getPistesByResortId(resortId, function(pistes) {
                result = result.concat(criteria.filter(pistes));
            });
        }
        
        onPistesRetrieved(result);
    };

    /**
     * 
     * @param {String} userId
     * @param {Function} onPistesRetrieved what to do with retrieved pistes
     */
    this.getPistesByCreator = function(userId, onPistesRetrieved) {
        var pistes = {}, resortId = null, pisteId = null;
        
        for(resortId in pistesByResortIdx) {
            for (pisteId in pistesByResortIdx[resortId]) {
                if(piste.creatorId == userId) {
                    pistes[piste.id] = piste;
                }
            }
        }
        
        onPistesRetrieved(pistes);
    };
    
    /**
     * @param pisteId
     */
    this.removePiste = function(pisteId) {
        instance.getPisteById(pisteId, function(piste) {
            if(piste) {
                delete(pistesByResortIdxKey[resortId][piste.id]);
                store.setItem(pistesByResortIdxKey, JSON.stringify(pistesByResortIdx));
                store.removeItem(storeKeysPrefix + piste.id);
            }
        });
    };

    /**
     * finds pistes with no last update
     * @param {Function} send what to do with each piste to send
     */
    this.eachPistesToSend = function(send) {
        var resortId = null, pisteId = null;
        
        for(resortId in pistesByResortIdx) {
            for (pisteId in pistesByResortIdx[resortId]) {
                if (!piste.lastUpdate) {
                    send(piste);
                }
            }
        }
    };
};
