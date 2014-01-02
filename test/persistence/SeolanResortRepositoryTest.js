"use strict";

module('SeolanResortRepository', {
});
test('getAllResorts()', function() {
    var repo = new mbp.SeolanResortRepository();
    repo.getAllResorts(function(resorts) {
        ok(resorts.length > 0);
    }); 
});
test('getPistesByResortId()', function() {
    var repo = new mbp.SeolanResortRepository();
    repo.getPistesByResortId('Station:courchevel', function(resorts) {
        ok(resorts.length > 0);
    }); 
});