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
    var parentDisplay = this.display;
    
    var name = '', description = '';
    var errors = {};
    
    var resortSelectWidget = new mbp.ResortSelectionWidget('#new-piste-form .resort-select', true, formFieldChanged);
    var areaSelectWidget = new mbp.AreaSelectionWidget('#new-piste-form .area-select', resortSelectWidget, false);
    var countrySelectWidget = new mbp.CountrySelectionWidget('#new-piste-form .country-select', areaSelectWidget, false);
    var colorSelectWidget = new mbp.ColorSelectionWidget('#new-piste-form .color-select', true, formFieldChanged);
    

    /**
     * 
     * @param {Array} countries
     * @param {Array} colors
     */
    this.display = function() {
        parentDisplay.call(this, {
            name : name,
            description : description,
            errors : errors
        });
        app.localResortRepo.getAllCountries(function(countries) {
            countrySelectWidget.display(countries);
        });
        colorSelectWidget.display(mbp.Piste.COLORS);

        jQuery('#new-piste-form').unbind('submit').submit(
                function(event) {
                    instance.submit(new mbp.NewPiste(
                            countrySelectWidget.getSelected(),
                            areaSelectWidget.getSelected(),
                            resortSelectWidget.getSelected(),
                            name,
                            colorSelectWidget.getSelected(),
                            description));
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
    this.displayErrors = function(errorMap) {
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
        app.localResortRepo.getResortById(newPiste.resortId, function(resort) {
            var errors = newPiste.validate(resort);
            
            if(Object.keys(errors).length) {
                instance.displayErrors(errors);
            } else {
                var pisteId = newPiste.country + '_' + newPiste.area + '_' + newPiste.resortId + '_' + newPiste.name;
                var piste = new mbp.Piste(
                        pisteId, 
                        null,
                        resort,
                        app.user.id,
                        newPiste.name, 
                        newPiste.color, 
                        newPiste.description, 
                        null,
                        new mbp.PisteMarks(0, 0, 0, 0, 0, pisteId, null), 
                        0,
                        null,
                        null);
                app.localResortRepo.saveResort(resort);
                app.resortsSyncService.run();
                name = '';
                description = '';
                onPisteCreated(piste);
            }
        });
    };


    Object.preventExtensions(this);
};