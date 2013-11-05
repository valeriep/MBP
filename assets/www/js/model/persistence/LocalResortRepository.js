"use strict";

/**
 * @constructor
 * @author ch4mp@c4-soft.com
 */
mbp.LocalResortRepository = function() {
    var store = localStorage;
    var storeResortsKeysPrefix = 'mbp.Resort.';
    var storeIdsKey = 'mbp.ResortsIds';

    var storedIds = store.getItem(storeIdsKey);
    var index;
    if (storedIds) {
        index = JSON.parse(storeIds);
    } else {
        index = {};
    }

    /**
     * @return {Object} a map of resorts indexed by id
     */
    this.getAll = function() {
        var id = null;
        var jsonResort, jsonPiste, jsonComment;
        var resort, piste;
        var i, pistesLength, j, commentsLength;
        var resorts = {};

        for (id in index) {
            jsonResort = JSON.parse(store.getItem(storeResortsKeysPrefix + id));
            if (jsonResort) {
                resort = new mbp.Resort(jsonResort.id, jsonResort.name, jsonResort.country, jsonResort.massif);
                pistesLength = jsonResort.pistes.length;
                for (i = 0; i < pistesLength; i++) {
                    jsonPiste = jsonResort.pistes[i];
                    piste = new mbp.Piste(jsonPiste.id, jsonPiste.name, jsonPiste.color, jsonPiste.description, jsonPiste.picture, resort);
                    commentsLength = jsonPiste.comments.length;
                    for (j = 0; j < commentsLength; j++) {
                        jsonComment = jsonPiste.comments[j];
                        new mbp.Comment(jsonComment.id, jsonComment.text, jsonComment.snowMark, jsonComment.sunMark, piste);
                    }
                }
                resorts[resort.id] = resort;
            }
        }

        return resorts;
    };

    /**
     * Stores a resort
     * @param {mbp.Resort} resort
     */
    this.save = function(resort) {
        if (resort) {
            var jsonResort = {
                id : resort.id,
                name : resort.name,
                country : resort.country,
                massif : resort.massif,
                pistes : new Array()
            };
            var i = null, pistesIds, j = null, commentsIds;
            var piste = null;
            var jsonPiste;

            index[resort.id] = resort.name;
            store.setItem(storeIdsKey, JSON.stringify(index));
            pistesIds = resort.getPistesIds();
            for (i in pistesIds) {
                piste = resort.getPiste(pistesIds[i]);
                jsonPiste = {
                    id : piste.id,
                    color : piste.color,
                    name : piste.name,
                    picture : piste.picture,
                    comments : new Array()
                };
                commentsIds = piste.getCommentsIds();
                for (j in commentsIds) {
                    jsonPiste.comments.push(piste.getComment(commentsIds[j]));
                }
                jsonResort.pistes.push(jsonPiste);
            }
            store.setItem(storeResortsKeysPrefix + resort.id, JSON.stringify(jsonResort));
        }
    };

    /**
     * Removes all stored resorts
     */
    this.clear = function() {
        var id = null;
        for (id in index) {
            store.removeItem(storeResortsKeysPrefix + id);
        }
        index = {};
        store.setItem(storeIdsKey, JSON.stringify(index));
    };
};