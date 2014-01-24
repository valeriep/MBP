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
    var parentShow = this.show, min = 1, max = 5;

    /**
     * Triggers Widget display and registers UI & form event handlers
     */
    this.show = function() {
        var data = {
            rangeId : rangeId,
            label : gettext('pisteMarks', label),
            icon : 'icon/' + label + '_18.png',
            min : min,
            max : max,
        };
        parentShow.call(this, data);
        jQuery(hookSelector + ' #' + rangeId + '-min').unbind('change').change(function() {
            min = jQuery(this).val();
        });
        jQuery(hookSelector + ' #' + rangeId + '-max').unbind('change').change(function() {
            max = jQuery(this).val();
        });
    };
    
    this.getMin = function() {
        return min;
    };
    
    this.getMax = function() {
        return max;
    };

    Object.preventExtensions(this);
};