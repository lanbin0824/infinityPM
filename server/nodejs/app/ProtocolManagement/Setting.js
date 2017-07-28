/**
 * Copyright:Copyright(c) 2013 TOSHIBA MEDICAL SYSTEMS CORPORATION All Rights Reserved
 * Company:TOSHIBA MEDICAL SYSTEMS CORPORATION
 *
 * This file is used to define some application settings
 */

module.exports = {
    //PORT
    PORT        : '8888',
    //web folder
    ROOT        : '/index/',
	//session time (Milliseconds)
	EXPIRES		: 20 * 60 * 1000,
	// AUTHENTICATE (digest/ticket)
	AUTHENTICATE: "digest",
	// app name
	APPNAME		: 'ProtocolManagement',
	// config path
	CONFIG_PATH	: 'config',
	// porocol path
	PROTOCOL_PATH : 'ProtocolPool',
	//default file manamement api
	FM_URL: 'http://10.81.22.149:8700/management/api/file',
	//default setting api
	SETTINGS_URL: 'http://10.81.22.149:8700/management/api/settings',
	//default user name
	USER: 'admin',//'svc.vitality',//admin
	//default password
	PASSWORD:'{"aes":"tG2ByfaXNsi9Xwi4Pmiu1g=="}',//'{"aes":"divJwpa2e5t1skRNy1Qh0A=="}',//{"aes":"tG2ByfaXNsi9Xwi4Pmiu1g=="},
    //cookie
    COOKIE:'',
    //default log home
    LOG_HOME: 'C:/ProgramData/Vital Images/Application/logs/ProtocolManagement',
    //default log level
    LOG_LEVEL: 'info',
    //default feature name
    FEATURE_NAME:'Vitality.ProtocolManagement',
    //default locale:
    //●English: en-US
    //●Japanese: ja-JP
    //●French: fr-Fr
    //●Italian: it-It
    //●German: de-De
    //●Spanish: es-Es
    //●Portuguese: pt-Pt
    //●Dutch: nl-Nl
    LOCALE: 'ja-JP',
    //Check Interval
    CHECK_INTERVAL: 5,
    //USER GROUP Approver/Administrator/Reviewer
    USER_GROUP: 'Administrator',
    //check license
    LICENSING: true,
    //Continuous search condition: SearchbyMonth/SearchbyWeek
    Continuous_Search_Condition: 'SearchbyMonth',
	//search Date limit (YYYY-mm-DD)
    SEARCH_DATE_LIMIT: '2012-01-01',
    //Search Limit
    SEARCH_LIMIT: 500,
    //exporting path
    EXPORTING_PATH : '/Temp/PM',
    //max thread count
    MAX_THREAD_COUNT: 5,
    // the millisecond to define the delay time for showing a tip
    QUICK_TIP_SHOW_DELAY: 1000,
    // the configuration of Backup Protocol Data feature availability
    BACKUP_PROTOCOL_DATA_ENABLED: true,
    // the configuration of Cross Model Sharing feature availability
    CROSS_MODEL_SHARING_ENABLED: true,
    // availability to use email notification for PM.
    EMAIL_NOTIFICATION_ENABLED: false,
    // display "VoicePreset" page in Master Maker or not.
    WORKFLOW_WITH_VOICEPRESET_ENABLED: false,
    // disable [Transfer] buttons of SureIQ/SureExposure/ContrastPreset
    TransferPresetEnabled:false,
    // display protocol position setting button or not
    PROTOCOL_POSITION_SETTINGS_ENABLED: true,
    // position change time out default value
    POSITION_CHANGE_TIMEOUT: 300
};
