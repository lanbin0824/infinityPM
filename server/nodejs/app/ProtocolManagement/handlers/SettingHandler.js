/**
 * Copyright:Copyright(c) 2013 TOSHIBA MEDICAL SYSTEMS CORPORATION All Rights Reserved
 * Company:TOSHIBA MEDICAL SYSTEMS CORPORATION
 *
 * This file is used to handle all HTTP request.
 */

var Utility = require('../Utility.js');
var Setting = require('../Setting.js');
var Log = require('../Logger').getLogger();
//============================================================
//Response getConsleSetting.action, it is used to get consle setting
var GetConsoleSetting = function(req, res){
	Log.info("Response to getConsleSetting.action");
    var resultJson = "";
	//req = Utility.checkCookie(req);
	//if(req.sessionVisit)
	//{
	try{
		resultJson = Utility.PMNodeJSProxy.CallGetConsoleSettingAction(
            function(resultJson) {
                var request = Utility.ParseJsonToObj(resultJson);
                Utility.Cache.settingtime = request.settingtime;
                res.writeHead(200, {"Content-Type": "text/html;charset=UTF-8"});
                res.write(resultJson);
                res.end();
            }
        );
	}catch(err){
		Log.error(err.stack);
	}

};
exports.GetConsoleSetting = GetConsoleSetting;

