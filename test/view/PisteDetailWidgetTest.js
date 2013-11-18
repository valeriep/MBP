"use strict";

var piste1 = null;

module('PisteDetailWidget', {
    setup : function() {
        jQuery('div[data-role="content"]').html('');
        var testResort = new mbp.Resort('testResortId', 'Test Resort', 'Test Country', 'Test Massif');
        piste1 = new mbp.Piste('testPiste1', 'Test Piste 1', 'black', 'Black test piste', 'img/piste/testPiste1.jpg', 4, testResort);
        new mbp.Comment('testComment1', 'First comment on piste 1', 4, 1, piste1);
        new mbp.Comment('testComment2', 'Second comment on piste 1', 5, 1, piste1);
    },
    teardown : function() {
        jQuery('div[data-role="content"]').html('');
    }
});
test('widget is displayed in div with data-role="content"', function() {
    var widget = new mbp.PisteDetailWidget();
    widget.display(piste1);
    equal(jQuery('div[data-role="content"] .comment-text').length, 2);
});