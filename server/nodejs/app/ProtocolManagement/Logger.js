/**
 * Copyright:Copyright(c) 2013 TOSHIBA MEDICAL SYSTEMS CORPORATION All Rights Reserved
 * Company:TOSHIBA MEDICAL SYSTEMS CORPORATION
 */
"use strict";
//============================================================
var Setting = require('./Setting.js');
var Path 	= require('path');
var Log4js = require('log4js');
var fs = require('fs');
var logger = {
	logger: null,
	
	getLogger: function (/*String*/ categoryName) {
		return this.logger;
	},

	//------------------------------------------------------------
	initLogConfig: function(/*String*/ logHome, /*String*/ logLevel) {
	    if(!fs.existsSync(logHome)){
	        fs.mkdirSync(logHome);
	    }

	    var reg = /[\\\/\:\*\?"<>\|]+/; // Remove invalid characters as a file name
	    var username = Setting.USER.substr(Setting.USER.indexOf('\\') + 1); // remove Computer Name of user if any
		var logPath = Path.join(logHome,Setting.APPNAME+"Node_"+username.replace(reg, ''));
		var logLevel = logLevel;
		var configure = {
			appenders: [{
				level: logLevel,
				category: "ProtocolManagement", 
				type: "dateFile", 
				filename: logPath,
				pattern: "_yyyyMMdd.log",
				alwaysIncludePattern: true, 
				layout: {
					type: 'pattern',
					pattern: "[%d] [%5.5p] %c - %m"
				}
			}, {
				type: "console",
				layout: {
					type: 'pattern',
					pattern: "[%d] [%[%5.5p%]] %c - %m"
				}
			}],
			replaceConsole: false // replace console.log file
		};
		Log4js.clearAppenders();
		Log4js.configure(configure);
		this.logger = Log4js.getLogger('ProtocolManagement')
		this.logger.debug('Logger file: ' + logPath +' | logger level: ' + logLevel);
	}
};
module.exports = logger;