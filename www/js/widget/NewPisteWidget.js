"use strict";

/**
 * Authentication Widget
 * @constructor
 * @param {Function} onPisteCreated
 * @author ch4mp@c4-soft.com
 */
mbp.NewPisteWidget = function(onPisteCreated) {
    mbp.Widget.call(this, '#dot-new-piste');// parent constructor
    
    var instance = this;
    var parentShow = this.show;
    
    var name = '', description = '';
    var errors = {};
    
    var resortSelectWidget = new mbp.ResortSelectionWidget('#new-piste-form .resort-select', true, formFieldChanged);
    var areaSelectWidget = new mbp.AreaSelectionWidget('#new-piste-form .area-select', resortSelectWidget, true);
    var countrySelectWidget = new mbp.CountrySelectionWidget('#new-piste-form .country-select', areaSelectWidget, true);
    var colorSelectWidget = new mbp.ColorSelectionWidget('#new-piste-form .color-select', true, formFieldChanged);
    

    /**
     * 
     */
    this.show = function() {
        parentShow.call(this, {
            name : name,
            description : description,
            errors : errors
        });
        app.localResortRepo.getAllCountries(function(countries) {
            countrySelectWidget.show(countries);
        });
        colorSelectWidget.show(mbp.Piste.COLORS);

        jQuery('#new-piste-form').unbind('submit').submit(
                function(event) {
                    instance.submit(new mbp.NewPiste(resortSelectWidget.getSelected(), name, colorSelectWidget.getSelected(), description));
                    event.preventDefault();
                    return false;
                });
        jQuery('#name').unbind('change').change(function() {
            name = mbp.sanitize(jQuery('#name').val().trim());
            formFieldChanged();
        });
        jQuery('#description').unbind('change').change(function() {
            description = mbp.sanitize(jQuery('#description').val().trim());
        });
    };

    function formFieldChanged() {
        if (resortSelectWidget.getSelected() && name && colorSelectWidget.getSelected()) {
            jQuery('.save-piste').button('enable');
        } else {
            jQuery('.save-piste').button('disable');
        }
    }

    /**
     * 
     * @param {Object} errorMap
     */
    this.showErrors = function(errorMap) {
        var message = '';
        if (errorMap.hasOwnProperty('country')) {
            message += 'Country is invalid: ' + errorMap.country + '\n';
        }
        if (errorMap.hasOwnProperty('area')) {
            message += 'Area is invalid: ' + errorMap.area + '\n';
        }
        if (errorMap.hasOwnProperty('resort')) {
            message += 'Resort is invalid: ' + errorMap.resort + '\n';
        }
        if (errorMap.hasOwnProperty('name')) {
            message += 'Name is invalid: ' + errorMap.name + '\n';
        }
        if (errorMap.hasOwnProperty('color')) {
            message += 'Color is invalid: ' + errorMap.color + '\n';
        }
        alert(message);
    };

    /**
     * @param {mbp.NewPiste} newPiste
     * @param {Function} onErrors what to do when validation failure happens
     */
    this.submit = function(newPiste) {
        var errors = newPiste.validate();
        
        if(Object.keys(errors).length) {
            instance.showErrors(errors);
        } else {
            var piste = mbp.Piste.build(
                    null, 
                    null,
                    newPiste.resortId,
                    app.user.id,
                    newPiste.name, 
                    newPiste.color, 
                    newPiste.description,
                    mbp.PisteMarks.build(), 
                    [],
                    0,
                    null);
            app.localPisteRepo.savePiste(piste);
            piste.averageMarks.pisteId = piste.id;
            app.syncService.run();
            name = '';
            description = '';
            onPisteCreated(piste);
        }
    };


    Object.preventExtensions(this);
};