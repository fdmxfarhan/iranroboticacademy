var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const flash = require('connect-flash');
const session = require('express-session');
//const LocalStrategy = require('passport-local').Strategy;
//const mongoose = require('mongoose');
//const bcrypt = require('bcryptjs');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var about = require('./routes/about');
var classes = require('./routes/classes');
var tutorials = require('./routes/tutorials');
var gallery = require('./routes/gallery');
var contact = require('./routes/contact');
var competitions = require('./routes/competitions');
var english = require('./routes/en');
var teachers = require('./routes/teachers');
var juniorcup2020 = require('./routes/juniorcup2020');
var booklets = require('./routes/booklets');
var education = require('./routes/education');


const passport = require('passport'); 
var fileUpload = require('express-fileupload');

var bodyparser = require('body-parser');
var mongoose = require('mongoose');

var app = express();
//const port = 3000
//app.listen(port,()=> console.log("listenning on port 3000..."));

var urlencodedparser = bodyparser.urlencoded({ extended: false});

// passport config
require('./config/passports')(passport);


///connect to Database

const uri = 'mongodb+srv://fdmxfarhan:22402240@iranroboticacademy-bdziw.mongodb.net/test';
//const uri = 'mongodb://fdmxfarhan:22402240@iranroboticacademy-shard-00-00-bdziw.mongodb.net:27017,iranroboticacademy-shard-00-01-bdziw.mongodb.net:27017,iranroboticacademy-shard-00-02-bdziw.mongodb.net:27017/test';

mongoose.connect(uri,{ useNewUrlParser: true , useUnifiedTopology: true});
mongoose.connection.once('open', function(){
  console.log('DataBase is connected.   ');
  

}).on('error', function(error){
  console.log('Connection error:', error);
});

// express session middleware
const{
  SESS_NAME = 'sid',
  SESS_TIME = 1000 * 60 * 60 * 2 
} = process.env

app.use(session({
  name: SESS_NAME,
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: SESS_TIME ,
    sameSite: true,
    secure: false
  }
}));
// passport middleware
app.use(passport.initialize());
app.use(passport.session());

// connect flash
app.use(flash());

//Global vars
app.use(function(req, res, next){
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// upload 
app.use(fileUpload());


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/about', about);
app.use('/classes', classes);
app.use('/tutorials', tutorials);
app.use('/gallery', gallery);
app.use('/contact', contact);
app.use('/competitions', competitions);
app.use('/en', english);
app.use('/teachers', teachers);
app.use('/juniorcup2020', juniorcup2020);
app.use('/booklets', booklets);
app.use('/education', education);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  if(!req.user) res.render('error',{
    uname: false
  });
  else res.render('error', {
    uname: req.user.uname
  });
});



module.exports = app;
