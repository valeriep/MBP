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
     * 
     * @param {mbp.Piste} piste
     */
    this.createId = function(piste) {
        return piste.resortId + '_' + piste.name;
    };
    
    /**
     * @param {mbp.Piste} piste
     */
    this.savePiste = function(piste) {
        var userId = null;
        
        if(!piste.id) {
            piste.id = instance.createId(piste);
        }
        piste.averageMarks.pisteId = piste.id;
        for(userId in piste.userMarks) {
            piste.userMarks[userId].pisteId = piste.id;
        }
        
        store.setItem(storeKeysPrefix + piste.id, JSON.stringify(piste));
        if(!pistesByResortIdx.hasOwnProperty(piste.resortId)) {
            pistesByResortIdx[piste.resortId] = {};
        }
        pistesByResortIdx[piste.resortId][piste.id] = piste.lastUpdate;
        store.setItem(pistesByResortIdxKey, JSON.stringify(pistesByResortIdx));
    };
    
    this.getAllPistes = function(onPisteRetrieved) {
        var allPistes = [];
        
        eachPiste(function(piste) {
            allPistes.push(piste);
        });
        
        onPisteRetrieved(allPistes);
    };
    
    this.getResortIdsHavingPistes = function(onResortIdsFound) {
        onResortIdsFound(Object.keys(pistesByResortIdx));
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
        var pistes = [], pisteId = null;
        
        for(pisteId in pistesByResortIdx[resortId]) {
            instance.getPisteById(pisteId, function(piste) {
                pistes.push(piste);
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
        var result = [], resortIds = null, i = null;
        
        if(criteria.resortIds && criteria.resortIds.length) {
            resortIds = criteria.resortIds;
        } else {
            resortIds = Object.keys(pistesByResortIdx);
        }
        
        for(i in resortIds) {
            instance.getPistesByResortId(resortIds[i], function(pistes) {
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
    this.getPistesByCreatorId = function(userId, onPistesRetrieved) {
        var pistes = [];
        
        eachPiste(function(piste) {
            if(piste.creatorId == userId) {
                pistes.push(piste);
            }
        });
        
        onPistesRetrieved(pistes);
    };
    
    /**
     * 
     * @param {Number} limit maximum count of results (unlimited if falsy)
     * @param {Function} onPistesRetrieved
     */
    this.getPistesByLastUpdate = function(limit, onPistesRetrieved) {
        var pistes = [];
        
        eachPiste(function(piste) {
            pistes.push(piste);
        });
        pistes = pistes.sort(function(a, b) {
            if(a.lastUpdate < b.lastUpdate) {
                return 1;
            } else if(a.lastUpdate > b.lastUpdate) {
                return -1;
            }
            return 0;
        });
        pistes.splice(limit);
        onPistesRetrieved(pistes);
    };
    
    /**
     * @param pisteId
     */
    this.removePiste = function(pisteId) {
        instance.getPisteById(pisteId, function(piste) {
            if(piste) {
                delete(pistesByResortIdx[piste.resortId][piste.id]);
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
        eachPiste(function(piste) {
            if (!piste.lastUpdate) {
                send(piste);
            }
        });
    };
    
    this.eachPisteMarksToSend = function(send) {
        var userId = null;
        eachPiste(function(piste) {
            for(userId in piste.userMarks) {
                if(!piste.userMarks[userId].lastUpdate) {
                    send(userId, piste.userMarks[userId]);
                }
            }
        });
    };
    
    function eachPisteId(f, limit) {
        var i = 0, resortId = null, pisteId = null;
        
        for(resortId in pistesByResortIdx) {
            for (pisteId in pistesByResortIdx[resortId]) {
                f(pisteId);
                if(limit && ++i > limit) {
                    return;
                }
            }
        }
    }
    
    function eachPiste(f, limit) {
        eachPisteId(function(pisteId) {
            instance.getPisteById(pisteId, function(piste) {
                f(piste);
            });
        }, limit);
    }
};
