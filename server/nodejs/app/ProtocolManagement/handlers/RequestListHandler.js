/**
 * Copyright:Copyright(c) 2013 TOSHIBA MEDICAL SYSTEMS CORPORATION All Rights Reserved
 * Company:TOSHIBA MEDICAL SYSTEMS CORPORATION
 *
 * This file is used to handle login request.
 */

// For ProtocolManagementAppProxy Refactoring

var Utility = require('../Utility.js');
var Setting = require('../Setting.js');
var Log = require('../Logger').getLogger();
//============================================================
//Response GetRequestList.action, it is used to get the user group and check priviledge
/*var GetRequestList = function(req, res) {
	Log.info("Response to GetRequestList.action");

	var resultJson = "";
	try {
		resultJson = Utility.PMNodeJSProxy.CallRequestListAction(req.param('refresh_flg'));
	} catch (err) {
		Log.error(err.stack);
	}

	var request = Utility.ParseJsonToObj(resultJson);


	if (req.param('refresh_flg') == "refresh") {
		Utility.Cache.fromtime = request.fromtime;
	}
	if (Utility.Cache.totime == "" || Utility.Cache.totime == 0) {
		Utility.Cache.totime = request.totime;
	}
	if (Utility.Cache.archivetime == "" || Utility.Cache.archivetime == 0) {
		Utility.Cache.archivetime = request.archivetime;
	}
	if (Utility.Cache.settingtime == "" || Utility.Cache.settingtime == 0) {
		Utility.Cache.settingtime = request.settingtime;
	}
	if (Utility.Cache.restime == "" || Utility.Cache.restime == 0) {
		Utility.Cache.restime = request.restime;
	}

	res.writeHead(200, {
		"Content-Type": "text/html;charset=UTF-8"
	});
	res.write(resultJson);
	res.end();
};
exports.GetRequestList = GetRequestList;*/
var GetRequestList = function(req, res) {
    Log.info("Response to GetRequestList.action");

    var resultJson = "";
    try {
        var paramJsonStr = JSON.stringify(req.query);
        resultJson = Utility.PMNodeJSProxy.CallRequestListAction(
            paramJsonStr,
            function(resultJson){
                var request = Utility.ParseJsonToObj(resultJson);
                if (req.param('refresh_flg') == "refresh") {
                    Utility.Cache.fromtime = request.fromtime;
                }
                if (Utility.Cache.archivetime == "" || Utility.Cache.archivetime == 0) {
                    Utility.Cache.archivetime = request.archivetime;
                }
                if (Utility.Cache.totime == "" || Utility.Cache.totime == 0) {
                    Utility.Cache.totime = request.totime;
                }
                if (Utility.Cache.transferlisttime == "" || Utility.Cache.transferlisttime == 0) {
                    Utility.Cache.transferlisttime = request.transferlisttime;
                }
                if (Utility.Cache.transferlistdistributedtime == "" || Utility.Cache.transferlistdistributedtime == 0) {
                    Utility.Cache.transferlistdistributedtime = request.transferlistdistributedtime;
                }
                if (Utility.Cache.settingtime == "" || Utility.Cache.settingtime == 0) {
                    Utility.Cache.settingtime = request.settingtime;
                }
                if (Utility.Cache.restime == "" || Utility.Cache.restime == 0) {
                    Utility.Cache.restime = request.restime;
                }
                res.writeHead(200, {
                    "Content-Type": "text/html;charset=UTF-8"
                });
                res.write(resultJson);
                res.end();

            }
        );
    } catch (err) {
        Log.error(err.stack);
    }
};
exports.GetRequestList = GetRequestList;

//============================================================
//Response getErrorList.action, it is used to get error detail when file not exist
var GetErrorList = function(req, res) {
	Log.info("Response to getErrorList.action");

	var resultJson = "";
	try {
		resultJson = Utility.PMNodeJSProxy.CallErrorListAction(
            function(resultJson) {
                res.writeHead(200, {
                    "Content-Type": "text/html;charset=UTF-8"
                });
                res.write(resultJson);
                res.end();

            }
        );
	} catch (err) {
		Log.error(err.stack);
	}
};
exports.GetErrorList = GetErrorList;

//============================================================
//Response getupdatealerttime.action, it is used to update alert
var GetUpdateAlertTime = function(req, res) {
	Log.info("Response to GetUpdateAlertTime.action");

	var resultJson = "";
	try {
		resultJson = "{'alerttime':'" + Setting.CHECK_INTERVAL + "'}";
	} catch (err) {
		Log.error(err.stack);
	}

	res.writeHead(200, {
		"Content-Type": "text/html;charset=UTF-8"
	});
	res.write(resultJson);
	res.end();
};
exports.GetUpdateAlertTime = GetUpdateAlertTime;

