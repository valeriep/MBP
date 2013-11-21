"use strict";

/**
 * @constructor
 * @author ch4mp@c4-soft.com
 */
mbp.LocalResortRepository = function() {
    var instance = this;
    var store = localStorage;
    var storeResortsKeysPrefix = 'mbp.Resort.';
    var massifsByCountryKey = 'mbp.Resorts.mbc';
    var resortsByMassifKey = 'mbp.Resorts.rbm';
    var massifsByCountry, resortsByMassif, tmp;
    var jsonConverter = new mbp.JsonConverter();

    tmp = store.getItem(massifsByCountryKey);
    massifsByCountry = tmp ? JSON.parse(tmp) : {};
    tmp = store.getItem(resortsByMassifKey);
    resortsByMassif = tmp ? JSON.parse(tmp) : {};
    
    /**
     * 
     * @param {mbp.Resort} resort
     */
    this.addToIndexes = function(resort) {
        instance.addToMassifsByCountryIndex(resort);
        instance.addToResortsByMassifIndex(resort);
    };
    
    /**
     * 
     * @param {mbp.Resort} resort
     */
    this.addToMassifsByCountryIndex = function(resort) {
        if(!massifsByCountry.hasOwnProperty(resort.country)) {
            massifsByCountry[resort.country] = new Array();
        }
        if(massifsByCountry[resort.country].indexOf(resort.massif) == -1) {
            massifsByCountry[resort.country].push(resort.massif);
        }
        store.setItem(massifsByCountryKey, JSON.stringify(massifsByCountry));
    };
    
    /**
     * 
     * @param {mbp.Resort} resort
     */
    this.addToResortsByMassifIndex = function(resort) {
        if(!resortsByMassif.hasOwnProperty(resort.massif)) {
            resortsByMassif[resort.massif] = {};
        }
        resortsByMassif[resort.massif][resort.id] = resort.name;
        store.setItem(resortsByMassifKey, JSON.stringify(resortsByMassif));
    };
    
    /**
     * @returns {mbp.Resort}
     */
    this.getResortById = function(resortId) {
        var jsonString = store.getItem(storeResortsKeysPrefix + resortId);
        if(!jsonString) {
            return null;
        }
        return jsonConverter.ResortFromJson(jsonString);
    };
    
    /**
     * Stores a resort
     * @param {mbp.Resort} resort
     */
    this.save = function(resort) {
        var jsonString = jsonConverter.ResortToJson(resort);
        store.setItem(storeResortsKeysPrefix + resort.id, jsonString);
        instance.addToIndexes(resort);
    };
    
    /**
     * @param {Function} apply what to do with each resort id
     */
    this.eachResortId = function(apply) {
        var iMassif = null, resortId = null;
        for (iMassif in resortsByMassif) {
            for(resortId in resortsByMassif[iMassif]) {
                apply(resortId);
            }
        }
    };

    /**
     * Removes all stored resorts
     */
    this.clear = function() {
        instance.eachResortId(function(resortId) {
            store.removeItem(storeResortsKeysPrefix + resortId);
        });
        resortsByMassif = {};
        massifsByCountry = {};
        store.setItem(resortsByMassifKey, JSON.stringify(resortsByMassif));
        store.setItem(massifsByCountryKey, JSON.stringify(massifsByCountry));
    };
    
    /**
     * 
     * @param {mbp.SearchPistesCriteria} criteria
     * @param {Function} onPistesRetrieved what to do with retrieved pistes
     */
    this.findPistes = function(criteria, onPistesRetrieved) {
        var pistes = new Array();
        instance.eachResortId(function(resortId) {
            var resort = instance.getResortById(resortId);
            if(resort) {
                pistes = pistes.concat(criteria.getMatchingPistes(resort));
            }
        });
        
        onPistesRetrieved(pistes);
    };
    
    /**
     * @returns {Array} countries name
     */
    this.getCountries = function() {
        return Object.keys(massifsByCountry);
    };
    
    /**
     * 
     * @param {String} country country name
     * @returns {Array} an array of massif names
     */
    this.getMassifs = function(country) {
        return massifsByCountry[country] ? massifsByCountry[country] : new Array();
    };
    
    /**
     * 
     * @param {String} massif massif name
     * @returns {Object} a map of resort names by resort id
     */
    this.getResorts = function(massif) {
        return resortsByMassif[massif] ? resortsByMassif[massif] : {};
    };
};
