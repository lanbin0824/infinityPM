
/**
 * Copyright:Copyright(c) 2013 TOSHIBA MEDICAL SYSTEMS CORPORATION All Rights Reserved
 * Company:TOSHIBA MEDICAL SYSTEMS CORPORATION
 *
 * This file is used to handle login request.
 */

 // For ProtocolManagementAppProxy Refactoring

var Utility = require('../Utility.js');
var Log = require('../Logger').getLogger();
//var requestTemp = null;
//============================================================
//Response restoreHistoryProtocol.action, it is used to restore history protocol
//
/*var RestoreExamPlan = function(req, res){
	Log.info("Response to restoreHistoryProtocol.action");

	var resultJson = "";
	try{
        var isTransferred = req.param("istransferred");
        var boolTransferred = false;
        if(isTransferred.toUpperCase() == "TRUE")
        {
            boolTransferred = true;
        }
		resultJson = Utility.PMNodeJSProxy.CallRestoreExamPlanAction(
                req.param("filePath").replace(/\\/g,"/"),
                req.param("machinename"),
                req.param("reason"),
                boolTransferred,
                req.param("modifytime"));
	}catch(err){
		Log.error(err.stack);
	}
	res.writeHead(200, {"Content-Type": "text/html;charset=UTF-8"});
	res.write(resultJson);
	res.end();
};
exports.RestoreExamPlan = RestoreExamPlan;*/
var RestoreExamPlan = function(req, res){
    Log.info("Response to restoreHistoryProtocol.action");

    var resultJson = "";
    try{
/*        var isTransferred = req.param("istransferred");
        var boolTransferred = false;
        if(isTransferred.toUpperCase() == "TRUE")
        {
            boolTransferred = true;
        }*/
        req.param("filePath").replace(/\\/g,"/");
        var paramJsonStr = JSON.stringify(req.body);
        resultJson = Utility.PMNodeJSProxy.CallRestoreExamPlanAction(
            paramJsonStr,
            function(resultJson) {
                res.writeHead(200, {"Content-Type": "text/html;charset=UTF-8"});
                res.write(resultJson);
                res.end();
            }
        );
    }catch(err){
        Log.error(err.stack);
    }
};
exports.RestoreExamPlan = RestoreExamPlan;

//============================================================
//Response deleteHistoryProtocol.action, it is used to delete history protocol
/*var DeleteExamPlan = function(req, res){
	Log.info("Response to deleteHistoryProtocol.action");

    var resultJson = "";

	try{
	    var isTransferred = req.param("istransferred");
	    var boolTransferred = false;
	    if(isTransferred.toUpperCase() == "TRUE")
	    {
	        boolTransferred = true;
	    }

		resultJson = Utility.PMNodeJSProxy.CallDeleteExamPlanAction(
		    req.param("filePath").replace(/\\/g,"/"),
		    req.param("machinename"),
			req.param("reason"),
			boolTransferred, 
			req.param("modifytime"));
	}catch(err){
		Log.error(err.stack);
	}

	res.writeHead(200, {"Content-Type": "text/html;charset=UTF-8"});
	res.write(resultJson);
	res.end();
};
exports.DeleteExamPlan = DeleteExamPlan;*/
var DeleteExamPlan = function(req, res){
    Log.info("Response to deleteHistoryProtocol.action");

    var resultJson = "";

    try{
/*        var isTransferred = req.param("istransferred");
        var boolTransferred = false;
        if(isTransferred.toUpperCase() == "TRUE")
        {
            boolTransferred = true;
        }*/
        req.param("filePath").replace(/\\/g,"/");
        var paramJsonStr = JSON.stringify(req.body);
        resultJson = Utility.PMNodeJSProxy.CallDeleteExamPlanAction(
            paramJsonStr,
            function(resultJson) {
                res.writeHead(200, {"Content-Type": "text/html;charset=UTF-8"});
                res.write(resultJson);
                res.end();

            });
    }catch(err){
        Log.error(err.stack);
    }
};
exports.DeleteExamPlan = DeleteExamPlan;

