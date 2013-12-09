"use strict";

var testNewPisteSubmitted = function() {
    ok(true);
};

var app = null;
var errors = null;

module('NewPisteWidget', {
    setup : function() {
        jQuery('div[data-role="content"]').html('');
        var resorts = new mbp.TestCase().getResorts();
        /** @type mbp.Resort */
        var resort = resorts[Object.keys(resorts)[0]];
        var resortRepo = new mbp.LocalResortRepository();
        resortRepo.clear();
        resortRepo.saveResort(resort);
        app = {
            user : new mbp.User('U1', 'Ch4mp', null, 'testSessionId'),
            device : {
                getPicture : function() {
                    return 'test/img/piste/testPiste1.jpg';
                }
            },
            services : {
                resortsSyncService : {
                    run : function() {
                    }
                },
                resortRepo : resortRepo,
                localResortRepo : resortRepo,
                seolanResortRepo : resortRepo,
            }
        };
        errors = {};
    },
    teardown : function() {
        jQuery('div[data-role="content"]').html('');
    }
});
test('New piste form is diplayed in content div', function() {
    var widget = new mbp.NewPisteWidget(app);
    widget.display(new Array('Country 1', 'Country 2', 'Country 3'));
    ok(jQuery('div[data-role="content"]').html());
});