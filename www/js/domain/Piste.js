"use strict";

/**
 * @constructor
 * @param {Object} other
 * @author ch4mp@c4-soft.com
 */
mbp.Piste = function(other) {
    var instance = this;

    /** @type String */
    this.id = other ? mbp.setStringProperty(other.id) : null;

    /** @type String */
    this.lastUpdate = other ? mbp.setStringProperty(other.lastUpdate) : null;

    /** @type String */
    this.resortId = other ? other.resortId : null;

    /** @type String */
    this.creatorId = other ? mbp.setStringProperty(other.creatorId) : null;

    /** @type String */
    this.name = other ? mbp.setStringProperty(other.name) : null;

    /** @type String */
    this.color = other ? mbp.setStringProperty(other.color) : null;

    /** @type String */
    this.description = other ? mbp.setStringProperty(other.description) : null;

    /** @type mbp.PisteMarks */
    this.averageMarks = new mbp.PisteMarks(other ? other.averageMarks : null);

    /** @type Array */
    this.images = other && other.images ? other.images.slice() : new Array();

    /** @type Number */
    this.marksCount = other ? other.marksCount : null;

    /** @type Boolean */
    this.accepted = other ? other.accepted : null;
    
    this.updateMarksAverage = function(userId, newUserMarks) {
        var prevUserMarks = instance.getUserMarks(userId);
        
        if(prevUserMarks) {
            instance.averageMarks.snow = updateAvg(instance.marksCount, instance.averageMarks.snow, prevUserMarks.snow, newUserMarks.snow);
            instance.averageMarks.sun = updateAvg(instance.marksCount, instance.averageMarks.sun, prevUserMarks.sun, newUserMarks.sun);
            instance.averageMarks.access = updateAvg(instance.marksCount, instance.averageMarks.access, prevUserMarks.access, newUserMarks.access);
            instance.averageMarks.verticalDrop = updateAvg(instance.marksCount, instance.averageMarks.verticalDrop, prevUserMarks.verticalDrop, newUserMarks.verticalDrop);
            instance.averageMarks.length = updateAvg(instance.marksCount, instance.averageMarks.length, prevUserMarks.length, newUserMarks.length);
            instance.averageMarks.view = updateAvg(instance.marksCount, instance.averageMarks.view, prevUserMarks.view, newUserMarks.view);
        } else {
            instance.averageMarks.snow = addToAvg(instance.marksCount, instance.averageMarks.snow, newUserMarks.snow);
            instance.averageMarks.sun = addToAvg(instance.marksCount, instance.averageMarks.sun, newUserMarks.sun);
            instance.averageMarks.access = addToAvg(instance.marksCount, instance.averageMarks.access, newUserMarks.access);
            instance.averageMarks.verticalDrop = addToAvg(instance.marksCount, instance.averageMarks.verticalDrop, newUserMarks.verticalDrop);
            instance.averageMarks.length = addToAvg(instance.marksCount, instance.averageMarks.length, newUserMarks.length);
            instance.averageMarks.view = addToAvg(instance.marksCount, instance.averageMarks.view, newUserMarks.view);
            instance.marksCount += 1;
        }
        instance.addUserMarks(userId, newUserMarks);
    };
    
    function updateAvg(cnt, prevAvg, prevVal, newVal) {
        return (cnt * prevAvg - prevVal + newVal) / cnt;
    };
    
    function addToAvg(cnt, avg, newVal) {
        return (cnt * avg + newVal) / (cnt + 1);
    };
    
    Object.preventExtensions(this);
};

mbp.Piste.BLUE = 'blue';
mbp.Piste.GREEN = 'green';
mbp.Piste.RED = 'red';
mbp.Piste.BLACK = 'black';
mbp.Piste.COLORS = new Array(mbp.Piste.BLUE, mbp.Piste.GREEN, mbp.Piste.RED, mbp.Piste.BLACK);