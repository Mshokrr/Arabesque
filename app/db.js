var mongoose = require('mongoose');
var DB = null;
var dbUrl = 'mongodb://localhost:27017/Arabesque';

exports.connect = function(cb){
	return mongoose.connect(dbUrl, function(err,db){
		if(err) return cb(err);
		console.log("Connected to the database..");
		DB = db;
		cb(null, db);
	});
};

exports.db = function() {
	if(DB === null) throw Error('DB does not exist!');
	return DB;
}
