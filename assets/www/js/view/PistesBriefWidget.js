"use strict";

/**
 * Pistes brief Widget
 * 
 * @constructor
 * @param {Array} pistes
 * @author Ch4mp
 * 
 */
mbp.PistesBriefWidget = function(pistes) {
    mbp.Widget.call(this, '#dot-mark-snippet, #dot-piste-brief');// parent constructor
    var parentDisplay = this.display;// save reference to Widget display function to call it from overloading function

    /**
     * @returns {Object} template variable data
     */
    this.createTemplateData = function() {
        var pisteArr = new Array();
        /** @type mbp.Piste */
        var i = null, commentsIds;

        for (i in pistes) {
            commentsIds = pistes[i].getCommentsIds();
            pisteArr.push({
                id : pistes[i].id,
                color : pistes[i].color,
                name : pistes[i].name,
                marksCount : (commentsIds ? commentsIds.length : 0),
                averageMark : 2.2
            });
        }

        return {
            pistes : pisteArr
        };
    };

    /**
     * Triggers Widget display and registers UI & form event handlers
     */
    this.display = function() {
        parentDisplay.call(this);
    };

    Object.preventExtensions(this);
};