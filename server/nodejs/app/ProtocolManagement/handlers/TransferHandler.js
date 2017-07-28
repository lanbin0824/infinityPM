/**
 * Copyright:Copyright(c) 2013 TOSHIBA MEDICAL SYSTEMS CORPORATION All Rights Reserved
 * Company:TOSHIBA MEDICAL SYSTEMS CORPORATION
 *
 * This file is used to handle all HTTP request.
 */

var Utility = require('../Utility.js');
var Log = require('../Logger').getLogger();
//============================================================
//Response getmodellist.action, it is used to get model list
var GetModelList = function(req, res){
	Log.info("Response to getmodellist.action");

    var resultJson = "";

	//req = Utility.checkCookie(req);
	
	//if(req.sessionVisit)
	//{	
	try{
	
		resultJson = Utility.PMNodeJSProxy.CallDoGetModelListAction(
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
exports.GetModelList = GetModelList;

//============================================================
//Response getmodellist.action, it is used to get model list
/*var TransferApprovedProtocolAction = function(req, res){
	Log.info("Response to transferprotocols.action");

    var resultJson = "";

	//req = Utility.checkCookie(req);
	
	//if(req.sessionVisit)
	//{			
	try{
	
		resultJson = Utility.PMNodeJSProxy.CallDoTransferApprovedProtocolAction(req.param('protocolList'),
		req.param('settingGroup'),req.param('reason'),req.param('type'),req.param('protocolName'));
	}catch(err){
		Log.error(err.stack);
	}
	//}
	//else
	//{
	//	resultJson = Utility.SESSION_ERR;
	//}

	res.writeHead(200, {"Content-Type": "text/html;charset=UTF-8"});
	res.write(resultJson);
	res.end();

};
exports.TransferApprovedProtocolAction = TransferApprovedProtocolAction;*/
var TransferApprovedProtocolAction = function(req, res){
    Log.info("Response to transferprotocols.action");

    var resultJson = "";
    try{
        if(req.query.settingGroup != null && req.query.settingGroup != "")
        {
            req.query.settingGroup = JSON.parse(req.query.settingGroup);
        }
        var paramJsonStr = JSON.stringify(req.query);
        resultJson = Utility.PMNodeJSProxy.CallDoTransferApprovedProtocolAction(
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
exports.TransferApprovedProtocolAction = TransferApprovedProtocolAction;
