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
test('form initialization', function() {
    var widget = new mbp.SearchPistesWidget(countryChanged, massifChanged, submit);
    widget.display(searchPistesWidgetFixture.countries, searchPistesWidgetFixture.colors);
    equal(jQuery('#search-pistes-form #country option').length, 4);
    equal(jQuery('#search-pistes-form #country option[selected="true"]').val(), '');
    equal(jQuery('#search-pistes-form #color option').length, mbp.Piste.COLORS.length + 1);
    equal(jQuery('#search-pistes-form #color option[selected="true"]').val(), '');
});
asyncTest('country change trigers event with country value', function() {
    expect(1);
    var widget = new mbp.SearchPistesWidget(countryChanged, massifChanged, submit);
    widget.display(searchPistesWidgetFixture.countries, searchPistesWidgetFixture.colors);
    jQuery('#country').val('Country 1');
    jQuery('#country').change();
    start();
});
asyncTest('color change does not trigger event', function() {
    expect(0);
    var widget = new mbp.SearchPistesWidget(countryChanged, massifChanged, submit);
    widget.display(searchPistesWidgetFixture.countries, searchPistesWidgetFixture.massifs, searchPistesWidgetFixture.colors);
    jQuery('#color').val(mbp.Piste.GREEN);
    jQuery('#color').change();
    start();
});
asyncTest('name change does not trigger event', function() {
    expect(0);
    var widget = new mbp.SearchPistesWidget(countryChanged, massifChanged, submit);
    widget.display(searchPistesWidgetFixture.countries, searchPistesWidgetFixture.massifs, searchPistesWidgetFixture.colors);
    jQuery('#name').val('cture');
    jQuery('#name').change();
    start();
});