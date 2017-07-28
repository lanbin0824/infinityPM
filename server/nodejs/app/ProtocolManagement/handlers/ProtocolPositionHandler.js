
/**
 * Copyright:Copyright(c) 2013 TOSHIBA MEDICAL SYSTEMS CORPORATION All Rights Reserved
 * Company:TOSHIBA MEDICAL SYSTEMS CORPORATION
 *
 * This file is used to handle all HTTP request.
 */

var Utility = require('../Utility.js');
var Setting = require('../Setting.js');
var Log = require('../Logger').getLogger();

var CheckChangePositionAction = function(req, res){
    Log.info("Response to checkChangePositionAction.action");
    try{
        Utility.PMNodeJSProxy.CallCheckChangePositionAction(function(resultJson){
            res.writeHead(200, {"Content-Type": "text/html;charset=UTF-8"});
            res.write(resultJson);
            res.end();
        });
    }catch(err){
        Log.error(err.stack);
    }
}
exports.CheckChangePositionAction = CheckChangePositionAction;

var LockProtocolPoolAction = function(req, res){
    Log.info("Response to lockProtocolPoolAction.action");
    var paramJsonStr = JSON.stringify(req.query);
    try{
        Utility.PMNodeJSProxy.CallLockProtocolPoolAction(paramJsonStr,function(resultJson){
            res.writeHead(200, {"Content-Type": "text/html;charset=UTF-8"});
            res.write(resultJson);
            res.end();
        });
    }catch(err){
        Log.error(err.stack);
    }
}
exports.LockProtocolPoolAction = LockProtocolPoolAction;

var UnlockProtocolPoolAction = function(req, res){
    Log.info("Response to unlockProtocolPoolAction.action");
    var paramJsonStr = JSON.stringify(req.query);
    try{
        Utility.PMNodeJSProxy.CallUnlockProtocolPoolAction(paramJsonStr,function(resultJson){
            res.writeHead(200, {"Content-Type": "text/html;charset=UTF-8"});
            res.write(resultJson);
            res.end();
        });
    }catch(err){
        Log.error(err.stack);
    }
}
exports.UnlockProtocolPoolAction = UnlockProtocolPoolAction;