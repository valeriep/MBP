"use strict";

/**
 * Home Widget
 * @constructor
 * @param {String} hookSelector
 * @param {Function} onElementClicked
 * @author ch4mp@c4-soft.com
 */
mbp.LinkListWidget = function(hookSelector, onElementClicked) {
    mbp.Widget.call(this, '#dot-link-list', hookSelector);// parent
    // constructor
    var instance = this, parentShow = this.show, pairs;

    this.show = function(elements) {
        pairs = makePairs(elements);
        parentShow(pairs);
        jQuery(instance.getJQuerySelector() + ' a').click(function(event) {
            onElementClicked(event.currentTarget.getAttribute('data-value'));
            event.preventDefault();
            return false;
        });
    };

    /**
     * builds an array of pairs (as expected from the widget) out of an object or an array
     * @param obj an {Array} or a a map {Object}
     */
    function makePairs(obj) {
        var pairs = [], i = null;

        for (i in obj) {
            pairs.push({
                value : obj instanceof Array ? obj[i] : i,
                text : obj[i]
            });
        }

        return pairs.sort(function(a, b) {
            if (a.text > b.text) {
                return 1;
            }
            if (a.text < b.text) {
                return -1;
            }
            return 0;
        });
    }

    Object.preventExtensions(this);
};
