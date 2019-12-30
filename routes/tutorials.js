var express = require('express');
var router = express.Router();
var User = require('../models/User');
var Class = require('../models/Class');
var Tutorial = require('../models/Tutorial');


/* GET home page. */
router.get('/', function(req, res, next) {
  if(!req.user) res.render('tutorials', {
    uname: false
  });
  else res.render('tutorials', {
    uname: req.user.uname
  });
});

////// android GET
router.get('/android', function(req, res, next) {
  var android = false;
  if(!req.user) res.render('./tutorials/android', {
    uname: false
  });
  else{ 
    Tutorial.findOne({uname: req.user.uname, cls: 'android'})
      .then(user =>{
        if(user)
          if(user.cls == 'android') android = true;
        res.render('./tutorials/android', {
          uname: req.user.uname,
          email: req.user.email,
          android: android
        });
      })
      .catch(err => console.log(err));
  }
});
////// arduino GET
router.get('/arduino', function(req, res, next) {
  var arduino = false;
  if(!req.user) res.render('./tutorials/arduino', {
    uname: false
  });
  else{ 
    Tutorial.findOne({uname: req.user.uname, cls: 'arduino'})
      .then(user =>{
        if(user)
          if(user.cls == 'arduino') arduino = true;
        res.render('./tutorials/arduino', {
          uname: req.user.uname,
          email: req.user.email,
          arduino: arduino
        });
      })
      .catch(err => console.log(err));
  }
});
////// arm GET
router.get('/arm', function(req, res, next) {
  var arm = false;
  if(!req.user) res.render('./tutorials/arm', {
    uname: false
  });
  else{ 
    Tutorial.findOne({uname: req.user.uname, cls: 'arm'})
      .then(user =>{
        if(user)
          if(user.cls == 'arm') arm = true;
        res.render('./tutorials/arm', {
          uname: req.user.uname,
          email: req.user.email,
          arm: arm
        });
      })
      .catch(err => console.log(err));
  }
});
////// avr GET
router.get('/avr', function(req, res, next) {
  var avr = false;
  if(!req.user) res.render('./tutorials/avr', {
    uname: false
  });
  else{ 
    Tutorial.findOne({uname: req.user.uname, cls: 'avr'})
      .then(user =>{
        if(user)
          if(user.cls == 'avr') avr = true;
        res.render('./tutorials/avr', {
          uname: req.user.uname,
          email: req.user.email,
          avr: avr
        });
      })
      .catch(err => console.log(err));
  }
});
////// circuit GET
router.get('/circuit', function(req, res, next) {
  var circuit = false;
  if(!req.user) res.render('./tutorials/circuit', {
    uname: false
  });
  else{ 
    Tutorial.findOne({uname: req.user.uname, cls: 'circuit'})
      .then(user =>{
        if(user)
          if(user.cls == 'circuit') circuit = true;
        res.render('./tutorials/circuit', {
          uname: req.user.uname,
          email: req.user.email,
          circuit: circuit
        });
      })
      .catch(err => console.log(err));
  }
});
////// cpp GET
router.get('/cpp', function(req, res, next) {
  var cpp = false;
  if(!req.user) res.render('./tutorials/cpp', {
    uname: false
  });
  else{ 
    Tutorial.findOne({uname: req.user.uname, cls: 'cpp'})
      .then(user =>{
        if(user)
          if(user.cls == 'cpp') cpp = true;
        res.render('./tutorials/cpp', {
          uname: req.user.uname,
          email: req.user.email,
          cpp: cpp
        });
      })
      .catch(err => console.log(err));
  }
});
////// css GET
router.get('/css', function(req, res, next) {
  var css = false;
  if(!req.user) res.render('./tutorials/css', {
    uname: false
  });
  else{ 
    Tutorial.findOne({uname: req.user.uname, cls: 'css'})
      .then(user =>{
        if(user)
          if(user.cls == 'css') css = true;
        res.render('./tutorials/css', {
          uname: req.user.uname,
          email: req.user.email,
          css: css
        });
      })
      .catch(err => console.log(err));
  }
});
////// html GET
router.get('/html', function(req, res, next) {
  var html = false;
  if(!req.user) res.render('./tutorials/html', {
    uname: false
  });
  else{ 
    Tutorial.findOne({uname: req.user.uname, cls: 'html'})
      .then(user =>{
        if(user)
          if(user.cls == 'html') html = true;
        res.render('./tutorials/html', {
          uname: req.user.uname,
          email: req.user.email,
          html: html
        });
      })
      .catch(err => console.log(err));
  }
});
////// Nodejs GET
router.get('/nodejs', function(req, res, next) {
  var nodejs = false;
  if(!req.user) res.render('./tutorials/nodejs', {
    uname: false
  });
  else{ 
    Tutorial.findOne({uname: req.user.uname, cls: 'nodejs'})
      .then(user =>{
        if(user)
          if(user.cls == 'nodejs') nodejs = true;
        res.render('./tutorials/nodejs', {
          uname: req.user.uname,
          email: req.user.email,
          nodejs: nodejs
        });
      })
      .catch(err => console.log(err));
  }
});
////// PHP GET
router.get('/php', function(req, res, next) {
  var php = false;
  if(!req.user) res.render('./tutorials/php', {
    uname: false
  });
  else{ 
    Tutorial.findOne({uname: req.user.uname, cls: 'php'})
      .then(user =>{
        if(user)
          if(user.cls == 'php') php = true;
        res.render('./tutorials/php', {
          uname: req.user.uname,
          email: req.user.email,
          php: php
        });
      })
      .catch(err => console.log(err));
  }
});
////// Python GET
router.get('/python', function(req, res, next) {
  var python = false;
  if(!req.user) res.render('./tutorials/python', {
    uname: false
  });
  else{ 
    Tutorial.findOne({uname: req.user.uname, cls: 'python'})
      .then(user =>{
        if(user)
          if(user.cls == 'python') python = true;
        res.render('./tutorials/python', {
          uname: req.user.uname,
          email: req.user.email,
          python: python
        });
      })
      .catch(err => console.log(err));
  }
});



