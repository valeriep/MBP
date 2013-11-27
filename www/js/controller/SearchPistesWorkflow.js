"use strict";

/**
 * Drives piste retrieving workflow
 * @constructor
 * @author ch4mp@c4-soft.com
 */
mbp.SearchPistesWorkflow = function() {
    var instance = this;
    
    //referential data
    var resortRepo = mbp.LocalResortRepository.getInstance();
    
    //widgets
    var searchPistesWidget = null;
    var pistesBriefWidget = new mbp.PistesBriefWidget();
    
    this.activate = function() {
        if(!searchPistesWidget) {
            searchPistesWidget = new mbp.SearchPistesWidget(instance.countrySelected, instance.areaSelected, instance.submit);
        }
        resortRepo.getAllCountries(function(countries) {
            resortRepo.getAllAreas(function(areas) {
                searchPistesWidget.display(countries, areas, new Array(), mbp.Piste.COLORS);
            });
        });
    };
    
    /**
     * @param {String} country
     * @param {Function} updateAreasList
     * @param {Function} updateResortsList
     */
    this.countrySelected = function(country, area, updateAreasList, updateResortsList) {
        if(country) {
            resortRepo.getAreasByCountry(country, function(areas) {
                updateAreasList(areas);
            });
            resortRepo.getResortsByCountry(country, function(resorts) {
                updateResortsList(resorts);
            });
        } else {
            resortRepo.getAllAreas(function(areas) {
                updateAreasList(areas);
            });
            if(area) {
                resortRepo.getResortsByArea(area, function(resorts) {
                    updateResortsList(resorts);
                });
            } else {
                updateResortsList(new Array());
            }
        }
    };
    
    /**
     * @param {String} country
     * @param {String} area
     * @param {Function} updateResortsList what to do after resorts are retrieved
     */
    this.areaSelected = function(country, area, updateResortsList) {
        if(country && area) {
            resortRepo.getResortsByCountryAndArea(country, area, function(resorts) {
                updateResortsList(resorts);
            });
        } else if(country) {
            resortRepo.getResortsByCountry(country, function(resorts) {
                updateResortsList(resorts);
            });
        } else if(area) {
            resortRepo.getResortsByArea(area, function(resorts) {
                updateResortsList(resorts);
            });
        } else {
            updateResortsList(new Array());
        }
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