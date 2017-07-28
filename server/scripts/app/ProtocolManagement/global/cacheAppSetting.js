/*!
 * ConstitutionHistory JS
 * Copyright :Copyright(c) 2012 TOSHIBA MEDICAL SYSTEMS CORPORATION All Rights
 * 
 * Company:TOSHIBA MEDICAL SYSTEMS CORPORATION
 */

ModalityIdentifyingImg = {
    Error : '<img class="UserSpecific_Img_Error" style = "display:none;" src="' + PROCESS_PATH_GLOBAL_RESOURCES + 'images/alert/exclamation.gif"></img>'
};
AppSettingContentArray = [
	'ProtocolPool',
	'Console',
	'Distribution',
	'Approval',
	'Displaying',
	'Other'
];
AppSettingHeaderArray = [
	'Protocol Pool Setting',
	'Console Setting',
	'Distribution Setting',
	'Approval Setting',
	'Displaying Setting',
	'Other Setting'
];
AppSettingURLArray = [
	PROCESS_PATH_GLOBAL_ACTION + 'getProtocolPoolSetting.action',
	PROCESS_PATH_GLOBAL_ACTION + 'getConsleSetting.action',
	PROCESS_PATH_GLOBAL_ACTION + 'getDistributionSetting.action',
	PROCESS_PATH_GLOBAL_ACTION + 'getApprovalSetting.action',
	PROCESS_PATH_GLOBAL_ACTION + 'getDisplayingSetting.action',
	PROCESS_PATH_GLOBAL_ACTION + 'getProtocolShareSetting.action'
	//PROCESS_PATH_GLOBAL_ACTION + 'getOtherSetting.action'
];
AppSettingListURLArray = [
	PROCESS_PATH_GLOBAL_ACTION + 'getSpecifiedProtocolPoolSetting.action',
	PROCESS_PATH_GLOBAL_ACTION + 'getConsleSetting.action',
	PROCESS_PATH_GLOBAL_ACTION + 'getDistributionSetting.action',
	PROCESS_PATH_GLOBAL_ACTION + 'getApprovalSetting.action',
	PROCESS_PATH_GLOBAL_ACTION + 'getDisplayingSetting.action',
	''
];
AppSettingDeleteURLArray = [
	PROCESS_PATH_GLOBAL_ACTION + 'deleteProtocolPoolSetting.action',
	PROCESS_PATH_GLOBAL_ACTION + 'deleteConsleSetting.action',
	PROCESS_PATH_GLOBAL_ACTION + 'deleteDistributionSetting.action',
	PROCESS_PATH_GLOBAL_ACTION + 'deleteApprovalSetting.action',
	PROCESS_PATH_GLOBAL_ACTION + 'deleteDisplayingSetting.action',
	''
];

AppSettingWinEditUrlArray = [
    '',
    PROCESS_PATH_GLOBAL_ACTION + 'getSpecifiedConsleSetting.action',
    PROCESS_PATH_GLOBAL_ACTION + 'getSpecifiedDistributionSetting.action',
    PROCESS_PATH_GLOBAL_ACTION + 'editApprovalSetting.action',
    PROCESS_PATH_GLOBAL_ACTION + 'getSpecifiedDisplayingSetting.action'
];

AppSettingWinAddUrlArray = [
    '',
    PROCESS_PATH_GLOBAL_ACTION + 'getAddConsleSetting.action',
    PROCESS_PATH_GLOBAL_ACTION + 'getAddDistributionSetting.action',
    PROCESS_PATH_GLOBAL_ACTION + 'getAddApprovalSetting.action',
    PROCESS_PATH_GLOBAL_ACTION + 'getAddDisplayingSetting.action'
];

AppSettingWinApplyUrlArray = [
    '',
    PROCESS_PATH_GLOBAL_ACTION + 'addOrUpdateConsoleSetting.action',
    PROCESS_PATH_GLOBAL_ACTION + 'addOrUpdateDistributionSetting.action',
    PROCESS_PATH_GLOBAL_ACTION + 'updateApprovalSetting.action',
    PROCESS_PATH_GLOBAL_ACTION + 'addOrUpdateDisplayingSetting.action'
];

ConsoleSettingUrl = {
	updateConsoleSettingUrl: PROCESS_PATH_GLOBAL_ACTION +'updateConsoleSetting.action',
    addConsoleSettingUrl:  PROCESS_PATH_GLOBAL_ACTION +'addConsoleSetting.action',
    deleteMachineNameUrl: PROCESS_PATH_GLOBAL_ACTION +  'deleteMachineName.action',
    saveAllChangeConsoleUrl: PROCESS_PATH_GLOBAL_ACTION + 'saveAllChangeConsole.action',
    
    checkScannerWhetherShouldBeMoved: PROCESS_PATH_GLOBAL_ACTION + 'checkScannerWhetherShouldBeMoved.action',
    modifyConsoleSetting: PROCESS_PATH_GLOBAL_ACTION + 'modifyConsoleSetting.action',
    checkMovingHistoryWithScanner: PROCESS_PATH_GLOBAL_ACTION + 'checkMovingHistoryWithScanner.action',
    setScannerMoved: PROCESS_PATH_GLOBAL_ACTION + 'setScannerMoved.action'
    
};

CheckedImg = {
    checkedImg:PROCESS_PATH_GLOBAL_RESOURCES + 'images/combox/circle_checked.png',
    uncheckedImg:PROCESS_PATH_GLOBAL_RESOURCES + 'images/combox/circle_unchecked.png'
};

ChangedEPNumImg = PROCESS_PATH_GLOBAL_RESOURCES + 'images/icon/icon_s_app.png';
	

AppSettingShareModelArray = [
	"protocol_setting",
	"rpid_setting",
	"reference_setting",
	"backupsupport"
];
