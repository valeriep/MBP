"use strict";

/**
 * 
 * @constructor
 * @param {Function} onCountryChanged event handler
 * @param {Function} onMassifChanged event handler
 * @param {Function} onSubmit submit event handler
 * @author Ch4mp
 */
mbp.SearchPistesWidget = function(onCountryChanged, onMassifChanged, onSubmit) {
    var instance = this;
    mbp.Widget.call(this, '#dot-search-pistes');// parent constructor
    var parentDisplay = this.display;// save reference to Widget display function to call it from overloading function
    var massifs = new Array();
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
            massifs : massifs,
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
            onCountryChanged(newCountry, instance.updateMassifsList);
        });
        $('#massif').unbind('change').change(function() {
            var newMassif = $('#massif').selectmenu("refresh").val();
            if(newMassif == formData.massif) {
                return;
            }
            formData.massif = newMassif;
            onMassifChanged(newMassif, instance.updateResortsList);
        });
        $('#resort').unbind('change').change(function() {
            formData.resortId = $('#resort').selectmenu("refresh").val();
        });
        $('#color').unbind('change').change(function() {
            formData.color = $('#color').selectmenu("refresh").val();
        });
        $('#name').unbind('change').change(function() {
            formData.name = $('#name').val();
        });
    };
    
    /**
     * @param {Array} massifsList an {Array} of {String}
     */
    this.updateMassifsList = function(massifsList) {
        massifs = massifsList;
        var select = $('#massif');
        $('#massif option').remove();
        select.append($("<option />").val('').text(''));
        if(!massifsList.length) {
            select.selectmenu('disable');
        } else {
            $.each(massifsList, function(idx, massif) {
                select.append($("<option />").val(massif).text(massif));
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