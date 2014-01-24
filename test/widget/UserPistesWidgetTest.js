"use strict";

var app;

module('UserPistesWidget', {
    setup : function() {
        testCase =
                {
                    pistes : [
                            mbp.Piste.build(
                                    'testPiste',
                                    '2014-01-12 16:08:10',
                                    'otherTestResort',
                                    'U1',
                                    'Test Piste',
                                    mbp.Piste.BLUE,
                                    'Blue test piste',
                                    mbp.PisteMarks.build('testPiste', '2014-01-12 16:08:30', null, null, null, null, null, null),
                                    [],
                                    0,
                                    true),
                            mbp.Piste.build(
                                    'otherTestPiste',
                                    '2014-01-12 16:09:10',
                                    'otherTestResort',
                                    'U1',
                                    'Other Test Piste',
                                    mbp.Piste.GREEN,
                                    'Green test piste',
                                    mbp.PisteMarks.build('otherTestPiste', '2014-01-12 16:09:30', 1, 2, 3, 3, 4, 5),
                                    [],
                                    1,
                                    true),
                            mbp.Piste.build(
                                    'yetAnotherTestPiste',
                                    '2014-01-12 16:10:10',
                                    'otherTestResort',
                                    'U1',
                                    'Yet Another Test Piste',
                                    mbp.Piste.RED,
                                    'Red test piste',
                                    mbp.PisteMarks.build('yetAnotherTestPiste', '2014-01-12 16:10:30', 4, 4, 4, 4, 4, 4),
                                    [],
                                    51,
                                    true) ]
                };
        app = {
            localResortRepo : {
                getResortById : function(resortId, onFound) {
                    if (resortId == 'otherTestResort') {
                        onFound(mbp.Resort.build('otherTestResort', '2014-01-12 15:10:30', 'Other Resort', 'Country 2', 'Area 2'));
                    } else {
                        onFound(null);
                    }
                },
            },
            localPisteRepo : {
                getPistesByCreatorId : function(userId, onFound) {
                    onFound(testCase.pistes);
                },
            },
            user : mbp.User.build('U1', 'ch4mp@c4-soft.com', null, 'test'),
            device : {
                isOnline : function() {
                    return false;
                }
            },
        };
        jQuery('#content').empty();
    },
    teardown : function() {
        jQuery('#content').empty();
    }
});
test('form initialization', function() {
    var widget = new mbp.UserPistesWidget('#content');
    widget.show();
    
    equal(jQuery('#content li a').length, 3);
    
    jQuery('#content li a:eq(2)').click();
    
    equal(jQuery('#content h2').text(), ' Yet Another Test Piste');
});