//============================================================
//Response getConstitutionHistoryList.action, it is used to get the history list of archive protocol
/*var GetConstitutionHistoryList = function(req, res){
	Log.info("Response to getConstitutionHistoryList.action");

    var resultJson = "";
	try{
		resultJson = Utility.PMNodeJSProxy.CallGetConstitutionHistoryListAction(req.param('filepath'));
	}catch(err){
		Log.error(err.stack);
	}
	res.writeHead(200, {"Content-Type": "text/html;charset=UTF-8"});
	res.write(resultJson);
	res.end();
};
exports.GetConstitutionHistoryList = GetConstitutionHistoryList;*/
var GetConstitutionHistoryList = function(req, res){
    Log.info("Response to getConstitutionHistoryList.action");

    var resultJson = "";
    try{
        var paramJsonStr = JSON.stringify(req.query);
        resultJson = Utility.PMNodeJSProxy.CallGetConstitutionHistoryListAction(
            paramJsonStr,
            function(resultJson) {
                res.writeHead(200, {"Content-Type": "text/html;charset=UTF-8"});
                res.write(resultJson);
                res.end();
            }
        );
    }catch(err){
        Log.error(err.stack);
    }
};
exports.GetConstitutionHistoryList = GetConstitutionHistoryList;

//============================================================
//Response SearchConstitutionList.action, it is used to get the history list of archive protocol
/*var SearchConstitutionList = function(req, res){
	Log.info("Response to SearchConstitutionList.action");

    var resultJson = "";
	try{
		resultJson = Utility.PMNodeJSProxy.CallSearchConstitutionListAction(req.param('hasSearch'));
	}catch(err){
		Log.error(err.stack);
	}
	res.writeHead(200, {"Content-Type": "text/html;charset=UTF-8"});
	res.write(resultJson);
	res.end();
};
exports.SearchConstitutionList = SearchConstitutionList;*/
var SearchConstitutionList = function(req, res){
    Log.info("Response to SearchConstitutionList.action");

    var resultJson = "";
    try{
        var paramJsonStr = JSON.stringify(req.query);
        resultJson = Utility.PMNodeJSProxy.CallSearchConstitutionListAction(
            paramJsonStr,
            function(resultJson) {
                res.writeHead(200, {"Content-Type": "text/html;charset=UTF-8"});
                res.write(resultJson);
                res.end();
            });
    }catch(err){
        Log.error(err.stack);
    }
};
exports.SearchConstitutionList = SearchConstitutionList;

//============================================================

var SearchTransferList = function(req, res){
    Log.info("Response to SearchTransferList.action");

    var resultJson = "";
    try{
        var paramJsonStr = JSON.stringify(req.query);
        resultJson = Utility.PMNodeJSProxy.CallSearchTransferListAction(
            paramJsonStr,
            function(resultJson) {
                res.writeHead(200, {"Content-Type": "text/html;charset=UTF-8"});
                res.write(resultJson);
                res.end();
            });
    }catch(err){
        Log.error(err.stack);
    }
};
exports.SearchTransferList = SearchTransferList;

