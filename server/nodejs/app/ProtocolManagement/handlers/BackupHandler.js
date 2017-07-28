/**
 * Copyright:Copyright(c) 2016 TOSHIBA MEDICAL SYSTEMS CORPORATION All Rights Reserved
 * Company:TOSHIBA MEDICAL SYSTEMS CORPORATION
 *
 * This file is used to handle backup protocol data request.
 */

var url = require('url');
var querystring = require('querystring');
var https = require('https');
var http = require('http');
var fs = require('fs');
var Path = require('path');
var FS = require('fs-extra');
var Utility = require('../Utility.js');
var Setting = require('../Setting.js');
var Log = require('../Logger').getLogger();

/**
 * Get Backup Path for protocol data from Protocol Server
 * @param req
 * @param res
 */
var GetBackupPath = function (req, res) {
	Log.info("Response to getBackupPath.action");

	try {
		resultJson = Utility.PMNodeJSProxy.CallGetBackupPathAction(
			function (result) {
				res.writeHead(200, {
                    "Content-Type": "text/html;charset=UTF-8"
                });
                res.write(result);
                res.end();
			});
	} catch (err) {
		Log.error(err.stack);
	}
};
exports.GetBackupPath = GetBackupPath;

//============================================================

/**
 * Backup protocol data on Protocol Server to given path
 * @param req {path : '', clear_cache : ''}
 * @param res
 */
var BackupProtocolData = function (req, res){
	Log.info("Response to backupProtocolData.action");

	var params = req.query;
	try {
        var pathInner = convertPathToUnix(params.path);
        var clearCache = params.clearcache; 
		sendBackupRequest(pathInner, clearCache, true, function (err, result) {
			res.writeHead(200, {
				"Content-Type": "text/html;charset=UTF-8"
			});
			res.write(result);
            res.end();
		});
	} catch (err) {
		Log.error(err);
		res.writeHead(500, {
            "Content-Type" : "text/html;charset=UTF-8"
        });
        res.write(JSON.stringify(getErrorResponse('exception')));
        res.end();
	}
};
exports.BackupProtocolData = BackupProtocolData;

//============================================================

/**
 * Backup protocol data on Protocol Server to given path
 * @param req {path : '', clear_cache : ''}
 * @param res
 */
var BackupProtocolDataSelf = function (req, res){
	Log.info("Response to backupProtocolData.action");

	var resultJson = "";
	var params = req.query;
	try {
		var temp = {};
		var pathInner = convertPathToUnix(params.path);
		var clearCache = params.clearcache;
		temp.pathInner = pathInner;
		temp.clearCache = clearCache;
		var paramJsonStr = JSON.stringify(temp);
		resultJson = Utility.PMNodeJSProxy.CallBackupProtocolDataAction(
			paramJsonStr,
			function(resultJson) {
				res.writeHead(200, {"Content-Type": "text/html;charset=UTF-8"});
				res.write(resultJson);
				res.end();
			});
	} catch (err) {
		Log.error(err.stack);
	}
};
exports.BackupProtocolDataSelf = BackupProtocolDataSelf;

//============================================================
 
/**
 * Query for backup progress
 * @param req {path : '', clear_cache : ''}
 * @param res
 */
var QueryBackupProgress = function (req, res){
	Log.info("Response to queryBackupProgress.action");

    var params = req.query;
    try {
        var pathInner = convertPathToUnix(params.path);
        var clearCache = params.clearcache;
        sendBackupRequest(pathInner, clearCache, false, function (err, result) {
            res.writeHead(200, {
                "Content-Type": "text/html;charset=UTF-8"
            });
            res.write(result);
            res.end();
        });
    } catch (err) {
        Log.error(err);
        res.writeHead(500, {
            "Content-Type" : "text/html;charset=UTF-8"
        });
        res.write(JSON.stringify(getErrorResponse('exception')));
        res.end();
    }
};
exports.QueryBackupProgress = QueryBackupProgress;

//============================================================

/**
 * Query for backup progress
 * @param req {path : '', clear_cache : ''}
 * @param res
 */