//////android POST
router.post('/android', function(req, res){
  const {uname, email, day, hour} = req.body;
  const cls = 'android';
  let errors = [];
  User.findOne({ uname: uname})
      .then(user =>{
        if(user){
          const newTutorial = new Tutorial({uname, email, day, hour, cls});
          newTutorial.save()
              .then(user => {
                req.flash('success_msg', 'ثبت نام با موفقیت انجام شد.');
                res.redirect('/tutorials/android');
              })
              .catch(err => console.log(err));
        }
        else{
          errors.push({msg: 'نام کاربری یافت نشد!'});
          res.render('./tutorials/android ', { errors, uname, email, day, hour});
        }
      });
});

router.post('/android/remove', function(req,res){
  Tutorial.deleteOne({ uname: req.user.uname, cls: 'android'}, err => console.log(err));
  res.redirect('/tutorials/android');
});
//////arduino POST
router.post('/arduino', function(req, res){
  const {uname, email, day, hour} = req.body;
  const cls = 'arduino';
  let errors = [];
  User.findOne({ uname: uname})
      .then(user =>{
        if(user){
          const newTutorial = new Tutorial({uname, email, day, hour, cls});
          newTutorial.save()
              .then(user => {
                req.flash('success_msg', 'ثبت نام با موفقیت انجام شد.');
                res.redirect('/tutorials/arduino');
              })
              .catch(err => console.log(err));
        }
        else{
          errors.push({msg: 'نام کاربری یافت نشد!'});
          res.render('./tutorials/arduino ', { errors, uname, email, day, hour});
        }
      });
});

router.post('/arduino/remove', function(req,res){
  Tutorial.deleteOne({ uname: req.user.uname, cls: 'arduino'}, err => console.log(err));
  res.redirect('/tutorials/arduino');
});
//////arm POST
router.post('/arm', function(req, res){
  const {uname, email, day, hour} = req.body;
  const cls = 'arm';
  let errors = [];
  User.findOne({ uname: uname})
      .then(user =>{
        if(user){
          const newTutorial = new Tutorial({uname, email, day, hour, cls});
          newTutorial.save()
              .then(user => {
                req.flash('success_msg', 'ثبت نام با موفقیت انجام شد.');
                res.redirect('/tutorials/arm');
              })
              .catch(err => console.log(err));
        }
        else{
          errors.push({msg: 'نام کاربری یافت نشد!'});
          res.render('./tutorials/arm ', { errors, uname, email, day, hour});
        }
      });
});

