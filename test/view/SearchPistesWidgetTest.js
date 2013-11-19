"use strict";

var countryChanged = function(val) {
    equal(val, 'Country 1');
};

var massifChanged = function(val) {
    equal(val, 'Massif 1');
};

var resortChanged = function(val) {
    equal(val, 'resort1');
};

var colorChanged = function(val) {
    equal(val, mbp.Piste.GREEN);
};

var nameChanged = function(val) {
    equal(val, 'cture');
};

var submit = function(val) {
    ok(true);
    return false;
};
var searchPistesWidgetFixture = {
    countries : new Array('Country 1', 'Country 2', 'Country 3'),
    massifs : new Array('Massif 1', 'Massif 2', 'Massif 3'),
    resorts : {
        'resort1' : 'Resort 1',
        'resort2' : 'Resort 2',
        'resort3' : 'Resort 3'
    },
    colors : mbp.Piste.COLORS,
    criteria : new mbp.SearchPistesCriteria('Country 2', 'Massif 2', 'resort2', 'Pi', mbp.Piste.RED)
};

module('SearchPistesWidget', {
    setup : function() {
        jQuery('div[data-role="content"]').html('');
    },
    teardown : function() {
        jQuery('div[data-role="content"]').html('');
    }
});
test('form is initialized with criteria values pre selected', function() {
    var widget = new mbp.SearchPistesWidget(countryChanged, massifChanged, resortChanged, colorChanged, nameChanged, submit);
    widget.display(searchPistesWidgetFixture.countries, searchPistesWidgetFixture.massifs, searchPistesWidgetFixture.resorts, searchPistesWidgetFixture.colors,
            searchPistesWidgetFixture.criteria);
    equal(jQuery('#search-pistes-form #country option').length, 4);
    equal(jQuery('#search-pistes-form #country option[selected="true"]').val(), searchPistesWidgetFixture.criteria.country);
    equal(jQuery('#search-pistes-form #massif option').length, 4);
    equal(jQuery('#search-pistes-form #massif option[selected="true"]').val(), searchPistesWidgetFixture.criteria.massif);
    equal(jQuery('#search-pistes-form #resort option').length, 4);
    equal(jQuery('#search-pistes-form #resort option[selected="true"]').val(), searchPistesWidgetFixture.criteria.resortId);
    equal(jQuery('#search-pistes-form #color option').length, mbp.Piste.COLORS.length + 1);
    equal(jQuery('#search-pistes-form #color option[selected="true"]').val(), mbp.Piste.RED);
    equal(jQuery('#search-pistes-form #name').val(), 'Pi');
});
asyncTest('country change trigers event with ne country value', function() {
    expect(1);
    var widget = new mbp.SearchPistesWidget(countryChanged, massifChanged, resortChanged, colorChanged, nameChanged, submit);
    widget.display(searchPistesWidgetFixture.countries, searchPistesWidgetFixture.massifs, searchPistesWidgetFixture.resorts, searchPistesWidgetFixture.colors,
            searchPistesWidgetFixture.criteria);
    jQuery('#country').val('Country 1');
    jQuery('#country').change();
    start();
});
asyncTest('massif change trigers event with ne country value', function() {
    expect(1);
    var widget = new mbp.SearchPistesWidget(countryChanged, massifChanged, resortChanged, colorChanged, nameChanged, submit);
    widget.display(searchPistesWidgetFixture.countries, searchPistesWidgetFixture.massifs, searchPistesWidgetFixture.resorts, searchPistesWidgetFixture.colors,
            searchPistesWidgetFixture.criteria);
    jQuery('#massif').val('Massif 1');
    jQuery('#massif').change();
    start();
});
asyncTest('resort change trigers event with ne country value', function() {
    expect(1);
    var widget = new mbp.SearchPistesWidget(countryChanged, massifChanged, resortChanged, colorChanged, nameChanged, submit);
    widget.display(searchPistesWidgetFixture.countries, searchPistesWidgetFixture.massifs, searchPistesWidgetFixture.resorts, searchPistesWidgetFixture.colors,
            searchPistesWidgetFixture.criteria);
    jQuery('#resort').val('resort1');
    jQuery('#resort').change();
    start();
});
asyncTest('color change trigers event with ne country value', function() {
    expect(1);
    var widget = new mbp.SearchPistesWidget(countryChanged, massifChanged, resortChanged, colorChanged, nameChanged, submit);
    widget.display(searchPistesWidgetFixture.countries, searchPistesWidgetFixture.massifs, searchPistesWidgetFixture.resorts, searchPistesWidgetFixture.colors,
            searchPistesWidgetFixture.criteria);
    jQuery('#color').val(mbp.Piste.GREEN);
    jQuery('#color').change();
    start();
});
asyncTest('name change trigers event with ne country value', function() {
    expect(1);
    var widget = new mbp.SearchPistesWidget(countryChanged, massifChanged, resortChanged, colorChanged, nameChanged, submit);
    widget.display(searchPistesWidgetFixture.countries, searchPistesWidgetFixture.massifs, searchPistesWidgetFixture.resorts, searchPistesWidgetFixture.colors,
            searchPistesWidgetFixture.criteria);
    jQuery('#name').val('cture');
    jQuery('#name').change();
    start();
});