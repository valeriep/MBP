"use strict";

var app, testCase;

module('MapWidget', {
    setup : function() {
        testCase = {
            resorts : [
                    mbp.Resort.build('testResortId', '2014-01-09 22:52:00', 'Test Resort', 'France', 'Alpes de Haute Provence', 44.4098, 6.351),
                    mbp.Resort.build('otherTestResort', '2014-01-09 22:53:00', 'Test Resort', 'France', 'Alpes de Haute Provence', 44.3475, 6.294), ]
        };
        app = {
            localResortRepo : {
                getAllResorts : function(onResortsRetrieved) {
                    onResortsRetrieved(testCase.resorts);
                }
            }
        };
        jQuery('#content').html('');
    },
    teardown : function() {
        jQuery('#content').html('');
    }
});
test('widget is displayed in element specified by jQuerySelector', function() {
    var widget = new mbp.MapWidget('#content', 44.3786, 6.324, function(resortId){
    });

    expect(0);
    
    jQuery('#content').width('900px').height('900px');
    widget.show();
});