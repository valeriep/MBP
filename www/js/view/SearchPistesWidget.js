"use strict";

/**
 * 
 * @constructor
 * @param {Function} onCountryChanged event handler
 * @param {Function} onMassifChanged event handler
 * @param {Function} onResortChanged event handler
 * @param {Function} onColorChanged event handler
 * @param {Function} onNameChanged event handler
 * @param {Function} onSubmit submit event handler
 * @author Ch4mp
 */
mbp.SearchPistesWidget = function(onCountryChanged, onMassifChanged, onResortChanged, onColorChanged, onNameChanged, onSubmit) {
    mbp.Widget.call(this, '#dot-search-pistes');// parent constructor
    var parentDisplay = this.display;// save reference to Widget display function to call it from overloading function

    this.display = function(countries, massifs, resorts, colors, criteria) {
        parentDisplay.call(this, {
            countries : countries,
            massifs : massifs,
            resorts : resorts,
            colors : colors,
            criteria : criteria
        });
        $('#search-pistes-form').unbind('submit').submit(function(event) {
            var criteria = new mbp.SearchPistesCriteria($('#country').val(), $('#massif').val(), $('#resort').val(), $('#name').val(), $('#color').val());
            onSubmit(criteria);
            event.preventDefault();
            return false;
        });
        $('#country').unbind('change').change(function() {
            onCountryChanged($('#country').val());
        });
        $('#massif').unbind('change').change(function() {
            onMassifChanged($('#massif').val());
        });
        $('#resort').unbind('change').change(function() {
            onResortChanged($('#resort').val());
        });
        $('#color').unbind('change').change(function() {
            onColorChanged($('#color').val());
        });
        $('#name').unbind('change').change(function() {
            onNameChanged($('#name').val());
        });
    };

    Object.preventExtensions(this);
};