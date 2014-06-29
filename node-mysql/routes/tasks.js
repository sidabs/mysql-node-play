var express = require('express');
var router = express.Router();

var helpers = require('../helpers/main');


/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});

router.get('/create/:task', function(req, res) {
	var id = new Date().getTime();
	var task = escape(req.params['task']);

	var query = 'call createNewTask("' + id + '", "' + task + '")';
	console.log('query: ', query);

	var dbConn = helpers.createConnection(helpers.connectionOptions);
	helpers.startConnection(dbConn);
	helpers.query(dbConn, query, function(dbError, dbRows, dbFields) {
		res.json({
			error:	dbError,
			rows:	dbRows,
			fields:	dbFields
		});
	});
	helpers.endConnection(dbConn);
});

router.get('/get/:id?', function(req, res) {
	var id = req.params['id'];
	if(id) {
		var query = 'call getTaskById("' + id + '")';
	} else {
		var query = 'call getTasks()';
	}
	console.log('query: ', query);

	var dbConn = helpers.createConnection(helpers.connectionOptions);
	helpers.startConnection(dbConn);
	helpers.query(dbConn, query, function(dbError, dbRows, dbFields) {
		res.json({
			error:	dbError,
			rows:	dbRows,
			fields:	dbFields
		});
	});
	helpers.endConnection(dbConn);
});

router.get('/update/:id/:task', function(req,res) {
	var id = req.params['id'];
	var updatedTask = escape(req.params['task']);

	var query = 'call updateTaskById("' + id + '", "' + updatedTask + '")';
	console.log(query);

	var dbConn = helpers.createConnection(helpers.connectionOptions);
	helpers.startConnection(dbConn);
	helpers.query(dbConn, query, function(dbError, dbRows, dbFields) {
		res.json({
			error:	dbError,
			rows:	dbRows,
			fields:	dbFields
		});
	});
	helpers.endConnection(dbConn);
});

router.get('/delete/:id', function(req,res) {
	var id = req.params['id'];

	var query = 'call deleteTaskById("' + id + '")';
	console.log(query);

	var dbConn = helpers.createConnection(helpers.connectionOptions);
	helpers.startConnection(dbConn);
	helpers.query(dbConn, query, function(dbError, dbRows, dbFields) {
		res.json({
			error:	dbError,
			rows:	dbRows,
			fields:	dbFields
		});
	});
	helpers.endConnection(dbConn);
});


module.exports = router;
