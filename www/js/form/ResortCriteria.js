"use strict";

/**
 * 
 * @constructor
 * @param {String} country
 * @param {String} area
 * @author ch4mp@c4-soft.com
 */
mbp.ResortCriteria = function(country, area) {
    var instance = this;

    /** @type String */
    this.country = country;

    /** @type String */
    this.area = area;

    /**
     * 
     * @param {mbp.Resort} resort
     * @returns {Boolean}
     */
    this.matches = function(resort) {
        if (!resort) {
            throw new Error('Invalid Resort');
        }
        if (instance.country && instance.country != resort.country) {
            return false;
        }
        if (instance.area && instance.area !== resort.area) {
            return false;
        }
        return true;
    };

    /**
     * 
     * @param {Array} input
     * @returns {Array} all matching {mbp.Resort}
     */
    this.filter = function(input) {
        var output = new Array(), i = null;

        for(i in input) {
            if (instance.matches(input[i])) {
                output.push(input[i]);
            }
        }

        return output;
    };
};
