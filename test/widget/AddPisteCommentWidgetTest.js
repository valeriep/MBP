"use strict";

var app;

module('AddPisteCommentWidget', {
    setup : function() {
        app = {
            user : mbp.User.build('U1', 'ch4mp@c4-soft.com', null, 'test'),
        };
        jQuery('#content').empty();
    },
    teardown : function() {
        jQuery('#content').empty();
    }
});
test('widget is displayed in element specified by jQuerySelector', function() {
    var piste = mbp.Piste.build('testPisteId', null, 'testResortId');
    var widget = new mbp.AddPisteCommentWidget('#content', {
        show : function(actual) {
            deepEqual(actual, piste);
        }
    });
    
    expect(7);
    
    widget.show(piste);
    equal(jQuery("a[href='#comment-popup']").attr('data-rel'), 'popup');
    equal(jQuery('#comment-popup').length, 1);

    jQuery("a[href='#comment-popup']").click();
    var textInput = jQuery('#new-comment-text');
    equal(textInput.length, 1);
    textInput.val('A fresh test comment');
    app.localCommentRepo = {
        saveComment : function(comment) {
            equal(comment.text, 'A fresh test comment');
            equal(comment.pisteId, 'testPisteId');
            equal(comment.creatorId, 'U1');
        }
    };
    jQuery('#comment-form').submit();
});