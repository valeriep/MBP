"use strict";

function criteriaSet(val) {
    ok(true);
    return false;
}

var app = null;

module('SearchPistesWidget', {
    setup : function() {
        jQuery('div[data-role="content"]').html('');
        var resortRepo = new mbp.LocalResortRepository();
        app = {
                user : new mbp.User('U1', 'ch4mp', null, 'test'),
                services : {
                    resortRepo : resortRepo,
                    localResortRepo : resortRepo,
                    remoteResortRepo : resortRepo,
                }
        };
    },
    teardown : function() {
        jQuery('div[data-role="content"]').html('');
    }
});
test('form initialization', function() {
    var widget = new mbp.SearchPistesWidget(app, criteriaSet);
    widget.display();
    ok(jQuery('#search-pistes-form #country option').length);
    equal(jQuery('#search-pistes-form #country option[selected="true"]').val(), '');
    equal(jQuery('#search-pistes-form #color option').length, mbp.Piste.COLORS.length + 1);
    equal(jQuery('#search-pistes-form #color option[selected="true"]').val(), '');
});