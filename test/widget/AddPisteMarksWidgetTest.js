"use strict";

var app;

module('AddPisteMarksWidget', {
    setup : function() {
        app = {
            user : mbp.User.build('U1', 'ch4mp@c4-soft.com', null, 'test'),
        };
        jQuery('#content').html('');
    },
    teardown : function() {
        jQuery('#content').html('');
    }
});
test('widget is displayed in element specified by jQuerySelector', function() {
    var piste = mbp.Piste.build('testPisteId', null, 'testResortId');
    var widget = new mbp.AddPisteMarksWidget('#content', {
        show : function(actual) {
            deepEqual(actual, piste);
        }
    });

    expect(11);

    widget.show(piste);
    equal(jQuery("a[href='#marks-popup']").attr('data-rel'), 'popup');
    equal(jQuery('#marks-popup').length, 1);

    jQuery("a[href='#marks-popup']").click();
    jQuery('#snow').val(1);
    jQuery('#sun').val(2);
    jQuery('#vertical-drop').val(3);
    jQuery('#length').val(4);
    jQuery('#view').val(5);
    jQuery('#access').val(6);
    app.localPisteRepo = {
        savePiste : function(piste) {
            equal(piste.userMarks['U1'].pisteId, 'testPisteId');
            strictEqual(piste.userMarks['U1'].lastUpdate, null);
            equal(piste.userMarks['U1'].snow, 1);
            equal(piste.userMarks['U1'].sun, 2);
            equal(piste.userMarks['U1'].verticalDrop, 3);
            equal(piste.userMarks['U1'].length, 4);
            equal(piste.userMarks['U1'].view, 5);
            equal(piste.userMarks['U1'].access, 6);
        }
    };
    jQuery('#marks-form').submit();
});