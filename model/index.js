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

var getVoyageINFO = function(VoyageName) {
	return new Promise(function (resolve, reject) {
		var c = mysql.createConnection(db);
		var sql = "select * from XM_VoyageNumber_INFO where VoyageName = '"+VoyageName+"';";
		c.connect();
		c.query(sql, function(error, result) {
			if (error) {
				reject(error);
			}else {
				resolve(result);
			}
		});
		c.end();
	})
}
var getSiteINFO = function(results) {
	return new Promise(function (resolve, reject) {
		var c = mysql.createConnection(db);
		var sql = "select SiteName, Longitude, Latidude from XM_Site_INFO where VoyageNumberID = '"+results[0].id+"';";
		c.connect();
		c.query(sql, function(error, result) {
			if (error) {
				reject(error);
			}else {
				var SiteINFO = result;
				resolve(SiteINFO);
			}
		});
		c.end();
	})
}
var getTaskINFO = function(results) {
	return new Promise(function (resolve, reject) {
		var c = mysql.createConnection(db);
		var sql = "select SUM(Data) as Series, Type as Legend, (select SUM(Data) from XM_Task_INFO where VoyageNumberID = '"+results[0].id+"') as totalSeries from XM_Task_INFO where VoyageNumberID = '"+results[0].id+"' GROUP BY Type";
		c.connect();
		c.query(sql, function(error, result) {
			if (error) {
				reject(error);
			}else {
				var TaskINFO = result;
				resolve(TaskINFO);
			}
		});
		c.end();
	})
}
var getSampleINFO = function(results) {
	return new Promise(function (resolve, reject) {
		var c = mysql.createConnection(db);
		var sql = "select SUM(Data) as Series,Type as Legend,(select SUM(Data) from XM_Sample_INFO where VoyageNumberID = '"+results[0].id+"') as totalSeries from XM_Sample_INFO where VoyageNumberID = '"+results[0].id+"' GROUP BY Type";
		c.connect();
		c.query(sql, function(error, result) {
			if (error) {
				reject(error);
			}else {
				var SampleINFO = result;
				resolve(SampleINFO);
			}
		});
		c.end();
	})
}

app.getVoyageInfo = function(VoyageName, callback) {
	getVoyageINFO(VoyageName).then(function(result) {
		getSiteINFO(result).then(function(SiteINFO) {
			result[0].totalSite = SiteINFO.length;
			result[0].SiteInfo = SiteINFO;
			getTaskINFO(result).then(function(TaskINFO) {
				result[0].Task = TaskINFO;
				getSampleINFO(result).then(function(SampleINFO) {
					result[0].Sample = SampleINFO;
					var code = 0;
					var message = "success";
					callback(code, message, result);
				})
			})
			
		})
	})
	// var c = mysql.createConnection(db);
	// var sql = "select * from XM_VoyageNumber_INFO where VoyageName = '"+VoyageName+"';";
	// c.connect()
	// c.query(sql, function(error, result) {
	// 	if (error) {console.log(error)};
	// 	if(result != '') {
	// 		var code = 0;
	// 		var message = "success";
	// 		callback(code, message, result);
	// 	}else {
	// 		var code = -1;
	// 		var message = "fail";
	// 		callback(code, message, result);
	// 	}
	// });
	// c.end();
}

module.exports = app;