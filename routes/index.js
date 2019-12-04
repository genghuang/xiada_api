var express = require('express');
var router = express.Router();
var http = require('http');
var url = require('url');
var util = require('util');
var index = require('../model/index');

/* GET OverviewInfo. */
router.route('/getOverviewInfo')
	.get(function(req, res) {
		var VoyageName = req.query.VoyageName;
		var callback = function(code, message, result) {
			res.json({code: code, message: message, result: result});
		}
		index.getOverviewInfo(VoyageName, callback);
	})

/* GET VoyageInfo. */
router.route('/getVoyageInfo')
	.get(function(req, res) {
		var VoyageName = req.query.VoyageName;
		var callback = function(code, message, result) {
			res.json({code: code, message: message, result: result})
		}
		index.getVoyageInfo(VoyageName, callback);
	})

/* GET SiteInfo. */
router.route('/getSiteInfo')
	.get(function(req, res) {
		var id = req.query.id;
		var callback = function(code, message, result) {
			res.json({code: code, message: message, result: result})
		}
		index.getSiteInfo(id, callback);
	})

/* GET TaskInfo. */
router.route('/getTaskInfo')
	.get(function(req, res) {
		var VoyageName = req.query.VoyageName;
		var callback = function(code, message, result) {
			res.json({code: code, message: message, result: result})
		}
		index.getTaskInfo(VoyageName, callback);
	})

/* GET Voyages. */
router.route('/getVoyages')
	.get(function(req, res) {
		var VoyageName = req.query.VoyageName;
		var callback = function(code, message, result) {
			res.json({code: code, message: message, result: result})
		}
		index.getVoyages(VoyageName, callback);
	})

module.exports = router;