//============================================================
//Response getSpecifiedConsleSetting.action, it is used to get specified consle setting
/*var GetSpecifiedConsoleSetting = function(req, res){
	Log.info("Response to getSpecifiedConsleSetting.action");
    var resultJson = "";
	//req = Utility.checkCookie(req);
	//if(req.sessionVisit)
	//{
	try{
        resultJson = Utility.PMNodeJSProxy.CallGetSpecifiedConsoleSettingAction(req.param("settingname"));
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
exports.GetSpecifiedConsoleSetting = GetSpecifiedConsoleSetting;*/
var GetSpecifiedConsoleSetting = function(req, res){
    Log.info("Response to getSpecifiedConsleSetting.action");
    var resultJson = "";
    try{
        var paramJsonStr = JSON.stringify(req.query);
        resultJson = Utility.PMNodeJSProxy.CallGetSpecifiedConsoleSettingAction(
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
exports.GetSpecifiedConsoleSetting = GetSpecifiedConsoleSetting;

//============================================================
//Response deleteConsoleSetting.action, it is used to delete consle setting
/*var DeleteConsoleSetting = function(req, res){
	Log.info("Response to deleteConsoleSetting.action");
    var resultJson = "";
	//req = Utility.checkCookie(req);
	//if(req.sessionVisit)
	//{
	try{
        resultJson = Utility.PMNodeJSProxy.CallDeleteConsoleSettingAction(req.param("deleteid"));
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
exports.DeleteConsoleSetting = DeleteConsoleSetting;*/
var DeleteConsoleSetting = function(req, res){
    Log.info("Response to deleteConsoleSetting.action");
    var resultJson = "";
    //req = Utility.checkCookie(req);
    //if(req.sessionVisit)
    //{
    try{
        var paramJsonStr = JSON.stringify(req.query);
        resultJson = Utility.PMNodeJSProxy.CallDeleteConsoleSettingAction(
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
exports.DeleteConsoleSetting = DeleteConsoleSetting;

//============================================================
//Response getAddConsleSetting.action, it is used to get add consle setting
var GetAddConsleSetting = function(req, res){
	Log.info("Response to getAddConsleSetting.action");

    var resultJson = "";
	//req = Utility.checkCookie(req);
	//if(req.sessionVisit)
	//{
	try{
        resultJson = Utility.PMNodeJSProxy.CallGetAddConsleSettingAction(
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
exports.GetAddConsleSetting = GetAddConsleSetting;

//============================================================
//Response addOrUpdateConsoleSetting.action, it is used to add or update consle setting
/*var SaveAllChangeConsoleSetting = function(req, res){
	Log.info("Response to saveAllChangeConsole.action");

// var util = require('util')
// var fs = require("fs");
// var description = util.inspect(req, { showHidden: true, depth: 2 });
// //var description = req.param("settingname")+' '+ req.param("oldstoredata")+' '+ req.param("newstoredata");
// fs.writeFile('InitCompare.txt', description, 'ascii', function(err){if (err) throw err;});


    var resultJson = "";
	//req = Utility.checkCookie(req);
	//if(req.sessionVisit)
	//{
	try{
        resultJson = Utility.PMNodeJSProxy.CallSaveAllChangeConsoleAction(req.param("settingname"),req.param("oldstoredata"),req.param("newstoredata"));
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
exports.SaveAllChangeConsoleSetting = SaveAllChangeConsoleSetting;*/
var SaveAllChangeConsoleSetting = function(req, res){
    Log.info("Response to saveAllChangeConsole.action");
    var resultJson = "";

    try{
        var paramJsonStr = JSON.stringify(req.body);

        resultJson = Utility.PMNodeJSProxy.CallSaveAllChangeConsoleAction(
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
exports.SaveAllChangeConsoleSetting = SaveAllChangeConsoleSetting;

//============================================================
//Response addConsoleSetting.action, it is used to add or update consle setting
/*var AddConsoleSetting = function(req, res){
 Log.info("Response to addConsoleSetting.action");

 var resultJson = "";
 //req = Utility.checkCookie(req);
 //if(req.sessionVisit)
 //{
 try{
 resultJson = Utility.PMNodeJSProxy.CallAddConsoleSettingAction(req.param("settingname"),req.param("machinename"));
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
 exports.AddConsoleSetting = AddConsoleSetting;*/
var AddConsoleSetting = function(req, res){
    Log.info("Response to addConsoleSetting.action");

    var resultJson = "";
    try{
        var paramJsonStr = JSON.stringify(req.body);
        resultJson = Utility.PMNodeJSProxy.CallAddConsoleSettingAction(paramJsonStr);
    }catch(err){
        Log.error(err.stack);
    }
    res.writeHead(200, {"Content-Type": "text/html;charset=UTF-8"});
    res.write(resultJson);
    res.end();
};
exports.AddConsoleSetting = AddConsoleSetting;

//============================================================
//Response updateConsoleSetting.action, it is used to add or update consle setting
/*var UpdateConsoleSetting = function(req, res){
	Log.info("Response to updateConsoleSetting.action");

    var resultJson = "";
	//req = Utility.checkCookie(req);
	//if(req.sessionVisit)
	//{
	try{
        resultJson = Utility.PMNodeJSProxy.CallUpdateConsoleSettingAction(req.param("settingname"),req.param("oldmachinename"),req.param("newmachinename"));
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
exports.UpdateConsoleSetting = UpdateConsoleSetting;*/
var UpdateConsoleSetting = function(req, res){
    Log.info("Response to updateConsoleSetting.action");

    var resultJson = "";
    try{
        var paramJsonStr = JSON.stringify(req.body);
        resultJson = Utility.PMNodeJSProxy.CallUpdateConsoleSettingAction(
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
exports.UpdateConsoleSetting = UpdateConsoleSetting;

//============================================================
//Response deleteMachineNameAction.action, it is used to add or update consle setting
/*var DeleteMachineNameAction = function(req, res){
	Log.info("Response to deleteMachineNameAction.action");

    var resultJson = "";
	//req = Utility.checkCookie(req);
	//if(req.sessionVisit)
	//{
	try{
        resultJson = Utility.PMNodeJSProxy.CallDeleteMachineNameAction(req.param("settingname"),req.param("machinename"));
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
exports.DeleteMachineNameAction = DeleteMachineNameAction;*/
var DeleteMachineNameAction = function(req, res){
    Log.info("Response to deleteMachineNameAction.action");

    var resultJson = "";
    //req = Utility.checkCookie(req);
    //if(req.sessionVisit)
    //{
    try{
        var paramJsonStr = JSON.stringify(req.body);
        resultJson = Utility.PMNodeJSProxy.CallDeleteMachineNameAction(
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
    //}
    //else
    //{
    //	resultJson = Utility.SESSION_ERR;
    //}
};
exports.DeleteMachineNameAction = DeleteMachineNameAction;

//============================================================
//Response getDistributionSetting.action, it is used to get distribution setting
var GetDistributionSetting = function(req, res){
	Log.info("Response to getDistributionSetting.action");

    var resultJson = "";
	var request = "";
	//req = Utility.checkCookie(req);
	//if(req.sessionVisit)
	//{
	try{
		resultJson = Utility.PMNodeJSProxy.CallGetDistributionSettingAction(
            function(resultJson) {
                request = Utility.ParseJsonToObj(resultJson);
                Utility.Cache.settingtime = request.settingtime;
                res.writeHead(200, {"Content-Type": "text/html;charset=UTF-8"});
                res.write(resultJson);
                res.end();
            }
        );
	}catch(err){
		Log.error(err.stack);
	}

};
exports.GetDistributionSetting = GetDistributionSetting;

//============================================================
//Response deleteDistributionSetting.action, it is used to delete distribution setting
/*var DeleteDistributionSetting = function(req, res){
	Log.info("Response to deleteDistributionSetting.action");

    var resultJson = "";
	//req = Utility.checkCookie(req);
	//if(req.sessionVisit)
	//{
	try{
        resultJson = Utility.PMNodeJSProxy.CallDeleteDistributionSettingAction(req.param("deleteid"));
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
exports.DeleteDistributionSetting = DeleteDistributionSetting;*/
var DeleteDistributionSetting = function(req, res){
    Log.info("Response to deleteDistributionSetting.action");

    var resultJson = "";
    //req = Utility.checkCookie(req);
    //if(req.sessionVisit)
    //{
    try{
        var paramJsonStr = JSON.stringify(req.query);
        resultJson = Utility.PMNodeJSProxy.CallDeleteDistributionSettingAction(
            paramJsonStr,
            function(resultJson) {
                res.writeHead(200, {"Content-Type": "text/html;charset=UTF-8"});
                res.write(resultJson);
                res.end();
            });
    }catch(err){
        Log.error(err.stack);
    }
    //}
    //else
    //{
    //	resultJson = Utility.SESSION_ERR;
    //}


};
exports.DeleteDistributionSetting = DeleteDistributionSetting;

//============================================================
//Response getSpecifiedDistributionSetting.action, it is used to get the specified distribution setting
/*var GetSpecifiedDistributionSetting = function(req, res){
	Log.info("Response to getSpecifiedDistributionSetting.action");

    var resultJson = "";
	//req = Utility.checkCookie(req);
	//if(req.sessionVisit)
	//{
	try{
        resultJson = Utility.PMNodeJSProxy.CallGetSpecifiedDistributionSettingAction(req.param("settingname"));
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
exports.GetSpecifiedDistributionSetting = GetSpecifiedDistributionSetting;*/
var GetSpecifiedDistributionSetting = function(req, res){
    Log.info("Response to getSpecifiedDistributionSetting.action");

    var resultJson = "";
    try{
        var paramJsonStr = JSON.stringify(req.query);
        resultJson = Utility.PMNodeJSProxy.CallGetSpecifiedDistributionSettingAction(
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
exports.GetSpecifiedDistributionSetting = GetSpecifiedDistributionSetting;

//============================================================
//Response addOrUpdateDistributionSetting.action, it is used to add or update distribution setting
/*var AddOrUpdateDistributionSetting = function(req, res){
	Log.info("Response to addOrUpdateDistributionSetting.action");

    var resultJson = "";
	//req = Utility.checkCookie(req);
	//if(req.sessionVisit)
	//{
	try{
        resultJson = Utility.PMNodeJSProxy.CallAddOrUpdateDistributionSettingAction(req.param("settingname"),req.param("settingchildlist"));
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
exports.AddOrUpdateDistributionSetting = AddOrUpdateDistributionSetting;*/
var AddOrUpdateDistributionSetting = function(req, res){
    Log.info("Response to addOrUpdateDistributionSetting.action");

    var resultJson = "";
    try{
        var paramJsonStr = JSON.stringify(req.body);
        resultJson = Utility.PMNodeJSProxy.CallAddOrUpdateDistributionSettingAction(
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
exports.AddOrUpdateDistributionSetting = AddOrUpdateDistributionSetting;

//============================================================
//Response getAddDistributionSetting.action, it is used to get the default distribution setting
var GetAddDistributionSetting = function(req, res){
	Log.info("Response to getAddDistributionSetting.action");

    var resultJson = "";
	//req = Utility.checkCookie(req);
	//if(req.sessionVisit)
	//{
	try{
        resultJson = Utility.PMNodeJSProxy.CallGetAddDistributionSettingAction(
            function(resultJson) {
                res.writeHead(200, {"Content-Type": "text/html;charset=UTF-8"});
                res.write(resultJson);
                res.end();
            }
        );
	}catch(err){
		Log.error(err.stack);
	}
	//}
	//else
	//{
	//	resultJson = Utility.SESSION_ERR;
	//}

};
exports.GetAddDistributionSetting = GetAddDistributionSetting;

//============================================================
//Response getProtocolPoolSetting.action, it is used to get protocol pool setting
var GetProtocolPoolSetting = function(req, res){
	Log.info("Response to getProtocolPoolSetting.action");

    var resultJson = "";
	var request = "";
	//req = Utility.checkCookie(req);
	//if(req.sessionVisit)
	//{
	try{
        resultJson = Utility.PMNodeJSProxy.CallGetProtocolPoolSettingAction(
            function(resultJson) {
                request = Utility.ParseJsonToObj(resultJson);
                //	var cookies = Utility.ParseCookie(req.headers.cookie);
                //	var id = cookies.LoginSession;
                Utility.Cache.settingtime = request.settingtime;
                res.writeHead(200, {"Content-Type": "text/html;charset=UTF-8"});
                res.write(resultJson);
                res.end();
            }
        );

	}catch(err){
		Log.error(err.stack);
	}
	//}
	//else
	//{
	//	resultJson = Utility.SESSION_ERR;
	//}
};
exports.GetProtocolPoolSetting = GetProtocolPoolSetting;

//============================================================
//Response deleteProtocolPoolSetting.action, it is used to delete protocol pool setting
/*var DeleteProtocolPoolSetting = function(req, res){
	Log.info("Response to deleteProtocolPoolSetting.action");

    var resultJson = "";
	//req = Utility.checkCookie(req);
	//if(req.sessionVisit)
	//{
	try{
        resultJson = Utility.PMNodeJSProxy.CallDeleteProtocolPoolSettingAction(req.param("deleteid"));
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
exports.DeleteProtocolPoolSetting = DeleteProtocolPoolSetting;*/
var DeleteProtocolPoolSetting = function(req, res){
    Log.info("Response to deleteProtocolPoolSetting.action");

    var resultJson = "";
    try{ var paramJsonStr = JSON.stringify(req.query);
        resultJson = Utility.PMNodeJSProxy.CallDeleteProtocolPoolSettingAction(
            paramJsonStr);
    }catch(err){
        Log.error(err.stack);
    }
    res.writeHead(200, {"Content-Type": "text/html;charset=UTF-8"});
    res.write(resultJson);
    res.end();
};
exports.DeleteProtocolPoolSetting = DeleteProtocolPoolSetting;
/*var DeleteProtocolPoolSetting = function(req, res){
    Log.info("Response to deleteProtocolPoolSetting.action");

    var resultJson = "";
    try{ var paramJsonStr = JSON.stringify(req.query);
        resultJson = Utility.PMNodeJSProxy.CallDeleteProtocolPoolSettingAction(
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
exports.DeleteProtocolPoolSetting = DeleteProtocolPoolSetting;*/

//============================================================
//Response getSpecifiedProtocolPoolSetting.action, it is used to get specified protocol pool setting
/*var GetSpecifiedProtocolPoolSetting = function(req, res){
 Log.info("Response to getSpecifiedProtocolPoolSetting.action");

 var resultJson = "";
 //req = Utility.checkCookie(req);
 //if(req.sessionVisit)
 //{
 try{
 resultJson = Utility.PMNodeJSProxy.CallGetSpecifiedProtocolPoolSettingAction(req.param("protocolpoolname"));
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
 exports.GetSpecifiedProtocolPoolSetting = GetSpecifiedProtocolPoolSetting;*/
var GetSpecifiedProtocolPoolSetting = function(req, res){
    Log.info("Response to getSpecifiedProtocolPoolSetting.action");

    var resultJson = "";
    //req = Utility.checkCookie(req);
    //if(req.sessionVisit)
    //{
    try{
        var paramJsonStr = JSON.stringify(req.query);
        resultJson = Utility.PMNodeJSProxy.CallGetSpecifiedProtocolPoolSettingAction(
            paramJsonStr,
            function(resultJson) {
                res.writeHead(200, {"Content-Type": "text/html;charset=UTF-8"});
                res.write(resultJson);
                res.end();
            });
    }catch(err){
        Log.error(err.stack);
    }
    //}
    //else
    //{
    //	resultJson = Utility.SESSION_ERR;
    //}


};
exports.GetSpecifiedProtocolPoolSetting = GetSpecifiedProtocolPoolSetting;

//============================================================
//Response editProtocolPoolSetting.action, it is used to edit protocol pool setting
var EditProtocolPoolSetting = function(req, res){
	Log.info("Response to editProtocolPoolSetting.action");

    var resultJson = "";
	//req = Utility.checkCookie(req);
	//if(req.sessionVisit)
	//{
    var paramJsonStr = JSON.stringify(req.body);
	try{
        resultJson = Utility.PMNodeJSProxy.CallEditProtocolPoolSettingAction(
            paramJsonStr,
            function(resultJson) {
                res.writeHead(200, {"Content-Type": "text/html;charset=UTF-8"})
                res.write(resultJson);
                res.end();

            }
        );
            //req.param("protocolpoolname"),req.param("vendor"),
        //req.param("modality"),req.param("systemname"),req.param("modelname"),req.param("xraymod"),req.param("softwareversion"),
       // req.param("option"));
	}catch(err){
		Log.error(err.stack);
	}
	//}
	//else
	//{
	//	resultJson = Utility.SESSION_ERR;
	//}

};
exports.EditProtocolPoolSetting = EditProtocolPoolSetting;

//============================================================
//Response addProtocolPoolSetting.action, it is used to add protocol pool setting
var AddProtocolPoolSetting = function(req, res){
	Log.info("Response to addProtocolPoolSetting.action");

    var resultJson = "";
	//req = Utility.checkCookie(req);
	//if(req.sessionVisit)
	//{
    var paramJsonStr = JSON.stringify(req.body);
	try{
        resultJson = Utility.PMNodeJSProxy.CallAddProtocolPoolSettingAction(
            paramJsonStr,
            function(resultJson) {
                res.writeHead(200, {"Content-Type": "text/html;charset=UTF-8"});
                res.write(resultJson);
                res.end();
            });
            //req.param("protocolpoolname"),req.param("vendor"),
        //req.param("modality"),req.param("systemname"),req.param("modelname"),req.param("xraymod"),req.param("softwareversion"),
       // req.param("option"));
	}catch(err){
		Log.error(err.stack);
	}
	//}
	//else
	//{
	//	resultJson = Utility.SESSION_ERR;
	//}


};
exports.AddProtocolPoolSetting = AddProtocolPoolSetting;

//============================================================
//Response getOtherSetting.action, it is used to show protocol share across model
var GetProtocolShareSetting = function(req, res){
	Log.info("Response to getProtocolShareSetting.action");
	var resultJson = "";
	//req = Utility.checkCookie(req);
	//if(req.sessionVisit)
	//{
	try{
        resultJson = Utility.PMNodeJSProxy.CallGetProtocolShareSettingAction();
	//	var cookies = Utility.ParseCookie(req.headers.cookie);
	//	var id = cookies.LoginSession;
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
}
exports.GetProtocolShareSetting = GetProtocolShareSetting;

//============================================================
//Response getOtherSetting.action, it is used to update other setting
/*var SetProtocolShareSetting = function(req, res){
	Log.info("Response to setProtocolShareSetting.action");
    var resultJson = "";
	//req = Utility.checkCookie(req);
	//if(req.sessionVisit)
	//{
	try{
        resultJson = Utility.PMNodeJSProxy.CallSetProtocolShareSettingAction(req.param("sharemodel"),req.param("sharetype"));
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
exports.SetProtocolShareSetting = SetProtocolShareSetting;*/
var SetProtocolShareSetting = function(req, res){
    Log.info("Response to setProtocolShareSetting.action");
    var resultJson = "";
    try{
        var paramJsonStr = JSON.stringify(req.body);
        resultJson = Utility.PMNodeJSProxy.CallSetProtocolShareSettingAction(
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
exports.SetProtocolShareSetting = SetProtocolShareSetting;

//============================================================
//Response getBatchApprove.action
var CheckBatchApprove = function(req, res){
	Log.info("Response to checkBatchApprove.action");
    try{
        Utility.PMNodeJSProxy.CallCheckBatchApproveAction(function(resultJson){
            res.writeHead(200, {"Content-Type": "text/html;charset=UTF-8"});
            res.write(resultJson);
            res.end();
            console.timeEnd(req.param('type'));
        });
    }catch(err){
        Log.error(err.stack);
    }
	// var resultJson = "";
	// //req = Utility.checkCookie(req);
	// //if(req.sessionVisit)
	// //{
	// try{
 //        resultJson = Utility.PMNodeJSProxy.CallCheckBatchApproveAction();
	// //	var cookies = Utility.ParseCookie(req.headers.cookie);
	// //	var id = cookies.LoginSession;
	// }catch(err){
	// 	Log.error(err.stack);
	// }
	// //}
	// //else
	// //{
	// //	resultJson = Utility.SESSION_ERR;
	// //}

	// res.writeHead(200, {"Content-Type": "text/html;charset=UTF-8"});
	// res.write(resultJson);
	// res.end();
}
exports.CheckBatchApprove = CheckBatchApprove;

//============================================================
//Response setBatchApprove.action
var CancelBatchApprove = function(req, res){
	Log.info("Response to cancelBatchApprove.action");
	var resultJson = "";
	//req = Utility.checkCookie(req);
	//if(req.sessionVisit)
	//{
	try{
        resultJson = Utility.PMNodeJSProxy.CallCancelBatchApproveAction(
            function(resultJson) {
                res.writeHead(200, {"Content-Type": "text/html;charset=UTF-8"});
                res.write(resultJson);
                res.end();
            }
        );
	//	var cookies = Utility.ParseCookie(req.headers.cookie);
	//	var id = cookies.LoginSession;
	}catch(err){
		Log.error(err.stack);
	}
	//}
	//else
	//{
	//	resultJson = Utility.SESSION_ERR;
	//}


}
exports.CancelBatchApprove = CancelBatchApprove;

//============================================================
//Response startBatchApprove.action
/*var StartBatchApprove = function(req, res){
	Log.info("Response to startBatchApprove.action");
    try{
    	if(req.param("keylist") != null && req.param("keylist").length != 0) {
        	Utility.PMNodeJSProxy.CallStartBatchApproveAction(req.param('keylist'),function(resultJson){
	            res.writeHead(200, {"Content-Type": "text/html;charset=UTF-8"});
	            res.write(resultJson);
	            res.end();
	        });
		} else {
        	Utility.PMNodeJSProxy.CallStartBatchApproveAction("",function(resultJson){
	            res.writeHead(200, {"Content-Type": "text/html;charset=UTF-8"});
	            res.write(resultJson);
	            res.end();
	        });
		}
    }catch(err){
        Log.error(err.stack);
    }
	// var resultJson = "";
	// //req = Utility.checkCookie(req);
	// //if(req.sessionVisit)
	// //{
	// try{
	// 	if(req.param("keylist") != null && req.param("keylist").length != 0)
	// 	{
 //        	resultJson = Utility.PMNodeJSProxy.CallStartBatchApproveAction(req.param("keylist"));
	// 	}
	// 	else
	// 	{
 //        	resultJson = Utility.PMNodeJSProxy.CallStartBatchApproveAction();
	// 	}
	// //	var cookies = Utility.ParseCookie(req.headers.cookie);
	// //	var id = cookies.LoginSession;
	// }catch(err){
	// 	Log.error(err.stack);
	// }
	// //}
	// //else
	// //{
	// //	resultJson = Utility.SESSION_ERR;
	// //}

	// res.writeHead(200, {"Content-Type": "text/html;charset=UTF-8"});
	// res.write(resultJson);
	// res.end();
}
exports.StartBatchApprove = StartBatchApprove;*/
var StartBatchApprove = function(req, res){
    Log.info("Response to startBatchApprove.action");
    var paramJsonStr = JSON.stringify(req.body);
    try{
        if(req.param("keylist") != null && req.param("keylist").length != 0) {
            Utility.PMNodeJSProxy.CallStartBatchApproveAction(paramJsonStr,function(resultJson){
                res.writeHead(200, {"Content-Type": "text/html;charset=UTF-8"});
                res.write(resultJson);
                res.end();
            });
        } else {
            Utility.PMNodeJSProxy.CallStartBatchApproveAction("",function(resultJson){
                res.writeHead(200, {"Content-Type": "text/html;charset=UTF-8"});
                res.write(resultJson);
                res.end();
            });
        }
    }catch(err){
        Log.error(err.stack);
    }
}
exports.StartBatchApprove = StartBatchApprove;

//============================================================
//Response startExportProtocolData.action
var StartProtocolData = function(req, res){
	Log.info("Response to StartProtocolDataOperation.action");
	var resultJson = "";
	//req = Utility.checkCookie(req);
	//if(req.sessionVisit)
	//{
	try{
        resultJson = Utility.PMNodeJSProxy.CallStartProtocolDataAction(req.param("type"));
	//	var cookies = Utility.ParseCookie(req.headers.cookie);
	//	var id = cookies.LoginSession;
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
}
exports.StartProtocolData = StartProtocolData;

//============================================================
//Response checkFileExist.action
var CheckExportFileExist = function(req, res){
	Log.info("Response to checkFileExist.action");
	var resultJson = "";
	//req = Utility.checkCookie(req);
	//if(req.sessionVisit)
	//{
	try{
		var	result = Utility.ExistsSync(Setting.EXPORTING_PATH);
		resultJson = '{ \"filesNumber\" : ' + result +' }';
	//	var cookies = Utility.ParseCookie(req.headers.cookie);
	//	var id = cookies.LoginSession;
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
}
exports.CheckExportFileExist = CheckExportFileExist;

//============================================================
//Response checkFileExist.action
var CheckImportFileExist = function(req, res){
	Log.info("Response to checkFileExist.action");
	var resultJson = "";
	//req = Utility.checkCookie(req);
	//if(req.sessionVisit)
	//{
	try{
		resultJson = null;
	//	var cookies = Utility.ParseCookie(req.headers.cookie);
	//	var id = cookies.LoginSession;
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
}
exports.CheckImportFileExist = CheckImportFileExist;

//============================================================
//Response checkFileExist.action
var CheckProtocolData = function(req, res){
	Log.info("Response to checkFileExist.action");
	var resultJson = "";
	//req = Utility.checkCookie(req);
	//if(req.sessionVisit)
	//{
	try{
		resultJson = Utility.PMNodeJSProxy.CallCheckProtocolDataAction();
	//	var cookies = Utility.ParseCookie(req.headers.cookie);
	//	var id = cookies.LoginSession;
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
}
exports.CheckProtocolData = CheckProtocolData;

//============================================================
//Response cancelProtocolData.action
var CancelProtocolData = function(req, res){
	Log.info("Response to cancelProtocolDataOperation.action");
	var resultJson = "";
	//req = Utility.checkCookie(req);
	//if(req.sessionVisit)
	//{
	try{
		resultJson = Utility.PMNodeJSProxy.CallCancelProtocolDataAction();
	//	var cookies = Utility.ParseCookie(req.headers.cookie);
	//	var id = cookies.LoginSession;
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
}
exports.CancelProtocolData = CancelProtocolData;

//============================================================
//Response GetMasterListOriginalListAction.action
/*var GetMasterListOriginalList = function(req, res){
	Log.info("Response to GetMasterListOriginalListAction.action");
	var resultJson = "";
	//req = Utility.checkCookie(req);
	//if(req.sessionVisit)
	//{
	try{
		resultJson = Utility.PMNodeJSProxy.CallDoGetMasterListOriginalListAction(
		    req.param("scannerGroup"),req.param("protocolType"),req.param("masterList"));
	//	var cookies = Utility.ParseCookie(req.headers.cookie);
	//	var id = cookies.LoginSession;
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
}
exports.GetMasterListOriginalList = GetMasterListOriginalList;*/
var GetMasterListOriginalList = function(req, res){
    Log.info("Response to GetMasterListOriginalListAction.action");
    var resultJson = "";
    //req = Utility.checkCookie(req);
    //if(req.sessionVisit)
    //{
    try
    {
        if(req.body.masterList != null && req.body.masterList != "")
        {
            req.body.masterList = JSON.parse(req.body.masterList);
        }
        var paramJsonStr = JSON.stringify(req.body);
        resultJson = Utility.PMNodeJSProxy.CallDoGetMasterListOriginalListAction(
            paramJsonStr,
            function(resultJson) {
                res.writeHead(200, {"Content-Type": "text/html;charset=UTF-8"});
                res.write(resultJson);
                res.end();
            }
        );
       // req.param("scannerGroup"),req.param("protocolType"),req.param("masterList"));
        //	var cookies = Utility.ParseCookie(req.headers.cookie);
        //	var id = cookies.LoginSession;
    }catch(err){
        Log.error(err.stack);
    }
    //}
    //else
    //{
    //	resultJson = Utility.SESSION_ERR;
    //}

}
exports.GetMasterListOriginalList = GetMasterListOriginalList;

//============================================================
//Response GetMasterListCompare.action
/*var GetMasterListCompare = function(req, res){
	Log.info("Response to CallMasterListCompareAction.action");
	var resultJson = "";
	//req = Utility.checkCookie(req);
	//if(req.sessionVisit)
	//{
	try{
		resultJson = Utility.PMNodeJSProxy.CallMasterListCompareAction(
		    req.param("keyStr"),req.param("scannerNameStr"));
	//	var cookies = Utility.ParseCookie(req.headers.cookie);
	//	var id = cookies.LoginSession;
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
}
exports.GetMasterListCompare = GetMasterListCompare;*/
var GetMasterListCompare = function(req, res){
    Log.info("Response to CallMasterListCompareAction.action");
    var resultJson = "";
    //req = Utility.checkCookie(req);
    //if(req.sessionVisit)
    //{
    try{
        var paramJsonStr = JSON.stringify(req.query);
        resultJson = Utility.PMNodeJSProxy.CallMasterListCompareAction(
            paramJsonStr,
            function(resultJson) {
                res.writeHead(200, {"Content-Type": "text/html;charset=UTF-8"});
                res.write(resultJson);
                res.end();

            }
        );
        //    req.param("keyStr"),req.param("scannerNameStr"));
        //	var cookies = Utility.ParseCookie(req.headers.cookie);
        //	var id = cookies.LoginSession;
    }catch(err){
        Log.error(err.stack);
    }
    //}
    //else
    //{
    //	resultJson = Utility.SESSION_ERR;
    //}
}
exports.GetMasterListCompare = GetMasterListCompare;

var GetModalityIdentiferList = function(req, res){
	Log.info("Response to getmodalityidentiferlist.action");
	var resultJson = "";
	try{

		resultJson = Utility.PMNodeJSProxy.CallGetUserSpecifiedMachineNameAction(
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
exports.GetModalityIdentiferList = GetModalityIdentiferList;

//================================================================================================

/*var SaveModalityIdentiferList = function(req, res){
	Log.info("Response to savemodalityidentiferlist.action");
	var resultJson = "";
	try{

		resultJson = Utility.PMNodeJSProxy.CallUpdateUserSpecifiedMachineNameAction(
			req.param('machinename'),
			req.param('userspecificname')

		);

	}catch(err){
        Log.error(err.stack);
    }
	res.writeHead(200, {"Content-Type": "text/html;charset=UTF-8"});
	res.write(resultJson);
	res.end();

};
exports.SaveModalityIdentiferList = SaveModalityIdentiferList;*/
var SaveModalityIdentiferList = function(req, res){
    Log.info("Response to savemodalityidentiferlist.action");
    var resultJson = "";
    try{
        var paramJsonStr = JSON.stringify(req.body);
        resultJson = Utility.PMNodeJSProxy.CallUpdateUserSpecifiedMachineNameAction(
            paramJsonStr);

    }catch(err){
        Log.error(err.stack);
    }
    res.writeHead(200, {"Content-Type": "text/html;charset=UTF-8"});
    res.write(resultJson);
    res.end();

};
exports.SaveModalityIdentiferList = SaveModalityIdentiferList;
/*var SaveModalityIdentiferList = function(req, res){
    Log.info("Response to savemodalityidentiferlist.action");
    var resultJson = "";
    try{
        var paramJsonStr = JSON.stringify(req.body);
        resultJson = Utility.PMNodeJSProxy.CallUpdateUserSpecifiedMachineNameAction(
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
exports.SaveModalityIdentiferList = SaveModalityIdentiferList;*/

//================================================================================================

/*var ChangeMasterListEPNumber = function(req, res){
	Log.info("Response to ChangeMasterListEPNumber.action");
	var resultJson = "";
	try{

		resultJson = Utility.PMNodeJSProxy.CallChangeMasterListEPNumberAction(
			req.param('scanner_group'),
			req.param('ep_number_list')

		);

	}catch(err){
        Log.error(err.stack);
    }
	res.writeHead(200, {"Content-Type": "text/html;charset=UTF-8"});
	res.write(resultJson);
	res.end();

};
exports.ChangeMasterListEPNumber = ChangeMasterListEPNumber;*/
var ChangeMasterListEPNumber = function(req, res){
    Log.info("Response to ChangeMasterListEPNumber.action");
    var resultJson = "";
    req.body.ep_number_list = JSON.parse(req.body.ep_number_list);
    var paramJsonStr = JSON.stringify(req.body);
//console.log(req.body)
//console.log(req.body.ep_number_list[0])
//console.log(req.body.ep_number_list[0].epno)
    try{
        resultJson = Utility.PMNodeJSProxy.CallChangeMasterListEPNumberAction(
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
exports.ChangeMasterListEPNumber = ChangeMasterListEPNumber;

//================================================================================================

/*var GetExistedEPNumbers = function(req, res){
	Log.info("Response to GetExistedEPNumbers.action");
	var resultJson = "";
	try{

		resultJson = Utility.PMNodeJSProxy.CallGetExistedEPNumbersInProtocolPoolAction(
			req.param('scanner_group'),
			req.param('key_array')

		);

	}catch(err){
        Log.error(err.stack);
    }
	res.writeHead(200, {"Content-Type": "text/html;charset=UTF-8"});
	res.write(resultJson);
	res.end();

};
exports.GetExistedEPNumbers = GetExistedEPNumbers;*/
var GetExistedEPNumbers = function(req, res){
    Log.info("Response to GetExistedEPNumbers.action");
    var resultJson = "";
    req.body.key_array = JSON.parse(req.body.key_array);
    var paramJsonStr = JSON.stringify(req.body);
    try{

        resultJson = Utility.PMNodeJSProxy.CallGetExistedEPNumbersInProtocolPoolAction(
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
exports.GetExistedEPNumbers = GetExistedEPNumbers;

//================================================================================================

var CheckScannerWhetherShouldBeMoved = function(req, res){
	Log.info("Response to CheckScannerWhetherShouldBeMoved.action");
	var resultJson = "";
	try{

		resultJson = Utility.PMNodeJSProxy.CallCheckScannerWhetherShouldBeMovedAction(
			req.param('scannerGroups'),
			req.param('destGroup')

		);

	}catch(err){
        Log.error(err.stack);
    }
	res.writeHead(200, {"Content-Type": "text/html;charset=UTF-8"});
	res.write(resultJson);
	res.end();

};
exports.CheckScannerWhetherShouldBeMoved = CheckScannerWhetherShouldBeMoved;

//================================================================================================

var ModifyConsoleSetting = function(req, res){
	Log.info("Response to ModifyConsoleSetting.action");
	var resultJson = "";
	try{

		resultJson = Utility.PMNodeJSProxy.CallModifyConsoleSettingAction(
			req.param('modifyParamsStr')

		);

	}catch(err){
        Log.error(err.stack);
    }
	res.writeHead(200, {"Content-Type": "text/html;charset=UTF-8"});
	res.write(resultJson);
	res.end();

};
exports.ModifyConsoleSetting = ModifyConsoleSetting;

//================================================================================================

var CheckMovingHistoryWithScanner = function(req, res){
	Log.info("Response to CallCheckMovingHistoryWithScannerAction.action");
	var resultJson = "";
	try{

		resultJson = Utility.PMNodeJSProxy.CallCheckMovingHistoryWithScannerAction();

	}catch(err){
        Log.error(err.stack);
    }
	res.writeHead(200, {"Content-Type": "text/html;charset=UTF-8"});
	res.write(resultJson);
	res.end();

};
exports.CheckMovingHistoryWithScanner = CheckMovingHistoryWithScanner;

//================================================================================================

var SetScannerMoved = function(req, res){
	Log.info("Response to SetScannerMoved.action");
	var resultJson = "";
	try{

		resultJson = Utility.PMNodeJSProxy.CallSetScannerMovedAction(
			req.param('feedback')

		);

	}catch(err){
        Log.error(err.stack);
    }
	res.writeHead(200, {"Content-Type": "text/html;charset=UTF-8"});
	res.write(resultJson);
	res.end();

};
exports.SetScannerMoved = SetScannerMoved;

//================================================================================================
var GetMasterListOtherSettings = function(req, res){
    Log.info("Response to getmasterlistothersettings.action");
    var resultJson = "";
    try
    {
        var paramJsonStr = JSON.stringify(req.query);

        resultJson = Utility.PMNodeJSProxy.CallGetMasterListOtherSettingsAction(
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
exports.GetMasterListOtherSettings = GetMasterListOtherSettings;

//================================================================================================
var SetMasterListOtherSettingsFiles = function(req, res){
    Log.info("Response to setmasterlistothersettingsfiles.action");
    var resultJson = "";
    try
    {
        if(req.body.keepfilelist != null && req.body.keepfilelist != "")
        {
            req.body.keepfilelist = JSON.parse(req.body.keepfilelist);
        }
        var paramJsonStr = JSON.stringify(req.body);

        resultJson = Utility.PMNodeJSProxy.CallSetMasterListOtherSettingsFilesAction(
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
exports.SetMasterListOtherSettingsFiles = SetMasterListOtherSettingsFiles;

//================================================================================================
var DeleteMasterListOtherSettingsFiles = function(req, res){
    Log.info("Response to deletemasterlistothersettingsfiles.action");
    var resultJson = "";
    try
    {
        resultJson = Utility.PMNodeJSProxy.CallDeleteMasterListOtherSettingsFilesAction(

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
exports.DeleteMasterListOtherSettingsFiles = DeleteMasterListOtherSettingsFiles;

//================================================================================================

var StartCleanMasterMaker = function(req, res){
    Log.info("Response to startcleanmastermaker.action");
    var paramJsonStr = JSON.stringify(req.body);
    try{
        if(req.param("keylist") != null && req.param("keylist").length != 0) {
            Utility.PMNodeJSProxy.CallCleanMasterMakerAction(paramJsonStr,function(resultJson){
                res.writeHead(200, {"Content-Type": "text/html;charset=UTF-8"});
                res.write(resultJson);
                res.end();
            });
        } else {
            Utility.PMNodeJSProxy.CallCleanMasterMakerAction("",function(resultJson){
                res.writeHead(200, {"Content-Type": "text/html;charset=UTF-8"});
                res.write(resultJson);
                res.end();
            });
        }
    }catch(err){
        Log.error(err.stack);
    }
}
exports.StartCleanMasterMaker = StartCleanMasterMaker;

var CheckCleanMasterMaker = function(req, res){
    Log.info("Response to checkcleanmastermaker.action");
    try{
        Utility.PMNodeJSProxy.CallCheckCleanMasterMakerAction(function(resultJson){
            res.writeHead(200, {"Content-Type": "text/html;charset=UTF-8"});
            res.write(resultJson);
            res.end();
            console.timeEnd(req.param('type'));
        });
    }catch(err){
        Log.error(err.stack);
    }
}
exports.CheckCleanMasterMaker = CheckCleanMasterMaker;

//============================================================
//Response setBatchApprove.action
var CancelCleanMasterMaker = function(req, res){
    Log.info("Response to cancelcleanmastermaker.action");
    var resultJson = "";
    //req = Utility.checkCookie(req);
    //if(req.sessionVisit)
    //{
    try{
        resultJson = Utility.PMNodeJSProxy.CallCancelCleanMasterMakerAction(
            function(resultJson) {
                res.writeHead(200, {"Content-Type": "text/html;charset=UTF-8"});
                res.write(resultJson);
                res.end();
            }
        );
        //	var cookies = Utility.ParseCookie(req.headers.cookie);
        //	var id = cookies.LoginSession;
    }catch(err){
        Log.error(err.stack);
    }

}
exports.CancelCleanMasterMaker = CancelCleanMasterMaker;

//================================================================================================