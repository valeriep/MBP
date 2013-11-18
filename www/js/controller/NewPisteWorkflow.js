"use strict";

/**
 * Drives piste creation workflow
 * @constructor
 * @param {mbp.MyBestPistes} app
 * @author ch4mp@c4-soft.Com
 */
mbp.NewPisteWorkflow = function(app) {
    var instance = this;
    var emptyError = "can't be empty";
    var newPisteWidget = new mbp.NewPisteWidget(instance.submit);
    var newPiste = new mbp.NewPiste(null, null, null, '', null, '', '', null);
    var errors = {};
    /** @type mbp.Resort */
    var resort = null;

    this.resortRepo = new mbp.LocalResortRepository();
    
    this.validateCountry = function(newPiste, errors) {
        if(!newPiste.countryName) {
            errors.country = emptyError;
        }
        return errors;
    };
    
    this.validateMassif = function(newPiste, errors) {
        if(!newPiste.massifName) {
            errors.massif = emptyError;
        }
        return errors;
    };
    
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
    
    this.validateName = function(newPiste, errors, resort) {
        if(!newPiste.name) {
            errors.name = emptyError;
        } else if(resort && resort.getPiste(newPiste.name)) {
            errors.name = 'exists';
        }
        return errors;
    };
    
    this.validateColor = function(newPiste, errors) {
        if(!newPiste.color) {
            errors.color = emptyError;
        } else if(mbp.Piste.COLORS.indexOf(newPiste.color) == -1) {
            errors.color = 'unknown';
        }
        return errors;
    };
    
    this.validateNewPiste = function(newPiste) {
        var resort = instance.resortRepo.getResortById(newPiste.resortId);
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
        errors = this.validateNewPiste(submitted);
        
        if(errors.length) {
            instance.newPisteWidget.display(newPiste, errors);
        } else {
            new mbp.Piste(null, newPiste.name, newPiste.color, newPiste.description, newPiste.picture, 0, resort);
            instance.resortRepo.save(resort);
            newPiste.name = '';
            newPiste.color = null;
            newPiste.description = '';
            newPiste.picture = null;
        }
    };

    this.activate = function() {
        if(!app.user || !app.user.isAuthenticated()) {
            var authWorkflow = new mbp.AuthWorkflow(app, instance.activate);
            authWorkflow.activate();
        } else {
            newPisteWidget.display(newPiste, errors);
        }
    };

    Object.preventExtensions(this);
};