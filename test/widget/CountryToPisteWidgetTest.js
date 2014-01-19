"use strict";

var app, testCase;

module('CountryToPisteWidget', {
    setup : function() {
        testCase =
                {
                    countries : [ 'Country 1', 'Country 2', 'Country 3' ],
                    areas : [ 'Area 1', 'Area 2', 'Area 3' ],
                    resortNames : {
                        'testResort' : 'Test Resort',
                        'otherTestResort' : 'Other Resort',
                        'yetAnotherResort' : 'Yet Another Resort'
                    },
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
                getAllCountries : function(onFound) {
                    onFound(testCase.countries);
                },
                getAreasByCountry : function(country, onFound) {
                    onFound(country == 'Country 2' ? testCase.areas : []);
                },
                getResortNamesByArea : function(area, onFound) {
                    onFound(area == 'Area 2' ? testCase.resortNames : []);
                },
                getResortById : function(resortId, onFound) {
                    if(resortId == 'otherTestResort') {
                        onFound(mbp.Resort.build('otherTestResort', '2014-01-12 15:10:30', 'Other Resort', 'Country 2', 'Area 2'));
                    } else {
                        onFound(null);
                    }
                },
            },
            localPisteRepo : {
                getPistesByResortId : function(resortId, onFound) {
                    onFound(resortId == 'otherTestResort' ? testCase.pistes : []);
                },
                getPisteById : function(pisteId, onFound) {
                    switch (pisteId) {
                    case 'testPiste':
                        onFound(testCase.pistes[0]);
                        break;
                    case 'otherTestPiste':
                        onFound(testCase.pistes[1]);
                        break;
                    case 'yetAnotherTestPiste':
                        onFound(testCase.pistes[2]);
                        break;
                    default:
                        onFound(null);
                    }
                },
            },
            seolanRepo : {
                getCommentsPageByPisteId : function(pisteId, page, onFound) {
                    onFound([]);
                }
            },
            device : {
                isOnline : function() {
                    return true;
                }
            },
            user : mbp.User.build('U1', 'ch4mp@c4-soft.com', null, 'test'),
        };
        jQuery('#content').empty();
    },
    teardown : function() {
         jQuery('#content').empty();
    }
});
test('widget is displayed in element specified by jQuerySelector', function() {
    var widget = new mbp.CountryToPisteWidget('#content');
    widget.show();

    equal(jQuery('#content .country-to-piste li:eq(1) a').text(), "Country 2");
    
    jQuery('#content .country-to-piste li:eq(1) a').click(); //click "Country 2"
    equal(jQuery('#content .country-to-piste li:eq(1)').text(), "Area 2");
    
    jQuery('#content .country-to-piste li:eq(1) a').click(); //click "Area 2"
    equal(jQuery('#content .country-to-piste li:eq(0)').text(), "Other Resort");
    equal(jQuery('#content .country-to-piste li:eq(1)').text(), "Test Resort");
    equal(jQuery('#content .country-to-piste li:eq(2)').text(), "Yet Another Resort");
    
    jQuery('#content .country-to-piste li:eq(0) a').click(); //click "Test Resort"
    equal(jQuery('#content .country-to-piste li:eq(0) h2').text(), "Test Piste");
    equal(jQuery('#content .country-to-piste li:eq(1) h2').text(), "Other Test Piste");
    equal(jQuery('#content .country-to-piste li:eq(2) h2').text(), "Yet Another Test Piste");
    
    jQuery('#content .country-to-piste li:eq(1) a').click(); //click "Other Test Piste"
    equal(jQuery('#content .country-to-piste h2').text(), " Other Test Piste");
    
    document.dispatchEvent(new Event('backbutton'));
    equal(jQuery('#content .country-to-piste li:eq(1) h2').text(), "Other Test Piste");
    
    document.dispatchEvent(new Event('backbutton'));
    equal(jQuery('#content .country-to-piste li:eq(0)').text(), "Other Resort");
    
    document.dispatchEvent(new Event('backbutton'));
    equal(jQuery('#content .country-to-piste li:eq(1)').text(), "Area 2");
    
    document.dispatchEvent(new Event('backbutton'));
    equal(jQuery('#content .country-to-piste li:eq(1) a').text(), "Country 2");
    
    document.dispatchEvent(new Event('backbutton'));
    equal(jQuery('#content .country-to-piste li:eq(1) a').text(), "Country 2");
});