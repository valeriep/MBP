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
        app.services.resortsSyncService.run();
        if(!searchPistesWidget) {
            searchPistesWidget = new mbp.SearchPistesWidget(instance.onCountryOrAreaChanged, instance.submit);
        }
        app.services.localResortRepo.getAllCountries(function(countries) {
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
            app.services.localResortRepo.getAreasByCountry(country, function(areas) {
                if(area) {
                    app.services.localResortRepo.getResortsNameByCountryAndArea(country, area, function(resorts) {
                        updateLists(areas, resorts);
                    });
                } else {
                    app.services.localResortRepo.getResortsNameByCountry(country, function(resorts) {
                        updateLists(areas, resorts);
                    });
                }
            });
        } else {
            app.services.localResortRepo.getAllAreas(function(areas) {
                if(area) {
                    app.services.localResortRepo.getResortsNameByArea(area, function(resorts) {
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
        app.services.resortsSyncService.getPistesByCriteria(criteria, function(pistes) {
            pistesBriefWidget.display(pistes, app.user);
        });
    };
};