"use strict";

/**
 * @constructor
 * @param {String} id
 * @param {String} name
 * @param {String} color
 * @param {String} description
 * @param {String} picture
 * @param {Number} averageMark
 * @param {mbp.Resort} aResort
 * @author ch4mp@c4-soft.com
 */
mbp.Piste = function(id, name, color, description, picture, averageMark, aResort) {
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
        if(aResort != resort) {
            if(resort) {
                var tmp = resort;
                resort = null;
                tmp.removePiste(instance);
            }
            resort = aResort;
            if(resort) {
                resort.addPiste(instance);
            }
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
     * @type Number
     */
    this.averageMark = averageMark;

    /**
     * a Map of mbp.Comment
     */
    var comments = {};
    
    /**
     * 
     * @param {mbp.Comment} comment
     */
    this.addComment = function(comment) {
        if(comment.getPiste() != instance) {
            comment.setPiste(instance);
        }
        comments[comment.id] = comment;
    };
    
    /**
     * 
     * @param {mbp.Comment} comment
     */
    this.removeComment = function(comment) {
        if(comment) {
            delete comments[comment.id];
            comment.setPiste(null);
        }
    };
    
    /**
     * 
     * @param {String} commentId
     * @return {mbp.Comment}
     */
    this.getComment = function(commentId) {
        return comments[commentId];
    };
    
    /**
     * 
     * @return {Array}
     */
    this.getCommentsIds = function() {
        var commentId = null;
        var commentsIds = Array();
        for(commentId in comments) {
            commentsIds.push(commentId);
        }
        return commentsIds;
    };
    
    instance.setResort(aResort);
    Object.preventExtensions(this);
};