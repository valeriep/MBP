"use strict";

/**
 * Add piste marks widget
 * @constructor
 * @param {String} hookSelector where to insert widget content
 * @param {String} rangeId
 * @param {String} label
 * @author ch4mp@c4-soft.com
 */
mbp.MarkRangeWidget = function(hookSelector, rangeId, label) {
    mbp.Widget.call(this, '#dot-mark-range', hookSelector);// parent constructor
    var parentShow = this.show;// save reference to Widget display function to call it from overloading function

    /**
     * Triggers Widget display and registers UI & form event handlers
     */
    this.show = function() {
        var data = {
            rangeId : rangeId,
            label : gettext('pisteMarks', label),
            icon : 'icon/' + label + '_18.png',
        };
        parentShow.call(this, data);
    };
    
    this.getMin = function() {
        return jQuery(hookSelector + ' #' + rangeId + '-min').val();
    };
    
    this.getMax = function() {
        return jQuery(hookSelector + ' #' + rangeId + '-max').val();
    };

    Object.preventExtensions(this);
};