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
 * @param {Function} onPictureChanged
 * @param {Function} onSubmit submit event handler
 * @param {Function} getPicture
 * @author Ch4mp
 * 
 */
mbp.NewPisteWidget = function(onCountryChanged, onMassifChanged, onResortChanged, onNameChanged, onColorChanged, onDescriptionChanged, onKeywordsChanged, onPictureChanged, onSubmit, getPicture) {
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
        $('#new-piste-form').submit(function(event) {
            var newPiste = new mbp.NewPiste(
                    $('#country').val(),
                    $('#massif').val(),
                    $('#resort').val(),
                    $('#name').val(),
                    $('#color').val(),
                    $('#description').val(),
                    $('#keywords').val());
            onSubmit(newPiste);
            event.preventDefault();
            return false;
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
        $('.take-picture').click(function() {
            getPicture(cameraSuccess, cameraError, false);
        });
        $('.gallery').click(function() {
            getPicture(cameraSuccess, cameraError, true);
        });
        
        function cameraSuccess(fileUri) {
            jQuery('#picture-popup').popup('close');
            var pic = document.getElementById('piste-pic');
            pic.src = fileUri;
            pic.style.display = 'block';
            pic.trigger('refresh');
            onPictureChanged(fileUri);
        };
        
        function cameraError(message) {
            alert(message);
        };
    };

    Object.preventExtensions(this);
};