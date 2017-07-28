/**
 * Copyright:Copyright(c) 2013 TOSHIBA MEDICAL SYSTEMS CORPORATION All Rights Reserved
 * Company:TOSHIBA MEDICAL SYSTEMS CORPORATION
 *
 * This file is used to provide useful methods for other files.
 */

//Debug
// var PMNodeJSProxy = require('../../../../../../Debug/PMNodeJSProxy.node');
// exports.PMNodeJSProxy = PMNodeJSProxy;
// var VitalityInitializer = require('../../../../../../Debug/VitalityInitializer.node');
//Release
var PMNodeJSProxy = require('../../../../bin/PMNodeJSProxy.node');
exports.PMNodeJSProxy = PMNodeJSProxy;
var VitalityInitializer = require('../../../../bin/VitalityInitializer.node');
var http = require('http');
var https = require('https');
var urlModule = require('url');
var Logger = require('./Logger');
var Log;
var Setting = require('./Setting.js');
var fs = require("fs");
var m_sessions = {};
var CONST_SESSION_ERR = "SESSION_FAIL";
var m_cache = {};
var crypty = require('crypto');

exports.Cache = m_cache;
exports.SESSION_ERR = CONST_SESSION_ERR;
exports.m_sessions = m_sessions;

/**
 * VSP Initialize
 * @return {boolean}
 */
exports.Initialize = function(listen,launchContext) {
   	console.log("Nodejs Initializing");
    m_cache.licensing  = true;
    if (!launchContext) {
        //Init log4js
        Logger.initLogConfig(Setting.LOG_HOME, Setting.LOG_LEVEL);
        Log = Logger.getLogger();
        //Set language
        checkLanguage(Setting.LOCALE);
        
        Log.info("Password Decrypting");
        //base64 decode
        Setting.PASSWORD = decrypt(JSON.parse(Setting.PASSWORD).aes);
    } else {
        //parse json launch context
        Setting.USER = launchContext.user.userName; 

        //Set language
        checkLanguage(launchContext.user.locale);  
        
        //Set free port
        SetFreePort();            
        //log
        Setting.LOG_HOME = launchContext.application.logLocation;
        Setting.LOG_LEVEL = launchContext.application.logLevel;
        Logger.initLogConfig(Setting.LOG_HOME, Setting.LOG_LEVEL);
        Log = Logger.getLogger();
        // chectInternal
        Setting.CHECT_INTERVAL = launchContext.application.settings.checkInternal || Setting.CHECT_INTERVAL;
        //license
        m_cache.licensing = AcquireLicense(launchContext.application.name, launchContext.application.version);
        //permission
        Setting.USER_GROUP = "Reviewer" 
        for(var i=0; i<launchContext.user.permissions.length; i++){
            var permission = launchContext.user.permissions[i];
            if(permission == "ProtocolManagement.Administrator"){
                Setting.USER_GROUP = "Administrator";
                break;
            } else if(permission == "ProtocolManagement.Approver"){
            	// If contains both "Administrator" and "Approver", take "Administrator"
                Setting.USER_GROUP = "Approver";
            } 
        }

        getApplicationSettings(launchContext);

        //ticket
        var fileTicketId;
        var settingTicketId;
        for (var i in launchContext.apis){
            if (launchContext.apis[i].name == "fileManagement") {
                Setting.FM_URL = launchContext.apis[i].baseUrl;
                fileTicketId = launchContext.apis[i].ticketId;
            } else if (launchContext.apis[i].name == "settings") {
                Setting.SETTINGS_URL = launchContext.apis[i].baseUrl;
                settingTicketId = launchContext.apis[i].ticketId;
            }
        }
        var fileTicketUrl;
        var settingTicketUrl;
        for (var j in launchContext.user.tickets){
            if (launchContext.user.tickets[j].id == fileTicketId) {
                fileTicketUrl = launchContext.user.tickets[j].url;
            } 
            if (launchContext.user.tickets[j].id == settingTicketId) {
                settingTicketUrl = launchContext.user.tickets[j].url;
            }
        }
        var fileCookieAndLocation = VitalityInitializer.FetchCookiesAndResponse(fileTicketUrl);   
        Log.info(fileCookieAndLocation);     
        if (fileCookieAndLocation) {
            var index = fileCookieAndLocation.lastIndexOf(';');
            Setting.COOKIE = fileCookieAndLocation.substring(0,index);
            KeepAlive(fileCookieAndLocation.substring(index+1));
        } else {
            Log.error("Initilize failed: Get file api ticket failed.");
            Exit();
        }
        // the tickId of All apis from launch context are the same in VSP 7.2
        if (fileTicketUrl == settingTicketUrl) {
            m_cache.manageCookie = Setting.COOKIE;
        } else {
            var settingCookieAndLocation = VitalityInitializer.FetchCookiesAndResponse(settingTicketUrl);
            Log.info(settingCookieAndLocation);
            if (settingCookieAndLocation) {
                m_cache.manageCookie = settingCookieAndLocation.substring(0,settingCookieAndLocation.lastIndexOf(';'));
            } else {
                Log.error("Initilize failed: Get setting api ticket failed.");
                Exit();
            }
        }
    }
    GetSearchLimit(CallSetting,listen);    
};
//============================================================
// Acquire License
/**
 * @return {boolean}
 */
