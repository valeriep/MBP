"use strict";

/**
 * Drives piste retrieving workflow
 * @constructor
 * @author ch4mp@c4-soft.Com
 */
mbp.SearchPistesWorkflow = function() {
    var instance = this;
    
    //referential data
    var resortRepo = new mbp.LocalResortRepository();
    
    //widgets
    var searchPistesWidget = null;
    var pistesBriefWidget = new mbp.PistesBriefWidget();
    
    this.activate = function() {
        if(!searchPistesWidget) {
            searchPistesWidget = new mbp.SearchPistesWidget(instance.countrySelected, instance.areaSelected, instance.submit);
        }
        resortRepo.getAllCountries(function(countries) {
            searchPistesWidget.display(countries, mbp.Piste.COLORS);
        });
    };
    
    /**
     * @param {String} country
     * @param {Function} updateAreasList what to do after areas are retrieved
     */
    this.countrySelected = function(country, updateAreasList) {
        resortRepo.getAreasByCountry(country, function(areas) {
            updateAreasList(areas);
        });
    };
    
    /**
     * @param {String} area
     * @param {Function} updateResortsList what to do after resorts are retrieved
     */
    this.areaSelected = function(area, updateResortsList) {
        resortRepo.getResortsByArea(area, function(resorts) {
            updateResortsList(resorts);
        });
    };
    
    /**
     * @param {mbp.SearchPistesCriteria} criteria
     */
    this.submit = function(criteria) {
        resortRepo.getPistesByCriteria(criteria, function(pistes) {
            pistesBriefWidget.display(pistes);
        });
    };
};