router.post('/arm/remove', function(req,res){
  Tutorial.deleteOne({ uname: req.user.uname, cls: 'arm'}, err => console.log(err));
  res.redirect('/tutorials/arm');
});
//////avr POST
router.post('/avr', function(req, res){
  const {uname, email, day, hour} = req.body;
  const cls = 'avr';
  let errors = [];
  User.findOne({ uname: uname})
      .then(user =>{
        if(user){
          const newTutorial = new Tutorial({uname, email, day, hour, cls});
          newTutorial.save()
              .then(user => {
                req.flash('success_msg', 'ثبت نام با موفقیت انجام شد.');
                res.redirect('/tutorials/avr');
              })
              .catch(err => console.log(err));
        }
        else{
          errors.push({msg: 'نام کاربری یافت نشد!'});
          res.render('./tutorials/avr ', { errors, uname, email, day, hour});
        }
      });
});

router.post('/avr/remove', function(req,res){
  Tutorial.deleteOne({ uname: req.user.uname, cls: 'avr'}, err => console.log(err));
  res.redirect('/tutorials/avr');
});
//////circuit POST
router.post('/circuit', function(req, res){
  const {uname, email, day, hour} = req.body;
  const cls = 'circuit';
  let errors = [];
  User.findOne({ uname: uname})
      .then(user =>{
        if(user){
          const newTutorial = new Tutorial({uname, email, day, hour, cls});
          newTutorial.save()
              .then(user => {
                req.flash('success_msg', 'ثبت نام با موفقیت انجام شد.');
                res.redirect('/tutorials/circuit');
              })
              .catch(err => console.log(err));
        }
        else{
          errors.push({msg: 'نام کاربری یافت نشد!'});
          res.render('./tutorials/circuit ', { errors, uname, email, day, hour});
        }
      });
});

router.post('/circuit/remove', function(req,res){
  Tutorial.deleteOne({ uname: req.user.uname, cls: 'circuit'}, err => console.log(err));
  req.flash('success_msg', 'این دوره با موفقیت حذف شد.');
  res.redirect('/tutorials/circuit');
});
//////cpp POST
router.post('/cpp', function(req, res){
  const {uname, email, day, hour} = req.body;
  const cls = 'cpp';
  let errors = [];
  User.findOne({ uname: uname})
      .then(user =>{
        if(user){
          const newTutorial = new Tutorial({uname, email, day, hour, cls});
          newTutorial.save()
              .then(user => {
                req.flash('success_msg', 'ثبت نام با موفقیت انجام شد.');
                res.redirect('/tutorials/cpp');
              })
              .catch(err => console.log(err));
        }
        else{
          errors.push({msg: 'نام کاربری یافت نشد!'});
          res.render('./tutorials/cpp', { errors, uname, email, day, hour});
        }
      });
});

router.post('/cpp/remove', function(req,res){
  Tutorial.deleteOne({ uname: req.user.uname, cls: 'cpp'}, err => console.log(err));
  req.flash('success_msg', 'این دوره با موفقیت حذف شد.');
  res.redirect('/tutorials/cpp');
});
//////css POST
router.post('/css', function(req, res){
  const {uname, email, day, hour} = req.body;
  const cls = 'css';
  let errors = [];
  User.findOne({ uname: uname})
      .then(user =>{
        if(user){
          const newTutorial = new Tutorial({uname, email, day, hour, cls});
          newTutorial.save()
              .then(user => {
                req.flash('success_msg', 'ثبت نام با موفقیت انجام شد.');
                res.redirect('/tutorials/css');
              })
              .catch(err => console.log(err));
        }
        else{
          errors.push({msg: 'نام کاربری یافت نشد!'});
          res.render('./tutorials/css', { errors, uname, email, day, hour});
        }
      });
});

