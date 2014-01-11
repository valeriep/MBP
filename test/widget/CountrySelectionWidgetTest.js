"use strict";

var app, testCase;

module('CountrySelectionWidget', {
	setup : function() {
		testCase = {
				countries : ['Test Country 0', 'Test Country 1', 'Test Country 2'],
				areas : ['Test Area 0', 'Test Area 1', 'Test Area 2'],
		};
		app = {
			localResortRepo : {
				getAreasByCountry : function(country, onAreasRetrieved) {
				    onAreasRetrieved(country ? testCase.areas : []);
				}
			}
		};
		jQuery('#content').empty();
	},
	teardown : function() {
		jQuery('#content').empty();
	}
});
test('widget is displayed in element specified by jQuerySelector', function() {
	var firstAreasShowCall = true, firstValueChangedCall = true;
	var widget = new mbp.CountrySelectionWidget('#content', {
		show : function(areas) {
			if(firstAreasShowCall) {
				firstAreasShowCall = false;
				deepEqual(areas, []);
			} else {
				deepEqual(areas, testCase.areas);
			}
		}
	}, true, function(selectedCountry) {
		if(firstValueChangedCall) {
			firstValueChangedCall = false;
			equal(selectedCountry, '');
		} else {
			equal(selectedCountry, 'Test Country 1');
		}
	});

	expect(4);

	widget.show(testCase.countries);

	jQuery('#country').val('Test Country 1');
	jQuery('#country').trigger('change');
});