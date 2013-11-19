"use strict";

/**
 * @param {Function} onPistesRetrieved a callback expecting an {Array} of {mbp.Piste}
 */
mbp.SearchPistesWorkflow = function() {
    var instance = this;
    
    //referential data
    var resortRepo = new mbp.LocalResortRepository();
    var countries = resortRepo.getCountries();
    var massifs = new Array();
    var resorts = new Array();
    var colors = mbp.Piste.COLORS;
    
    //widgets
    var searchPistesWidget = null;
    var pistesBriefWidget = new mbp.PistesBriefWidget();
    
    //form backing objects
    var criteria = new mbp.SearchPistesCriteria();
    
    this.activate = function() {
        if(!searchPistesWidget) {
            searchPistesWidget = new mbp.SearchPistesWidget(instance.countrySelected, instance.massifSelected, instance.resortSelected, instance.colorSelected, instance.nameChanged, instance.submit);
        }
        searchPistesWidget.display(countries, massifs, resorts, colors, criteria);
    };
    
    /**
     * @param {String} country
     */
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
    
    /**
     * @param {String} massif
     */
    this.massifSelected = function(massif) {
        if(massif == criteria.massif) {
            return;
        }
        criteria.massif = massif;
        resorts = resortRepo.getResorts(massif);
        if(criteria.resortId && resorts.hasOwnProperty(criteria.resortId)) {
            criteria.resortId = null;
        }
        searchPistesWidget.display(countries, massifs, resorts, colors, criteria);
    };
    
    /**
     * @param {String} resortId
     */
    this.resortSelected = function(resortId) {
        criteria.resortId = resortId;
    };
    
    /**
     * @param {String} color
     */
    this.colorSelected = function(color) {
        criteria.color = color;
    };
    
    /**
     * @param {String} name
     */
    this.nameChanged = function(name) {
        criteria.name = name;
    };
    
    /**
     * @param {mbp.SearchPistesCriteria} criteria
     */
    this.submit = function(criteria) {
        resortRepo.findPistes(criteria, function(pistes) {
            pistesBriefWidget.display(pistes);
        });
    };
};