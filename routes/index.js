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
    res.render('admin_dashboard',{
      uname: req.user.uname
    });
  }
});

module.exports = router;
