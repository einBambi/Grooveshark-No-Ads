/* ***** BEGIN LICENSE BLOCK *****
The contents of this file are subject to the Mozilla Public License
Version 1.1 (the "License"); you may not use this file except in
compliance with the License. You may obtain a copy of the License at
http://www.mozilla.org/MPL/

Software distributed under the License is distributed on an "AS IS"
basis, WITHOUT WARRANTY OF ANY KIND, either express or implied. See the
License for the specific language governing rights and limitations
under the License.

The Original Code is NoGroovesharkAds code.

The Initial Developer of the Original Code is Tobias Markus (tobbi@mozilla-uk.org).
All Rights Reserved.

Contributor(s):

Alternatively, the contents of this file may be used under the terms of
either the GNU General Public License Version 2 or later (the "GPL"), or
the GNU Lesser General Public License Version 2.1 or later (the "LGPL"),
in which case the provisions of the GPL or the LGPL are applicable instead
of those above. If you wish to allow use of your version of this file only
under the terms of either the GPL or the LGPL, and not to allow others to
use your version of this file under the terms of the MPL, indicate your
decision by deleting the provisions above and replace them with the notice
and other provisions required by the GPL or the LGPL. If you do not delete
the provisions above, a recipient may use your version of this file under
the terms of any one of the MPL, the GPL or the LGPL.
* ***** END LICENSE BLOCK ***** */
var Cc = Components.classes,
    Ci = Components.interfaces;

window.addEventListener("load", function() { nogroovesharkads.init(); }, false);
var nogroovesharkads = {
    getTargetWindowObject: function(evt) {
		return evt.target.defaultView.wrappedJSObject;
	},

	get isGrooveshark() {
		var host = null;
		try {
			host = content.document.location.host;
		}
		catch(ex) {
			return false;
		}
		return host && !!host.match(/(preview\.)?grooveshark\.com/);
	},

	init: function() {
		this.registerStyleSheet();
		var appcontent = document.getElementById("appcontent");
		if(!appcontent) return;
		appcontent.addEventListener("load",
			function(evt) {
				let window = nogroovesharkads.getTargetWindowObject(evt);
				if(!nogroovesharkads.isGrooveshark ||
				   !window || !window.GS || !window.GS.user)
					return;

				window.GS.user.IsPremium = true;
				window.GS.user.subscription.type =
					window.GS.Models.Subscription.ID_ANYWHERE;
			}, true);
	},

	registerStyleSheet: function() {
		let sss = Cc["@mozilla.org/content/style-sheet-service;1"]
					.getService(Ci.nsIStyleSheetService);
		let ios = Cc["@mozilla.org/network/io-service;1"]
					.getService(Ci.nsIIOService);
		let uri = ios.newURI("chrome://nogroovesharkads/content/nogroovesharkads.css", null, null);
		if(!sss.sheetRegistered(uri, sss.USER_SHEET))
			sss.loadAndRegisterSheet(uri, sss.USER_SHEET);
	}
};
