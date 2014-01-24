"use strict";

/**
 * 
 * @constructor
 * @param {Array} resortIds
 * @param {String} color
 * @param {Number} sunMin
 * @param {Number} sunMax
 * @param {Number} snowMin
 * @param {Number} snowMax
 * @param {Number} accessMin
 * @param {Number} accessMax
 * @param {Number} verticalDropMin
 * @param {Number} verticalDropMax
 * @param {Number} lengthMin
 * @param {Number} lengthMax
 * @param {Number} viewMin
 * @param {Number} viewMax
 * @author ch4mp@c4-soft.com
 */
mbp.PisteCriteria = function(
        resortIds,
        color,
        sunMin,
        sunMax,
        snowMin,
        snowMax,
        accessMin,
        accessMax,
        verticalDropMin,
        verticalDropMax,
        lengthMin,
        lengthMax,
        viewMin,
        viewMax) {
    var instance = this;

    /** @type Array */
    this.resortIds = resortIds;

    /** @type String */
    this.color = color;

    /** @type Number */
    this.sunMin = sunMin;

    /** @type Number */
    this.sunMax = sunMax;

    /** @type Number */
    this.snowMin = snowMin;

    /** @type Number */
    this.snowMax = snowMax;

    /** @type Number */
    this.accessMin = accessMin;

    /** @type Number */
    this.accessMax = accessMax;

    /** @type Number */
    this.verticalDropMin = verticalDropMin;

    /** @type Number */
    this.verticalDropMax = verticalDropMax;

    /** @type Number */
    this.lengthMin = lengthMin;

    /** @type Number */
    this.lengthMax = lengthMax;

    /** @type Number */
    this.viewMin = viewMin;

    /** @type Number */
    this.viewMax = viewMax;

    /**
     * 
     * @param {mbp.Piste} piste
     * @returns {Boolean}
     */
    this.matches = function(piste) {
        if (!piste) {
            throw new Error('Invalid Piste');
        }
        if (instance.resortIds && instance.resortIds.length && instance.resortIds.indexOf(piste.resortId) == -1) {
            return false;
        }
        if (instance.color && instance.color !== piste.color) {
            return false;
        }
        if ((instance.sunMin && piste.averageMarks.sun && instance.sunMin > piste.averageMarks.sun) || (instance.sunMax && piste.averageMarks.sun && piste.averageMarks.sun > instance.sunMax)) {
            return false;
        }
        if ((instance.snowMin && piste.averageMarks.snow && instance.snowMin > piste.averageMarks.snow) || (instance.snowMax && piste.averageMarks.snow && piste.averageMarks.snow > instance.snowMax)) {
            return false;
        }
        if ((instance.accessMin && piste.averageMarks.access && instance.accessMin > piste.averageMarks.access) || (instance.accessMax && piste.averageMarks.access && piste.averageMarks.access > instance.accessMax)) {
            return false;
        }
        if ((instance.verticalDropMin && piste.averageMarks.verticalDrop && instance.verticalDropMin > piste.averageMarks.verticalDrop) || (instance.verticalDropMax && piste.averageMarks.verticalDrop && piste.averageMarks.verticalDrop > instance.verticalDropMax)) {
            return false;
        }
        if ((instance.lengthMin && piste.averageMarks.length && instance.lengthMin > piste.averageMarks.length) || (instance.lengthMax && piste.averageMarks.length && piste.averageMarks.length > instance.lengthMax)) {
            return false;
        }
        if ((instance.viewMin && piste.averageMarks.view && instance.viewMin > piste.averageMarks.view) || (instance.viewMax && piste.averageMarks.view && piste.averageMarks.view > instance.viewMax)) {
            return false;
        }
        return true;
    };

    /**
     * 
     * @param {Array} input
     * @returns {Array} all matching {mbp.Piste}
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
    
    /**
     * 
     * @returns {Boolean} true if all fields are falsy
     */
    this.isEmpty = function() {
        if (instance.resortIds && instance.resortIds.length) {
            return false;
        } else if(instance.color) {
            return false;
        } else if(instance.sunMin && instance.sunMin > 1) {
            return false;
        } else if(instance.sunMax && instance.sunMax < 5) {
            return false;
        } else if(instance.snowMin && instance.snowMin > 1) {
            return false;
        } else if(instance.snowMax && instance.snowMax < 5) {
            return false;
        } else if(instance.accessMin && instance.accessMin > 1) {
            return false;
        } else if(instance.accessMax && instance.accessMax < 5) {
            return false;
        } else if(instance.verticalDropMin && instance.verticalDropMin > 1) {
            return false;
        } else if(instance.verticalDropMax && instance.verticalDropMax < 5) {
            return false;
        } else if(instance.lengthMin && instance.lengthMin > 1) {
            return false;
        } else if(instance.lengthMax && instance.lengthMax < 5) {
            return false;
        } else if(instance.viewMin && instance.viewMin > 1) {
            return false;
        } else if(instance.viewMax && instance.viewMax < 5) {
            return false;
        }
        return true;
    };
};
