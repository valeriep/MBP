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
            searchPistesWidget = new mbp.SearchPistesWidget(instance.onCountryOrAreaChanged, instance.submit);
        }
        resortRepo.getAllCountries(function(countries) {
            searchPistesWidget.display(countries, mbp.Piste.COLORS);
        });
    };
    
    /**
     * @param {String} country
     * @param {Function} area
     * @param {Function} updateLists
     */
    this.onCountryOrAreaChanged = function(country, area, updateLists) {
        if(country) {
            resortRepo.getAreasByCountry(country, function(areas) {
                if(area) {
                    resortRepo.getResortsByCountryAndArea(country, area, function(resorts) {
                        updateLists(areas, resorts);
                    });
                } else {
                    resortRepo.getResortsByCountry(country, function(resorts) {
                        updateLists(areas, resorts);
                    });
                }
            });
        } else {
            resortRepo.getAllAreas(function(areas) {
                if(area) {
                    resortRepo.getResortsByArea(area, function(resorts) {
                        updateLists(areas, resorts);
                    });
                } else {
                    updateLists(areas, {});
                }
            });
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