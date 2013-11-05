"use strict";

/**
 * @constructor
 * @param {String} id
 * @param {String} name
 * @param {String} color
 * @param {String} description
 * @param {String} picture
 * @param {mbp.Resort} aResort
 * @author ch4mp@c4-soft.com
 */
mbp.Piste = function(id, name, color, description, picture, aResort) {
    var instance = this;
    
    /**
     * @type String
     */
    this.id = id;

    /**
     * @type mbp.Resort
     */
    var resort = null;
    
    /**
     * 
     * @param {mbp.Resort} aResort
     */
    this.setResort = function(aResort) {
        resort = aResort;
        if(resort) {
            resort.addPiste(instance);
        }
    };
    
    /**
     * 
     * @returns {mbp.Resort}
     */
    this.getResort = function() {
        return resort;
    };
    
    /**
     * @type String
     */
    this.name = name;

    /**
     * @type String
     */
    this.color = color;

    /**
     * @type String
     */
    this.description = description;

    /**
     * @type String
     */
    this.picture = picture;

    /**
     * @type Array.mbp.Comment
     */
    var comments = new Array();
    
    /**
     * 
     * @param {mbp.Comment} comment
     */
    this.addComment = function(comment) {
        if(comment.getPiste() != instance) {
            comment.setPiste(instance);
            comments.push(comment);
        }
    };
    
    /**
     * 
     * @return {Array.mbp.Comment}
     */
    this.getComments = function() {
        return comments;
    };
    
    instance.setResort(aResort);
    Object.preventExtensions(this);
};