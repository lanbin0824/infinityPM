/**
 * Copyright:Copyright(c) 2013 TOSHIBA MEDICAL SYSTEMS CORPORATION All Rights Reserved
 * Company:TOSHIBA MEDICAL SYSTEMS CORPORATION
 *
 * This file is used to handle all HTTP request.
 */

var Utility = require('../Utility.js');
var Log = require('../Logger').getLogger();
//============================================================
//Response InitCompare.action, it is used to init compare condition
var InitCompare = function(req, res){
	Log.info("Response to initCompare.action");

    var resultJson = "";

	//req = Utility.checkCookie(req);
	
	//if(req.sessionVisit)
	//{
    var paramJsonStr = JSON.stringify(req.body);
	try{
        //req.param('leftepno'),req.param('leftepname'),req.param('leftuid')
        //,req.param('leftversion'),req.param('leftprotocoltype'),req.param('leftstatus'),req.param('leftorgan')
        //,req.param('leftpatienttype'),req.param('rightepno'),req.param('rightepname')
        //,req.param('rightuid'),req.param('rightversion'),req.param('rightprotocoltype'),req.param('rightstatus')
        //,req.param('rightorgan'),req.param('rightpatienttype'),req.param('parameterlist'),req.param('eventstatus')
        //,req.param('eventid'),req.param('eventFlag'));
		resultJson = Utility.PMNodeJSProxy.CallInitCompareAction(
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
exports.InitCompare = InitCompare;

//============================================================
//Response getcompareparameter.action, it is used to get compare parameter
var GetCompareParameter = function(req, res){
	Log.info("Response to getcompareparameter.action");
    
	var resultJson = "";
	//req = Utility.checkCookie(req);
	
	//if(req.sessionVisit)
	//{
    var paramJsonStr = JSON.stringify(req.query);
	try{
        //req.param('leftepno'),req.param('leftepname'),req.param('leftuid'),
        //req.param('leftversion'),req.param('leftprotocoltype'),req.param('leftstatus'),req.param('leftorgan')
        //,req.param('leftpatienttype'),req.param('rightepno'),req.param('rightepname'),
        //req.param('rightuid'),req.param('rightversion'),req.param('rightprotocoltype'),req.param('rightstatus')
        //,req.param('rightorgan'),req.param('rightpatienttype'));
		resultJson = Utility.PMNodeJSProxy.CallGetCompareParameterAction(
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
exports.GetCompareParameter = GetCompareParameter;