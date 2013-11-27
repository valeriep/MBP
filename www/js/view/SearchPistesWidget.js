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
    var areas = new Array();
    var resorts = new Array();
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
        $('#search-pistes-form').unbind('submit').submit(function(event) {
            onSubmit(formData);
            event.preventDefault();
            return false;
        });
        $('#country').unbind('change').change(function() {
            var newCountry = $('#country').selectmenu("refresh").val();
            if(newCountry == formData.country) {
                return;
            }
            formData.country = newCountry;
            onCountryChanged(newCountry, instance.updateAreasList);
        });
        $('#area').unbind('change').change(function() {
            var newArea = $('#area').selectmenu("refresh").val();
            if(newArea == formData.area) {
                return;
            }
            formData.area = newArea;
            onAreaChanged(newArea, instance.updateResortsList);
        });
        $('#resort').unbind('change').change(function() {
            formData.resortId = $('#resort').selectmenu("refresh").val();
        });
        $('#color').unbind('change').change(function() {
            formData.color = $('#color').selectmenu("refresh").val();
        });
        $('#name').unbind('change').change(function() {
            formData.name = $('#name').val().trim();
        });
    };
    
    /**
     * @param {Array} areasList an {Array} of {String}
     */
    this.updateAreasList = function(areasList) {
        areas = areasList;
        var select = $('#area');
        $('#area option').remove();
        select.append($("<option />").val('').text(''));
        if(!areasList.length) {
            select.selectmenu('disable');
        } else {
            $.each(areasList, function(idx, area) {
                select.append($("<option />").val(area).text(area));
            });
            select.selectmenu('enable');
        }
        select.val('');
        select.selectmenu("refresh");
        select.change();
    };

    /**
     * @param {Object} resortsList a Map of resort name by id
     */
    this.updateResortsList = function(resortsList) {
        resorts = resortsList;
        var select = $('#resort');
        $('#resort option').remove();
        select.append($("<option />").val('').text(''));
        if(!Object.keys(resortsList).length) {
            select.selectmenu('disable');
        } else {
            $.each(resortsList, function(id, resort) {
                select.append($("<option />").val(id).text(resort));
            });
            select.selectmenu('enable');
        }
        select.val('');
        select.selectmenu("refresh");
        select.change();
        
    };

    Object.preventExtensions(this);
};