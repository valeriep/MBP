"use strict";

var piste1 = null;
var app = null;

module('PisteDetailWidget', {
    setup : function() {
        jQuery('div[data-role="content"]').html('');
        var resorts = new mbp.TestCase().getResorts();
        var resort = resorts[Object.keys(resorts)[0]];
        piste1 = resort.getPiste(resort.getPistesIds()[0]);
        app = {
                user : new mbp.User('U1', 'ch4mp', null, 'test')
        };
    },
    teardown : function() {
        jQuery('div[data-role="content"]').html('');
    }
});
test('widget is displayed in div with data-role="content"', function() {
    var widget = new mbp.PisteDetailWidget(app);
    widget.display(piste1);
    equal(jQuery('div[data-role="content"] #piste-detail .info').length, 1);
    equal(jQuery('div[data-role="content"] #piste-detail .images').length, 1);
    equal(jQuery('div[data-role="content"] #piste-detail .marks').length, 1);
    equal(jQuery('div[data-role="content"] #piste-detail .add-marks').length, 1);
    equal(jQuery('div[data-role="content"] #piste-detail .add-comment').length, 1);
    equal(jQuery('div[data-role="content"] #piste-detail .comments').length, 1);
});