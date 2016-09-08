var mongoose = require('mongoose');
var User = mongoose.model('User');
var Inspire = mongoose.model('Inspire');
var League = mongoose.model('League');
var Orchestra = mongoose.model('Orchestra');

module.exports.usersList = function(req, res){
    var memberLevel = req.body.level;
    User.find({ level: { $lt: memberLevel }}, function(err, results){
        if(err){
            console.log(err);
            res.status(500).json(err);
        }
        if (results) {
            console.log("-> Request for users list is granted");
            res.send(results);
        }
    });
}

module.exports.downloadUsersList = function(req, res){
  console.log("attempt to download a file");
  // User.findAndStreamCsv({}).pipe(fs.createWriteStream('./arabesque-users.csv'));
}
