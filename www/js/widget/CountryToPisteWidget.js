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
    var countries = [], country = null, areas = [], area = null, resortsNamesById = [], piste = null, resortPistes = [];
    var currentState = 1;

    //display
    var listWidget = new mbp.LinkListWidget(instance.getJQuerySelector() + ' .country-to-piste', elementClicked);
    var pistesBriefWidget = new mbp.PistesBriefWidget(instance.getJQuerySelector() + ' .country-to-piste', elementClicked);
    var pisteDetailWidget = new mbp.PisteDetailWidget(instance.getJQuerySelector() + ' .country-to-piste');

    this.show = function() {
        parentShow(this);

        document.addEventListener('backbutton', backButtonPressed);

        jQuery('#country-to-piste').on('remove', function() {
            document.removeEventListener('backbutton', backButtonPressed);
        });
        
        app.localResortRepo.getCountriesHavingPistes(function(countriesWithPistes) {
            countries = countriesWithPistes;
        });

        switch (currentState) {
        case 1:
            listWidget.show(countries);
            break;
        case 2:
            listWidget.show(areas);
            break;
        case 3:
            listWidget.show(resortsNamesById);
            break;
        case 4:
            pistesBriefWidget.show(resortPistes);
            break;
        case 5:
            pisteDetailWidget.show(piste);
            break;
        default:
            throw new Error('Invalid state');
        }
    };

    function elementClicked(elementValue) {
        switch (currentState) {
        case 1:
            country = elementValue;
            app.localResortRepo.getAreasHavingPistes(country, function(areasWithPistes) {
                areas = areasWithPistes;
            });
            break;
        case 2:
            area = elementValue;
             app.localResortRepo.getResortNamesHavingPistesByCountryAndArea(country, area, function(resortsWithPistes) {
                 resortsNamesById = resortsWithPistes;
            });
            break;
        case 3:
            app.localPisteRepo.getPistesByResortId(elementValue, function(pisteIds) {
                resortPistes = pisteIds;
            });
            break;
        case 4:
            piste = elementValue;
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
            country = null;
        case 2:
            area = null;
            resortsNamesById = [];
        case 3:
        case 4:
            resortPistes = [];
        case 5:
            piste = null;
            break;
        default:
            throw new Error('Invalid state');
        }
        currentState = currentState > 1 ? currentState - 1 : 1;
        instance.show();
    }

    Object.preventExtensions(this);
};