var QueryBackupProgressSelf = function (req, res){
	Log.info("Response to queryBackupProgress.action");

	var resultJson = "";
	var params = req.query;
	try {
		var temp = {};
		var pathInner = convertPathToUnix(params.path);
		var clearCache = params.clearcache;
		temp.pathInner = pathInner;
		temp.clearCache = clearCache;
		var paramJsonStr = JSON.stringify(temp);
		resultJson = Utility.PMNodeJSProxy.CallQueryBackupProgressAction(
			paramJsonStr,
			function(resultJson) {
				res.writeHead(200, {"Content-Type": "text/html;charset=UTF-8"});
				res.write(resultJson);
				res.end();
			});
	} catch (err) {
		Log.error(err.stack);
	}
};
exports.QueryBackupProgressSelf = QueryBackupProgressSelf;

//============================================================
 
/**
 * Get root url of Protocol Gateway
 * Send http request to backup protocol
 * @returns {String} pg url
 */
// var getPGRootUrl = function () {
// 	var ssl = PGSetting.PGConfig.SSL;
// 	var urlObj = {
// 	    protocol : ssl ? 'https' : 'http',
// 	    hostname : 'localhost',
// 	    port : PGSetting.PGConfig.port,
// 	    pathname : PGSetting.PGConfig.appName
// 	};
// 	return url.format(urlObj);
// };

//============================================================

/**
 * Send http request to backup protocol
 * @param {String} backupPath
 * @param {String} clearCache
 * @param {Boolean} newBackup if true, it will create a new path if given path exists
 * @param {Function} callback({Error}err, {String}result)
 */
var sendBackupRequest = function (backupPath, clearCache, newBackup, callback) {
    clearCache = clearCache ? clearCache : 'true';
	if (!backupPath || (clearCache.toLowerCase() != 'true' && clearCache.toLowerCase() != 'false')) {
		Log.error('Invalid query condition!');
		var error = new Error('Invalid query condition!');
		callback(error, JSON.stringify(getErrorResponse('invalid-condition')));
		return; 
	}

    // Check whether backup folder exsits, if not, create the folder.
    var pathInner = getAbsolutePath(backupPath);

    // If path exists, create a new path with suffix
    if(newBackup){
        pathInner = createNewPath(pathInner);
        if(!pathInner){
            Log.error('Create new backup path failed!');
            callback(new Error('Create new backup path failed!'), JSON.stringify(getErrorResponse('server-error')));
            return;
        }
    }
    
	var urlOptions = getPGOption();
	if(!urlOptions){
	    Log.error('Get Protocol Gateway url options failed!');
	    callback(new Error('Get Protocol Gateway url options failed!'), JSON.stringify(getErrorResponse('server-error')));
	    return;
	}
	
	// Get backup request url
	if(urlOptions.path.lastIndexOf('/') == 0){
		urlOptions.path += '/';
	}
	urlOptions.path = urlOptions.path + 'protocol/copy?Path=' + encodeURIComponent(pathInner) + '&ClearCache=' + clearCache;

    // Send request to Protocol Gateway
	var client = getPGClient(urlOptions);
	try {
		client.get(function (err, result) {
		    var jsonRes = getErrorResponse('server-error');
			if (!!err) {
				Log.error('Failed to backup Protocol Pool! ' + err);
				callback(err, JSON.stringify(jsonRes));
				return;
			}

			if (result.statusCode === 200 || result.statusCode === 202) {
				jsonRes = {
					total : parseInt(result.headers.totalprotocol, 10),
					done: parseInt(result.headers.backupprotocol, 10),
					path: pathInner
				};
				result.body = JSON.stringify(jsonRes);
			} else if (result.statusCode === 204) {
				jsonRes = {
					total : 0,
					done: 0,
					path: pathInner
				};
				result.body = JSON.stringify(jsonRes);
			} else {
			}

			callback(err, JSON.stringify(jsonRes));
		});
	} catch (err) {
		Log.error(err.stack);
		callback(err, JSON.stringify(getErrorResponse('exception')));
	}
};

//============================================================

/**
 * Get Protocol Gateway setting options.
 * @returns urlOptions
 *  urlOptions = {
 *    host : 'localhost',
 *    port : PGSetting.PGConfig.port,
 *    path : '',
 *    ssl : true/false,
 *    key : ,
 *    cert : 
 * }
 */
