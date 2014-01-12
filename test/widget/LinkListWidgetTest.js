"use strict";

module('LinkListWidget', {
    setup : function() {
        jQuery('#content').empty();
    },
    teardown : function() {
        jQuery('#content').empty();
    }
});
test('Text arrays are displayed, clicked value index is passed on click event', function() {
    var widget = new mbp.LinkListWidget('#content', function(idx) {
        equal(idx, 2);
    });

    widget.show([ 'Text 0', 'Text 1', 'Text 2', 'Text 3' ]);

    expect(10);
    equal(jQuery('.link-list a').length, 4);
    equal(jQuery('.link-list a:eq(0)').attr('data-value'), 0);
    equal(jQuery('.link-list a:eq(0)').text(), 'Text 0');
    equal(jQuery('.link-list a:eq(1)').attr('data-value'), 1);
    equal(jQuery('.link-list a:eq(1)').text(), 'Text 1');
    equal(jQuery('.link-list a:eq(2)').attr('data-value'), 2);
    equal(jQuery('.link-list a:eq(2)').text(), 'Text 2');
    equal(jQuery('.link-list a:eq(3)').attr('data-value'), 3);
    equal(jQuery('.link-list a:eq(3)').text(), 'Text 3');

    jQuery('.link-list a:eq(2)').click();
});
test('Text maps are displayed, clicked value property name is passed on click event', function() {
    var widget = new mbp.LinkListWidget('#content', function(prop) {
        equal(prop, 'prop2');
    });

    widget.show({
        prop0 : 'Text 0',
        prop1 : 'Text 1',
        prop2 : 'Text 2',
        prop3 : 'Text 3'
    });

    expect(10);
    equal(jQuery('.link-list a').length, 4);
    equal(jQuery('.link-list a:eq(0)').attr('data-value'), 'prop0');
    equal(jQuery('.link-list a:eq(0)').text(), 'Text 0');
    equal(jQuery('.link-list a:eq(1)').attr('data-value'), 'prop1');
    equal(jQuery('.link-list a:eq(1)').text(), 'Text 1');
    equal(jQuery('.link-list a:eq(2)').attr('data-value'), 'prop2');
    equal(jQuery('.link-list a:eq(2)').text(), 'Text 2');
    equal(jQuery('.link-list a:eq(3)').attr('data-value'), 'prop3');
    equal(jQuery('.link-list a:eq(3)').text(), 'Text 3');

    jQuery('.link-list a:eq(2)').click();
});