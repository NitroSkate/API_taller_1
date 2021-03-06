var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');

var logger = require('morgan');
var mongoose = require('mongoose');

var indexRouter = require('./routes/index');
//var usersRouter = require('./routes/users');
var coinRouter = require('./routes/coin');

// Conection 
// mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost/taller2',{ useNewUrlParser: true })
//   .then(() => console.log('Mogoose is Conected'))
//   .catch((err) => {
//     console.log(err);
//   });


const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://api:HayGOR3mU1Aqspd1@api-n6idk.mongodb.net/test?retryWrites=true";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
//app.use('/users', usersRouter);
app.use('/coin', coinRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  res.send('fuck you!')
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;