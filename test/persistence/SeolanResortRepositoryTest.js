"use strict";

module('SeolanRepository', {
});
test('getAllResorts()', function() {
    var repo = new mbp.SeolanRepository();
    repo.getAllResorts(function(resorts) {
        ok(resorts.length > 0);
    }); 
});
test('getPistesByResortId()', function() {
    var repo = new mbp.SeolanRepository();
    repo.getPistesByResortId('Station:courchevel', function(resorts) {
        ok(resorts.length > 0);
    }); 
});