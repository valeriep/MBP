"use strict";

/**
 * Authentication Widget
 * 
 * @constructor
 * @param {Function} onSubmit submit event handler
 * @author Ch4mp
 * 
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
        $('#search-pistes-form').submit(function() {
            var criteria = new mbp.SearchPistesCriteria($('#country').val(), $('#massif').val(), $('#resort').val(), $('#name').val(), $('#color').val(), $('#keywords').val());
            onSubmit(criteria);
            return false;// interrupt submit chain
        });
        $('#country').change(onCountryChanged);
        $('#massif').change(onMassifChanged);
        $('#resort').change(onResortChanged);
        $('#color').change(onColorChanged);
        $('#name').change(onNameChanged);
    };

    Object.preventExtensions(this);
};