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
	},
	queryWithParams: function(connection, query, params, callback) {
		connection.query(query, params, function(dbError, dbRows, dbFields) {
			callback(dbError, dbRows, dbFields);
		});
	}
};

module.exports = helpers;