var express = require('express');
var router = express.Router();
var http = require('http');
var url = require('url');
var util = require('util');
var index = require('../model/index');

/* GET home page. */
router.route('/getHomePageInfo')
	.get(function(req, res) {
		var voyageNumber = req.query.voyageNumber;
		var callback = function(code, message, result) {
			res.json({code: code, message: message, result: result});
		}
		index.getHomePageInfo(voyageNumber, callback);
	})

module.exports = router;
