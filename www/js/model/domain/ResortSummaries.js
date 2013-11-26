"use strict";

/**
 * @constructor
 * @param {Array} resortSummaryArray
 * @author ch4mp@c4-soft.com
 */
mbp.ResortSummaries = function(resortSummaryArray) {
    var data = {};
    var i = null;
    /** @type mbp.ResortSummary */
    var resortSummary;
    
    for(i in resortSummaries) {
        resortSummary = resortSummaries[i];
        if(!data[resortSummary.country]) {
            data[resortSummary.country] = {};
        }
        if(!data[resortSummary.country][resortSummary.area]) {
            data[resortSummary.country][resortSummary.area] = {};
        }
        data[resortSummary.country][resortSummary.area][resortSummary.id] = resortSummary;
    }
    
    this.eachResortSummary = function(func) {
        var country = null, massif = null, resortId = null;
        for(country in data) {
            for(massif in data[country]) {
                for(resortId in data[country][massif]) {
                    func(data[country][massif][resortId]);
                }
            }
        }
    };
    
    this.getCountries = function() {
        return Object.keys(data);
    };
    
    this.getAreas = function(country) {
        return Object.keys(data[country]);
    };
    
    this.getSummariesByResortId = function(country, area) {
        return data[country][area];
    };
    
    Object.preventExtensions(this);
};