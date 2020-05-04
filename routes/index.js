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
    'name': 'فرحان داپمی',
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
    'X-API-KEY': '233d166c-7bf4-416f-8c16-228e7b1e9a1d',
  },
  body: {
    'id': 'd2e353189823079e1e4181772cff5292',
    'order_id': '101',
  },
  json: true,
};

router.post('/pay', function(req,res, next){
  options2.body.id = req.body.id;
  options2.body.order_id = req.body.order_id;
  request(options2, function (error, response, body) {
    if (error) throw new Error(error);
    console.log(body);
  });
  // console.log(req.body);
  res.send("Done !!");
});

router.get('/pay', function(req, res, next){
  request(options, function (error, response, body) {
    if (error) console.log(error);
    res.redirect(body.link);
  });  
});


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
    res.render('./dashboard/user-dashboard', {
      uname: req.user.uname,
      user: req.user
    });
  }
});

router.get('/upgrade', ensureAuthenticated, function(req, res, next){
  if(req.user.role === 'admin'){
    // console.log(req.query);
    res.render('upgrade', {
      uname: req.user.uname,
      upgradeUname: req.query.uname,
      user: req.user
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
