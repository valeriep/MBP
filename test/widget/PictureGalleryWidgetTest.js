"use strict";

module('PictureGalleryWidget', {
    setup : function() {
        jQuery('#content').empty();
    },
    teardown : function() {
        jQuery('#content').empty();
    }
});
test('All form fields are taken', function() {
    var widget = new mbp.PictureGalleryWidget('#content');
    widget.show({
        images : [ 'img/piste/testPiste1.jpg', 'img/piste/testPiste2.jpg' ]
    });

    equal(jQuery('.owl-item').length, 2);
});