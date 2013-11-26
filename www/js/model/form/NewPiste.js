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
 */
mbp.NewPiste = function(country, area, resortId, name, color, description, keywordsString, picture) {
    var instance = this;
    
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
    
    instance.setKeywords(keywordsString);
    
    /** @type String */
    this.picture = picture;
};