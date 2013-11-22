"use strict";

/**
 * @param {Function} onPistesRetrieved a callback expecting an {Array} of {mbp.Piste}
 */
mbp.SearchPistesWorkflow = function() {
    var instance = this;
    
    //referential data
    var resortRepo = new mbp.LocalResortRepository();
    var countries = resortRepo.getCountries();
    var colors = mbp.Piste.COLORS;
    
    //widgets
    var searchPistesWidget = null;
    var pistesBriefWidget = new mbp.PistesBriefWidget();
    
    this.activate = function() {
        if(!searchPistesWidget) {
            searchPistesWidget = new mbp.SearchPistesWidget(instance.countrySelected, instance.massifSelected, instance.submit);
        }
        searchPistesWidget.display(countries, colors);
    };
    
    /**
     * @param {String} country
     * @param {Function} updateMassifsList what to do after massifs are retrieved
     */
    this.countrySelected = function(country, updateMassifsList) {
        var massifs = resortRepo.getMassifs(country);
        updateMassifsList(massifs);
    };
    
    /**
     * @param {String} massif
     * @param {Function} updateResortsList what to do after resorts are retrieved
     */
    this.massifSelected = function(massif, updateResortsList) {
        var resorts = resortRepo.getResorts(massif);
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