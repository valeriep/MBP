"use strict";

/**
 * @param {Function} onPistesRetrieved a callback expecting an {Array} of {mbp.Piste}
 */
mbp.SearchPistesWorkflow = function(onPistesRetrieved) {
    var instance = this;
    var resortRepo = new mbp.LocalResortRepository();
    var searchPistesWidget = null;
    var criteria = new mbp.SearchPistesCriteria();
    var countries = resortRepo.getCountries();
    var massifs = new Array();
    var resorts = new Array();
    var colors = mbp.Piste.COLORS;
    
    this.activate = function() {
        if(!searchPistesWidget) {
            searchPistesWidget = new mbp.SearchPistesWidget(instance.submit);
        }
        searchPistesWidget.display(countries, massifs, resorts, colors, criteria);
    };
    
    this.countrySelected = function(country) {
        if(country == criteria.country) {
            return;
        }
        criteria.country = country;
        massifs = resortRepo.getMassifs(country);
        if(criteria.massif && massifs.indexOf(criteria.massif) == -1) {
            criteria.massif = null;
            criteria.resortId = null;
            resorts = new Array();
        }
        searchPistesWidget.display(countries, massifs, resorts, colors, criteria);
    };
    
    this.massifSelected = function(massif) {
        if(massif == criteria.massif) {
            return;
        }
        criteria.massif = massif;
        resorts = resortRepo.getResorts(massif);
        if(criteria.resortId && resorts.indexOf(criteria.resortId) == -1) {
            criteria.resortId = null;
        }
        searchPistesWidget.display(countries, massifs, resorts, colors, criteria);
    };
    
    this.resortSelected = function(resort) {
        criteria.resort = resort;
    };
    
    this.colorSelected = function(color) {
        criteria.color = color;
    };
    
    this.nameChanged = function(name) {
        criteria.name = name;
    };
    
    /**
     * @param {mbp.SearchPistesCriteria} criteria
     */
    this.submit = function(criteria) {
        resortRepo.findPistes(criteria, onPistesRetrieved);
    };
};