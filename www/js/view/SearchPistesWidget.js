"use strict";

/**
 * 
 * @constructor
 * @param {Function} onCountryOrAreaChanged
 * @param {Function} onSubmit
 * @author ch4mp@c4-soft.com
 */
mbp.SearchPistesWidget = function(onCountryOrAreaChanged, onSubmit) {
    var instance = this;
    mbp.Widget.call(this, '#dot-search-pistes');// parent constructor
    var parentDisplay = this.display;// save reference to Widget display function to call it from overloading function
    var areas = new Array(), resorts = {};
    var formData = new mbp.SearchPistesCriteria('', '', '', '', '');

    /**
     * 
     * @param {Array} countries
     * @param {Array} colors
     */
    this.display = function(countries, colors) {
        parentDisplay.call(this, {
            countries : countries,
            areas : areas,
            resorts : resorts,
            colors : colors,
            criteria : formData
        });
        jQuery('#search-pistes-form').unbind('submit').submit(function(event) {
            onSubmit(formData);
            event.preventDefault();
            return false;
        });
        jQuery('#country').unbind('change').change(function() {
            var newCountry = jQuery('#country').selectmenu("refresh").val();
            var area = jQuery('#area').val();
            if(newCountry == formData.country) {
                return;
            }
            formData.country = newCountry;
            onCountryOrAreaChanged(newCountry, area, instance.updateLists);
        });
        jQuery('#area').unbind('change').change(function() {
            var newArea = jQuery('#area').selectmenu("refresh").val();
            var country = jQuery('#country').val();
            if(newArea == formData.area) {
                return;
            }
            formData.area = newArea;
            onCountryOrAreaChanged(country, newArea, instance.updateLists);
        });
        jQuery('#resort').unbind('change').change(function() {
            formData.resortId = jQuery('#resort').selectmenu("refresh").val();
        });
        jQuery('#color').unbind('change').change(function() {
            formData.color = jQuery('#color').selectmenu("refresh").val();
        });
        jQuery('#name').unbind('change').change(function() {
            formData.name = encodeURI(jQuery('#name').val().trim());
        });
        onCountryOrAreaChanged(formData.country, formData.area, instance.updateLists);
    };
    
    /**
     * @param {Array} arreasArr an {Array} of {String}
     * @param {Object} resortsMap an map of resort names by resort id
     */
    this.updateLists = function(arreasArr, resortsMap) {
        updateCollection('#area', arreasArr, false);
        updateCollection('#resort', resortsMap, true);
        
        areas = arreasArr;
        resorts = resortsMap;
        
        if(Object.keys(resortsMap).length) {
            jQuery('#resort').selectmenu('enable');
        } else {
            jQuery('#resort').selectmenu('disable');
        }
    };
    
    function updateCollection(jQuerySelector, entries, isMap) {
        var select = jQuery(jQuerySelector);
        var prevVal = select.val();
        
        jQuery(jQuerySelector + ' option').remove();
        select.append(jQuery("<option />").val('').text(''));
        jQuery.each(entries, function(idx, value) {
            select.append(jQuery("<option />").val(isMap ? idx : value).text(value));
        });
        
        if(isMap) {
            select.val(entries.hasOwnProperty(prevVal) ? prevVal : '');
        } else {
            select.val(entries.indexOf(prevVal) == -1 ? '' : prevVal);
        }
        select.selectmenu("refresh");
        select.change();
    };

    Object.preventExtensions(this);
};