"use strict";

/**
 * 
 * @param {String} country
 * @param {String} area
 * @param {String} resortId
 * @param {String} name
 * @param {String} color
 * @param {String} description
 * @param {String} keywordsString
 * @param {String} picture
 * @author ch4mp@c4-soft.com
 */
mbp.NewPiste = function(country, area, resortId, name, color, description, keywordsString, picture) {
    var instance = this, errors = {};
    var emptyError = "can't be empty";
    
    /** @type String */
    this.country = country;
    
    /** @type String */
    this.area = area;
    
    /** @type String */
    this.resortId = resortId;
    
    /** @type String */
    this.name = name;
    
    /** @type String */
    this.color = color;
    
    /** @type String */
    this.description = description;
    
    /** @type Array */
    this.keywords;
    instance.setKeywords(keywordsString);
    
    /** @type String */
    this.picture = picture;
    
    /**
     * @param {String} keywordsString a string containing keywords separated by spaces (or word boundaries such as punctuation)
     */
    this.setKeywords = function(keywordsString) {
        instance.keywords = new Array();
        if(!keywordsString) {
            return;
        }
        var words = keywordsString.split(/\W+/), i = null;
        for(i in words) {
            if(words[i] && jQuery.inArray(words[i], instance.keywords) == -1) {
                instance.keywords.push(words[i]);
            }
        }
    };
    
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
            errors.resort = 'resort is not valid';
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