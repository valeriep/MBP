"use strict";

function criteriaSet(val) {
    ok(true);
    return false;
}

module('SearchPistesWidget', {
    setup : function() {
        jQuery('#content').empty();
        app = new mbp.MyBestPistes();
        app.user = new mbp.User('U1', 'ch4mp', null, 'test');
    },
    teardown : function() {
        jQuery('#content').empty();
        app = new mbp.MyBestPistes();
    }
});
test('form initialization', function() {
    var widget = new mbp.SearchPistesWidget('#content', criteriaSet);
    widget.show();
    ok(jQuery('#content #search-pistes-form #country option').length);
    equal(jQuery('#content #search-pistes-form #country option[selected="true"]').val(), '');
    equal(jQuery('#content #search-pistes-form #color option').length, mbp.Piste.COLORS.length + 1);
    equal(jQuery('#content #search-pistes-form #color option[selected="true"]').val(), '');
});