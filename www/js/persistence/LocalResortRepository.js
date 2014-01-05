"use strict";

mbp.LocalResortRepository = function() {
    var instance = this;
    var storeKeysPrefix = 'mbp.Resort.';

    var areasByCountryIdxKey = 'mbp.Resorts.abc';
    var resortNamesByAreaIdxKey = 'mbp.Resorts.rba';
    var areasByCountryIdx = parseJsonMap(areasByCountryIdxKey);
    var resortNamesByAreaIdx = parseJsonMap(resortNamesByAreaIdxKey);

    function parseJsonMap(key) {
        var tmp = localStorage.getItem(key);
        return tmp ? JSON.parse(tmp) : {};
    }

    /*-----------*/
    /* Countries */
    /*-----------*/

    /**
     * 
     * @param {String} country
     */
    this.addCountry = function(country) {
        if (!areasByCountryIdx[country]) {
            areasByCountryIdx[country] = new Array();
        }
        localStorage.setItem(areasByCountryIdxKey, JSON.stringify(areasByCountryIdx));
    };

    /**
     * 
     * @param {String} country
     */
    this.removeCountry = function(country) {
        var iArea = null;

        for (iArea in areasByCountryIdx[country]) {
            instance.removeArea(country, areasByCountryIdx[country][iArea]);
        }
        delete (areasByCountryIdx[country]);

        localStorage.setItem(areasByCountryIdxKey, JSON.stringify(areasByCountryIdx));
    };

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
     * @param {Function} onCountriesRetrieved
     */
    this.getAllCountries = function(onCountriesRetrieved) {
        onCountriesRetrieved(Object.keys(areasByCountryIdx));
    };

    /*-----------*/
    /* Areas */
    /*-----------*/

    /**
     * 
     * @param {String} country
     * @param {String} area
     */
    this.addArea = function(country, area) {
        if (!resortNamesByAreaIdx[area]) {
            resortNamesByAreaIdx[area] = {};
        }
        if (areasByCountryIdx[country].indexOf(area) == -1) {
            areasByCountryIdx[country].push(area);
        }
        localStorage.setItem(resortNamesByAreaIdxKey, JSON.stringify(resortNamesByAreaIdx));
        localStorage.setItem(areasByCountryIdxKey, JSON.stringify(areasByCountryIdx));
    };

    /**
     * 
     * @param {String} country
     * @param {String} area
     */
    this.removeArea = function(country, area) {
        var iArea, resortId = null;
        
        if(!areasByCountryIdx[country]) {
            return;
        }

        iArea = areasByCountryIdx[country].indexOf(area);
        if (iArea != -1) {
            areasByCountryIdx[country].splice(iArea, 1);
        }
        for (resortId in resortNamesByAreaIdx[area]) {
            instance.removeResort(resortId);
        }
        delete (resortNamesByAreaIdx[area]);
        localStorage.setItem(resortNamesByAreaIdxKey, JSON.stringify(resortNamesByAreaIdx));
        localStorage.setItem(areasByCountryIdxKey, JSON.stringify(areasByCountryIdx));
    };
    
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
     * @param {String} country country name
     * @param {Function} onAreasRetrieved
     */
    this.getAreasByCountry = function(country, onAreasRetrieved) {
        if (areasByCountryIdx[country]) {
            onAreasRetrieved(areasByCountryIdx[country]);
        } else {
            onAreasRetrieved(new Array());
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
        localStorage.setItem(storeKeysPrefix + resort.id, JSON.stringify(resort));
        instance.addResortToIndexes(resort);
    };

    /**
     * 
     * @param {String} resortId
     * @param {Function} onResortRetrieved
     */
    this.getResortById = function(resortId, onResortRetrieved) {
        var jsonString = localStorage.getItem(storeKeysPrefix + resortId), jsonObject;
        
        if (!jsonString) {
            onResortRetrieved(null);
            return;
        }
        
        jsonObject = JSON.parse(jsonString);
        onResortRetrieved(new mbp.Resort(jsonObject));
    };
    
    /**
     * @param {String} area
     * @param {Function} onResortsRetrieved
     */
    this.getResortsByArea = function(area, onResortsRetrieved) {
        var resorts = new Array(), resortId = null;
        
        for(resortId in resortNamesByAreaIdx[area]) {
            instance.getResortById(resortId, function(resort) {
                resorts.push(resort);
            });
        };
        resorts.sort(mbp.Resort.compareNames);
        onResortsRetrieved(resorts);
    };
    
    /**
     * @param {Function} onResortsRetrieved
     */
    this.getAllResorts = function(onResortsRetrieved) {
        var area = null, resortId = null, resorts = new Array();
        
        for(area in resortNamesByAreaIdx) {
            for(resortId in resortNamesByAreaIdx[area]) {
                instance.getResortById(resortId, function(resort) {
                    resorts.push(resort);
                });
            }
        }
        resorts.sort(mbp.Resort.compareNames);
        onResortsRetrieved(resorts);
    };

    /**
     * Returns a map of resort names by resort id
     * @param {String} area area name
     * @param {Function} onResortsRetrieved
     */
    this.getResortNamesByArea = function(area, onResortsRetrieved) {
        if (resortNamesByAreaIdx[area]) {
            onResortsRetrieved(resortNamesByAreaIdx[area]);
        } else {
            onResortsRetrieved({});
        }
    };

    /**
     * 
     * @param {String} resortId
     */
    this.removeResort = function(resortId) {
        var area = null;
        localStorage.removeItem(storeKeysPrefix + resortId);
        for (area in resortNamesByAreaIdx) {
            if(resortNamesByAreaIdx[area].hasOwnProperty(resortId)) {
                delete (resortNamesByAreaIdx[area][resortId]);
                localStorage.setItem(resortNamesByAreaIdxKey, JSON.stringify(resortNamesByAreaIdx));
                return;
            }
        }
    };

    /*--------------------*/
    /* indexes management */
    /*--------------------*/
    /**
     * 
     * @param {mbp.Resort} resort
     * @private
     */
    this.addResortToIndexes = function(resort) {
        instance.addResortToAreasByCountryIndex(resort);
        instance.addResortToResortNamesByAreaIndex(resort);
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
            areasByCountryIdx[resort.country].sort();
        }
        localStorage.setItem(areasByCountryIdxKey, JSON.stringify(areasByCountryIdx));
    };

    /**
     * 
     * @param {mbp.Resort} resort
     * @private
     */
    this.addResortToResortNamesByAreaIndex = function(resort) {
        if (!resortNamesByAreaIdx.hasOwnProperty(resort.area)) {
            resortNamesByAreaIdx[resort.area] = {};
        }
        resortNamesByAreaIdx[resort.area][resort.id] = resort.name;
        localStorage.setItem(resortNamesByAreaIdxKey, JSON.stringify(resortNamesByAreaIdx));
    };
};
