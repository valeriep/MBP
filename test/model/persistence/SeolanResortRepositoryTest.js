"use strict";

var testCase = new mbp.TestCase();
module('SeolanResortRepository', {
});

module('TestCase', {
});
test('getResorts()', function() {
    var resorts = testCase.getResorts();
    var iResort = null;
    var pistesIds, iPisteId = null, piste, pisteCnt = 0;
    var commentCnt = 0;
    
    for(iResort in resorts) {
        pistesIds = resorts[iResort].getPistesIds();
        for(iPisteId in pistesIds) {
            piste = resorts[iResort].getPiste(pistesIds[iPisteId]);
            pisteCnt += 1;
            commentCnt += piste.getCommentsIds().length;
        }
    }
    

    equal(resorts.length, 4);
    equal(pisteCnt, 16);
    equal(commentCnt, 64);
});