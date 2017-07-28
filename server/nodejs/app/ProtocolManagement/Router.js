/**
 * Copyright:Copyright(c) 2013 TOSHIBA MEDICAL SYSTEMS CORPORATION All Rights Reserved
 * Company:TOSHIBA MEDICAL SYSTEMS CORPORATION
 *
 * This file is used to dispatch HTTP request to correct request handler.
 */

var Setting = require('./Setting.js');

var BaseHandler = require('./handlers/BaseHandler.js');
var LoginHandler = require('./handlers/LoginHandler.js');
var RequestListHandler = require('./handlers/RequestListHandler.js');
var CompareHandler = require('./handlers/CompareHandler.js');
var TransferHandler = require('./handlers/TransferHandler.js');
var HistoryHandler = require('./handlers/HistoryHandler.js');
var SettingHandler = require('./handlers/SettingHandler.js');
var PingKillHandler = require('./handlers/PingKillHandler.js');
var BackupHandler = require('./handlers/BackupHandler.js');
var ProtocolPositionHandler = require('./handlers/ProtocolPositionHandler.js');
var Utility = require('./Utility.js');

//Dispatch HTTP request
module.exports = function(app){

//PingHandler
	app.get(Setting.ROOT + 'ping', function(req, res){ PingKillHandler.Ping(req, res); });
//KillHandler
	app.get(Setting.ROOT + 'kill', function(req, res){ PingKillHandler.Kill(req, res); });

//LoginHandler
	app.get(Setting.ROOT + 'loginCheck.action', function(req, res){ LoginHandler.LoginCheck(req, res); });
	app.get(Setting.ROOT + 'getUserGroup.action', function(req, res){ LoginHandler.GetUserGroup(req, res); });
	app.get(Setting.ROOT + 'sessionClear.action', function(req, res){ LoginHandler.SessionClear(req, res); });
	app.get(Setting.ROOT + 'getLanguage.action', function(req, res){ LoginHandler.GetLanguage(req, res); });

//RequestListHandler
	app.get(Setting.ROOT + 'getRequestList.action', function(req, res){ RequestListHandler.GetRequestList(req, res); });
	app.get(Setting.ROOT + 'getErrorList.action', function(req, res){ RequestListHandler.GetErrorList(req, res); });
	app.get(Setting.ROOT + 'getupdatealert.action', function(req, res){ RequestListHandler.GetUpdateAlert(req, res); });
	app.get(Setting.ROOT + 'getupdatealerttime.action', function(req, res){ RequestListHandler.GetUpdateAlertTime(req, res); });
	app.post(Setting.ROOT + 'deleteProtocol.action', function(req, res){ RequestListHandler.DeleteProtocol(req, res); });
	app.get(Setting.ROOT + 'requestEvent.action', function(req, res){ RequestListHandler.RequestEventAction(req, res); });
	app.get(Setting.ROOT + 'checkedradlex.action', function(req, res){ RequestListHandler.CheckedRadlexAction(req, res); });

//CompareHandler
    app.post(Setting.ROOT + 'initcompare.action', function(req, res){ CompareHandler.InitCompare(req, res); });
	app.get(Setting.ROOT + 'getcompareparameter.action', function(req, res){ CompareHandler.GetCompareParameter(req, res); });
//Transfer
	app.get(Setting.ROOT + 'getmodellist.action', function(req, res){ TransferHandler.GetModelList(req, res); });
	app.get(Setting.ROOT + 'transferprotocols.action', function(req, res){ TransferHandler.TransferApprovedProtocolAction(req, res); });

//HistoryHandler
	app.post(Setting.ROOT + 'restoreHistoryProtocol.action', function(req, res){ HistoryHandler.RestoreExamPlan(req, res); });
    app.post(Setting.ROOT + 'deleteHistoryProtocol.action', function(req, res){ HistoryHandler.DeleteExamPlan(req, res); });
	app.get(Setting.ROOT + 'getConstitutionHistoryList.action', function(req, res){ HistoryHandler.GetConstitutionHistoryList(req, res); });
	app.get(Setting.ROOT + 'getOtherProtocols.action', function(req, res){ HistoryHandler.GetOtherProtocols(req, res); });
	app.get(Setting.ROOT + 'getParameters.action', function(req, res){ HistoryHandler.GetParameters(req, res); });
	app.get(Setting.ROOT + 'getConstitutionList.action', function(req, res){ HistoryHandler.GetConstitutionExamPlanList(req, res); });
	app.get(Setting.ROOT + 'getTransferList.action', function(req, res){ HistoryHandler.GetTransferList(req, res); });
	app.get(Setting.ROOT + 'searchConstitutionList.action', function(req, res){ HistoryHandler.SearchConstitutionList(req, res); });
	app.get(Setting.ROOT + 'searchTransferList.action', function(req, res){ HistoryHandler.SearchTransferList(req, res); });

//SettingHandler
	app.get(Setting.ROOT + 'getConsleSetting.action', function(req, res){ SettingHandler.GetConsoleSetting(req, res); });
    app.get(Setting.ROOT + 'getSpecifiedConsleSetting.action', function(req, res){ SettingHandler.GetSpecifiedConsoleSetting(req, res); });
	app.get(Setting.ROOT + 'deleteConsoleSetting.action', function(req, res){ SettingHandler.DeleteConsoleSetting(req, res); });
	app.get(Setting.ROOT + 'getAddConsleSetting.action', function(req, res){ SettingHandler.GetAddConsleSetting(req, res); });
	app.post(Setting.ROOT + 'saveAllChangeConsole.action', function(req, res){ SettingHandler.SaveAllChangeConsoleSetting(req, res); });
	app.post(Setting.ROOT + 'addConsoleSetting.action', function(req, res){ SettingHandler.AddConsoleSetting(req, res); });
	app.post(Setting.ROOT + 'updateConsoleSetting.action', function(req, res){ SettingHandler.UpdateConsoleSetting(req, res); });
	app.post(Setting.ROOT + 'deleteMachineName.action', function(req, res){ SettingHandler.DeleteMachineNameAction(req, res); });

	app.get(Setting.ROOT + 'getDistributionSetting.action', function(req, res){ SettingHandler.GetDistributionSetting(req, res); });
	app.get(Setting.ROOT + 'deleteDistributionSetting.action', function(req, res){ SettingHandler.DeleteDistributionSetting(req, res); });
	app.get(Setting.ROOT + 'getSpecifiedDistributionSetting.action', function(req, res){ SettingHandler.GetSpecifiedDistributionSetting(req, res); });
	app.post(Setting.ROOT + 'addOrUpdateDistributionSetting.action', function(req, res){ SettingHandler.AddOrUpdateDistributionSetting(req, res); });
	app.get(Setting.ROOT + 'getAddDistributionSetting.action', function(req, res){ SettingHandler.GetAddDistributionSetting(req, res); });

	app.get(Setting.ROOT + 'getProtocolPoolSetting.action', function(req, res){ SettingHandler.GetProtocolPoolSetting(req, res); });
	app.get(Setting.ROOT + 'deleteProtocolPoolSetting.action', function(req, res){ SettingHandler.DeleteProtocolPoolSetting(req, res); });
	app.get(Setting.ROOT + 'getSpecifiedProtocolPoolSetting.action', function(req, res){ SettingHandler.GetSpecifiedProtocolPoolSetting(req, res); });
	app.post(Setting.ROOT + 'editProtocolPoolSetting.action', function(req, res){ SettingHandler.EditProtocolPoolSetting(req, res); });
	app.post(Setting.ROOT + 'addProtocolPoolSetting.action', function(req, res){ SettingHandler.AddProtocolPoolSetting(req, res); });

	app.get(Setting.ROOT + 'getProtocolShareSetting.action', function(req, res){ SettingHandler.GetProtocolShareSetting(req, res); });
	app.post(Setting.ROOT + 'setProtocolShareSetting.action', function(req, res){ SettingHandler.SetProtocolShareSetting(req, res); });

	app.get(Setting.ROOT + 'checkBatchApprove.action', function(req, res){ SettingHandler.CheckBatchApprove(req, res); });
	app.post(Setting.ROOT + 'cancelBatchApprove.action', function(req, res){ SettingHandler.CancelBatchApprove(req, res); });
	app.post(Setting.ROOT + 'startBatchApprove.action', function(req, res){ SettingHandler.StartBatchApprove(req, res); });

    app.get(Setting.ROOT + 'checkcleanmastermaker.action', function(req, res){ SettingHandler.CheckCleanMasterMaker(req, res); });
    app.post(Setting.ROOT + 'cancelcleanmastermaker.action', function(req, res){ SettingHandler.CancelCleanMasterMaker(req, res); });
    app.post(Setting.ROOT + 'startcleanmastermaker.action', function(req, res){ SettingHandler.StartCleanMasterMaker(req, res); });

	app.get(Setting.ROOT + 'checkExportFileExist.action', function(req, res){ SettingHandler.CheckExportFileExist(req, res); });
	app.get(Setting.ROOT + 'checkImportFileExist.action', function(req, res){ SettingHandler.CheckImportFileExist(req, res); });
	app.get(Setting.ROOT + 'startProtocolData.action', function(req, res){ SettingHandler.StartProtocolData(req, res); });
	app.get(Setting.ROOT + 'checkProtocolData.action', function(req, res){ SettingHandler.CheckProtocolData(req, res); });
	app.post(Setting.ROOT + 'cancelProtocolData.action', function(req, res){ SettingHandler.CancelProtocolData(req, res); });

    //MasterListHandler
	app.post(Setting.ROOT + 'getmasterlistoriginallist.action', function(req, res){ SettingHandler.GetMasterListOriginalList(req, res); });
	app.get(Setting.ROOT + 'getMasterListCompare.action', function(req, res){ SettingHandler.GetMasterListCompare(req, res); });
    app.post(Setting.ROOT + 'changeMasterListEPNumber.action', function(req, res){ SettingHandler.ChangeMasterListEPNumber(req, res); });
    app.post(Setting.ROOT + 'getExistedEPNumbers.action', function(req, res){ SettingHandler.GetExistedEPNumbers(req, res); });
	app.get(Setting.ROOT + 'getmasterlistothersettings.action', function(req, res){ SettingHandler.GetMasterListOtherSettings(req, res); });
	app.post(Setting.ROOT + 'setmasterlistothersettingsfiles.action', function(req, res){ SettingHandler.SetMasterListOtherSettingsFiles(req, res); });
    app.get(Setting.ROOT + 'deletemasterlistothersettingsfiles.action', function(req, res){ SettingHandler.DeleteMasterListOtherSettingsFiles(req, res); });
	//userSpecificname
    app.get(Setting.ROOT+'getmodalityidentiferlist.action', function(req, res){ SettingHandler.GetModalityIdentiferList(req, res); });
	app.post(Setting.ROOT+'savemodalityidentiferlist.action', function(req, res){ SettingHandler.SaveModalityIdentiferList(req, res); });

	app.post(Setting.ROOT+'checkMovingHistoryWithScanner.action', function(req, res){ SettingHandler.CheckMovingHistoryWithScanner(req, res); });
	app.post(Setting.ROOT+'modifyConsoleSetting.action', function(req, res){ SettingHandler.ModifyConsoleSetting(req, res); });
	app.post(Setting.ROOT+'checkScannerWhetherShouldBeMoved.action', function(req, res){ SettingHandler.CheckScannerWhetherShouldBeMoved(req, res); });
	app.post(Setting.ROOT+'setScannerMoved.action', function(req, res){ SettingHandler.SetScannerMoved(req, res); });

	app.get(Setting.ROOT+'ClientIsAlive', function(req, res) {
		Utility.ResetTime();
		res.writeHead(204, {});
		res.end();
	});
    //ProtocolPositionHandler
    app.get(Setting.ROOT + 'checkChangePositionAction.action', function(req, res){ ProtocolPositionHandler.CheckChangePositionAction(req, res); });
    app.get(Setting.ROOT + 'lockProtocolPoolAction.action', function(req, res){ ProtocolPositionHandler.LockProtocolPoolAction(req, res); });
    app.get(Setting.ROOT + 'unlockProtocolPoolAction.action', function(req, res){ ProtocolPositionHandler.UnlockProtocolPoolAction(req, res); });

//BackupHandler
	app.get(Setting.ROOT + 'getBackupPath.action', function(req, res){ BackupHandler.GetBackupPath(req, res); });
	// app.get(Setting.ROOT + 'backupProtocolData.action', function(req, res){ BackupHandler.BackupProtocolData(req, res); });
	// app.get(Setting.ROOT + 'queryBackupProgress.action', function(req, res){ BackupHandler.QueryBackupProgress(req, res); });
	app.get(Setting.ROOT + 'backupProtocolData.action', function(req, res){ BackupHandler.BackupProtocolDataSelf(req, res); });
	app.get(Setting.ROOT + 'queryBackupProgress.action', function(req, res){ BackupHandler.QueryBackupProgressSelf(req, res); });

//BaseHandler
	app.get('*', function(req, res){ BaseHandler.GeneralHandler(req, res); });
};
