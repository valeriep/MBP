"use strict";

var SelectValidator = function(expectedVal) {
    this.valChanged = function(val) {
        equal(val, expectedVal);
    };
};

var nameChanged = function(val) {
    equal(val, jQuery('#name').val());
};

var submit = function(val) {
    ok(true);
    return false;
};
var searchPistesWidgetFixture = {
    countries : new Array('Country 1', 'Country 2', 'Country 3'),
    areas : new Array('Area 1', 'Area 2', 'Area 3'),
    resorts : {
        'resort1' : 'Resort 1',
        'resort2' : 'Resort 2',
        'resort3' : 'Resort 3'
    },
    colors : mbp.Piste.COLORS,
    criteria : new mbp.SearchPistesCriteria('Country 2', 'Area 2', 'resort2', 'Pi', mbp.Piste.RED)
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
    var widget = new mbp.SearchPistesWidget((new SelectValidator('')).valChanged, (new SelectValidator('')).valChanged, submit);
    widget.display(searchPistesWidgetFixture.countries, searchPistesWidgetFixture.colors);
    equal(jQuery('#search-pistes-form #country option').length, 4);
    equal(jQuery('#search-pistes-form #country option[selected="true"]').val(), '');
    equal(jQuery('#search-pistes-form #color option').length, mbp.Piste.COLORS.length + 1);
    equal(jQuery('#search-pistes-form #color option[selected="true"]').val(), '');
});