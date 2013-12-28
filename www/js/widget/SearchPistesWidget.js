"use strict";

/**
 * 
 * @constructor
 * @param {String} hookSelector
 * @param {Function} onCriteriaSet
 * @author ch4mp@c4-soft.com
 */
mbp.SearchPistesWidget = function(hookSelector, onCriteriaSet) {
    mbp.Widget.call(this, '#dot-search-pistes', hookSelector);// parent constructor

    var parentShow = this.show;// save reference to Widget display function to call it from overloading function
    var resortSelectWidget = new mbp.ResortSelectionWidget('#search-pistes-form .resort-select', false);
    var areaSelectWidget = new mbp.AreaSelectionWidget('#search-pistes-form .area-select', resortSelectWidget, false);
    var countrySelectWidget = new mbp.CountrySelectionWidget('#search-pistes-form .country-select', areaSelectWidget, false);
    var colorSelectWidget = new mbp.ColorSelectionWidget('#search-pistes-form .color-select', false);
    var sunRangeWidget = new mbp.MarkRangeWidget('#search-pistes-form .sun-range', 'sun-mark', gettext('pisteMarks', 'sun'));
    var snowRangeWidget = new mbp.MarkRangeWidget('#search-pistes-form .snow-range', 'snow-mark', gettext('pisteMarks', 'snow'));
    var accessRangeWidget = new mbp.MarkRangeWidget('#search-pistes-form .access-range', 'access-mark', gettext('pisteMarks', 'access'));
    var verticalDropRangeWidget = new mbp.MarkRangeWidget('#search-pistes-form .vertical-drop-range', 'vertical-drop-mark', gettext('pisteMarks', 'verticalDrop'));
    var lengthRangeWidget = new mbp.MarkRangeWidget('#search-pistes-form .length-range', 'length-mark', gettext('pisteMarks', 'length'));
    var viewRangeWidget = new mbp.MarkRangeWidget('#search-pistes-form .view-range', 'view-mark', gettext('pisteMarks', 'view'));

    /**
     * 
     */
    this.show = function() {
        parentShow.call();
        app.localResortRepo.getAllCountries(function(countries) {
            countrySelectWidget.show(countries);
        });
        colorSelectWidget.show(mbp.Piste.COLORS);

        jQuery('#search-pistes-form').unbind('submit').submit(onSubmit);

        sunRangeWidget.show();
        snowRangeWidget.show();
        accessRangeWidget.show();
        verticalDropRangeWidget.show();
        lengthRangeWidget.show();
        viewRangeWidget.show();

        jQuery(document).ready(function() {
            jQuery('#search-pistes-form').submit();
        });
    };

    function onSubmit(event) {
        var criteria = new mbp.SearchPistesCriteria(
                countrySelectWidget.getSelected(),
                areaSelectWidget.getSelected(),
                resortSelectWidget.getSelected(),
                colorSelectWidget.getSelected(),
                sunRangeWidget.getMin(),
                sunRangeWidget.getMax(),
                snowRangeWidget.getMin(),
                snowRangeWidget.getMax(),
                accessRangeWidget.getMin(),
                accessRangeWidget.getMax(),
                verticalDropRangeWidget.getMin(),
                verticalDropRangeWidget.getMax(),
                lengthRangeWidget.getMin(),
                lengthRangeWidget.getMax(),
                viewRangeWidget.getMin(),
                viewRangeWidget.getMax());
        onCriteriaSet(criteria);
        event.preventDefault();
        return false;
    }

    Object.preventExtensions(this);
};