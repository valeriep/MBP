"use strict";

module('ColorSelectionWidget', {
	setup : function() {
		jQuery('#content').html('');
	},
	teardown : function() {
		jQuery('#content').html('');
	}
});
test('widget is displayed in element specified by jQuerySelector', function() {
	var firstValueChangedCall = true;
	var widget = new mbp.ColorSelectionWidget('#content', true, function(selectedColor) {
		if(firstValueChangedCall) {
			firstValueChangedCall = false;
			equal(selectedColor, '');
		} else {
			equal(selectedColor, mbp.Piste.BLACK);
		}
	});

	expect(2);

	widget.show(mbp.Piste.COLORS);

	jQuery('#color').val(mbp.Piste.BLACK);
	jQuery('#color').trigger('change');
});