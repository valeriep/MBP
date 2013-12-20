"use strict";

/**
 * 
 * @constructor
 * @param {String} hookSelector jQuery selector into which the resort list should be inserted
 * @param {Function} onResortClicked 
 * @author ch4mp@c4-soft.com
 */
mbp.ResortListWidget = function(hookSelector, onResortClicked) {
    mbp.Widget.call(this, '#dot-resort-list', hookSelector);// parent constructor
    var parentShow = this.show;
    
    this.show = function(resorts) {
        parentShow.call(this, resorts);
        jQuery('.resort-link').click(function(event) {
            event.preventDefault();
            onResortClicked(this.attributes['data-resort-id'].value);
        });
    };

    Object.preventExtensions(this);
};