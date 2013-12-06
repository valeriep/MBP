"use strict";

/**
 * Drives piste creation workflow
 * @constructor
 * @param {mbp.MyBestPistes} app
 * @author ch4mp@c4-soft.com
 */
mbp.NewPisteWorkflow = function(app) {
    var instance = this;
    
    //widgets
    var newPisteWidget = null;
    var pisteDetailWidget = new mbp.PisteDetailWidget(app);
    
    var emptyError = "can't be empty";

    this.activate = function() {
        if(!app.user || !app.user.isAuthenticated()) {
            var authWorkflow = new mbp.AuthWorkflow(app, instance.activate);
            authWorkflow.activate();
        } else {
            if(!newPisteWidget) {
                newPisteWidget = new mbp.NewPisteWidget(instance.countrySelected, instance.areaSelected, instance.submit, app.device.getPicture);
            }
            app.services.localResortRepo.getAllCountries(function(countries) {
                newPisteWidget.display(countries, mbp.Piste.COLORS);
            });
        }
    };
    
    /**
     * @param {String} country
     * @param {Function} updateAreasList what to do after areas are retrieved
     */
    this.countrySelected = function(country, updateAreasList) {
        app.services.localResortRepo.getAreasByCountry(country, function(areas){
            updateAreasList(areas);
        });
    };
    
    /**
     * @param {String} area
     * @param {Function} updateResortsList what to do after resorts are retrieved
     */
    this.areaSelected = function(area, updateResortsList) {
        app.services.localResortRepo.getResortsNameByArea(area, function(resorts){
            updateResortsList(resorts);
        });
    };

    /**
     * @param {mbp.NewPiste} newPiste
     * @param {Function} onErrors what to do when validation failure happens
     */
    this.submit = function(newPiste, onErrors) {
        app.services.resortRepo.getResortById(newPiste.resortId, function(resort) {
            var errors = instance.validateNewPiste(newPiste, resort);
            
            if(Object.keys(errors).length) {
                onErrors(errors);
            } else {
                var pisteId = newPiste.country + '_' + newPiste.area + '_' + newPiste.resortId + '_' + newPiste.name;
                var piste = new mbp.Piste(
                        pisteId, 
                        null,
                        resort,
                        app.user.id,
                        newPiste.name, 
                        newPiste.color, 
                        newPiste.description, 
                        newPiste.picture,
                        new mbp.PisteMarks(0, 0, 0, 0, 0, pisteId, null), 
                        0,
                        null,
                        null);
                app.services.localResortRepo.saveResort(resort);
                app.services.resortsSyncService.run();
                newPiste.name = '';
                newPiste.color = null;
                newPiste.description = '';
                newPiste.picture = null;
                pisteDetailWidget.display(piste);
            }
        });
    };
    
    /**
     * @param {mbp.NewPiste} newPiste
     * @param {mbp.Resort} resort
     * @returns {Object}
     */
    this.validateNewPiste = function(newPiste, resort) {
        var errors = instance.validateCountry(newPiste.country, {});
        errors = instance.validateArea(newPiste.area, errors);
        errors = instance.validateResort(newPiste.resortId, resort, errors);
        errors = instance.validateName(newPiste.name, resort, errors);
        return instance.validateColor(newPiste.color, errors);
    };
    
    /**
     * @param {String} country
     * @param {Object} errors
     * @returns {Object} errors
     */
    this.validateCountry = function(country, errors) {
        if(!country) {
            errors.country = emptyError;
        }
        return errors;
    };
    
    /**
     * @param {String} area
     * @param {Object} errors
     * @returns {Object} errors
     */
    this.validateArea = function(area, errors) {
        if(!area) {
            errors.area = emptyError;
        }
        return errors;
    };
    
    /**
     * @param {String} resortId
     * @param {mbp.Resort} resort
     * @param {Object} errors
     * @returns {Object} errors
     */
    this.validateResort = function(resortId, resort, errors) {
        if(!resortId) {
            errors.resort = emptyError;
        }
        if(!resort) {
            errors.resort = 'could not be retrieved';
        }
        return errors;
    };
    
    /**
     * @param {String} name
     * @param {mbp.Resort} resort
     * @param {Object} errors
     * @returns {Object} errors
     */
    this.validateName = function(name, resort, errors) {
        if(!name) {
            errors.name = emptyError;
        } else if(resort) {
            var criteria = new mbp.SearchPistesCriteria(resort.country, resort.area, resort.id, name, null);
            app.services.resortRepo.getPistesByCriteria(criteria, function(pistes) {
                if(pistes.length) {
                    errors.name = 'exists';
                }
            });
        }
        return errors;
    };
    
    /**
     * @param {String} color
     * @param {Object} errors
     * @returns {Object} errors
     */
    this.validateColor = function(color, errors) {
        if(!color) {
            errors.color = emptyError;
        } else if(mbp.Piste.COLORS.indexOf(color) == -1) {
            errors.color = 'unknown';
        }
        return errors;
    };

    Object.preventExtensions(this);
};