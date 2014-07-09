var express = require('express');
var router = express.Router();

var helpers = require('../helpers/main');


/* GET users listing. */
router.get('/', function(req, res) {
  // res.send('respond with a resource');

  	//STEPS
  	//1)	Get the specific user (id = 1)
	//2)	Get all the tasks associated with that user
	//			A) Query joining user tasks and task
	//3)	Add all user tasks to user object's task array
	
  	var query = 'select u._id as userId, u.name as userName, u.email as userEmail, u.active as userStatus, t._id as taskId, t.task as task from users as u, tasks as t, usertasks as ut where u._id = ? and u._id = ut.userId and t._id = ut.taskId';	//var query = 'insert into users values ("' + id + '", "' + name + '", "' + email + '")';
  	var queryParameters = ['1'];

	var dbConn = helpers.createConnection(helpers.connectionOptions);
	helpers.startConnection(dbConn);
	helpers.queryWithParams(dbConn, query, queryParameters, function(dbError, dbRows, dbFields) {
		var user = {
			_id:	dbRows[0].userId,
			name:	dbRows[0].userName,
			email:	dbRows[0].email,
			status:	dbRows[0].active,
			taskList: []
		};
		dbRows.forEach(function(rowValue, rowIndex) {
			user.taskList.push({
				_id:	rowValue.taskId,
				task:	rowValue.task
			});
		});

		res.json({
			error:		null,
			payload:	user
		});
		// res.json({
		// 	error:	dbError,
		// 	rows:	dbRows,
		// 	fields:	dbFields
		// });
	});



 //  	//STEPS
 //  	//1)	Get the specific user (id = 1)
	// //2)	Get all the tasks associated with that user
	// //			A) Query joining user tasks and task
	// //3)	Add all user tasks to user object's task array
	
 //  	var query = 'select * from users where _id = ?';	//var query = 'insert into users values ("' + id + '", "' + name + '", "' + email + '")';
 //  	var queryParameters = ['1'];

	// var dbConn = helpers.createConnection(helpers.connectionOptions);
	// helpers.startConnection(dbConn);
	// helpers.queryWithParams(dbConn, query, queryParameters, function(dbError, dbRows, dbFields) {
	// 	helpers.endConnection(dbConn);
	// 	var query2 = 'select t._id, t.task from usertasks as ut, tasks as t where ut.userId = ? and ut.taskId = t._id';	//var query = 'insert into users values ("' + id + '", "' + name + '", "' + email + '")';
	// 	var query2Parameters = ['1'];

	// 	var dbConn2 = helpers.createConnection(helpers.connectionOptions);
	// 	helpers.startConnection(dbConn2);
	// 	helpers.queryWithParams(dbConn2, query2, query2Parameters, function(dbError2, dbRows2, dbFields2) {
	// 		helpers.endConnection(dbConn2);
	// 		var user = dbRows[0];
	// 		user.tasks = dbRows2;
	// 		res.json({
	// 			error:	null,
	// 			result:	user
	// 		})
	// 	});
	// });
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
