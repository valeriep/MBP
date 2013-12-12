"use strict";

/**
 * Home Widget
 * @constructor
 * @author ch4mp@c4-soft.com
 */
mbp.InfoWidget = function(hookSelector) {
    mbp.Widget.call(this, '#dot-info', hookSelector);// parent constructor

    Object.preventExtensions(this);
};