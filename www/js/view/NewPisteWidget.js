"use strict";

/**
 * Authentication Widget
 * @constructor
 * @param {Function} onCountryChanged event handler
 * @param {Function} onAreaChanged event handler
 * @param {Function} onSubmit submit event handler
 * @param {Function} getPicture
 * @author ch4mp@c4-soft.com
 */
mbp.NewPisteWidget = function(onCountryChanged, onAreaChanged, onSubmit, getPicture) {
    var instance = this;
    mbp.Widget.call(this, '#dot-new-piste');// parent constructor
    var parentDisplay = this.display;// save reference to Widget display function to call it from overloading function
    var areas = new Array();
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
            areas : areas,
            resorts : resorts,
            colors : colors,
            newPiste : formData,
            errors : errors 
        });
        function updateSaveButtonState() {
            if(formData.resortId  && formData.name  && formData.color) {
                jQuery('.save-piste').button('enable');
            } else {
                jQuery('.save-piste').button('disable');
            }
        };
        jQuery('#new-piste-form').unbind('submit').submit(function(event) {
            onSubmit(formData, instance.updateErrors);
            event.preventDefault();
            return false;
        });
        jQuery('#country').unbind('change').change(function() {
            var newCountry = jQuery('#country').selectmenu("refresh").val();
            if(newCountry == formData.country) {
                return;
            }
            formData.country = newCountry;
            onCountryChanged(newCountry, instance.updateAreasList);
        });
        jQuery('#area').unbind('change').change(function() {
            var newArea = jQuery('#area').selectmenu("refresh").val();
            if(newArea == formData.area) {
                return;
            }
            formData.area = newArea;
            onAreaChanged(newArea, instance.updateResortsList);
        });
        jQuery('#resort').unbind('change').change(function() {
            formData.resortId = jQuery('#resort').selectmenu("refresh").val();
            updateSaveButtonState();
        });
        jQuery('#color').unbind('change').change(function() {
            formData.color = jQuery('#color').selectmenu("refresh").val();
            updateSaveButtonState();
        });
        jQuery('#name').unbind('change').change(function() {
            formData.name = jQuery('#name').val().trim();
            updateSaveButtonState();
        });
        jQuery('#description').unbind('change').change(function() {
            formData.description = jQuery('#description').val().trim();
        });
        jQuery('#keywords').unbind('change').change(function() {
            formData.setKeywords(jQuery('#keywords').val().toLowerCase().trim());
        });
        jQuery('.take-picture').unbind('click').click(function() {
            jQuery('#picture-popup').popup('close');
            getPicture(cameraSuccess, cameraError, false);
        });
        jQuery('.gallery').unbind('click').click(function() {
            jQuery('#picture-popup').popup('close');
            getPicture(cameraSuccess, cameraError, true);
        });
    };
    
    /**
     * @param {Array} areasList an {Array} of {String}
     */
    this.updateAreasList = function(areasList) {
        areas = areasList;
        var select = jQuery('#area');
        jQuery('#area option').remove();
        select.append(jQuery("<option />").val('').text(''));
        if(!areasList.length) {
            select.selectmenu('disable');
        } else {
            jQuery.each(areasList, function(idx, area) {
                select.append(jQuery("<option />").val(area).text(area));
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
    
    /**
     * 
     * @param {Object} errorMap
     */
    this.updateErrors = function(errorMap) {
        var message = '';
        if(errorMap.hasOwnProperty('country')) {
            message += 'Country is invalid: ' + errorMap.country + '\n';
        }
        if(errorMap.hasOwnProperty('area')) {
            message += 'Area is invalid: ' + errorMap.area + '\n';
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
    
    function cameraSuccess(fileUri) {
        var pic = document.getElementById('piste-pic');
        formData.picture = fileUri;
        pic.src = fileUri;
        pic.style.display = 'block';
        pic.trigger('refresh');
    };
    
    function cameraError(message) {
        alert(message);
    };

    Object.preventExtensions(this);
};