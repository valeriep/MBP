"use strict";

/**
 * 
 * @constructor
 * @param {Function} onCountryChanged event handler
 * @param {Function} onAreaChanged event handler
 * @param {Function} onSubmit submit event handler
 * @author ch4mp@c4-soft.com
 */
mbp.SearchPistesWidget = function(onCountryChanged, onAreaChanged, onSubmit) {
    var instance = this;
    mbp.Widget.call(this, '#dot-search-pistes');// parent constructor
    var parentDisplay = this.display;// save reference to Widget display function to call it from overloading function
    var areas, resorts;
    var formData = new mbp.SearchPistesCriteria('', '', '', '', '');

    /**
     * 
     * @param {Array} countries
     * @param {Array} initAreas
     * @param {Array} initResorts
     * @param {Array} colors
     */
    this.display = function(countries, initAreas, initResorts, colors) {
        areas = initAreas;
        resorts = initResorts;
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
            onCountryChanged(newCountry, area, instance.updateAreasList, instance.updateResortsList);
        });
        jQuery('#area').unbind('change').change(function() {
            var newArea = jQuery('#area').selectmenu("refresh").val();
            var country = jQuery('#country').val();
            if(newArea == formData.area) {
                return;
            }
            formData.area = newArea;
            onAreaChanged(country, newArea, instance.updateResortsList);
        });
        jQuery('#resort').unbind('change').change(function() {
            formData.resortId = jQuery('#resort').selectmenu("refresh").val();
        });
        jQuery('#color').unbind('change').change(function() {
            formData.color = jQuery('#color').selectmenu("refresh").val();
        });
        jQuery('#name').unbind('change').change(function() {
            formData.name = jQuery('#name').val().trim();
        });
    };
    
    /**
     * @param {Array} areasList an {Array} of {String}
     */
    this.updateAreasList = function(areasList) {
        var select = jQuery('#area');
        var prevSelectedArea = select.val();
        areas = areasList;
        jQuery('#area option').remove();
        select.append(jQuery("<option />").val('').text(''));
        jQuery.each(areasList, function(idx, area) {
            select.append(jQuery("<option />").val(area).text(area));
        });
        select.val(areas.indexOf(prevSelectedArea) == -1 ? '' : prevSelectedArea);
        select.selectmenu("refresh");
        select.change();
    };

    /**
     * @param {Object} resortsList a Map of resort name by id
     */
    this.updateResortsList = function(resortsList) {
        resorts = resortsList;
        var select = jQuery('#resort');
        jQuery('#resort option').remove();
        select.append(jQuery("<option />").val('').text(''));
        if(!Object.keys(resortsList).length) {
            select.selectmenu('disable');
        } else {
            jQuery.each(resortsList, function(id, resort) {
                select.append(jQuery("<option />").val(id).text(resort));
            });
            select.selectmenu('enable');
        }
        select.val('');
        select.selectmenu("refresh");
        select.change();
        
    };

    Object.preventExtensions(this);
};