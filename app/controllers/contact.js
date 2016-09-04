var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'arabesque.contact@gmail.com',
    pass: 'arabesque123'
  },
  logger: false, // log to console
  debug: false // include SMTP traffic in the logs
},
{
  from: 'Arabesque Contact <arabesque.contact@gmail.com>',
});



module.exports.sendEmail = function(req, res){

  var userFirstName = req.body.firstName;
  var userLastName = req.body.lastName;
  var userEmail = req.body.email;
  var subject = req.body.subject;
  var body = req.body.body;

  var prebody = "SENT BY: " + userFirstName + " " + userLastName + "\n" + "EMAIL: " + userEmail + "\n" + "\n"+ "\n";
  
  var message = {

    to: [' "Youssef Swailem" <Youssefswailem@gmail.com>' , ' "Mohamed Shokr" <mohamedshokrr@gmail.com>'],
    subject: subject,
    text: prebody + body

  };

  transporter.sendMail(message, function (error, info) {
    if (error) {
      console.log('Error occurred');
      console.log(error.message);
      return;
    }
    console.log('Message sent successfully!');
  });

}
