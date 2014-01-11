"use strict";

var app, testCase;

module('AreaSelectionWidget', {
	setup : function() {
		testCase = {
				resorts : [mbp.Resort.build('testResortId', null, 'Test Resort', 'Test Country', 'Test Area 1')],
				areas : ['Test Area 0', 'Test Area 1', 'Test Area 2'],
		};
		app = {
			localResortRepo : {
				getResortsByArea : function(area, onResortsRetrieved) {
					onResortsRetrieved(area ? testCase.resorts : []);
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
	var firstResortsShowCall = true, firstValueChangedCall = true;
	var widget = new mbp.AreaSelectionWidget('#content', {
		show : function(resorts) {
			if(firstResortsShowCall) {
				firstResortsShowCall = false;
				deepEqual(resorts, []);
			} else {
				deepEqual(resorts, testCase.resorts);
			}
		}
	}, true, function(selectedArea) {
		if(firstValueChangedCall) {
			firstValueChangedCall = false;
			equal(selectedArea, '');
		} else {
			equal(selectedArea, 'Test Area 1');
		}
	});

	expect(4);

	widget.show(testCase.areas);

	jQuery('#area').val('Test Area 1');
	jQuery('#area').trigger('change');
});