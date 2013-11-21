"use strict";

/**
 * Authentication Widget
 * 
 * @constructor
 * @param {Function} onCountryChanged
 * @param {Function} onMassifChanged
 * @param {Function} onResortChanged
 * @param {Function} onNameChanged
 * @param {Function} onSubmit submit event handler
 * @param {Function} getPicture
 * @author Ch4mp
 * 
 */
mbp.NewPisteWidget = function(onCountryChanged, onMassifChanged, onResortChanged, onNameChanged, onSubmit, getPicture) {
    mbp.Widget.call(this, '#dot-new-piste');// parent constructor
    var parentDisplay = this.display;// save reference to Widget display function to call it from overloading function
    var toSubmit = null;

    this.display = function(countries, massifs, resorts, colors, newPiste, errors) {
        toSubmit = newPiste;
        parentDisplay.call(this, {
            countries : countries,
            massifs : massifs,
            resorts : resorts,
            colors : colors,
            newPiste : newPiste,
            errors : errors 
        });
        $('#new-piste-form').submit(function(event) {
            onSubmit(toSubmit);
            event.preventDefault();
            return false;
        });
        $('#country').change(function() {
            var country = $('#country').val();
            if(country == toSubmit.country) {
                return;
            }
            toSubmit.country = country;
            onCountryChanged(toSubmit);
        });
        $('#massif').change(function() {
            var massif = $('#massif').val();
            if(massif == toSubmit.massif) {
                return;
            }
            toSubmit.massif = massif;
            onMassifChanged(toSubmit);
        });
        $('#resort').change(function() {
            var resortId = $('#resort').val();
            if(resortId == toSubmit.resortId) {
                return;
            }
            toSubmit.resortId = resortId;
            onResortChanged(toSubmit);
        });
        $('#color').change(function() {
            toSubmit.color = $('#color').val();
        });
        $('#name').change(function() {
            var name = $('#name').val();
            if(name == toSubmit.name) {
                return;
            }
            toSubmit.name = name;
            onNameChanged(toSubmit);
        });
        $('#description').change(function() {
            toSubmit.description = $('#description').val();
        });
        $('#keywords').change(function() {
            toSubmit.setKeywords($('#keywords').val());
        });
        $('.take-picture').click(function() {
            jQuery('#picture-popup').popup('close');
            getPicture(cameraSuccess, cameraError, false);
        });
        $('.gallery').click(function() {
            jQuery('#picture-popup').popup('close');
            getPicture(cameraSuccess, cameraError, true);
        });
        
        function cameraSuccess(fileUri) {
            var pic = document.getElementById('piste-pic');
            toSubmit.picture = fileUri;
            pic.src = fileUri;
            pic.style.display = 'block';
            pic.trigger('refresh');
        };
        
        function cameraError(message) {
            alert(message);
        };
    };

    Object.preventExtensions(this);
};