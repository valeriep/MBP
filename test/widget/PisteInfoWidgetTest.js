"use strict";

var app;

module('PisteInfoWidget', {
    setup : function() {
        jQuery('#content').empty();
    },
    teardown : function() {
        jQuery('#content').empty();
    }
});
test('widget is displayed in div with data-role="content"', function() {
    var widget = new mbp.PisteInfoWidget('#content');
    widget.show({
        resort : mbp.Resort.build('testResort', '2014-01-11 17:44:15', 'Test Resort', 'Test Country', 'Test Area'),
        piste : mbp.Piste.build(
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
                true)
    });
    equal(jQuery('#content h2 img').attr('src'), 'icon/blue-18.png');
    equal(jQuery('#content h2').text(), ' Test Piste');
    equal(jQuery('#content div').length, 4);
    equal(jQuery('#content div:eq(0)').text(), 'Test Country');
    equal(jQuery('#content div:eq(1)').text(), 'Test Area');
    equal(jQuery('#content div:eq(2)').text(), 'Test Resort');
    equal(jQuery('#content div:eq(3)').text(), 'A piste for unit testing purpose');
});