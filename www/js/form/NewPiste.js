"use strict";

/**
 * 
 * @param {String} resortId
 * @param {String} name
 * @param {String} color
 * @param {String} description
 * @author ch4mp@c4-soft.com
 */
mbp.NewPiste = function(resortId, name, color, description) {
    var instance = this, errors = {};
    var emptyError = "can't be empty";
    
    /** @type String */
    this.resortId = mbp.setStringProperty(resortId);
    
    /** @type String */
    this.name = mbp.setStringProperty(name);
    
    /** @type String */
    this.color = mbp.setStringProperty(color);
    
    /** @type String */
    this.description = mbp.setStringProperty(description);
    
    this.getErrors = function() {
        return errors;
    };
    
    this.validate = function() {
        errors = {};
        instance.validateResort();
        instance.validateName();
        instance.validateColor();
        return errors;
    };
    
    this.validateResort = function() {
        if(!instance.resortId) {
            errors.resort = emptyError;
        }
    };
    
    this.validateName = function() {
        if(!instance.name) {
            errors.name = emptyError;
        } else {
            app.localPisteRepo.getPistesByResortId(instance.resortId, function(pistes) {
                var i = null, lowerTrimed = instance.name.toLowerCase().trim();
                for(i in pistes) {
                    if(pistes[i].name.toLowerCase().trim() == lowerTrimed) {
                        errors.name = 'exists';
                    }
                }
            });
        }
    };
    
    this.validateColor = function() {
        if(!instance.color) {
            errors.color = emptyError;
        } else if(mbp.Piste.COLORS.indexOf(instance.color) == -1) {
            errors.color = 'unknown';
        }
    };
};