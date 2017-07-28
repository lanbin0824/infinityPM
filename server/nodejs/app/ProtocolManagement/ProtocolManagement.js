/**
 * Copyright:Copyright(c) 2013 TOSHIBA MEDICAL SYSTEMS CORPORATION All Rights Reserved
 * Company:TOSHIBA MEDICAL SYSTEMS CORPORATION
 *
 * This file is used to start "Total Protocol Management" website.
 */
process.env.NODE_TLS_REJECT_UNAUTHORIZED="0";
var filePath = process.argv[1] == 'ProtocolManagement.js' ? process.cwd() : process.argv[1]
var location = filePath.indexOf('nodejs');
var dir = filePath.substring(0, location);
console.log("Working Directoring: " + dir);
process.chdir(dir);

var app = require('./../../node_modules/express')();
var bodyParser = require('./../../node_modules/body-Parser');
var querystring = require('querystring');
var http = require('http');
var Setting = require('./Setting.js');
var Utility = require('./Utility.js');

var listen = function () {
    var port = Setting.PORT;
    var Log = require('./Logger').getLogger();
    app.use(function (req, res, next) {
        for (var i in req.headers) {
            req.headers[i] = querystring.unescape(req.headers[i]);
            req.headers[i] = req.headers[i].replace(/\+/g, "");
        }
        req.url = req.url.replace(/\/api\//,"/");
        //req.url = req.url.replace(/api/,"/");
        next();
    });
    app.use(bodyParser());
    //Dispatch HTTP request
    require('./Router.js')(app);
    var server = http.createServer(app);
    server.on('listening', function () {
        Log.info("Protocol Management running at => http://localhost:" + port + "/index/ProtocolManagement.html");
        console.log("APP_FEEDBACK vsp.ctrl.ping " + "http://localhost:" + port + "/index/ping");
        console.log("APP_FEEDBACK vsp.ctrl.kill " + "http://localhost:" + port + "/index/kill");
        console.log("APP_FEEDBACK vsp.ctrl.proxy " + "http://localhost:" + port);
        console.log("APP_FEEDBACK vsp.ctrl.state IDLE");
    });
    server.on('request', function (request, response) {
        var url = String(request.url);
        if (url.indexOf('/index/ping') === -1&&url.indexOf('/index/getupdatealert.action') === -1) {
            if (url.indexOf('/index/ClientIsAlive') === -1) {
                Log.info('ResponseCode:' + response.statusCode + ' => '+ request.ip + ' [' + request.method + '] ' + request.url);
            }
            Utility.ResetTime();
        }
    });
    server.listen(port);
};

if (Setting.AUTHENTICATE == 'digest') {
    Utility.Initialize(listen);
} else {
    var jsonString = '';
    process.stdin.setEncoding('utf8');
    process.stdin.on('readable', function(){
        var chunk = process.stdin.read();
        if( chunk !== null ){
            jsonString += chunk;
        }
    });

    process.stdin.on('end', function () {
        //var fs = require("fs");
        //fs.writeFile('C:/PM.txt', jsonString, 'ascii', function(err){if (err) throw err;});
        var launchContext = JSON.parse(jsonString);
        Utility.Initialize(listen, launchContext);
    });
}

//------------------------------------------------------------
var tryTimes = 0;
process.on('uncaughtException', function(err) {
    var Log = require('./Logger').getLogger();
    Log.error('Uncaught exception: ' + err.stack);
    if(tryTimes<3){
        tryTimes++;
        if(err.errno === 'EADDRINUSE'){
            Log.error(Setting.PORT + " in use, try another port...");
            Utility.SetFreePort();
            listen();
        }
    } else {
        Utility.Exit();
    }
});
