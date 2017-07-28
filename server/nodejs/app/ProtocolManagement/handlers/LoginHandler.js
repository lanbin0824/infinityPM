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
var sessionVisit = false;

//============================================================
//Response getUserGroup.action, it is used to get the user group and check priviledge
var GetUserGroup = function(req, res) {
	Log.info("Response to getUserGroup.action");
	var resultJson = "";

	try {
		// resultJson = "{result:[{visit:" + sessionVisit + ",username:'" + Setting.USER + "',usergroup:'" + Setting.USER_GROUP + "'}]}";
		var resultObj = {
			result: [{
				visit: sessionVisit,
				username: Setting.USER,
				usergroup: Setting.USER_GROUP
			}]
		};
		
		resultJson = JSON.stringify(resultObj);
	} catch (err) {
		Log.error(err.stack);
	}

	sessionVisit = true;

	res.writeHead(200, {
		"Content-Type": "text/html;charset=UTF-8"
	});
	res.write(resultJson);
	res.end();
};
exports.GetUserGroup = GetUserGroup;

//============================================================
//Response getLanguage.action
var GetLanguage = function(req, res) {
	Log.info("Response to getLanguage.action");

	var resultJson = "";
	try {
		var settingJson = Utility.ParseJsonToObj(Utility.PMNodeJSProxy.CallGetProtocolShareSettingAction());
		var sharemodel = true;
		var rpidmodel = true;
		var referencemodel = true;
		if (settingJson.result.length > 0 && settingJson.result[1].sharemodel != null ) {
			if (settingJson.result[1].sharemodel == "false") {
				sharemodel = false;
			} else {
				sharemodel = true;
			}

		}
		
		if(settingJson.result.length > 0 && settingJson.result[1].rpidmodel != null){
			if (settingJson.result[1].rpidmodel == "false") {
				rpidmodel = false;
			} else {
				rpidmodel = true;
			}
		}
		
		if(settingJson.result.length > 0 && settingJson.result[1].referencemodel != null){
			if (settingJson.result[1].referencemodel == "false") {
				referencemodel = false;
			} else {
				referencemodel = true;
			}
		}


		resultJson = '{"language": "' + Setting.LOCALE + '",' +
			'"sharemodel": ' + Setting.CROSS_MODEL_SHARING_ENABLED + ',' +
			'licensing:' + Utility.Cache.licensing + ',' +
			'rpidmodel:' + rpidmodel + "," +
			'referencemodel:' + referencemodel + "," +
            'crossModelSharingEnabled:' + Setting.CROSS_MODEL_SHARING_ENABLED + "," +
            'backupProtocolDataEnabled:' + Setting.BACKUP_PROTOCOL_DATA_ENABLED + "," +
            'protocolPositionSettingsEnabled:' + Setting.PROTOCOL_POSITION_SETTINGS_ENABLED + "," +
            'workflowWithVoicePresetEnabled:' + Setting.WORKFLOW_WITH_VOICEPRESET_ENABLED + "," +
            'transferPresetEnabled:' + Setting.TransferPresetEnabled + "," +
            'positionChangeTimeout:' + Setting.POSITION_CHANGE_TIMEOUT + "," +
			'"showdelay":' + Setting.QUICK_TIP_SHOW_DELAY +
			'}';
	} catch (err) {
		Log.error(err.stack);
	}

	res.writeHead(200, {
		"Content-Type": "text/html;charset=UTF-8"
	});
	res.write(resultJson);
	res.end();
};
exports.GetLanguage = GetLanguage;