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
  if(!req.user) res.render('dashboard', {
    uname: false,
    user: false
  });
  else if(req.user.role === 'student'){
    Class.find({uname: req.user.uname}, function(err, docs){
      res.render('./dashboard/user-dashboard', {
        uname: req.user.uname,
        user: req.user,
        classes: docs
      });
    });
  }
  else if(req.user.role == 'admin'){
    User.find({}, function(err, users){
      Class.find({}, function(err, classes){
        res.render('./dashboard/admin-dashboard', {
          uname: req.user.uname,
          user: req.user,
          users: users,
          classes: classes
        });
      });
    });
  }
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
      res.render('./dashboard/payments', {
        uname: req.user.uname,
        user: req.user,
        payments: payments
      });
    });
  }
  else if(req.user.role == 'admin'){
    User.find({}, function(err, users){
      Payment.find({},function(err, payments){
        res.render('./dashboard/payments', {
          uname: req.user.uname,
          user: req.user,
          users: users,
          payments: payments
        });
      });
    });
  }
});

module.exports = router;
