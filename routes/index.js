var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
const passport = require('passport');
var urlencodedparser = bodyparser.urlencoded({ extended: false});
const islogin = false;
const { ensureAuthenticated } = require('../config/auth');
var data = [];
var num = 0;
var User = require('../models/User');
var Class = require('../models/Class');
var Tutorial = require('../models/Tutorial');
var Juniorcup = require('../models/juniorcup');

var request = require('request');

var options = {
  method: 'POST',
  url: 'https://api.idpay.ir/v1.1/payment',
  headers: {
    'Content-Type': 'application/json',
    'X-API-KEY': '233d166c-7bf4-416f-8c16-228e7b1e9a1d',
  },
  body: {
    'order_id': '101',
    'amount': 10000,
    'name': 'قاسم رادمان',
    'phone': '09382198592',
    'mail': 'my@site.com',
    'desc': 'توضیحات پرداخت کننده',
    'callback': 'http://iranroboticacademy.com/pay',
    'reseller': null,
  },
  json: true,
};

var options2 = {
  method: 'POST',
  url: 'https://api.idpay.ir/v1.1/payment/verify',
  headers: {
    'Content-Type': 'application/json',
    'X-API-KEY': '6a7f99eb-7c20-4412-a972-6dfb7cd253a4',
    'X-SANDBOX': 1,
  },
  body: {
    'id': 'd2e353189823079e1e4181772cff5292',
    'order_id': '101',
  },
  json: true,
};

router.post('/pay', function(req,res, next){
  console.log(req.body);
  res.send("Done !!");
});

router.get('/pay', function(req, res, next){
  request(options, function (error, response, body) {
    if (error) console.log(error);
    console.log(body);
    res.redirect(body.link);
  });  
});


router.get('/', function(req, res, next) {
  if(!req.user) res.render('index', {
    uname: false
  });
  else res.render('index', {
    uname: req.user.uname
  });
});

router.get('/notfound', function(req, res, next) {
  if(!req.user) res.render('error', {
    uname: false
  });
  else res.render('error', {
    uname: req.user.uname
  });
});

