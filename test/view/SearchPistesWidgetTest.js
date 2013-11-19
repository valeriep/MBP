"use strict";

var countryChanged = function(event, ui) {
    ok(true);
};

var massifChanged = function(event, ui) {
    ok(true);
};

var resortChanged = function(event, ui) {
    ok(true);
};

var colorChanged = function(event, ui) {
    ok(true);
};

var nameChanged = function(event, ui) {
    ok(true);
};

var submit = function(event, ui) {
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
    equal(jQuery('#search-pistes-form #country option[selected="true"]').val(), 'Country 2');
    equal(jQuery('#search-pistes-form #massif option').length, 4);
    equal(jQuery('#search-pistes-form #massif option[selected="true"]').val(), 'Massif 2');
    equal(jQuery('#search-pistes-form #resort option').length, 4);
    equal(jQuery('#search-pistes-form #resort option[selected="true"]').val(), 'resort2');
    equal(jQuery('#search-pistes-form #color option').length, mbp.Piste.COLORS.length + 1);
    equal(jQuery('#search-pistes-form #color option[selected="true"]').val(), mbp.Piste.RED);
    equal(jQuery('#search-pistes-form #name').val(), 'Pi');
});