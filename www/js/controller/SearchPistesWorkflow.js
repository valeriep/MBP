"use strict";

mbp.SearchPistesWorkflow = function(onPistesRetrieved) {
    var instance = this;
    var searchPistesWidget = new mbp.SearchPistesWidget(instance.submit);
    var resortRepo = new mbp.LocalResortRepository();
    
    /**
     * @param {mbp.SearchPistesCriteria} criteria
     * @param {Function} onPistesRetrieved a callback expecting an {Array} of {mbp.Piste}
     */
    this.submit = function(criteria) {
        resortRepo.findPistes(criteria, onPistesRetrieved);
    };
    
    this.activate = function() {
        searchPistesWidget.display();
    };
};