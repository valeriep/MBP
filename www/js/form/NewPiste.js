"use strict";

/**
 * 
 * @param {String} country
 * @param {String} area
 * @param {String} resortId
 * @param {String} name
 * @param {String} color
 * @param {String} description
 * @param {String} picture
 * @author ch4mp@c4-soft.com
 */
mbp.NewPiste = function(country, area, resortId, name, color, description, picture) {
    var instance = this, errors = {};
    var emptyError = "can't be empty";
    
    /** @type String */
    this.country = mbp.setStringProperty(country);
    
    /** @type String */
    this.area = mbp.setStringProperty(area);
    
    /** @type String */
    this.resortId = mbp.setStringProperty(resortId);
    
    /** @type String */
    this.name = mbp.setStringProperty(name);
    
    /** @type String */
    this.color = mbp.setStringProperty(color);
    
    /** @type String */
    this.description = mbp.setStringProperty(description);
    
    /** @type String */
    this.picture = mbp.setStringProperty(picture);
    
    /**
     * @returns {Object}
     */
    this.getErrors = function() {
        return errors;
    };
    
    /**
     * 
     * @param {mbp.Resort} resort
     * @returns {Object}
     */
    this.validate = function(resort) {
        errors = {};
        instance.validateCountry();
        instance.validateArea();
        instance.validateResort(resort);
        instance.validateName(resort);
        instance.validateColor();
        return errors;
    };
    
    this.validateCountry = function() {
        if(!instance.country) {
            errors.country = emptyError;
        }
    };
    
    this.validateArea = function() {
        if(!area) {
            errors.area = emptyError;
        }
    };
    
    /**
     * 
     * @param {mbp.Resort} resort
     */
    this.validateResort = function(resort) {
        if(!instance.resortId) {
            errors.resort = emptyError;
        }
        if(!resort) {
            errors.resort = 'could not be retrieved';
        }
    };
    
    /**
     * 
     * @param {mbp.Resort} resort
     */
    this.validateName = function(resort) {
        if(!instance.name) {
            errors.name = emptyError;
        } else if(resort) {
            var criteria = new mbp.SearchPistesCriteria(resort.country, resort.area, resort.id, instance.name, null);
            app.services.resortRepo.getPistesByCriteria(criteria, function(pistes) {
                if(pistes.length) {
                    errors.name = 'exists';
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