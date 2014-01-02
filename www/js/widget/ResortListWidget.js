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
        var indexedResorts = {}, i=null;
        for(i in resorts) {
            if(!indexedResorts.hasOwnProperty(resorts[i].country)) {
                indexedResorts[resorts[i].country] = {};
            }
            if(!indexedResorts[resorts[i].country].hasOwnProperty(resorts[i].area)) {
                indexedResorts[resorts[i].country][resorts[i].area] = new Array();
            }
            indexedResorts[resorts[i].country][resorts[i].area].push(resorts[i]);
        }
        parentShow.call(this, indexedResorts);
        jQuery('.resort-link').click(function(event) {
            event.preventDefault();
            onResortClicked(this.attributes['data-resort-id'].value);
        });
    };

    Object.preventExtensions(this);
};