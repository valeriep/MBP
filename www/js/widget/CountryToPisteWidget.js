"use strict";

/**
 * 
 * @constructor
 * @param {String} hookSelector jQuery selector into which the widget should be inserted
 * @param {Function} onResortClicked 
 * @author ch4mp@c4-soft.com
 */
mbp.CountryToPisteWidget = function(hookSelector) {
    mbp.Widget.call(this, '#dot-country-to-piste', hookSelector);// parent constructor
    var instance = this, parentShow = this.show;

    //state management
    var allCountries = [], countryAreas = [], areaResorts = [], resortPistes = [], currentPiste = null;
    var currentState = 1;

    //display
    var listWidget = new mbp.LinkListWidget(instance.getJQuerySelector() + ' .country-to-piste', elementClicked);
    var pistesBriefWidget = new mbp.PistesBriefWidget(instance.getJQuerySelector() + ' .country-to-piste', elementClicked);
    var pisteDetailWidget = new mbp.PisteDetailWidget(instance.getJQuerySelector() + ' .country-to-piste');

    app.localResortRepo.getAllCountries(function(countries) {
        allCountries = countries;
    });

    this.show = function() {
        parentShow(this);

        document.addEventListener('backbutton', backButtonPressed);

        jQuery('#country-to-piste').on('remove', function() {
            document.removeEventListener('backbutton', backButtonPressed);
        });

        switch (currentState) {
        case 1:
            listWidget.show(allCountries);
            break;
        case 2:
            listWidget.show(countryAreas);
            break;
        case 3:
            listWidget.show(areaResorts);
            break;
        case 4:
            pistesBriefWidget.show(resortPistes);
            break;
        case 5:
            pisteDetailWidget.show(currentPiste);
            break;
        default:
            throw new Error('Invalid state');
        }
    };

    function elementClicked(elementValue) {
        switch (currentState) {
        case 1:
            app.localResortRepo.getAreasByCountry(elementValue, function(areas) {
                countryAreas = areas;
            });
            break;
        case 2:
            app.localResortRepo.getResortNamesByArea(elementValue, function(resortNamesById) {
                areaResorts = resortNamesById;
            });
            break;
        case 3:
            app.localPisteRepo.getPistesByResortId(elementValue, function(pisteIds) {
                resortPistes = pisteIds;
            });
            break;
        case 4:
            currentPiste = elementValue;
            break;
        default:
            throw new Error('Invalid state');
        }
        currentState = currentState + 1;
        instance.show();
    }

    function backButtonPressed() {
        switch (currentState) {
        case 1:
        case 2:
            countryAreas = [];
        case 3:
            areaResorts = [];
        case 4:
            resortPistes = [];
        case 5:
            currentPiste = null;
            break;
        default:
            throw new Error('Invalid state');
        }
        currentState = currentState > 1 ? currentState - 1 : 1;
        instance.show();
    }

    Object.preventExtensions(this);
};