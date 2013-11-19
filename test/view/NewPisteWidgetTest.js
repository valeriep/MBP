"use strict";

var testNewPisteSubmitted = function() {
    ok(true);
};

module('NewPisteWidget', {
    setup : function() {
        jQuery('div[data-role="content"]').html('');
    },
    teardown : function() {
        jQuery('div[data-role="content"]').html('');
    }
});
asyncTest('submit callback is registered', function() {
    expect(1);
    var widget = new mbp.NewPisteWidget(testNewPisteSubmitted);
    widget.display();
    $('#new-piste-form').submit();
    start();
});
test('New piste form is diplayed in content div', function() {
    var widget = new mbp.NewPisteWidget(testNewPisteSubmitted);
    widget.display();
    ok(jQuery('div[data-role="content"]').html());
});