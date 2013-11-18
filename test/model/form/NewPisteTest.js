"use strict";

module("NewPiste");
test('setKeywords', function() {
    var newPiste = new mbp.NewPiste();
    newPiste.setKeywords(' some,keywords with/different?separators and keywords redundancy:');
    equal(newPiste.keywords.length, 7);
    ok(jQuery.inArray('some', newPiste.keywords) != -1);
    ok(jQuery.inArray('keywords', newPiste.keywords) != -1);
    ok(jQuery.inArray('with', newPiste.keywords) != -1);
    ok(jQuery.inArray('different', newPiste.keywords) != -1);
    ok(jQuery.inArray('separators', newPiste.keywords) != -1);
    ok(jQuery.inArray('and', newPiste.keywords) != -1);
    ok(jQuery.inArray('redundancy', newPiste.keywords) != -1);
});