AcquireLicense = function(appName, appVersion) {
    var acquired = true;
    if(!Setting.LICENSING){
        return acquired;
    }
    try {
        acquired = VitalityInitializer.AcquireLicense(appName, appVersion, Setting.FEATURE_NAME);
        if(!acquired){
            Log.error("Failed to check license!");
        } else {
            Log.info("Licensing OK");
        }
    } catch (err) {
        Log.error(err.stack);
    }
    return acquired;
};

//============================================================
// ReleaseLicense
ReleaseLicense = function() {
    var released;
    try {
        released = VitalityInitializer.ReleaseLicense(Setting.FEATURE_NAME);
    } catch (err) {
        Log.error(err.stack);
    }
    return released;
};
//============================================================

//Set launch port
SetFreePort = function(){
    try {
        var seed = process.hrtime()[1];
        Setting.PORT = VitalityInitializer.GetAvailablePort(seed - Math.floor(seed/1000)*1000);
    } catch (err) {
        Log.error("Failed to get free port: " + err.stack);
    }
};
exports.SetFreePort = SetFreePort;
//============================================================

//Keep Alive
KeepAlive = function(location){
    setInterval(function () {
        var urlObject =urlModule.parse(location);
        var options = {
            method: "GET",
            host: urlObject.hostname,
            // port: urlObject.port || 80, //default to port 80 if none is specified
            path: urlObject.path,
            agent: false,
            headers: {
                'Cookie': Setting.COOKIE
            }
        };
        if (urlObject.protocol === 'https:') {
            options.port = 443;
        } else {
            options.port = urlObject.port || 80;
        }
        var protocolType = urlObject.protocol === 'https:' ? https : http;
        var req = protocolType.request(options, function(res) {
            Log.info("Keep alive statusCode: ", res.statusCode);
        });
        req.end();
        req.on('error', function(e) {
            Log.error('Keep alive error: ' + e.stack);
        });
    }, 1000 * 60 * 5); //5min
};
//============================================================

function getApplicationSettings(launchContext) {

    var backupProtocolDataEnabled = launchContext.application.settings.backupProtocolDataEnabled;
    Setting.BACKUP_PROTOCOL_DATA_ENABLED = !backupProtocolDataEnabled ? Setting.BACKUP_PROTOCOL_DATA_ENABLED :
        (backupProtocolDataEnabled.toLowerCase() === 'true' ? true : false);

    Setting.EXPORTING_PATH = launchContext.application.settings.backupProtocolDataDirectory ||
        Setting.EXPORTING_PATH;

    var crossModelSharingEnabled = launchContext.application.settings.crossModelSharingEnabled;
    Setting.CROSS_MODEL_SHARING_ENABLED = !crossModelSharingEnabled ? Setting.CROSS_MODEL_SHARING_ENABLED :
        (crossModelSharingEnabled.toLowerCase() === 'true' ? true : false);

    Setting.MAX_THREAD_COUNT = parseInt(launchContext.application.settings.maxThreadCount, 10) || Setting.MAX_THREAD_COUNT;

    Setting.SEARCH_DATE_LIMIT = launchContext.application.settings.searchDateLimit || Setting.SEARCH_DATE_LIMIT;

    Setting.QUICK_TIP_SHOW_DELAY = parseInt(launchContext.application.settings.showTipDelay, 10) || Setting.QUICK_TIP_SHOW_DELAY;

    var emailNotificationEnabled = launchContext.application.settings.emailNotificationEnabled;
    Setting.EMAIL_NOTIFICATION_ENABLED = !emailNotificationEnabled ? Setting.EMAIL_NOTIFICATION_ENABLED :
        (emailNotificationEnabled.toLowerCase() === 'true' ? true : false);

    var workflowWithVoicePresetEnabled = launchContext.application.settings.workflowWithVoicePresetEnabled;
    Setting.WORKFLOW_WITH_VOICEPRESET_ENABLED = !workflowWithVoicePresetEnabled ? Setting.WORKFLOW_WITH_VOICEPRESET_ENABLED :
        (workflowWithVoicePresetEnabled.toLowerCase() === 'true' ? true : false);

    var transferPresetEnabled = launchContext.application.settings.transferPresetEnabled;
    Setting.TransferPresetEnabled = !transferPresetEnabled ? Setting.TransferPresetEnabled :
        (transferPresetEnabled.toLowerCase() === 'true' ? true : false);

    var protocolPositionSettingsEnabled = launchContext.application.settings.protocolPositionSettingsEnabled;
    Setting.PROTOCOL_POSITION_SETTINGS_ENABLED = !protocolPositionSettingsEnabled ? Setting.PROTOCOL_POSITION_SETTINGS_ENABLED :
        (protocolPositionSettingsEnabled.toLowerCase() === 'true' ? true : false);

    Setting.POSITION_CHANGE_TIMEOUT = parseInt(launchContext.application.settings.positionChangeTimeOut, 10) || Setting.POSITION_CHANGE_TIMEOUT;
}

