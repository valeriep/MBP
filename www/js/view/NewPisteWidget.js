"use strict";

/**
 * Authentication Widget
 * 
 * @constructor
 * @param {Function} onCountryChanged
 * @param {Function} onMassifChanged
 * @param {Function} onResortChanged
 * @param {Function} onNameChanged
 * @param {Function} onColorChanged
 * @param {Function} onDescriptionChanged
 * @param {Function} onKeywordsChanged
 * @param {Function} onSubmit submit event handler
 * @author Ch4mp
 * 
 */
mbp.NewPisteWidget = function(onCountryChanged, onMassifChanged, onResortChanged, onNameChanged, onColorChanged, onDescriptionChanged, onKeywordsChanged, onSubmit) {
    mbp.Widget.call(this, '#dot-new-piste');// parent constructor
    var parentDisplay = this.display;// save reference to Widget display function to call it from overloading function

    this.display = function(countries, massifs, resorts, colors, newPiste, errors) {
        parentDisplay.call(this, {
            countries : countries,
            massifs : massifs,
            resorts : resorts,
            colors : colors,
            newPiste : newPiste,
            errors : errors 
        });
        $('#new-piste-form').submit(function() {
            var newPiste = new mbp.NewPiste(
                    $('#country').val(),
                    $('#massif').val(),
                    $('#resort').val(),
                    $('#name').val(),
                    $('#color').val(),
                    $('#description').val(),
                    $('#keywords').val());
            onSubmit(newPiste);
            return false; // interrupt submit chain
        });
        $('#country').change(function() {
            onCountryChanged($('#country').val());
        });
        $('#massif').change(function() {
            onMassifChanged($('#massif').val());
        });
        $('#resort').change(function() {
            onResortChanged($('#resort').val());
        });
        $('#color').change(function() {
            onColorChanged($('#color').val());
        });
        $('#name').change(function() {
            onNameChanged($('#name').val());
        });
        $('#description').change(function() {
            onDescriptionChanged($('#description').val());
        });
        $('#keywords').change(function() {
            onKeywordsChanged($('#keywords').val());
        });
    };

    Object.preventExtensions(this);
};