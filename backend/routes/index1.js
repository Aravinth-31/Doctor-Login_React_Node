var path = require('path');

const db=require('../config/database');
const Doctors=require('../models/doctors');

const multer = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now()+'-'+file.originalname)
  }
})
var upload = multer({ storage:storage });

var nodemailer = require('nodemailer');
var transporter;
var session = require('express-session');
var bodyParser = require('body-parser');

var express = require('express');
var app = express();
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
mailer={
  user:'',
  pass:''
}
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

app.get('/',function(req,res){
  res.send('Server Started')
});

app.post('/login',function(req,res,next){
  var username = req.body.username;
  var password = req.body.password;
  console.log(username);
  if (username && password) {
    Doctors.findAll({where:{username:username,password:password}})
    .then((results)=> {
      console.log(results);
      if (results.length > 0) {
        mailer.user=username;
        mailer.pass=password;
        console.log(mailer);
        res.status(200).send({
          message:'Success'
        });
      } else {
        res.status(200).send({
          message:"Invalid Email and/or Password"
        });
      }
    });
  }
  else 
    res.status(200).send({
      message:"Enter Email and Passoword"
    });
});
app.post('/signup',function(request,response,next){
  var username = request.body.username;
  var password = request.body.password;
  if(username && password){
    Doctors.findAll({where:{username:username,password:password}})
    .then((results)=> {
      console.log(results);
      if (results.length > 0) {
        response.status(200).send({
          message:"Email Already Used"
        });
      } else {
        Doctors.create({username:username,password:password})
        response.status(200).send({
          message:"Success"
        });
      }
      response.end();
    });
  }
  else
    response.status(200).send({
      message:"Please Enter Email And Password"
    });
})

app.post('/sendmail', upload.single('to_file'),(req, res, next) => {
  file=req.file;
  var to_user=req.body.to_user;
  var to_subject=req.body.to_subject;
  if (!file) {
    res.status(200).send({
      message:'Please Select a File'
    }); 
  }
  else{
    transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: mailer.user,
        pass: mailer.pass
      }
    });
    console.log("This is "+to_user);
    console.log("this is "+to_subject);
    var to_path='uploads/'+file.filename;
    var mailOptions = {
      from: transporter.options.auth.user,
      to: to_user,
      subject: 'The Prescription',
      text: to_subject,
      attachments:[{
        path:to_path
      }]
    };
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
          res.status(200).send({
            message:'Email and Password Not Accepted'
          });
        } else {
          console.log('Email sent: ' + info.response);
          res.status(200).send({
            message:'Success'
          });
        }
    });
  }
})

module.exports = app;