var getPGOption = function () {
    try {
    	if (!Setting.PG_ROOT || typeof(Setting.PG_ROOT) !== 'string') {
    		return null;
    	}
    	// Parse Protocol Gateway url
    	var urlParam = url.parse(Setting.PG_ROOT);

        // var ssl = PGSetting.PGConfig.SSL;
        // var urlOptions = {
        //     host : 'localhost',
        //     port : PGSetting.PGConfig.port,
        //     path : PGSetting.PGConfig.root,
        //     ssl : ssl
        // };

        var ssl = urlParam.protocol === 'https:';
        var urlOptions = {
            host : urlParam.hostname,
            port : urlParam.port,
            path : urlParam.path,
            ssl : ssl
        };
        if (ssl) {//TODO
            urlOptions.key = fs.readFileSync(Path.join(__dirname + '/../cert/vitality-key.pem'), 'utf-8');
            urlOptions.cert = fs.readFileSync(Path.join(__dirname + '/../cert/vitality-cert.pem'), 'utf-8');
        }
        return urlOptions;
    } catch (e) {
        Log.error(e.stack);
        return null;
    }
};

//============================================================

/**
 * Get Protocol Gateway client. The client contains function of sending http/https GET request.
 * @param {Object} urlOptions
 *  urlOptions = {
 *    host : 'localhost',
 *    port : PGSetting.PGConfig.port,
 *    path : '',
 *    ssl : true/false,
 *    key : ,
 *    cert : 
 * }
 * @returns a http/https client
 */
var getPGClient = function (urlOptions) {
	if (!urlOptions) return undefined;

	var responseBody = '';
	var client = {};
	var options = {
		host: urlOptions.host,
		port: urlOptions.port,
		path: urlOptions.path,
		key: urlOptions.key,
		cert: urlOptions.cert
	};

	if (urlOptions.ssl) {
		client.get = function (callback){
			var req = https.request(options, function (res) {
				res.on('data', function (chunk) {
					responseBody += chunk;
				});

				res.on('end', function () {
					var result = {
                        statusCode: res.statusCode, 
                        headers: res.headers,
                        body: responseBody
                    };
					callback(null, result);
				});
			});

			req.on('error', function (e) {
				callback(e, null);
			});

			req.end();
		};
	} else {
		client.get = function (callback) {
			var req = http.request(options, function (res) {
				res.on('data', function (chunk) {
					responseBody += chunk;
				});

				res.on('end', function () {
					var result = {
						statusCode : res.statusCode,
						headers : res.headers,
						body : responseBody
					};
					callback(null, result);
				});
			});

			req.on('error', function (e) {
				callback(e, null);
			});

			req.end();
		};
	}

	return client;
};

//============================================================

/**
 * If given directory exists, return a new path with suffix. </br>
 * e.g. If D:\dir exists, return a new path D:\dir (1)
 * @param {String} path
 * @returns {String} new path
 */
var createNewPath = function(path) {
    if (!path) {
        return path;
    }
    
    var parentPath =  getParent(path);
    if (!parentPath || !fs.existsSync(path)) {
        return path;
    }
    
    var newPath = '';
    var dirName = Path.basename(path);
    var dirCount = 1;
    while (dirCount > 0) {
        var newDirName = dirName + ' (' + dirCount + ')';
        newPath = Path.join(parentPath, newDirName);
        if(fs.existsSync(newPath)){
            dirCount++;
        } else {
            dirCount = 0;
        }
    }
   return newPath;
};

//============================================================

/**
 * Get error response json
 * @return error response object 
 * {error : err_msg}
 */
var getErrorResponse = function (error){
	var err = {
		error : error
	};

	return err;
};

//============================================================

/**
 * convert path to match unix
 * @param {String} path
 * @return {String} a new path unix like format
 */
var convertPathToUnix = function (path){
    if(!path){
        return path;
    }
    var newPath = new String(path);
    return newPath.replace(/\\/g, '/');
};

//============================================================

/**
 * Get absolute path.
 * @param {String} path
 * @return {String} absolute path
 */
var getAbsolutePath = function(aPath) {
    return Path.resolve(aPath);
};

//============================================================

/**
 * Get parent path.
 * @param {String} path
 * @return {String} parent path
 */
var getParent = function(path) {
    var absPath = getAbsolutePath(path);
    var parPath = Path.dirname(absPath);
    if (absPath === parPath) {
        parPath = null;
    }
    return parPath;
};