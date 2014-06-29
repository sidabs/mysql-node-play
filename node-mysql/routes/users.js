var express = require('express');
var router = express.Router();

var mysql = require('mysql');
var helpers = {
	connectionOptions: {
		host		:	'localhost',
		user		:	'root',
		password	:	'sd',
		database	:	'usersone'
	},
	createConnection: function(options) {
		var connection = mysql.createConnection(options);
		return connection;
	},
	startConnection: function(connection) {
		connection.connect();
	},
	endConnection: function(connection) {
		connection.end();
	},
	query: function(connection, query, callback) {
		connection.query(query, function(dbError, dbRows, dbFields) {
			callback(dbError, dbRows, dbFields);
		});
	}
}


/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});

router.get('/create/:name/:email', function(req, res) {
	var id = new Date().getTime();
	var name = req.params['name'];
	var email = req.params['email'];

	var query = 'insert into users values ("' + id + '", "' + name + '", "' + email + '")';
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
	if(req.params['id']) {
		//retrieve the user with the passed id
		var query = 'select * from users where _id = "' + req.params['id'] + '"';
	} else {
		//rertrieve all users
		var query = 'select * from users';
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

router.get('update/:id/:name/:email', function(req,res) {});

module.exports = router;
