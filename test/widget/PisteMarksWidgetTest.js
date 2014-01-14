"use strict";

var app;

module('PisteMarksWidget', {
    setup : function() {
        jQuery('#content').empty();
    },
    teardown : function() {
        jQuery('#content').empty();
    }
});
test('widget is displayed in div with data-role="content"', function() {
    var widget = new mbp.PisteMarksWidget('#content');
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
    
    equal(jQuery('#content .mark').length, 6);
    
    equal(jQuery('#content .mark:eq(0)').text(), 'Snow: ');
    equal(jQuery('#content .mark:eq(0) img').length, 5);
    
    equal(jQuery('#content .mark:eq(1)').text(), 'Sun: ');
    equal(jQuery('#content .mark:eq(1) img').length, 5);
    
    equal(jQuery('#content .mark:eq(2)').text(), 'Access: ');
    equal(jQuery('#content .mark:eq(2) img').length, 5);
    
    equal(jQuery('#content .mark:eq(3)').text(), 'Vertical drop: ');
    equal(jQuery('#content .mark:eq(3) img').length, 5);
    
    equal(jQuery('#content .mark:eq(4)').text(), 'Length: ');
    equal(jQuery('#content .mark:eq(4) img').length, 5);
    
    equal(jQuery('#content .mark:eq(5)').text(), 'View: ');
    equal(jQuery('#content .mark:eq(5) img').length, 5);
});