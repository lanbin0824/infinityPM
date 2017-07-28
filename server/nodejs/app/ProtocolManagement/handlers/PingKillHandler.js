
/**
 * Copyright:Copyright(c) 2013 TOSHIBA MEDICAL SYSTEMS CORPORATION All Rights Reserved
 * Company:TOSHIBA MEDICAL SYSTEMS CORPORATION
 *
 * This file is used to handle login request.
 */

 // For ProtocolManagementAppProxy Refactoring
var Utility = require('../Utility.js');
var Log = require('../Logger').getLogger();
//============================================================
//Response ping
exports.Ping = function(req, res)
{
	var time = Utility.GetTime();
	res.writeHead(200, "OK",
		{
			"Cache-Control":"no-store, no-cache, must-revalidate",
			"Pragma": "no-cache",
			"Content-Type": "text/plain",
			"Expires":"0",
			'Content-Length': time.length	
		}
	);
	res.write(time);
	res.end();
};
//============================================================
//Response kill and exit
exports.Kill = function(req, res)
{
	Log.info("Response to kill");
	res.writeHead(200, "OK", {"Content-Type": "text/plain"});
	res.write("bye");
	res.end(); 
	Utility.Exit();
}
