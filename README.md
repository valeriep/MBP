MyBestPiste
===========

Dynastar social mobile app to share info about ski pistes

Prerequisite install on Windows
-------------------------------

You may prefer to work from an IDE like Eclipse. 
To do so, you need:
* a JDK. Test what is on your PATH with ```java -version``` and ```javac -version``` on a command prompt and setup what is missing (http://www.oracle.com/technetwork/java/javase/downloads/index.html)
* JAVA_HOME environement variable is needed (point it where your JDK is installed). Also put it on your PATH.
* Install Apache Ant http://ant.apache.org/bindownload.cgi and add it to your PATH
* Eclipse http://www.eclipse.org/downloads/ (be carefull to choose 32 or 64 bit version depending on the JDK in your path)
* Node.js. Install from http://nodejs.org/
* Cordova CLI. See instructions from http://cordova.apache.org/docs/ (navigate to your prefered lagage, current version and then Command Line Interface section). Run commands as Admin (run the command shell as admin). Be carefull to select the same version of cordova as the one used by PhoneGap-build (```npm install -g cordova@3.1.0-0.2.0``` at time of writing)
* Follow "platform guide -> Android" from Cordova docs (steps about ADT-bundle install and adition to the path are of great importance even if Android SDK is a good substitute to ADT-bundle as we already have Eclipse installed).
* You may also use Git command line tool in addition to or as a replacement for Eclipse integration. See http://git-scm.com/downloads
* Google plugin for eclipse (Androïd project run & debug). when Eclipse is started, go to ```Help -> Install new Software... -> Add...``` and fill location with https://dl.google.com/eclipse/plugin/4.3. Choose Android Development Tools and Google plugin for Eclipse (GWT and App engine stuff are useless here).
* PDT (work with server-side code & Javascript). Same as above with http://download.eclipse.org/tools/pdt/updates/release

Projects setup
--------------

This is a Cordova project. Application is written in HTML5 - javascript using jQuery, jQuery-mobile, doT, QUnit and of course cordova.
A PhoneGap-build is available available at https://build.phonegap.com/apps/636656 but you may need to be added as project colaborator to see it.
Once prerequiste are installed:
* open a command line window
* clone this repo
* cd the project root directory
* run:
  * ```cordova platform add x```, x beeing your taget platform (most probably android, ios, wp7 or wp8)
  * ```cordova plugins add org.apache.cordova.camera```
  * ```cordova plugins add org.apache.cordova.device```
  * ```cordova plugins add org.apache.cordova.geolocation```
  * ```cordova plugins add org.apache.cordova.globalization```
  * ```cordova plugins add org.apache.cordova.network-information```
  * ```cordova plugins add org.apache.cordova.splashscreen```
  * ```android-res.bat``` to copy splash-screens and icons to android project
  * ```cordova build```
* run Eclipse (or whatever prefered IDE) and add two projects:
  * the project root directory is to be imported as Javascript project (from existing sources) and named anything but "MyBestPistes" (i.e. MBP or MyBestPistes-all)
  * MyBestPistes/platforms/android can be imported as Android project.

Caution : if you want to modify source code, do it in MyBestPistes/www and run cordova build again.
Do not touch platform/x/assets/www which will be overriden at each cordova build (and is not synchronized in git for that reason).

Windows Phone 8 notes
---------------------

To run on Windows phone 8, you'll need at least:
* a Windows 8 P.C.
* Visual Studio 2012 Express for Phones (WPexpress_full.exe)
* C:\Windows\Microsoft.NET\Framework\v4.0.30319 on the PATH (caution: Framework and not Framework64 even on 64bits OS)
* Maybe tweek a bit C:\Users\MyBestPiste\.cordova\lib\wp\cordova\3.3.0\wp8\bin\check_reqs.js as ```msbuild -v``` regex matching might be bogous
  * ```wp8-res.bat``` to copy splash-screens and icons to wp8 project

Architecture overview
---------------------

This is a single page HTML5 / javascript app running in a web-view embeded by Cordova in native applications (ios, android & wp8). Source structure is pretty straight forward (root dir for application code is /www/js):
* GUI layout is coded in index.html using doT templates, one for each widget.
* Widgets compositions and controllers (events binding & handeleing) are stored in /www/js/widget/*.js
* Form backing objects (containers for what is displayed to / retieved from forms) are stored in /www/js/form/*.js. those objects are also responsible for validation logic.
* Domain objects (data stored in local repo & exchanged with server) are in /www/js/domain/*.js
* /www/js/persistence folder holds repositories (responsible for data persistence either in HTML5 localStorage or on remote server)
* "Classes" under /www/js/service are technical tools / wrappers for cordova API, ajax calls, etc.
* App entry point is MyBestPistes. A single instance is created at startup and stored in "app" global variable. Singletons (i.e. current user, repositories and shared services such as device wrapper) are public members of this global object.

Special attention was given to unit tests and we achieved decent code coverage. Unit tests are good starting point to understand expectations and specifications (ins & outs) of a class. All test are under /test/ folder and follow same conventions as /www/js/ directory (one test module per source "class"). To run tests just point your browser to /test/test.html (from local file system, no web server is required).
