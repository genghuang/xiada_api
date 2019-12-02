var express = require('express');
var app = express();
var mysql = require('mysql');
var db = require('../config/db');

app.getOverviewInfo = function(VoyageName, callback) {
	var c = mysql.createConnection(db);
	var sql = "select * from XM_Overview_INFO where VoyageName = '"+VoyageName+"';";
	c.connect();
	c.query(sql, function(error, result) {
		if (error) {console.log(error)};
		if (result != "") {
			var code = 0;
			var message = "success";
			callback(code, message, result);
		}else {
			var code = -1;
			var message = "fail"
			callback(code, message, result);
		}
	});
	c.end();
}

module.exports = app;