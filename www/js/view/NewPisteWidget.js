"use strict";

/**
 * Authentication Widget
 * 
 * @constructor
 * @param {Function} onCountryChanged event handler
 * @param {Function} onMassifChanged event handler
 * @param {Function} onSubmit submit event handler
 * @param {Function} getPicture
 * @author Ch4mp
 * 
 */
mbp.NewPisteWidget = function(onCountryChanged, onMassifChanged, onSubmit, getPicture) {
    var instance = this;
    mbp.Widget.call(this, '#dot-new-piste');// parent constructor
    var parentDisplay = this.display;// save reference to Widget display function to call it from overloading function
    var massifs = new Array();
    var resorts = new Array();
    var formData = new mbp.NewPiste('', '', '', '', '', '', '', '');
    var errors = {};

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
            newPiste : formData,
            errors : errors 
        });
        function updateSaveButtonState() {
            if(formData.resortId  && formData.name  && formData.color) {
                $('.save-piste').button('enable');
            } else {
                $('.save-piste').button('disable');
            }
        };
        $('#new-piste-form').unbind('submit').submit(function(event) {
            onSubmit(formData, instance.updateErrors);
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
            updateSaveButtonState();
        });
        $('#color').unbind('change').change(function() {
            formData.color = $('#color').selectmenu("refresh").val();
            updateSaveButtonState();
        });
        $('#name').unbind('change').change(function() {
            formData.name = $('#name').val().trim();
            updateSaveButtonState();
        });
        $('#description').unbind('change').change(function() {
            formData.description = $('#description').val().trim();
        });
        $('#keywords').unbind('change').change(function() {
            formData.setKeywords($('#keywords').val().toLowerCase().trim());
        });
        $('.take-picture').unbind('click').click(function() {
            jQuery('#picture-popup').popup('close');
            getPicture(instance.cameraSuccess, instance.cameraError, false);
        });
        $('.gallery').unbind('click').click(function() {
            jQuery('#picture-popup').popup('close');
            getPicture(instance.cameraSuccess, instance.cameraError, true);
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
    
    /**
     * 
     * @param {Object} errorMap
     */
    this.updateErrors = function(errorMap) {
        var message = '';
        if(errorMap.hasOwnProperty('country')) {
            message += 'Country is invalid: ' + errorMap.country + '\n';
        }
        if(errorMap.hasOwnProperty('massif')) {
            message += 'Massif is invalid: ' + errorMap.massif + '\n';
        }
        if(errorMap.hasOwnProperty('resort')) {
            message += 'Resort is invalid: ' + errorMap.resort + '\n';
        }
        if(errorMap.hasOwnProperty('name')) {
            message += 'Name is invalid: ' + errorMap.name + '\n';
        }
        if(errorMap.hasOwnProperty('color')) {
            message += 'Color is invalid: ' + errorMap.color + '\n';
        }
        alert(message);
    };
    
    this.cameraSuccess = function(fileUri) {
        var pic = document.getElementById('piste-pic');
        formData.picture = fileUri;
        pic.src = fileUri;
        pic.style.display = 'block';
        pic.trigger('refresh');
    };
    
    this.cameraError = function(message) {
        alert(message);
    };

    Object.preventExtensions(this);
};