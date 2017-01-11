var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var cors = require('cors');

var passport = require('passport');
require('./config/passport');


require('dotenv').load();
app.use(cors());

app.use(express.static('public2'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

app.use(passport.initialize());

require('./routes')(app);

// 404 error catcher
app.use(function(req, res, next){
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// unauthorized error catcher
app.use(function(err, req, res, next){
	if(err.name === 'UnauthorizedError'){
		res.status(401);
		res.json({"Message": err.name + ": " + err.message});
	}
});

// production error handler
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;
