var express = require('express');
var indexRouter = require('./routes/index1');
var app = express();

//Allow cross-origin Resource Sharing
app.use(function(req,res,next){
  res.header("Access-Control-Allow-Origin","*");
  res.header("Access-Control-Allow-Headers","Origin,X-Requested-With,Content-Type,Accept");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  next();
});

app.use('/', indexRouter);
app.listen(3000,function(){console.log("Server Started")});
