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
    var widget = new mbp.NewPisteWidget(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, testNewPisteSubmitted);
    widget.display(
            new Array('Country 1', 'Country 2', 'Country 3'),
            new Array('Massif 1', 'Massif 2', 'Massif 3'), 
            {   'resort1' : 'Resort 1',
                'resort2' : 'Resort 2',
                'resort3' : 'Resort 3'
            }, 
            mbp.Piste.COLORS, 
            new mbp.NewPiste('Country 2', 'Massif 2', 'resort2', 'Pi', mbp.Piste.RED, 'Test description', 'Test keywords-String', undefined), 
            {});
    $('#new-piste-form').submit();
    start();
});
test('New piste form is diplayed in content div', function() {
    var widget = new mbp.NewPisteWidget(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, testNewPisteSubmitted);
    widget.display(
            new Array('Country 1', 'Country 2', 'Country 3'),
            new Array('Massif 1', 'Massif 2', 'Massif 3'), 
            {   'resort1' : 'Resort 1',
                'resort2' : 'Resort 2',
                'resort3' : 'Resort 3'
            }, 
            mbp.Piste.COLORS, 
            new mbp.NewPiste('Country 2', 'Massif 2', 'resort2', 'Pi', mbp.Piste.RED, 'Test description', 'Test keywords-String', undefined), 
            {});
    ok(jQuery('div[data-role="content"]').html());
});