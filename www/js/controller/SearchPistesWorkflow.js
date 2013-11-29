"use strict";

/**
 * Drives piste retrieving workflow
 * @constructor
 * @param {mbp.MyBestPistes} app
 * @author ch4mp@c4-soft.com
 */
mbp.SearchPistesWorkflow = function(app) {
    var instance = this;
    
    //widgets
    var searchPistesWidget = null;
    var pistesBriefWidget = new mbp.PistesBriefWidget();
    
    this.activate = function() {
        var resortRepo = mbp.LocalResortRepository.getInstance();
        app.services.resortsSyncyncService.run();
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
        var resortRepo = mbp.LocalResortRepository.getInstance();
        if(country) {
            resortRepo.getAreasByCountry(country, function(areas) {
                if(area) {
                    resortRepo.getResortsNameByCountryAndArea(country, area, function(resorts) {
                        updateLists(areas, resorts);
                    });
                } else {
                    resortRepo.getResortsNameByCountry(country, function(resorts) {
                        updateLists(areas, resorts);
                    });
                }
            });
        } else {
            resortRepo.getAllAreas(function(areas) {
                if(area) {
                    resortRepo.getResortsNameByArea(area, function(resorts) {
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
        app.services.resortsSyncyncService.getPistesByCriteria(criteria, function(pistes) {
            pistesBriefWidget.display(pistes);
        });
    };
};