"use strict";

/**
 * Single point for communication with remote Xsalto Seolan services
 * 
 * @Author ch4mp@c4-soft.com
 */
mbp.Seolan = function(login, pwd) {
    var remoteServiceUri = 'http://dynastar-chrome.xsalto.com/tzr/scripts/admin.php';
    var user = new mbp.SeolanUser(login, pwd);
    
    this.authenticationService = new mbp.AuthenticationService(remoteServiceUri, user);

    Object.preventExtensions(this);
};