//Keep Alive
/*CallSetting = function(listen){
    var search_condition = 1;
    if("SearchbyWeek" == Setting.Continuous_Search_Condition)
    {
        search_condition = 2;
    }
    // alert init
    m_cache.fromtime = 0;
    m_cache.totime = 0;
    m_cache.archivetime = 0;
    m_cache.settingtime = 0;
    m_cache.restime = 0;
    Log.info("Initilize with " + JSON.stringify(Setting));

    if(!PMNodeJSProxy.CallSettingAction(
        Setting.FM_URL,
        Setting.LOG_HOME,
        Setting.LOG_LEVEL,
        Setting.USER,
        Setting.PASSWORD,
        Setting.COOKIE,
        Setting.APPNAME,
        Setting.CONFIG_PATH,
        Setting.PROTOCOL_PATH,
        search_condition,
        Setting.SEARCH_DATE_LIMIT,
        Setting.SEARCH_LIMIT,
        Setting.EXPORTING_PATH,
        Setting.MAX_THREAD_COUNT
    )){
        Log.error("Initilize failed!");
        Exit();
    }else {
        listen();
    }
};*/
CallSetting = function(listen){
    var search_condition = 1;
    if("SearchbyWeek" == Setting.Continuous_Search_Condition)
    {
        search_condition = 2;
    }
    // alert init
    m_cache.fromtime = 0;
    m_cache.totime = 0;
    m_cache.archivetime = 0;
    m_cache.settingtime = 0;
    m_cache.transferlisttime = 0;
    m_cache.transferlistdistributedtime = 0;
    m_cache.restime = 0;

    var jsObj = {
        url:Setting.FM_URL,
        logHome:Setting.LOG_HOME,
        logLevel:Setting.LOG_LEVEL,
        user:Setting.USER,
        passWord:Setting.PASSWORD,
        cookie:Setting.COOKIE,
        appName:Setting.APPNAME,
        configPath:Setting.CONFIG_PATH,
        protocolPath:Setting.PROTOCOL_PATH,
        searchCondition:search_condition + '',
        searchDateLimit:Setting.SEARCH_DATE_LIMIT,
        search_limit:Setting.SEARCH_LIMIT + '',
        exportingPath:Setting.EXPORTING_PATH,
        maxThreadCount:Setting.MAX_THREAD_COUNT, // int
        backupProtocolDataEnabled: Setting.BACKUP_PROTOCOL_DATA_ENABLED,
        crossModelSharingEnabled: Setting.CROSS_MODEL_SHARING_ENABLED,
        showTipDelay: Setting.QUICK_TIP_SHOW_DELAY,
        emailNotificationEnabled: Setting.EMAIL_NOTIFICATION_ENABLED,
        workflowWithVoicePresetEnabled: Setting.WORKFLOW_WITH_VOICEPRESET_ENABLED,
        transferPresetEnabled: Setting.TransferPresetEnabled
    };
    var paramJsonStr = JSON.stringify(jsObj);

    if(!PMNodeJSProxy.CallSettingAction(paramJsonStr)){
        Log.error("Initilize failed!");
        Exit();
    }else {
        listen();
    }
};
//============================================================

//Keep Alive
GetSearchLimit = function(callback,listen){
    Log.info("Get search limit from setting api");
    var urlObject =urlModule.parse(Setting.SETTINGS_URL);
    var options = {
        method: "GET",
        host: urlObject.hostname,
        // port: urlObject.port || 80, //default to port 80 if none is specified
        path: urlObject.path+'/StorageMgr/searchLimit',
        agent: false
    };
    if (urlObject.protocol === 'https:') {
        options.port = 443;
    } else {
        options.port = urlObject.port || 80;
    }
    if(m_cache.manageCookie){
        options.headers = {
            'Cookie': m_cache.manageCookie
        };
    }else{
        options.auth = Setting.USER +':'+Setting.PASSWORD;
    }
    var protocolType = urlObject.protocol === 'https:' ? https : http;
    var req = protocolType.request(options, function(res) {
        var responseData = '';       
        res.on('data', function(chunk){
            responseData += chunk;
        });
        res.on('end', function(){
            Log.info("response from " + options.path + ": " + responseData);
            var pattern = new RegExp("^[0-9]+$","g");
            if(pattern.test(responseData)){
                Setting.SEARCH_LIMIT = responseData;
            }
            callback(listen);
        });
    });
    req.end();
};
//============================================================
//Exit
exports.Exit = function() {
    if(Setting.AUTHENTICATE == 'ticket' && Setting.LICENSING){
        ReleaseLicense();
    }
    process.exit(0);
};

