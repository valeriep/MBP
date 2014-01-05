"use strict";

module('SeolanRepository', {
    setup : function() {
    },
    teardown : function() {
    }
});
test('getAllResorts()', function() {
    var repo = new mbp.SeolanRepository(), pages = 0, i = null;
    repo.getAllResorts(null, function(response) {
        ok(response.resorts.length > 0);
        for(i in response.resorts) {
            if(!(response.resorts[i] instanceof mbp.Resort)) {
                ok(response.resorts[i] instanceof mbp.Resort);
            }
        }
        pages++;
    });
    ok(pages > 1);
});
test('getAllPistes()', function() {
    var repo = new mbp.SeolanRepository(), pages = 0, i = null;
    repo.getAllPistes(null, function(response) {
        ok(response.length > 0);
        for(i in response) {
            if(!(response[i] instanceof mbp.Piste)) {
                ok(response[i] instanceof mbp.Piste);
            }
        }
        pages++;
    });
});
test('getImagesPageByPisteId()', function() {
    var repo = new mbp.SeolanRepository();
    repo.getImagesPageByPisteId('PISTE:dn70yywnizlaw', 0, function(response) {
        ok(response.length > 0);
    });
});
test('getCommentsPageByPisteId()', function() {
    var repo = new mbp.SeolanRepository();
    repo.getCommentsPageByPisteId('PISTE:dn70z99qw387n', 0, function(response) {
        ok(response.length > 0);
        ok(response[i] instanceof mbp.Comment);
    });
});
test('getPisteMarksByUserId()', function() {
    var repo = new mbp.SeolanRepository();
    repo.getPisteMarksByUserId('USERS:4wxw5y9b9lrl', function(response) {
        ok(response['PISTE:4wwgey8aynj5'] instanceof mbp.PisteMarks);
    });
});