var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
const passport = require('passport');
var urlencodedparser = bodyparser.urlencoded({ extended: false});
const islogin = false;
const { ensureAuthenticated } = require('../config/auth');
var User = require('../models/User');
var Class = require('../models/Class');
var Tutorial = require('../models/Tutorial');
var Juniorcup = require('../models/juniorcup');
var Payment = require('../models/Payment');

router.get('/', function(req, res, next) {
  if(!req.user) res.render('index', {
    uname: false,
    user: false
  });
  else res.render('index', {
    uname: req.user.uname,
    user: req.user
  });
});

router.get('/notfound', function(req, res, next) {
  if(!req.user) res.render('error', {
    uname: false,
    user: false
  });
  else res.render('error', {
    uname: req.user.uname,
    user: req.user
  });
});

router.get('/dashboard', ensureAuthenticated, function(req, res, next){
  var messages = [];
  if(!req.user) res.render('dashboard', {
    uname: false,
    user: false
  });
  else if(req.user.role === 'student'){
    Class.find({uname: req.user.uname}, function(err, docs){
      Payment.find({uname: req.user.uname}, function(err, payments){
        if(req.query.login) messages.push({msg: 'به پنل کاربری خود خوش آمدید.'});
        var cnt = 0, active = { payment: false, reports: false, comments: false};
        for(var i=0 ; i<payments.length ; i++){
          if(payments[i].payed) cnt++;
        }
        if(cnt > 0) {
          messages.push({msg: `شما ${cnt} صورت حساب پرداخت نشده دارید.`});
          active.payment = true;
        }
        console.log(messages);
        res.render('./dashboard/user-dashboard', {
          uname: req.user.uname,
          user: req.user,
          classes: docs,
          messages: messages,
          active: active
        });
      });
    });
  }
  else if(req.user.role == 'admin'){
    User.find({}, function(err, users){
      Class.find({}, function(err, classes){
        Payment.find({uname: req.user.uname}, function(err, payments){
          var active = { payment: false, reports: false, comments: false};
          if(req.query.login) messages.push({msg: 'به پنل کاربری خود خوش آمدید.'});
          var cnt = 0;
          for(var i=0 ; i<payments.length ; i++){
            if(payments[i].payed) cnt++;
          }
          if(cnt > 0) messages.push({msg: `شما ${cnt} صورت حساب پرداخت نشده دارید.`});  
          res.render('./dashboard/admin-dashboard', {
            uname: req.user.uname,
            user: req.user,
            users: users,
            classes: classes,
            messages: messages,
            active: active
          });
        });
      });
    });
  }
});

router.get('/dashboard/classes', ensureAuthenticated, function(req, res, next){
  if(req.user.role == 'admin'){
    Class.find({}, function(err, classes){
      var active = { payment: false, reports: false, comments: false};
      res.render('./dashboard/classes',{
        uname: req.user.uname,
        user: req.user,
        classes: classes,
        active: active
      });
    });
  }
  else res.send('Access denied!!');
});

router.get('/upgrade', ensureAuthenticated, function(req, res, next){
  if(req.user.role === 'admin'){
    User.findOne({uname: req.query.uname}, function(err, doc){
      if(doc){
        res.render('dashboard/upgrade-user', {
          uname: req.user.uname,
          upgradeUser: doc,
          user: req.user
        });
      }
    });
  }
  else{
    res.redirect('/dashboard');
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

router.get('/payments', ensureAuthenticated, function(req, res, next){
  if(req.user.role == 'student'){
    Payment.find({uname: req.user.uname},function(err, payments){
      var active = { payment: false, reports: false, comments: false};
      res.render('./dashboard/payments', {
        uname: req.user.uname,
        user: req.user,
        payments: payments,
        active: active
      });
    });
  }
  else if(req.user.role == 'admin'){
    User.find({}, function(err, users){
      Payment.find({},function(err, payments){
        var active = { payment: false, reports: false, comments: false};
        res.render('./dashboard/payments', {
          uname: req.user.uname,
          user: req.user,
          users: users,
          payments: payments,
          active: active
        });
      });
    });
  }
});

router.get('/dashboard/plan', ensureAuthenticated, function(req, res, next){
  var active = { payment: false, reports: false, comments: false};
  res.render('./dashboard/plan',{
    uname: req.user.uname,
    user: req.user,
    active: active
  });
});

router.get('/dashboard/removeclass', ensureAuthenticated, function(req, res, next){
  if(req.user.role == 'admin'){
    Class.deleteOne({_id: req.query.id}).then(()=>{
      res.redirect('/dashboard/classes');
    });
  }
});

module.exports = router;