//============================================================
var IdleTime = 0;
setInterval(function() {
    IdleTime++;
}, 1000);
//============================================================

//Reset IdleTime 0
exports.ResetTime = function() {
    IdleTime = 0;
};
//============================================================
//Get IdleTime
exports.GetTime = function() {
    return IdleTime.toString();
};

//============================================================
//parse json
exports.ParseJsonToObj = function(str) {
	return JSON.parse(str); 
};


//============================================================
//set Cookies for res
exports.SetHeaderCookies = function(req, res, name, value)
{
	var cookies = res.getHeader("Set-Cookie");
	var session = Serialize(name, value);
	//PrintDebugLog(cookies);
	if(cookies)
	{
		if(Array.isArray(cookies))
		{
			cookies = cookies.concat(session);
		}
		else
		{
			cookies = [cookies, session];
		}
	}
	else
	{
		cookies = session;
	}

	res.setHeader("Set-Cookie", cookies);
	return res;
};

//============================================================
//add session for server
exports.GenerateSession = function(time, username, usergroup)
{
	var session = {};
	session.id = (new Date()).getTime() + Math.random();
	session.cookie = {
		expire: (new Date()).getTime() + time
	};
	session.username = username;
	session.usergroup = usergroup;
	session.fromtime = 0;
	session.totime = 0;
	session.archivetime = 0;
	session.transferlisttime = 0;
	session.transferlistdistributedtime = 0;
	session.settingtime = 0;
	return session;
};

//============================================================
//serialize
exports.Serialize = function(name, val, opt)
{
	var pairs = [name + '=' + val];
	opt = opt || {};

	if(opt.maxAge)
	{
		//PrintDebugLog("maxage");
		opt.push('Max-Age=' + opt.maxAge);
	}

	return pairs.join(';');
};

//============================================================
//parse cookie
exports.ParseCookie = function(cookie)
{
	var cookies = {};
	if(!cookie)
	{
		return cookies;
	}
	var list = cookie.split(';');
	for(var i =0;i < list.length;i++)
	{
		var pair = list[i].split('=');
		cookies[pair[0].trim()] = pair[1];
	}

	return cookies;
};

//============================================================
//file Exists (Sync)
exports.ExistsSync = function(path) {
    if(!fs.existsSync(path)){
		return 0;
	}else{
		var files = fs.readdirSync(path, null);
//		var count = 0;
//		for(var i=0;i<files.length;++i){
//			var stat = fs.lstatSync(path+'/'+files[i]);
//			if( !stat.isDirectory() ){
//				count++;
//			}
//		}
//		return count;
		return files.length;
	}
};

//Set language
checkLanguage = function(lcaleLanguage)
{        
    var language = lcaleLanguage;
    if(language != null && language.length >= 3)
    {
        language = language.substr(0, 3);
    }
    if(language == "en-") {
        Setting.LOCALE = "EN";
    }
    else if(language == "ja-") {
        Setting.LOCALE = "JP";
    }
    else if(language == "fr-") {
        Setting.LOCALE = "FR";
    }
    else if(language == "it-") {
        Setting.LOCALE = "IT";
    }
    else if(language == "de-") {
        Setting.LOCALE = "DE";
    }
    else if(language == "es-") {
        Setting.LOCALE = "ES";
    }
    else if(language == "pt-") {
        if(lcaleLanguage == "pt-PT" ||
           lcaleLanguage == "pt-AN")
        {
            Setting.LOCALE = "EN";  
        }
        else
        {
            Setting.LOCALE = "PT";            
        }
    }
    else if(language == "nl-") {
        Setting.LOCALE = "NL";
    }
    else
    {
        Setting.LOCALE = "EN";
    }
};

//============================================================
//array find function
exports.ArrayFindString = function(arr, string) {  
	var str = arr.join("");  
	return str.indexOf(string);  
};

//============================================================
function decrypt(val) {
    try {
        var key = "S.3.c.R.e.t.K.3.";
        var iv = new Buffer('0000000000000000');

        var c = crypty.createDecipheriv('aes-128-cbc', key, iv);
        c.setAutoPadding(true);
        var p =  c.update(val, 'base64', 'ascii') + c.final('ascii');
        return p;
    } catch(err) {
        Log.error("Fail to decrypt password.");
    }
}