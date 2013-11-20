"use strict";

/**
 * Drives piste creation workflow
 * @constructor
 * @param {mbp.MyBestPistes} app
 * @author ch4mp@c4-soft.Com
 */
mbp.NewPisteWorkflow = function(app) {
    var instance = this;
    
    //referential data
    var resortRepo = new mbp.LocalResortRepository();
    var countries = resortRepo.getCountries();
    var massifs = new Array();
    var resorts = new Array();
    var colors = mbp.Piste.COLORS;
    
    //widgets
    var newPisteWidget = null;
    var pisteDetailWidget = new mbp.PisteDetailWidget();

    //form backing objects
    var newPiste = new mbp.NewPiste(null, null, null, '', null, '', '', null);
    var errors = {};
    
    var emptyError = "can't be empty";
    /** @type mbp.Resort */
    var resort = null;

    
    /**
     * @param {String} country
     */
    this.countrySelected = function(country) {
        if(country == newPiste.country) {
            return;
        }
        newPiste.country = country;
        massifs = resortRepo.getMassifs(country);
        if(newPiste.massif && massifs.indexOf(newPiste.massif) == -1) {
            newPiste.massif = null;
            newPiste.resortId = null;
            resorts = new Array();
        }
        instance.validateCountry(newPiste, errors);
        newPisteWidget.display(countries, massifs, resorts, colors, newPiste, errors);
    };
    
    /**
     * @param {String} massif
     */
    this.massifSelected = function(massif) {
        if(massif == newPiste.massif) {
            return;
        }
        newPiste.massif = massif;
        resorts = resortRepo.getResorts(massif);
        if(newPiste.resortId && resorts.hasOwnProperty(newPiste.resortId)) {
            newPiste.resortId = null;
        }
        instance.validateMassif(newPiste, errors);
        newPisteWidget.display(countries, massifs, resorts, colors, newPiste);
    };
    
    /**
     * @param {String} resortId
     */
    this.resortSelected = function(resortId) {
        newPiste.resortId = resortId;
        resort = resortRepo.getResortById(resortId);
        instance.validateResort(newPiste, errors, resort);
        newPisteWidget.display(countries, massifs, resorts, colors, newPiste);
    };
    
    /**
     * @param {String} name
     */
    this.nameChanged = function(name) {
        newPiste.name = name;
        instance.validateName(newPiste, errors, resort);
        newPisteWidget.display(countries, massifs, resorts, colors, newPiste, errors);
    };
    
    /**
     * @param {String} color
     */
    this.colorSelected = function(color) {
        newPiste.color = color;
        instance.validateColor(newPiste, errors, resort);
        newPisteWidget.display(countries, massifs, resorts, colors, newPiste);
    };
    
    /**
     * @param {String} name
     */
    this.descriptionChanged = function(description) {
        newPiste.description = description;
    };
    
    /**
     * @param {String} name
     */
    this.keywordsChanged = function(keywordsChanged) {
        newPiste.description = description;
    };
    
    /**
     * @param {String} name
     */
    this.pictureChanged = function(picture) {
        newPiste.picture = picture;
    };
    
    /**
     * @param {mbp.NewPiste} newPiste
     * @param {Object} errors
     * @returns {Object}
     */
    this.validateCountry = function(newPiste, errors) {
        if(!newPiste.country) {
            errors.country = emptyError;
        }
        return errors;
    };
    
    /**
     * @param {mbp.NewPiste} newPiste
     * @param {Object} errors
     * @returns {Object}
     */
    this.validateMassif = function(newPiste, errors) {
        if(!newPiste.massif) {
            errors.massif = emptyError;
        }
        return errors;
    };
    
    /**
     * @param {mbp.NewPiste} newPiste
     * @param {Object} errors
     * @returns {Object}
     */
    this.validateResort = function(newPiste, errors, resort) {
        if(!newPiste.resortId) {
            errors.resort = emptyError;
        } else if(!resort) {
            errors.resort = 'not found';
        } else if(newPiste.resortId != resort.id) {
            errors.resort = 'unmatched ids';
        }
        return errors;
    };
    
    /**
     * @param {mbp.NewPiste} newPiste
     * @param {Object} errors
     * @returns {Object}
     */
    this.validateName = function(newPiste, errors, resort) {
        if(!newPiste.name) {
            errors.name = emptyError;
        } else if(resort && resort.getPiste(newPiste.name)) {
            errors.name = 'exists';
        }
        return errors;
    };
    
    /**
     * @param {mbp.NewPiste} newPiste
     * @param {Object} errors
     * @returns {Object}
     */
    this.validateColor = function(newPiste, errors) {
        if(!newPiste.color) {
            errors.color = emptyError;
        } else if(mbp.Piste.COLORS.indexOf(newPiste.color) == -1) {
            errors.color = 'unknown';
        }
        return errors;
    };
    
    /**
     * @param {mbp.NewPiste} newPiste
     * @param {Object} errors
     * @returns {Object}
     */
    this.validateNewPiste = function(newPiste) {
        var resort = resortRepo.getResortById(newPiste.resortId);
        var errors = instance.validateCountry(newPiste, {});
        errors = instance.validateMassif(newPiste, errors);
        errors = instance.validateResort(newPiste, errors, resort);
        errors = instance.validateName(newPiste, errors, resort);
        return instance.validateColor(newPiste, errors);
    };

    /**
     * Captures new piste widget submit events
     * @param {mbp.NewPiste} submitted
     */
    this.submit = function(submitted) {
        newPiste = submitted;
        errors = instance.validateNewPiste(submitted);
        
        if(Object.keys(errors).length) {
            newPisteWidget.display(countries, massifs, resorts, colors, newPiste, errors);
        } else {
            var piste = new mbp.Piste(newPiste.country + '_' + newPiste.massif + '_' + newPiste.name, newPiste.name, newPiste.color, newPiste.description, newPiste.picture, 0, resort);
            resortRepo.save(resort);
            newPiste.name = '';
            newPiste.color = null;
            newPiste.description = '';
            newPiste.picture = null;
            pisteDetailWidget.display(piste);
        }
    };

    this.activate = function() {
        if(!app.user || !app.user.isAuthenticated()) {
            var authWorkflow = new mbp.AuthWorkflow(app, instance.activate);
            authWorkflow.activate();
        } else {
            if(!newPisteWidget) {
                newPisteWidget = new mbp.NewPisteWidget(
                        instance.countrySelected, 
                        instance.massifSelected, 
                        instance.resortSelected,
                        instance.nameChanged,
                        instance.colorSelected,
                        instance.descriptionChanged,
                        instance.keywordsChanged,
                        instance.submit);
            }
            newPisteWidget.display(countries, massifs, resorts, colors, newPiste, errors);
        }
    };

    Object.preventExtensions(this);
};