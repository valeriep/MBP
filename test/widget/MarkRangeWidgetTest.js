"use strict";

module('MarkRangeWidget', {
	setup : function() {
		jQuery('#content').html('');
	},
	teardown : function() {
		jQuery('#content').html('');
	}
});
test('widget is displayed in element specified by jQuerySelector', function() {
	var widget = new mbp.MarkRangeWidget('#content', 'testRange', 'test range');

	widget.show();

    equal(widget.getMin(), 1);
    equal(widget.getMax(), 5);
});