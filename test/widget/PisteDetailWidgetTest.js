"use strict";

var app;

module(
        'PisteDetailWidget',
        {
            setup : function() {
                jQuery('#content').empty();
                app =
                        {
                            user : new mbp.User.build('U1', 'ch4mp', null, 'test'),
                            localResortRepo : {
                                getResortById : function(resortId, onFound) {
                                    onFound(mbp.Resort.build('testResort', '2014-01-11 17:44:15', 'Test Resort', 'Test Country', 'Test Area'));
                                }
                            },
                            seolanRepo : {
                                getCommentsPageByPisteId : function(pisteId, page, onFound) {
                                    onFound([
                                            mbp.Comment.build(
                                                    'testComment',
                                                    '2014-01-11 17:45:15',
                                                    pisteId,
                                                    'U1',
                                                    'Some test comment',
                                                    true),
                                            mbp.Comment.build(
                                                    'otherTestComment',
                                                    '2014-01-11 17:46:15',
                                                    pisteId,
                                                    'U1',
                                                    'Some other comment',
                                                    true) ]);
                                }
                            },
                            device : {
                                isOnline : function() {
                                    return true;
                                }
                            },
                        };
            },
            teardown : function() {
                jQuery('#content').empty();
            }
        });
test('widget is displayed in div with data-role="content"', function() {
    var widget = new mbp.PisteDetailWidget('#content');
    widget.show(mbp.Piste.build(
            'testPiste',
            '2014-01-11 17:47:15',
            'testResort',
            'U1',
            'Test Piste',
            mbp.Piste.BLUE,
            'A piste for unit testing purpose',
            mbp.PisteMarks.build('testPiste', '2014-01-11 17:48:15', 1, 2, 3, 3, 4, 5),
            [ 'img/piste/testPiste1.jpg', 'img/piste/testPiste2.jpg' ],
            51,
            true));
    ok(jQuery('.info').html());
    ok(jQuery('.images').html());
    ok(jQuery('.marks').html());
    ok(jQuery('.add-marks').html());
    ok(jQuery('.add-comment').html());
    ok(jQuery('.picture-popup').html());
    ok(jQuery('.comments').html());
});