/**
 * Copyright:Copyright(c) 2013 TOSHIBA MEDICAL SYSTEMS CORPORATION All Rights Reserved
 * Company:TOSHIBA MEDICAL SYSTEMS CORPORATION
 *
 * This file is used to handle all HTTP request.
 */

var url = require("url");
var path = require("path");
var fs = require("fs");
var Log = require('../Logger').getLogger();
//============================================================
//It is used handle general HTTP URL request. (.html, .js, .css, .jpg and others)
var GeneralHandler = function(req, res){
	var uri = url.parse(req.url).pathname;
  var filename = path.join(process.cwd(), uri);
  //var filename = path.join(path.resolve(process.cwd(), '../dist'), uri);

	Log.info("Request: " + uri);

	var contentTypesByExtension = {
	  '.html': "text/html",
	  '.htm': "text/html",
	  '.css':  "text/css",
	  '.js':   "text/javascript",
      '.pdf':   "application/pdf"
	};

	//path.exists(filename, function(exists) {
	fs.exists(filename, function(exists) {
		if(!exists) {
			res.writeHead(404, {"Content-Type": "text/plain"});
			res.write("404 Not Found\n");
			res.end();
			return;
		}

		if (fs.statSync(filename).isDirectory()) {
      filename += '/index.html'
    }
		fs.readFile(filename, "binary", function(err, file) {
			if(err) {
			res.writeHead(500, {"Content-Type": "text/plain"});
			res.write(err + "\n");
			res.end();
			return;
			}

			var headers = {};
			var contentType = contentTypesByExtension[path.extname(filename)];
			if (contentType) headers["Content-Type"] = contentType;
			res.writeHead(200, headers);
			res.write(file, "binary");
			res.end();
		});
	});
};
exports.GeneralHandler = GeneralHandler;