router.get('/dashboard', ensureAuthenticated, function(req, res, next){
  ////// Classes var
  var robotic = false;
  var computer = false;
  var electronic = false;
  var roboticDay = 0;
  var computerDay = 0;
  var electronicDay = 0;
  var roboticHour = 0;
  var computerHour = 0;
  var electronicHour = 0;
  ////// Tutorials var
  var android = false;
  var androidDay = 0;
  var androidHour = 0;
  var arduino = false;
  var arduinoDay = 0;
  var arduinoHour = 0;
  var arm = false;
  var armDay = 0;
  var armHour = 0;
  var avr = false;
  var avrDay = 0;
  var avrHour = 0;
  var circuit = false;
  var circuitDay = 0;
  var circuitHour = 0;
  var cpp = false;
  var cppDay = 0;
  var cppHour = 0;
  var css = false;
  var cssDay = 0;
  var cssHour = 0;
  var html = false;
  var htmlDay = 0;
  var htmlHour = 0;
  var nodejs = false;
  var nodejsDay = 0;
  var nodejsHour = 0;
  var php = false;
  var phpDay = 0;
  var phpHour = 0;
  var python = false;
  var pythonDay = 0;
  var pythonHour = 0;

  if(!req.user) res.render('dashboard', {
    uname: false
  });
  else if(req.user.role === 'student'){
    Class.find({uname: req.user.uname}, function(err, docs){
      for(var i = 0; i < docs.length; i++){
        if(docs[i].cls == 'robotic') {
          robotic = true;
          roboticDay = docs[i].day;
          roboticHour = docs[i].hour;
        }
        if(docs[i].cls == 'computer') {
          computer = true;
          computerDay = docs[i].day;
          computerHour = docs[i].hour;
        }
        if(docs[i].cls == 'electronic') {
          electronic = true;
          electronicDay = docs[i].day;
          electronicHour = docs[i].hour;
        }
      }
      Tutorial.find({uname: req.user.uname}, function(err, docs){
        for(var i = 0; i < docs.length; i++){
          if(docs[i].cls == 'android') {
            android = true;
            androidDay = docs[i].day;
            androidHour = docs[i].hour;
          }
          if(docs[i].cls == 'arduino') {
            arduino = true;
            arduinoDay = docs[i].day;
            arduinoHour = docs[i].hour;
          }
          if(docs[i].cls == 'arm') {
            arm = true;
            armDay = docs[i].day;
            armHour = docs[i].hour;
          }
          if(docs[i].cls == 'avr') {
            avr = true;
            avrDay = docs[i].day;
            avrHour = docs[i].hour;
          }
          if(docs[i].cls == 'circuit') {
            circuit = true;
            circuitDay = docs[i].day;
            circuitHour = docs[i].hour;
          }
          if(docs[i].cls == 'cpp') {
            cpp = true;
            cppDay = docs[i].day;
            cppHour = docs[i].hour;
          }
          if(docs[i].cls == 'css') {
            css = true;
            cssDay = docs[i].day;
            cssHour = docs[i].hour;
          }
          if(docs[i].cls == 'css') {
            html = true;
            htmlDay = docs[i].day;
            htmlHour = docs[i].hour;
          }
          if(docs[i].cls == 'nodejs') {
            nodejs = true;
            nodejsDay = docs[i].day;
            nodejsHour = docs[i].hour;
          }
          if(docs[i].cls == 'php') {
            php = true;
            phpDay = docs[i].day;
            phpHour = docs[i].hour;
          }
          if(docs[i].cls == 'python') {
            python = true;
            pythonDay = docs[i].day;
            pythonHour = docs[i].hour;
          }
          
        }
        res.render('student_dashboard', {
          uname: req.user.uname,
          robotic: robotic,
          computer: computer,
          electronic: electronic,
          roboticDay: roboticDay,
          computerDay: computerDay,
          electronicDay: electronicDay,
          roboticHour: roboticHour,
          computerHour: computerHour,
          electronicHour: electronicHour,
          android: android,
          androidDay: androidDay,
          androidHour: androidHour,
          arduino: arduino,
          arduinoDay: arduinoDay,
          arduinoHour: arduinoHour,
          arm: arm,
          armDay: armDay,
          armHour: armHour,
          avr: avr,
          avrDay: avrDay,
          avrHour: avrHour,
          circuit: circuit,
          circuitDay: circuitDay,
          circuitHour: circuitHour,
          cpp: cpp,
          cppDay: cppDay,
          cppHour: cppHour,
          css: css,
          cssDay: cssDay,
          cssHour: cssHour,
          html: html,
          htmlDay: htmlDay,
          htmlHour: htmlHour,
          nodejs: nodejs,
          nodejsDay: nodejsDay,
          nodejsHour: nodejsHour,
          php: php,
          phpDay: phpDay,
          phpHour: phpHour,
          python: python,
          pythonDay: pythonDay,
          pythonHour: pythonHour
          
        });
      });
    });
  }
  else if(req.user.role === 'admin'){
    Class.find({}, function(err,docs){
      var roboticClass = [], computerClass = [], electronicClass = [];
      for(var i = 0; i<docs.length;i++){
        if(docs[i].cls === 'robotic') roboticClass.push(docs[i]);
        if(docs[i].cls === 'computer') computerClass.push(docs[i]);
        if(docs[i].cls === 'electronic') electronicClass.push(docs[i]);        
      }
      User.find({},function(err,docs1){
        Juniorcup.find({}, function(err,docs2){
          res.render('admin_dashboard',{
            uname: req.user.uname,
            roboticClass: roboticClass,
            computerClass: computerClass,
            electronicClass: electronicClass,
            users: docs1,
            juniorcup: docs2
          });
        });
      });    
    });
    // User.find({},function(err,docs){
    //   res.render('admin_dashboard',{
    //     uname: req.user.uname,
    //     users: docs
    //   });
    // });
    
  }
  else if(req.user.role === 'teacher'){
    Class.find({}, function(err,docs){
      var roboticClass = [], computerClass = [], electronicClass = [];
      for(var i = 0; i<docs.length;i++){
        if(docs[i].cls === 'robotic') roboticClass.push(docs[i]);
        if(docs[i].cls === 'computer') computerClass.push(docs[i]);
        if(docs[i].cls === 'electronic') electronicClass.push(docs[i]);        
      }
      res.render('teachers_dashboard',{
        uname: req.user.uname,
        roboticClass: roboticClass,
        computerClass: computerClass,
        electronicClass: electronicClass
      });    
    });
  }
});

router.get('/upgrade', ensureAuthenticated, function(req, res, next){
  if(req.user.role === 'admin'){
    // console.log(req.query);
    res.render('upgrade', {
      uname: req.user.uname,
      upgradeUname: req.query.uname
    });
  }
  else{
    res.redirect('/register/login');
  }
});

router.get('/upgradetoadmin', ensureAuthenticated, function(req, res, next){
  if(req.user.role === 'admin'){
    User.findOne({uname: req.query.uname}, function(err, doc){
      User.updateMany({_id: doc._id}, { $set: { role: 'admin' } }, function(err){
        if(err) console.log(err);
        else res.redirect('/dashboard');
      });
    });
  }
  else{
    res.redirect('/register/login');
  }
});
router.get('/upgradetoteacher', ensureAuthenticated, function(req, res, next){
  if(req.user.role === 'admin'){
    User.findOne({uname: req.query.uname}, function(err, doc){
      User.updateMany({_id: doc._id}, { $set: { role: 'teacher' } }, function(err){
        if(err) console.log(err);
        else res.redirect('/dashboard');
      });
    });
  }
  else{
    res.redirect('/register/login');
  }
});
router.get('/upgradetostudent', ensureAuthenticated, function(req, res, next){
  if(req.user.role === 'admin'){
    User.findOne({uname: req.query.uname}, function(err, doc){
      User.updateMany({_id: doc._id}, { $set: { role: 'student' } }, function(err){
        if(err) console.log(err);
        else res.redirect('/dashboard');
      });
    });
  }
  else{
    res.redirect('/register/login');
  }
});



module.exports = router;