router.post('/css/remove', function(req,res){
  Tutorial.deleteOne({ uname: req.user.uname, cls: 'css'}, err => console.log(err));
  req.flash('success_msg', 'این دوره با موفقیت حذف شد.');
  res.redirect('/tutorials/css');
});
//////html POST
router.post('/html', function(req, res){
  const {uname, email, day, hour} = req.body;
  const cls = 'html';
  let errors = [];
  User.findOne({ uname: uname})
      .then(user =>{
        if(user){
          const newTutorial = new Tutorial({uname, email, day, hour, cls});
          newTutorial.save()
              .then(user => {
                req.flash('success_msg', 'ثبت نام با موفقیت انجام شد.');
                res.redirect('/tutorials/html');
              })
              .catch(err => console.log(err));
        }
        else{
          errors.push({msg: 'نام کاربری یافت نشد!'});
          res.render('./tutorials/html', { errors, uname, email, day, hour});
        }
      });
});

router.post('/html/remove', function(req,res){
  Tutorial.deleteOne({ uname: req.user.uname, cls: 'html'}, err => console.log(err));
  req.flash('success_msg', 'این دوره با موفقیت حذف شد.');
  res.redirect('/tutorials/html');
});
////// Nodejs POST
router.post('/nodejs', function(req, res){
  const {uname, email, day, hour} = req.body;
  const cls = 'nodejs';
  let errors = [];
  User.findOne({ uname: uname})
      .then(user =>{
        if(user){
          const newTutorial = new Tutorial({uname, email, day, hour, cls});
          newTutorial.save()
              .then(user => {
                req.flash('success_msg', 'ثبت نام با موفقیت انجام شد.');
                res.redirect('/tutorials/nodejs');
              })
              .catch(err => console.log(err));
        }
        else{
          errors.push({msg: 'نام کاربری یافت نشد!'});
          res.render('./tutorials/nodejs', { errors, uname, email, day, hour});
        }
      });
});

router.post('/nodejs/remove', function(req,res){
  Tutorial.deleteOne({ uname: req.user.uname, cls: 'nodejs'}, err => console.log(err));
  req.flash('success_msg', 'این دوره با موفقیت حذف شد.');
  res.redirect('/tutorials/nodejs');
});
////// PHP POST
router.post('/php', function(req, res){
  const {uname, email, day, hour} = req.body;
  const cls = 'php';
  let errors = [];
  User.findOne({ uname: uname})
      .then(user =>{
        if(user){
          const newTutorial = new Tutorial({uname, email, day, hour, cls});
          newTutorial.save()
              .then(user => {
                req.flash('success_msg', 'ثبت نام با موفقیت انجام شد.');
                res.redirect('/tutorials/php');
              })
              .catch(err => console.log(err));
        }
        else{
          errors.push({msg: 'نام کاربری یافت نشد!'});
          res.render('./tutorials/php', { errors, uname, email, day, hour});
        }
      });
});

router.post('/php/remove', function(req,res){
  Tutorial.deleteOne({ uname: req.user.uname, cls: 'php'}, err => console.log(err));
  req.flash('success_msg', 'این دوره با موفقیت حذف شد.');
  res.redirect('/tutorials/php');
});
////// Python POST
router.post('/python', function(req, res){
  const {uname, email, day, hour} = req.body;
  const cls = 'python';
  let errors = [];
  User.findOne({ uname: uname})
      .then(user =>{
        if(user){
          const newTutorial = new Tutorial({uname, email, day, hour, cls});
          newTutorial.save()
              .then(user => {
                req.flash('success_msg', 'ثبت نام با موفقیت انجام شد.');
                res.redirect('/tutorials/python');
              })
              .catch(err => console.log(err));
        }
        else{
          errors.push({msg: 'نام کاربری یافت نشد!'});
          res.render('./tutorials/python', { errors, uname, email, day, hour});
        }
      });
});

router.post('/python/remove', function(req,res){
  Tutorial.deleteOne({ uname: req.user.uname, cls: 'python'}, err => console.log(err));
  req.flash('success_msg', 'این دوره با موفقیت حذف شد.');
  res.redirect('/tutorials/python');
});



module.exports = router;
