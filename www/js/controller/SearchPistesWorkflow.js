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
        searchPistesWidget.display(resortRepo.getCountries(), mbp.Piste.COLORS);
    };
    
    /**
     * @param {String} country
     * @param {Function} updateAreasList what to do after areas are retrieved
     */
    this.countrySelected = function(country, updateAreasList) {
        var areas = resortRepo.getAreas(country);
        updateAreasList(areas);
    };
    
    /**
     * @param {String} area
     * @param {Function} updateResortsList what to do after resorts are retrieved
     */
    this.areaSelected = function(area, updateResortsList) {
        var resorts = resortRepo.getResorts(area);
        updateResortsList(resorts);
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