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
	var name = escape(req.params['name']);
	var email = escape(req.params['email']);

	var query = 'call createNewUser("' + id + '", "' + name + '", "' + email + '")';	//var query = 'insert into users values ("' + id + '", "' + name + '", "' + email + '")';
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
		//retrieve the user with the passed id
		var query = 'call getUserById("' + id + '")';	// var query = 'select * from users where _id = "' + req.params['id'] + '"';
	} else {
		//rertrieve all users
		var query = 'call getUsers()';	//var query = 'select * from users';
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

router.get('/update/:id/:name/:email', function(req,res) {
	var id = req.params['id'];
	var updatedName = escape(req.params['name']);
	var updatedEmail = escape(req.params['email']);

	// var query = 'update users ';
	// if(req.params['name']) {
	// 	query += 'set name="' + req.params['name'] + '", ';
	// }
	// if(req.params['email']) {
	// 	query += 'set email="' + req.params['email'] + '", ';
	// }

	// if(query.charAt(query.length-2) == ',') {
	// 	query = query.substring(0, query.length-2);
	// }
	// query += ' where _id="' + req.params['id'] + '"';

	var query = 'call updateUserById("' + id + '", "' + updatedName + '", "' + updatedEmail + '")';	//var query = 'update users set name = "' + updatedName + '", email = "' + updatedEmail + '" where _id = "' + id + '"';
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

	var query = 'call deleteUserById("' + id + '")';	//var query = 'delete from users where _id = "' + id + '"';
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
