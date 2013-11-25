"use strict";

/**
 * @constructor
 * @author ch4mp@c4-soft.com
 */
mbp.LocalResortRepository = function() {
    var instance = this;
    var store = localStorage;
    var storeResortsKeysPrefix = 'mbp.Resort.';
    var jsonConverter = new mbp.JsonConverter();
    
    /* Last update indexes */
    var massifsByCountryIdxKey = 'mbp.Resorts.mbc';
    var resortsByCountryIdxKey = 'mbp.Resorts.rbc';
    var resortsByMassifIdxKey = 'mbp.Resorts.rbm';
    var massifsByCountryIdx = parseJsonMap(massifsByCountryIdxKey);
    var resortsByCountryIdx =  parseJsonMap(resortsByCountryIdxKey);
    var resortsByMassifIdx = parseJsonMap(resortsByMassifIdxKey);
    
    function parseJsonMap(key) {
        var tmp = store.getItem(key);
        return tmp ? JSON.parse(tmp) : {};
    }

    /**
     * Removes all stored resorts
     */
    this.clear = function() {
        instance.eachResortId(function(resortId) {
            store.removeItem(storeResortsKeysPrefix + resortId);
        });
        resortsByCountryIdx = {};
        resortsByMassifIdx = {};
        massifsByCountryIdx = {};
        store.setItem(resortsByCountryIdxKey, JSON.stringify(resortsByCountryIdx));
        store.setItem(resortsByMassifIdxKey, JSON.stringify(resortsByMassifIdx));
        store.setItem(massifsByCountryIdxKey, JSON.stringify(massifsByCountryIdx));
    };
    
    
    /*-----------*/
    /* Countries */
    /*-----------*/
    /**
     * 
     * @param {Array} countries
     */
    this.setCountries = function(countries) {
        var iCountry = null, country = null;
        for(iCountry in countries) {
            country = countries[iCountry];
            if(!massifsByCountryIdx.hasOwnProperty(country)) {
                instance.addCountry(country);
            }
        }
        for(country in massifsByCountryIdx) {
            if(countries.indexOf(country) == -1) {
                instance.removeCountry(country);
            }
        }
    };
    
    /**
     * 
     * @param {String} country
     */
    this.addCountry = function(country) {
        if(!massifsByCountryIdx[country]) {
            massifsByCountryIdx[country] = new Array();
        }
        if(!resortsByCountryIdx[country]) {
            resortsByCountryIdx[country] = {};
        }
    };
    
    /**
     * 
     * @param {Function} onCountriesRetrieved
     */
    this.getAllCountries = function(onCountriesRetrieved) {
        onCountriesRetrieved(Object.keys(countriesIdx));
    };
    
    /**
     * 
     * @param {String} country
     */
    this.removeCountry = function(country) {
        var iMassif = null, resortId = null, resort;
        for(iMassif in massifsByCountryIdx[country]) {
            instance.removeMassif(country, massifsByCountryIdx[country][iMassif]);
        }
        for(resortId in resortsByCountryIdx[country]) {
            resort = instance.getResortById(resortId);
            instance.removeResort(resort);
        }
    };
    
    

    /*-----------*/
    /* Massifs */
    /*-----------*/
    /**
     * 
     * @param {String} country
     * @param {Array} massifs
     */
    this.setMassifs = function(country, massifs) {
        var iMassif = null, massif = null;
        for(iMassif in massifs) {
            massif = massifs[iMassif];
            if(massifsByCountryIdx[country].indexOf(massif) == -1) {
                massifsByCountryIdx[country].push(massif);
            }
        }
        for(iMassif in massifsByCountryIdx[country]) {
            massif = massifsByCountryIdx[country][iMassif];
            if(massifs.indexOf(massif) == -1) {
                instance.removeMassif(country, massif);
            }
        }
    };
    
    /**
     * 
     * @param {String} country
     * @param {String} massif
     */
    this.addMassif = function(country, massif) {
        if(!resortsByMassifIdx[massif]) {
            resortsByMassifIdx[massif] = {};
        }
        if(massifsByCountryIdx[country].indexOf(massif) == -1) {
            massifsByCountryIdx[country].push(massif);
        }
    };
    
    /**
     * 
     * @param {Function} onMassifsRetrieved
     */
    this.getAllMassifs = function(onMassifsRetrieved) {
        onMassifsRetrieved(Object.keys(resortsByMassifIdx));
    };
    
    /**
     * 
     * @param {String} country country name
     * @param {Function} onMassifsRetrieved
     */
    this.getMassifsByCountry = function(country, onMassifsRetrieved) {
        if(massifsByCountryIdx[country]) {
            onMassifsRetrieved(massifsByCountryIdx[country]);
        } else {
            onMassifsRetrieved(new Array());
        }
    };
    
    /**
     * 
     * @param {String} country
     * @param {String} massif
     */
    this.removeMassif = function(country, massif) {
        var iMassif, resortId = null, resort;
        iMassif = massifsByCountryIdx[country].indexOf(massif);
        if(iMassif != -1) {
            massifsByCountryIdx[country].splice(iMassif, 1);
        }
        for(resortId in resortsByMassifIdx[massif]) {
            resort = instance.getResortById(resortId);
            if(resort.country == country) {
                instance.removeResort(resort);
            }
        }
    };
    

    /*---------*/
    /* Resorts */
    /*---------*/
    /**
     * Stores a resort
     * @param {mbp.Resort} resort
     */
    this.saveResort = function(resort) {
        var jsonString = jsonConverter.ResortToJson(resort);
        store.setItem(storeResortsKeysPrefix + resort.id, jsonString);
        instance.addResortToIndexes(resort);
    };
    
    /**
     * 
     * @param {String} resortId
     * @param {Function} onResortRetrieved
     */
    this.getResortById = function(resortId, onResortRetrieved) {
        var jsonString = store.getItem(storeResortsKeysPrefix + resortId);
        if(!jsonString) {
            onResortRetrieved(null);
        }
        onResortRetrieved(jsonConverter.ResortFromJson(jsonString));
    };
    
    /**
     * 
     * @param {String} country country name
     * @param {Function} onResortsRetrieved
     */
    this.getResortsByCountry = function(country, onResortsRetrieved) {
        if(resortsByCountryIdx[country]) {
            onResortsRetrieved(resortsByCountryIdx[country]); 
        } else {
            onResortsRetrieved({});
        }
    };
    
    /**
     * 
     * @param {String} massif massif name
     * @param {Function} onResortsRetrieved
     */
    this.getResortsByMassif = function(massif, onResortsRetrieved) {
        if(resortsByMassifIdx[massif]) {
            onResortsRetrieved(resortsByMassifIdx[massif]); 
        } else {
            onResortsRetrieved({});
        }
    };

    /**
     * 
     * @param {String} country country name
     * @param {String} massif massif name
     * @param {Function} onResortsRetrieved
     */
    this.getResortsByCountryAndMassif = function(country, massif, onResortsRetrieved) {
        var resorts = {}, resortId = null;
        for(resortId in resortsByCountryIdx) {
            if(resortsByMassifIdx.hasOwnProperty(resortId)) {
                resorts[resortId] = resortsByCountryIdx[resortId];
            }
        }
        onResortsRetrieved(resorts);
    };
    
    /**
     * 
     * @param {mbp.Resort} resort
     */
    this.removeResort = function(resort) {
        store.removeItem(storeResortsKeysPrefix + resort.id);
        delete(resortsByMassifIdx[resort.massif][resort.id]);
        delete(resortsByCountryIdx[resort.country][resort.id]);
    };
    
    /**
     * @param {Function} apply what to do with each resort id
     */
    this.eachResortId = function(apply) {
        var iMassif = null, resortId = null;
        for (iMassif in resortsByMassifIdx) {
            for(resortId in resortsByMassifIdx[iMassif]) {
                apply(resortId);
            }
        }
    };
    
    
    /*--------*/
    /* Pistes */
    /*--------*/
    /**
     * 
     * @param {mbp.SearchPistesCriteria} criteria
     * @param {Function} onPistesRetrieved what to do with retrieved pistes
     */
    this.findPistes = function(criteria, onPistesRetrieved) {
        var pistes = new Array();
        instance.eachResortId(function(resortId) {
            instance.getResortById(resortId, function(resort) {
                if(resort) {
                    pistes = pistes.concat(criteria.getMatchingPistes(resort));
                }
            });
        });
        
        onPistesRetrieved(pistes);
    };
    
    /**
     * 
     * @param {String} userId
     * @param {Function} onPistesRetrieved what to do with retrieved pistes
     */
    this.getPistesByCreator = function(userId, onPistesRetrieved) {
        //TODO
    };

    /**
     * finds pistes with no last update
     * @param {Function} onPistesRetrieved what to do with retrieved pistes
     */
    this.getPistesToSend = function(onPistesRetrieved) {
        //TODO
    };

    
    /*----------*/
    /* Comments */
    /*----------*/
    /**
     * finds comments with no last update
     * @param {Function} onCommentsRetrieved what to do with retrieved pistes
     */
    this.getCommentsToSend = function(onCommentsRetrieved) {
        //TODO
    };
    

    /*----------------------------*/
    /* Resorts indexes management */
    /*----------------------------*/
    /**
     * 
     * @param {mbp.Resort} resort
     * @private
     */
    this.addResortToIndexes = function(resort) {
        instance.addResortToMassifsByCountryIndex(resort);
        instance.addResortToResortsByCountryIndex(resort);
        instance.addResortToResortsByMassifIndex(resort);
    };
    
    /**
     * 
     * @param {mbp.Resort} resort
     * @private
     */
    this.addResortToMassifsByCountryIndex = function(resort) {
        if(!massifsByCountryIdx.hasOwnProperty(resort.country)) {
            massifsByCountryIdx[resort.country] = new Array();
        }
        if(massifsByCountryIdx[resort.country].indexOf(resort.massif) == -1) {
            massifsByCountryIdx[resort.country].push(resort.massif);
        }
        store.setItem(massifsByCountryIdxKey, JSON.stringify(massifsByCountryIdx));
    };
    
    /**
     * 
     * @param {mbp.Resort} resort
     * @private
     */
    this.addResortToResortsByMassifIndex = function(resort) {
        if(!resortsByCountryIdx.hasOwnProperty(resort.country)) {
            resortsByCountryIdx[resort.country] = {};
        }
        resortsByCountryIdx[resort.country][resort.id] = resort.name;
        store.setItem(resortsByCountryIdxKey, JSON.stringify(resortsByCountryIdx));
    };
    
    /**
     * 
     * @param {mbp.Resort} resort
     * @private
     */
    this.addResortToResortsByMassifIndex = function(resort) {
        if(!resortsByMassifIdx.hasOwnProperty(resort.massif)) {
            resortsByMassifIdx[resort.massif] = {};
        }
        resortsByMassifIdx[resort.massif][resort.id] = resort.name;
        store.setItem(resortsByMassifIdxKey, JSON.stringify(resortsByMassifIdx));
    };
};
