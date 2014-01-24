"use strict";

module('NavbarWidget', {
	setup : function() {
		jQuery('#navbar').html('');
	},
	teardown : function() {
		jQuery('#navbar').html('');
	}
});
test('widget is displayed in element specified by jQuerySelector', function() {
	var onHomeCalled = false, onSearchCalled = false, onNewPisteCalled = false, onMyPistesCalled = false;
	var widget = new mbp.NavbarWidget(function() {
		onHomeCalled = true;
	}, function() {
		onSearchCalled = true;
	}, function() {
		onNewPisteCalled = true;
	}, function() {
		onMyPistesCalled = true;
	});

	widget.show();
	
	jQuery('#navbar .home').click();
	ok(onHomeCalled);
	jQuery('#navbar .search').click();
	ok(onSearchCalled);
	jQuery('#navbar .new-piste').click();
	ok(onNewPisteCalled);
	jQuery('#navbar .my-pistes').click();
	ok(onMyPistesCalled);
	
});