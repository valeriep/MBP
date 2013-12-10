"use strict";

mbp.LocalResortRepository = function() {
    var instance = this;
    var store = localStorage;
    var storeResortsKeysPrefix = 'mbp.Resort.';
    var jsonConverter = new mbp.JsonConverter();

    /* Last update indexes */
    var areasByCountryIdxKey = 'mbp.Resorts.mbc';
    var resortsByCountryIdxKey = 'mbp.Resorts.rbc';
    var resortsByAreaIdxKey = 'mbp.Resorts.rbm';
    var areasByCountryIdx = parseJsonMap(areasByCountryIdxKey);
    var resortsByCountryIdx = parseJsonMap(resortsByCountryIdxKey);
    var resortsByAreaIdx = parseJsonMap(resortsByAreaIdxKey);

    function parseJsonMap(key) {
        var tmp = store.getItem(key);
        return tmp ? JSON.parse(tmp) : {};
    }

    /**
     * Removes all stored resorts
     */
    this.clear = function() {
        eachResortId(function(resortId) {
            store.removeItem(storeResortsKeysPrefix + resortId);
        });
        resortsByCountryIdx = {};
        resortsByAreaIdx = {};
        areasByCountryIdx = {};
        store.setItem(resortsByCountryIdxKey, JSON.stringify(resortsByCountryIdx));
        store.setItem(resortsByAreaIdxKey, JSON.stringify(resortsByAreaIdx));
        store.setItem(areasByCountryIdxKey, JSON.stringify(areasByCountryIdx));
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

        for (iCountry in countries) {
            country = countries[iCountry];
            if (!areasByCountryIdx.hasOwnProperty(country)) {
                instance.addCountry(country);
            }
        }
        for (country in areasByCountryIdx) {
            if (countries.indexOf(country) == -1) {
                instance.removeCountry(country);
            }
        }
    };

    /**
     * 
     * @param {String} country
     */
    this.addCountry = function(country) {
        if (!areasByCountryIdx[country]) {
            areasByCountryIdx[country] = new Array();
        }
        if (!resortsByCountryIdx[country]) {
            resortsByCountryIdx[country] = {};
        }
        store.setItem(resortsByCountryIdxKey, JSON.stringify(resortsByCountryIdx));
        store.setItem(areasByCountryIdxKey, JSON.stringify(areasByCountryIdx));
    };

    /**
     * 
     * @param {Function} onCountriesRetrieved
     */
    this.getAllCountries = function(onCountriesRetrieved) {
        onCountriesRetrieved(Object.keys(areasByCountryIdx));
    };

    /**
     * 
     * @param {String} country
     */
    this.removeCountry = function(country) {
        var iArea = null, areasToRemove = new Array(), resortId = null;

        for (iArea in areasByCountryIdx[country]) {
            areasToRemove.push(areasByCountryIdx[country][iArea]);
        }
        for (iArea in areasToRemove) {
            instance.removeArea(country, areasToRemove[iArea]);
        }
        delete (areasByCountryIdx[country]);

        for (resortId in resortsByCountryIdx[country]) {
            instance.getResortById(resortId, function(resort) {
                instance.removeResort(resort);
            });
        }
        delete (resortsByCountryIdx[country]);

        store.setItem(resortsByCountryIdxKey, JSON.stringify(resortsByCountryIdx));
        store.setItem(areasByCountryIdxKey, JSON.stringify(areasByCountryIdx));
    };

    /*-----------*/
    /* Areas */
    /*-----------*/
    /**
     * 
     * @param {String} country
     * @param {Array} areas
     */
    this.setAreas = function(country, areas) {
        var iArea = null, area = null;

        if (!areasByCountryIdx[country]) {
            instance.addCountry(country);
        }
        for (iArea in areas) {
            area = areas[iArea];
            if (areasByCountryIdx[country].indexOf(area) == -1) {
                instance.addArea(country, area);
            }
        }
        for (iArea in areasByCountryIdx[country]) {
            area = areasByCountryIdx[country][iArea];
            if (areas.indexOf(area) == -1) {
                instance.removeArea(country, area);
            }
        }
    };

    /**
     * 
     * @param {String} country
     * @param {String} area
     */
    this.addArea = function(country, area) {

        if (!resortsByAreaIdx[area]) {
            resortsByAreaIdx[area] = {};
        }
        if (areasByCountryIdx[country].indexOf(area) == -1) {
            areasByCountryIdx[country].push(area);
        }
        store.setItem(resortsByAreaIdxKey, JSON.stringify(resortsByAreaIdx));
        store.setItem(areasByCountryIdxKey, JSON.stringify(areasByCountryIdx));
    };

    /**
     * 
     * @param {Function} onAreasRetrieved
     */
    this.getAllAreas = function(onAreasRetrieved) {
        onAreasRetrieved(Object.keys(resortsByAreaIdx));
    };

    /**
     * 
     * @param {String} country country name
     * @param {Function} onAreasRetrieved
     */
    this.getAreasByCountry = function(country, onAreasRetrieved) {
        if(!country) {
            instance.getAllAreas(onAreasRetrieved);
            return;
        }
        if (areasByCountryIdx[country]) {
            onAreasRetrieved(areasByCountryIdx[country]);
        } else {
            onAreasRetrieved(new Array());
        }
    };

    /**
     * 
     * @param {String} country
     * @param {String} area
     */
    this.removeArea = function(country, area) {
        var iArea, resortId = null;

        iArea = areasByCountryIdx[country].indexOf(area);
        if (iArea != -1) {
            areasByCountryIdx[country].splice(iArea, 1);
        }
        for (resortId in resortsByAreaIdx[area]) {
            instance.getResortById(resortId, function(resort) {
                if (resort.country == country) {
                    instance.removeResort(resort);
                }
            });
        }
        delete (resortsByAreaIdx[area]);
        store.setItem(resortsByAreaIdxKey, JSON.stringify(resortsByAreaIdx));
        store.setItem(areasByCountryIdxKey, JSON.stringify(areasByCountryIdx));
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
        if (!jsonString) {
            onResortRetrieved(null);
        }
        onResortRetrieved(jsonConverter.ResortFromJson(jsonString));
    };

    /**
     * 
     * @param {String} country country name
     * @param {Function} onResortsRetrieved
     */
    this.getResortsNameByCountry = function(country, onResortsRetrieved) {
        if (resortsByCountryIdx[country]) {
            onResortsRetrieved(resortsByCountryIdx[country]);
        } else {
            onResortsRetrieved({});
        }
    };

    /**
     * 
     * @param {String} area area name
     * @param {Function} onResortsRetrieved
     */
    this.getResortsNameByArea = function(area, onResortsRetrieved) {
        if (resortsByAreaIdx[area]) {
            onResortsRetrieved(resortsByAreaIdx[area]);
        } else {
            onResortsRetrieved({});
        }
    };

    /**
     * 
     * @param {String} country country name
     * @param {String} area area name
     * @param {Function} onResortsRetrieved
     */
    this.getResortsNameByCountryAndArea = function(country, area, onResortsRetrieved) {
        var resorts = {}, resortId = null;
        
        if(!country) {
            instance.getResortsNameByArea(area, onResortsRetrieved);
            return;
        }
        if(!area) {
            instance.getResortsNameByCountry(country, onResortsRetrieved);
            return;
        }

        if (!areasByCountryIdx.hasOwnProperty(country)
            || areasByCountryIdx[country].indexOf(area) == -1
            || !resortsByCountryIdx.hasOwnProperty(country)
            || !resortsByAreaIdx.hasOwnProperty(area)) {
            onResortsRetrieved({});
        }

        for (resortId in resortsByCountryIdx[country]) {
            if (resortsByAreaIdx[area].hasOwnProperty(resortId)) {
                resorts[resortId] = resortsByAreaIdx[area][resortId];
            }
        }
        onResortsRetrieved(resorts);
    };

    /**
     * 
     * @param {mbp.Resort} resort
     */
    this.removeResort = function(resort) {
        if (resort) {
            store.removeItem(storeResortsKeysPrefix + resort.id);
            if (resortsByAreaIdx[resort.area] && resortsByAreaIdx[resort.area][resort.id]) {
                delete (resortsByAreaIdx[resort.area][resort.id]);
            }
            if (resortsByCountryIdx[resort.country] && resortsByCountryIdx[resort.country][resort.id]) {
                delete (resortsByCountryIdx[resort.country][resort.id]);
            }
        }
    };

    /**
     * @param {Function} apply what to do with each resort id
     */
    function eachResortId(apply) {
        var iArea = null, resortId = null;

        for (iArea in resortsByAreaIdx) {
            for (resortId in resortsByAreaIdx[iArea]) {
                apply(resortId);
            }
        }
    }
    ;

    /**
     * 
     * @param {Function} func
     */
    function eachResort(func) {
        eachResortId(function(resortId) {
            instance.getResortById(resortId, func);
        });
    }

    /*--------*/
    /* Pistes */
    /*--------*/
    /**
     * 
     * @param {mbp.SearchPistesCriteria} criteria
     * @param {Function} onPistesRetrieved what to do with retrieved pistes
     */
    this.getPistesByCriteria = function(criteria, onPistesRetrieved) {
        var pistes = new Array();
        eachResort(function(resort) {
            if (resort) {
                pistes = pistes.concat(criteria.getMatchingPistes(resort));
            }
        });
        onPistesRetrieved(pistes);
    };

    /**
     * 
     * @param {String} userId
     * @param {Function} onPistesRetrieved what to do with retrieved pistes
     */
    this.getPistesByCreator = function(userId, onPistesRetrieved) {
        var pistes = new Array();
        eachPiste(function(piste) {
            if (piste.creatorId == userId) {
                pistes.push(piste);
            }
        });
        onPistesRetrieved(pistes);
    };

    /**
     * 
     * @param {String} latitude
     * @param {String} longitude
     * @param {Function} onPistesRetrieved
     */
    this.getPistesCloseTo = function(latitude, longitude, onPistesRetrieved) {
        onPistesRetrieved(new Array());
    };

    /**
     * finds pistes with no last update
     * @param {Function} send what to do with each piste to send
     */
    this.getPistesToSend = function(send) {
        eachPiste(function(piste) {
            if (!piste.lastUpdate) {
                send(piste);
            }
        });
    };

    /**
     * 
     * @param {Function} func
     */
    function eachPiste(func) {
        eachResort(function(resort) {
            resort.eachPiste(func);
        });
    }
    ;

    /*----------*/
    /* Comments */
    /*----------*/
    /**
     * finds comments with no last update
     * @param {Function} send what to do with each comment to send
     */
    this.getCommentsToSend = function(send) {
        eachComment(function(comment) {
            if (!comment.lastUpdate) {
                send(comment);
            }
        });
    };

    /**
     * 
     * @param {Function} func
     */
    function eachComment(func) {
        eachPiste(function(piste) {
            piste.eachComment(func);
        });
    }
    ;

    /*-------------*/
    /* Piste marks */
    /*-------------*/
    /**
     * finds piste marks with no last update
     * @param {Function} send what to do with piste marks to send
     */
    this.getUserMarksToSend = function(send) {
        eachUserMarks(function(userId, marks) {
            if (!marks.lastUpdate) {
                send(userId, marks);
            }
        });
    };

    /**
     * 
     * @param {Function} func
     */
    function eachUserMarks(func) {
        eachPiste(function(piste) {
            piste.eachUserMarks(function(userId, marks) {
                func(userId, marks);
            });
        });
    }
    ;

    /*----------------------------*/
    /* Resorts indexes management */
    /*----------------------------*/
    /**
     * 
     * @param {mbp.Resort} resort
     * @private
     */
    this.addResortToIndexes = function(resort) {
        instance.addResortToAreasByCountryIndex(resort);
        instance.addResortToResortsByCountryIndex(resort);
        instance.addResortToResortsByAreaIndex(resort);
    };

    /**
     * 
     * @param {mbp.Resort} resort
     * @private
     */
    this.addResortToAreasByCountryIndex = function(resort) {
        if (!areasByCountryIdx.hasOwnProperty(resort.country)) {
            areasByCountryIdx[resort.country] = new Array();
        }
        if (areasByCountryIdx[resort.country].indexOf(resort.area) == -1) {
            areasByCountryIdx[resort.country].push(resort.area);
        }
        store.setItem(areasByCountryIdxKey, JSON.stringify(areasByCountryIdx));
    };

    /**
     * 
     * @param {mbp.Resort} resort
     * @private
     */
    this.addResortToResortsByCountryIndex = function(resort) {
        if (!resortsByCountryIdx.hasOwnProperty(resort.country)) {
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
    this.addResortToResortsByAreaIndex = function(resort) {
        if (!resortsByAreaIdx.hasOwnProperty(resort.area)) {
            resortsByAreaIdx[resort.area] = {};
        }
        resortsByAreaIdx[resort.area][resort.id] = resort.name;
        store.setItem(resortsByAreaIdxKey, JSON.stringify(resortsByAreaIdx));
    };
};
