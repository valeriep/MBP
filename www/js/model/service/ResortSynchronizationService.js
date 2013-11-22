"use strict";

mbp.ResortSynchronizationService = function() {
    var instance = this;
    var localResortRepo = new mbp.LocalResortRepository();
    var seolanResortRepo = null;
    
    var sync = {};
    
    /**
     * @param {String} country
     * @returns {String} update identifier (i.e. time-stamp)
     */
    this.getLastMassifListUpdate = function(country) {
        return sync[country].update;
    };
    
    /**
     * @param {String} country
     * @param {String} massif
     * @returns {String} update identifier (i.e. time-stamp)
     */
    this.getLastResortListUpdate = function(country, massif) {
        return sync[country].massifs[massif].update;
    };
    
    /**
     * @param {String} country
     * @param {String} massif
     * @param {String} resortId
     * @returns {String} update identifier (i.e. time-stamp)
     */
    this.getLastResortUpdate = function(country, massif, resortId) {
        return sync[country].massifs[massif].resorts[resortId].update;
    };
    
    /**
     * @param {String} country
     * @param {String} massif
     * @param {String} resortId
     * @param {String} pisteId
     * @returns {String} update identifier (i.e. time-stamp)
     */
    this.getLastPisteUpdate = function(country, massif, resortId, pisteId) {
        return sync[country].massifs[massif].resorts[resortId].pistes[pisteId];
    };
    
    /**
     * @param {String} country
     * @param {Array} newMassifList
     * @returns {String} update identifier (i.e. time-stamp)
     */
    this.updateMassifList = function(country, newMassifList, update) {
        var i = null, newMassif;
        if(!sync[country]) {
            sync[country] = new mbp.sync.Country(null, {});
        }
        for(i in newMassifList) {
            newMassif = newMassifList[i];
            if(!sync[country].massifs.hasOwnProperty(newMassif)) {
                sync[country].massifs[newMassif] = new mbp.sync.Massif(null, {});
                //TODO trigger seolan retrieving of resortList
            }
        }
        var massif = null, resortId = null, resort;
        for(massif in sync[country].massifs) {
            if(newMassifList.indexOf(massif) == -1) {
                for(resortId in sync[country].massifs[massif]) {
                    resort = localResortRepo.getResortById(resortId);
                    localResortRepo.remove(resort);
                }
                delete(sync[country].massifs[massif]);
            }
        }
        sync[country].update = update;
    };
    
    this.updateResortList = function(country, massif, newResortList, update) {
        var i = null, newResortId;
        if(!sync[country].massifs[massif]) {
            sync[country].massifs[massif] = new mbp.sync.Massif(null, {});
        }
        for(i in newResortList) {
            newResortId = newResortList[i];
            if(!sync[country].massifs[massif].resorts.hasOwnProperty(newResortId)) {
                sync[country].massifs[massif].resorts[newResortId] = new mbp.sync.Resort(null, {});
                //TODO trigger seolan retrieving of resort
            }
        }
        var resortId = null, resort;
        for(resortId in sync[country].massifs[massif].resorts) {
            if(newResortList.indexOf(resortId) == -1) {
                resort = localResortRepo.getResortById(resortId);
                localResortRepo.remove(resort);
            }
        }
        sync[country].massifs[massif].update = update;
    };
    
    this.updateResort = function(resort, update) {
        //TODO
    };
    
    this.updatePiste = function(resort, update) {
        //TODO
    };
};

/**
 * @constructor
 * @param {String} update
 * @param {Object} massifs map of {mbp.sync.Massif} by massif name
 */
mbp.sync.Country = function(update, massifs) {
    this.update = update;
    this.massifs = massifs;
};

/**
 * @constructor
 * @param {String} update
 * @param {Object} resorts map of {mbp.sync.Resort} by resort id
 */
mbp.sync.Massif = function(update, resorts) {
    this.update = update;
    this.resorts = resorts;
};

/**
 * @constructor
 * @param {String} update
 * @param {Object} pistes map of {String} by piste id
 */
mbp.sync.Resort = function(update, pistes) {
    this.update = update;
    this.pistes = pistes;
};