//============================================================
//Response getConstitutionList.action, it is used to get the archive protocol list
/*var GetConstitutionExamPlanList = function(req, res){
	Log.info("Response to getConstitutionList.action");

	var resultJson = "";

	try{

		resultJson = Utility.PMNodeJSProxy.CallGetConstitutionExamPlanListAction(req.param('refresh_flg'));
	
	}catch(err){
		Log.error(err.stack);
	}

	var historyJson = Utility.ParseJsonToObj(resultJson);

	if(req.param('refresh_flg') == "refresh")
	{
		Utility.Cache.totime = historyJson.totime;
		Utility.Cache.archivetime = historyJson.archivetime;	
		Utility.Cache.restime = historyJson.restime;
	}
	res.writeHead(200, {"Content-Type": "text/html;charset=UTF-8"});
	res.write(resultJson);
	res.end();
};
exports.GetConstitutionExamPlanList = GetConstitutionExamPlanList;*/
var GetConstitutionExamPlanList = function(req, res){
    Log.info("Response to getConstitutionList.action");

    var resultJson = "";

    try{
        var paramJsonStr = JSON.stringify(req.query);
        resultJson = Utility.PMNodeJSProxy.CallGetConstitutionExamPlanListAction(
            paramJsonStr,
            function(resultJson) {
                var historyJson = Utility.ParseJsonToObj(resultJson);
                if(req.param('refresh_flg') == "refresh")
                {
                    Utility.Cache.totime = historyJson.totime;
                    Utility.Cache.archivetime = historyJson.archivetime;
                    Utility.Cache.restime = historyJson.restime;
                }
                res.writeHead(200, {"Content-Type": "text/html;charset=UTF-8"});
                res.write(resultJson);
                res.end();
            });

    }catch(err){
        Log.error(err.stack);
    }
};
exports.GetConstitutionExamPlanList = GetConstitutionExamPlanList;

//============================================================
//Response getTransferList.action, it is used to get other protocols
var GetTransferList = function(req, res){
    Log.info("Response to getTransferList.action");

    var resultJson = "";

    try{
        var paramJsonStr = JSON.stringify(req.query);
        resultJson = Utility.PMNodeJSProxy.CallGetTransferListAction(
            paramJsonStr,
            function(resultJson) {
                var transferJson = Utility.ParseJsonToObj(resultJson);
                if(req.param('refresh_flg') == "refresh")
                {
                    Utility.Cache.transferlisttime = transferJson.transferlisttime;
                    Utility.Cache.transferlistdistributedtime = transferJson.transferlistdistributedtime;
                }
                res.writeHead(200, {"Content-Type": "text/html;charset=UTF-8"});
                res.write(resultJson);
                res.end();
            });

    }catch(err){
        Log.error(err.stack);
    }
};
exports.GetTransferList = GetTransferList;

//============================================================
//Response getOtherProtocols.action, it is used to get other protocols
var GetOtherProtocols = function(req, res){
	Log.info("Response to getOtherProtocols.action");

    var resultJson = "";
    var paramJsonStr = JSON.stringify(req.query);
	try{
        //req.param('uid'),req.param('epno'),req.param('proname'),req.param('version'),
        //req.param('status'),req.param('protype'),req.param('patienttype'),req.param('protocolorgan'),req.param('organtype'),req.param("rightstatus"));
      	resultJson = Utility.PMNodeJSProxy.CallGetOtherProtocolsAction(
            paramJsonStr,
            function(resultJson) {
                res.writeHead(200, { "Content-Type": "text/html;charset=UTF-8" });
                res.write(resultJson);
                res.end();
            });
	}catch(err){
		Log.error(err.stack);
	}
};
exports.GetOtherProtocols = GetOtherProtocols;

//============================================================
//Response getParameters.action, it is used to get protocol parameters
var GetParameters = function(req, res){
	Log.info("Response to getParameters.action");

    var resultJson = "";
    var paramJsonStr = JSON.stringify(req.query);

	try{
        //req.param('uid'),req.param('epno'),req.param('proname'),req.param('version'),
        // req.param('status'),req.param('patienttype'),req.param('protocolorgan'));
	    resultJson = Utility.PMNodeJSProxy.CallGetParametersAction(
            paramJsonStr,
            function(resultJson) {
                res.writeHead(200, {"Content-Type": "text/html;charset=UTF-8"});
                res.write(resultJson);
                res.end();

            });

	}catch(err){
		Log.error(err.stack);
	}
};
exports.GetParameters = GetParameters;