//============================================================
//Response getupdatealert.action, it is used to update alert
/*var GetUpdateAlert = function(req, res) {
	Log.info("Response to getUpdateAlert.action");
    try{
        Utility.PMNodeJSProxy.CallUpdateAlertAction(Utility.Cache.fromtime,
			Utility.Cache.archivetime, Utility.Cache.totime,
			Utility.Cache.settingtime, Utility.Cache.restime,
        	function(resultJson){
	            res.writeHead(200, {"Content-Type": "text/html;charset=UTF-8"});
	            res.write(resultJson);
	            res.end();
	        }
        );
    }catch(err){
        Log.error(err.stack);
    }
	// var resultJson = "";
	// try {
	// 	resultJson = Utility.PMNodeJSProxy.CallUpdateAlertAction(
	// 		Utility.Cache.fromtime,
	// 		Utility.Cache.archivetime,
	// 		Utility.Cache.totime,
	// 		Utility.Cache.settingtime,
	// 		Utility.Cache.restime);
	// } catch (err) {
	// 	Log.error(err.stack);
	// }


	// res.writeHead(200, {
	// 	"Content-Type": "text/html;charset=UTF-8"
	// });
	// res.write(resultJson);
	// res.end();
};
exports.GetUpdateAlert = GetUpdateAlert;*/
var GetUpdateAlert = function(req, res) {
    Log.info("Response to getUpdateAlert.action");


    var jsObj = {
        fromTime:Utility.Cache.fromtime+'',
        archiveTime:Utility.Cache.archivetime+'',
        toTime:Utility.Cache.totime+'',
        transferlistTime:Utility.Cache.transferlisttime+'',
        transferlistDistributedTime:Utility.Cache.transferlistdistributedtime+'',
        settingTime:Utility.Cache.settingtime+'',
        resTime:Utility.Cache.restime+''
    };
    var paramJsonStr = JSON.stringify(jsObj);
    try{
        Utility.PMNodeJSProxy.CallUpdateAlertAction(
            paramJsonStr,
            function(resultJson){
                res.writeHead(200, {"Content-Type": "text/html;charset=UTF-8"});
                res.write(resultJson);
                res.end();
            }
        );
    }catch(err){
        Log.error(err.stack);
    }
};
exports.GetUpdateAlert = GetUpdateAlert;

//============================================================
//Response deleteProtocol.action, it is used to delete protocol
var DeleteProtocol = function(req, res) {
	Log.info("Response to deleteProtocol.action");

	var resultJson = "";
	//req = Utility.checkCookie(req);
	//if(req.sessionVisit)
	//{		
	try {
		resultJson = Utility.PMNodeJSProxy.CallDeleteProtocolAction(req.body.protocolList);
	} catch (err) {
		Log.error(err.stack);
	}
	//}
	//else
	//{
	//	resultJson = Utility.SESSION_ERR;
	//}

	res.writeHead(200, {
		"Content-Type": "text/html;charset=UTF-8"
	});
	res.write(resultJson);
	res.end();
};
exports.DeleteProtocol = DeleteProtocol;

//============================================================
//Response requestEvent.action, it is used to accept request
var RequestEventAction = function(req, res) {
	Log.info("Response to requestEvent.action");

	var resultJson = "";
	//req = Utility.checkCookie(req);
	//if(req.sessionVisit)
	//{		
	//var username = "";
	//var cookies = Utility.ParseCookie(req.headers.cookie);
	//var id = cookies.LoginSession;
	//var username = Utility.Cache.username;
    if(req.query.settinggroup != null && req.query.settinggroup != "")
    {
        req.query.settinggroup = JSON.parse(req.query.settinggroup);
    }
    var paramJsonStr = JSON.stringify(req.query);
	try {
	    //req.param('event'), req.param('epNumber'), req.param('protocolName'),
        //req.param('uid'), req.param('version'), req.param('machineName'), req.param('protocolStatus'), req.param('pt'), req.param('organ'), req.param('patienttype'),
        //req.param('reason'), req.param('settinggroup'), req.param('checkedRPIDsJsonStr'));
		resultJson = Utility.PMNodeJSProxy.CallRequestEventAction(
            paramJsonStr,
            function(resultJson){
                res.writeHead(200, {
                    "Content-Type": "text/html;charset=UTF-8"
                });
                res.write(resultJson);
                res.end();
            }
        );

	} catch (err) {
		Log.error(err.stack);
	}
};
exports.RequestEventAction = RequestEventAction;

//============================================================
//
var CheckedRadlexAction = function(req, res) {
	Log.info("Response to CheckedRadlex.action");

	var resultJson = "";
    var paramJsonStr = JSON.stringify(req.query);
	try {
        //req.param("uid"), req.param("type"), req.param("filepath"),
        //req.param("epno"), req.param("protocolname"), req.param("version"),
        //req.param("machinename"), req.param("status"), req.param("organ"),
        //req.param("patienttype")
		resultJson = Utility.PMNodeJSProxy.CallCheckedRadlexAction(
            paramJsonStr,
            function(resultJson) {
                res.writeHead(200, {
                    "Content-Type": "text/html;charset=UTF-8"
                });
                res.write(resultJson);
                res.end();
            }
        );

	} catch (err) {
		Log.error(err.stack);
	}
};
exports.CheckedRadlexAction = CheckedRadlexAction;

