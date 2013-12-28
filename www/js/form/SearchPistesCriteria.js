"use strict";

/**
 * 
 * @constructor
 * @param {String} country
 * @param {String} area
 * @param {String} resortId
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
mbp.SearchPistesCriteria = function(
        country,
        area,
        resortId,
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

    /** @type String */
    this.country = country;

    /** @type String */
    this.area = area;

    /** @type String */
    this.resortId = resortId;

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
        if (!piste.getResort()) {
            throw new Error('Invalid Resort');
        }
        if (instance.country && instance.country !== piste.getResort().country) {
            return false;
        }
        if (instance.area && instance.area !== piste.getResort().area) {
            return false;
        }
        if (instance.resortId && instance.resortId !== piste.getResort().id) {
            return false;
        }
        if (instance.color && instance.color !== piste.color) {
            return false;
        }
        if (instance.sunMin > piste.averageMarks.sun || piste.averageMarks.sun > instance.sunMax) {
            return false;
        }
        if (instance.snowMin > piste.averageMarks.snow || piste.averageMarks.snow > instance.snowMax) {
            return false;
        }
        if (instance.accessMin > piste.averageMarks.access || piste.averageMarks.access > instance.accessMax) {
            return false;
        }
        if (instance.verticalDropMin > piste.averageMarks.verticalDrop || piste.averageMarks.verticalDrop > instance.verticalDropMax) {
            return false;
        }
        if (instance.lengthMin > piste.averageMarks.length || piste.averageMarks.length > instance.lengthMax) {
            return false;
        }
        if (instance.viewMin > piste.averageMarks.view || piste.averageMarks.view > instance.viewMax) {
            return false;
        }
        return true;
    };

    /**
     * 
     * @param {mbp.Resort} resort
     * @returns {Array} all matching {mbp.Piste}
     */
    this.getMatchingPistes = function(resort) {
        var pistes = new Array();

        resort.eachPiste(function(piste) {
            if (instance.matches(piste)) {
                pistes.push(piste);
            }
        });

        return pistes;
    };
};
