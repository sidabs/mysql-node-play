var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});

router.get('/create', function(req, res) {
	var mysql      = require('mysql');
	var connection = mysql.createConnection({
	  host		:	'localhost',
	  user		:	'root',
	  password	:	'sd',
	  database	:	'usersone'
	});

	connection.connect();

	connection.query('insert into users values ("abc", "sid", "sd@test.com")', function(err, result) {
	  if (err) throw err;

	  res.send(result);
	});

	connection.end();
});

module.exports = router;
