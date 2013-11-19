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
        var jsonResort = store.getItem(storeResortsKeysPrefix + resortId);
        if(!jsonResort) {
            return null;
        }
        var deserializedResort = JSON.parse(jsonResort);
        if(!deserializedResort) {
            return null;
        }
        return instance.createResort(deserializedResort);
    };

    /**
     * @param {Object} deserializedResort a resort object after deserialization (i.e. JSON.parse())
     * @returns {mbp.Resort} reconstructed functional Resort with pistes
     */
    this.createResort = function(deserializedResort) {
        var resort = new mbp.Resort(deserializedResort.id, deserializedResort.name, deserializedResort.country, deserializedResort.massif);
        var i = null, deserializedPiste, piste;

        for (i in deserializedResort.pistes) {
            deserializedPiste = deserializedResort.pistes[i];
            piste = instance.createPiste(deserializedPiste);
            resort.addPiste(piste);
        }

        return resort;
    };

    /**
     * @param deserializedPiste a piste object after deserialization
     * @returns {mbp.Piste} reconstructed Piste with comments, but not attached to any Resort
     */
    this.createPiste = function(deserializedPiste) {
        var piste = new mbp.Piste(deserializedPiste.id, deserializedPiste.name, deserializedPiste.color, deserializedPiste.description, deserializedPiste.picture, deserializedPiste.averageMark);
        var i = null, deserializedComment, comment;

        for (i in deserializedPiste.comments) {
            deserializedComment = deserializedPiste.comments[i];
            comment = instance.createComment(deserializedComment);
            piste.addComment(comment);
        }

        return piste;
    };

    /**
     * @param deserializedComment a comment object after deserialization
     * @returns {mbp.Comment} reconstructed Comment (not attached to any Piste)
     */
    this.createComment = function(deserializedComment) {
        var comment = new mbp.Comment(deserializedComment.id, deserializedComment.text, deserializedComment.snowMark, deserializedComment.sunMark);
        return comment;
    };

    /**
     * Stores a resort
     * @param {mbp.Resort} resort
     */
    this.save = function(resort) {
        var deserializedResort = instance.createDeserializedResort(resort);
        var jsonResort = JSON.stringify(deserializedResort);
        store.setItem(storeResortsKeysPrefix + resort.id, jsonResort);
        instance.addToIndexes(resort);
    };

    /**
     * @param {mbp.Resort} resort
     * @returns {Object} an object ready to be JSON stringified
     */
    this.createDeserializedResort = function(resort) {
        var deserializedResort = {
            id : resort.id,
            name : resort.name,
            country : resort.country,
            massif : resort.massif,
            pistes : new Array()
        };
        var pistesIds = resort.getPistesIds();
        var i = null, piste;

        for (i in pistesIds) {
            piste = resort.getPiste(pistesIds[i]);
            deserializedResort.pistes.push(this.createDeserializedPiste(piste));
        }

        return deserializedResort;
    };

    /**
     * @param {mbp.Piste} piste
     * @returns {Object} an object ready to be JSON stringified
     */
    this.createDeserializedPiste = function(piste) {
        var deserializedPiste = {
            id : piste.id,
            color : piste.color,
            name : piste.name,
            description : piste.description,
            picture : piste.picture,
            averageMark :  piste.averageMark,
            comments : new Array()
        };
        var commentsIds = piste.getCommentsIds();
        var i = null, deserializedComment;

        for (i in commentsIds) {
            deserializedComment = piste.getComment(commentsIds[i]); //properties to persist are public and properties to hide are private, so original object can be used
            deserializedPiste.comments.push(deserializedComment);
        }

        return deserializedPiste;
    };
    
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
            } else {
                pistes = {};
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
