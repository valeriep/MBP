"use strict";

var piste1 = null;

module('PisteCommentsWidget', {
    setup : function() {
        jQuery('#content').empty();
    },
    teardown : function() {
        jQuery('#content').empty();
    }
});
test('widget is displayed in div with data-role="content"', function() {
    var widget = new mbp.PisteCommentsWidget('#content');
    widget.show([ mbp.Comment.build('commentId', '2014-01-11 14:36:25', 'pisteId', 'U2', 'A test comment', true),
            mbp.Comment.build('otherCommentId', null, 'pisteId', 'UA', 'An other test comment', null), ]);
    equal(jQuery('.comment-text').length, 2);
});