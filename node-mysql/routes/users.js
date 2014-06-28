var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});

router.get('/create/:name/:email', function(req, res) {
	var mysql      = require('mysql');
	var connection = mysql.createConnection({
	  host		:	'localhost',
	  user		:	'root',
	  password	:	'sd',
	  database	:	'usersone'
	});

	connection.connect();


	id = new Date().getTime();
	name = req.params['name'];
	email = req.params['email'];

	var query = 'insert into users values ("' + id + '", "' + name + '", "' + email + '")'
	console.log('query: ', query);

	connection.query(query, function(err, result) {
	  if (err) throw err;

	  res.send(result);
	});

	connection.end();
});

module.exports = router;
