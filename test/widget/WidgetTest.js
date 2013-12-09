"use strict";

module('Widget', {
    setup : function() {
        jQuery('body').append('<script id="test-template" type="text/x-dot-template">Hello {{=it.who}}!</script>');
        jQuery('body').append('<div id="test-hook"></div>');
    },
    teardown : function() {
        jQuery('#test-hook').remove();
        jQuery('#test-template').remove();
    }
});
test('applyTemplate() replaces placeholders with values returned by createTemplateData()', function() {
    var widget = new mbp.Widget('#test-template', '#test-hook');
    equal(widget.applyTemplate('Hello {{=it.who}}!', { who : 'world' }), 'Hello world!');
});
test('display() inserts apllied template in the DOM', function() {
    var widget = new mbp.Widget('#test-template', '#test-hook');
    widget.display({ who : 'world' });
    equal(jQuery('#test-hook').html(), 'Hello world!');
});