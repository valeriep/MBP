"use strict";

/**
 * Authentication Widget
 * @constructor
 * @param {mbp.MyBestPistes} app
 * @param {Function} onPisteCreated
 * @author ch4mp@c4-soft.com
 */
mbp.NewPisteWidget = function(app, onPisteCreated) {
    mbp.Widget.call(this, '#dot-new-piste');// parent constructor
    
    var instance = this;
    var parentDisplay = this.display;
    
    var name = '', description = '';
    var errors = {};
    
    var resortSelectWidget = new mbp.ResortSelectionWidget('#new-piste-form .resort-select', true, formFieldChanged);
    var areaSelectWidget = new mbp.AreaSelectionWidget(app, '#new-piste-form .area-select', resortSelectWidget, false);
    var countrySelectWidget = new mbp.CountrySelectionWidget(app, '#new-piste-form .country-select', areaSelectWidget, false);
    var colorSelectWidget = new mbp.ColorSelectionWidget('#new-piste-form .color-select', true, formFieldChanged);
    var pictureWidget = new mbp.PicturePopupWidget(app, '#new-piste-form .picture-popup');
    

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
        app.services.localResortRepo.getAllCountries(function(countries) {
            countrySelectWidget.display(countries);
        });
        colorSelectWidget.display(mbp.Piste.COLORS);
        pictureWidget.display();

        jQuery('#new-piste-form').unbind('submit').submit(
                function(event) {
                    instance.submit(new mbp.NewPiste(
                            countrySelectWidget.getSelected(),
                            areaSelectWidget.getSelected(),
                            resortSelectWidget.getSelected(),
                            name,
                            colorSelectWidget.getSelected(),
                            description,
                            pictureWidget.getSelected()));
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
        app.services.resortRepo.getResortById(newPiste.resortId, function(resort) {
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
                        newPiste.picture,
                        new mbp.PisteMarks(0, 0, 0, 0, 0, pisteId, null), 
                        0,
                        null,
                        null);
                app.services.localResortRepo.saveResort(resort);
                app.services.resortsSyncService.run();
                newPiste.name = '';
                newPiste.color = null;
                newPiste.description = '';
                newPiste.picture = null;
                onPisteCreated(piste);
            }
        });
    };


    Object.preventExtensions(this);
};