"use strict";

/**
 * Drives piste creation workflow
 * @constructor
 * @param {mbp.MyBestPistes} app
 * @author ch4mp@c4-soft.Com
 */
mbp.NewPisteWorkflow = function(app) {
    var instance = this;
    var emptyError = 'must not be empty';
    var widget = new mbp.NewPisteWidget(instance.submit);
    var newPiste = new mbp.NewPiste(null, null, null, '', null, '', '', null);
    var errors = {};
    var resortRepo = new mbp.LocalResortRepository();
    /** @type mbp.Resort */
    var resort = null;
    
    this.isCountryValid = function() {
        if(!newPiste.countryId) {
            errors.country = emptyError;
            return false;
        }
        return true;
    };
    
    this.isMassifValid = function() {
        if(!newPiste.massifId) {
            errors.massif = emptyError;
            return false;
        }
        return true;
    };
    
    this.isResortValid = function() {
        if(!newPiste.resortId) {
            errors.ressort = emptyError;
            resort = null;
            return false;
        }
        resort = resortRepo.getResort(newPiste.resortId);
        if(!resort) {
            errors.ressort = 'not found';
            return false;
        }
        return true;
    };
    
    this.isNameValid = function() {
        if(!newPiste.name) {
            errors.name = emptyError;
            return false;
        }
        if(resort && resort.getPiste(newPiste.name)) {
            errors.name = 'exists';
            return false;
        }
        return true;
    };
    
    this.isColorValid = function() {
        if(!newPiste.color) {
            errors.color = emptyError;
            return false;
        }
        return true;
    };
    
    this.isNewPisteValid = function() {
        return instance.isCountryValid()
            && instance.isMassifValid()
            && instance.isResortValid()
            && instance.isNameValid()
            && instance.isColorValid();
    };

    /**
     * Captures new piste widget submit events
     * @param {mbp.NewPiste} submitted
     */
    this.submit = function(submitted) {
        newPiste = submitted;
        errors = {};
        
        if(isNewPisteValid()) {
            new mbp.Piste(null, newPiste.name, newPiste.color, newPiste.description, newPiste.picture, 0, resort);
            resortRepo.save(resort);
        } else {
            instance.widget.display(newPiste, errors);
        }
    };

    /**
     * Triggers authentication widget display
     */
    this.activate = function() {
        widget.display(newPiste, errors);
    };

    Object.preventExtensions(this);
};