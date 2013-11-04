"use strict";

var originalAjax = jQuery.ajax;
var checkGenerickParams = function(params) {
    equal(params.type, 'POST');
    equal(params.dataType, 'json');
    ok(params.url.indexOf('moid=testModule') > -1);
    ok(params.url.indexOf('function=testFunction') > -1);
};

module("SeolanService", {
    tearDown : function() {
        jQuery.ajax = originalAjax;
    }
});
test("initial parameters", function() {
    var seolan = new mbp.SeolanService('testModule', 'testFunction');
    expect(4);
    checkGenerickParams(seolan.jQueryAjaxParams);
});
test("call() fills additional jquery params ", function() {
    var onSuccess = function() {
    };
    var onError = function() {
    };
    jQuery.ajax = function(params) {
        checkGenerickParams(params);
        equal(params.success, onSuccess);
        equal(params.error, onError);
        equal(params.async, false);
        equal(params.timeout, 6000);
    };
    var seolan = new mbp.SeolanService('testModule', 'testFunction');
    expect(8);
    seolan.call({}, onSuccess, onError, true, 6000);
});
test("getObject() returns an object on success", function() {
    jQuery.ajax = function(params) {
        params.success({
            testProperty : 'testValue'
        });
    };
    var seolan = new mbp.SeolanService('testModule', 'testFunction');
    var actual = seolan.getObject();
    equal(actual.testProperty, 'testValue');
});
test("getObject() throws Error on failure", function() {
    jQuery.ajax = function(params) {
        params.error();
    };
    var seolan = new mbp.SeolanService('testModule', 'testFunction');
    throws(function() {
        seolan.getObject();
    }, Error);
});
test("trigger() calls success callback on success", function() {
    jQuery.ajax = function(params) {
        params.success({
            testProperty : 'testValue'
        });
    };
    var seolan = new mbp.SeolanService('testModule', 'testFunction');
    expect(1);
    seolan.trigger({}, function(answer) {
        equal(answer.testProperty, 'testValue');
    });
});
test("trigger() throws Error on failure", function() {
    jQuery.ajax = function(params) {
        params.error();
    };
    var seolan = new mbp.SeolanService('testModule', 'testFunction');
    throws(function() {
        seolan.trigger();
    }, Error);
});