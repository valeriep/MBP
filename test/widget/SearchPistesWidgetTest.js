"use strict";

function criteriaSet(val) {
    ok(true);
    return false;
}

module('SearchPistesWidget', {
    setup : function() {
        jQuery('div[data-role="content"]').html('');
        app.user = new mbp.User('U1', 'ch4mp', null, 'test');
    },
    teardown : function() {
        jQuery('div[data-role="content"]').html('');
        app = new mbp.MyBestPistes();
    }
});
test('form initialization', function() {
    var widget = new mbp.SearchPistesWidget(criteriaSet);
    widget.show();
    ok(jQuery('#search-pistes-form #country option').length);
    equal(jQuery('#search-pistes-form #country option[selected="true"]').val(), '');
    equal(jQuery('#search-pistes-form #color option').length, mbp.Piste.COLORS.length + 1);
    equal(jQuery('#search-pistes-form #color option[selected="true"]').val(), '');
});