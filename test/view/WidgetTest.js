"use strict";

// Widget is abstract. createTemplateData() must be overridden in a sub-class
mbp.TestWidget = function() {
    this.createTemplateData = function() {
        return {
            who : 'world'
        };
    };
};
mbp.TestWidget.prototype = new mbp.Widget('#test-template', '#test-hook');
mbp.TestWidget.prototype.constructor = mbp.TestWidget;

module('Widget', {
    setup: function() {
        jQuery('body').append('<script id="test-template" type="text/x-dot-template">Hello {{=it.who}}!</script>');
        jQuery('body').append('<div id="test-hook"></div>');
    },
    teardown : function() {
        jQuery('#test-hook').remove();
        jQuery('#test-template').remove();
    }
});
test('applyTemplate() replaces placeholders with values returned by createTemplateData()', function() {
    var widget = new mbp.TestWidget();
    equal(widget.applyTemplate('Hello {{=it.who}}!'), 'Hello world!');
});
test('display() inserts apllied template in the DOM', function() {
    var widget = new mbp.TestWidget();
    widget.display();
    equal(jQuery('#test-hook').html(), 'Hello world!');
});