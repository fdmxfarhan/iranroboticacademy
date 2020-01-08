var express = require('express');
var router = express.Router();
var User = require('../models/User');
var Class = require('../models/Class');

/* GET home page. */
router.get('/', function(req, res, next) {
  if(!req.user) res.render('classes', {
    uname: false
  });
  else res.render('classes', {
    uname: req.user.uname
  });
});

router.get('/robotic', function(req, res, next) {
  var robotic = false;
  if(!req.user) res.render('./classes/robotic', {
    uname: false
  });
  else{ 
    Class.findOne({uname: req.user.uname, cls: 'robotic'})
      .then(user =>{
        if(user)
          if(user.cls == 'robotic') robotic = true;
        res.render('./classes/robotic', {
          uname: req.user.uname,
          email: req.user.email,
          robotic: robotic
        });
      })
      .catch(err => console.log(err));
  }
});

router.get('/computer', function(req, res, next) {
  var computer = false;
  if(!req.user) res.render('./classes/computer', {
    uname: false
  });
  else{ 
    Class.findOne({uname: req.user.uname, cls: 'computer'})
      .then(user =>{
        if(user)
          if(user.cls == 'computer') computer = true;
        res.render('./classes/computer', {
          uname: req.user.uname,
          email: req.user.email,
          computer: computer
        });
      })
      .catch(err => console.log(err));
  }
});

router.get('/electronic', function(req, res, next) {
  var electronic = false;
  if(!req.user) res.render('./classes/electronic', {
    uname: false
  });
  else{ 
    Class.findOne({uname: req.user.uname, cls: 'electronic'})
      .then(user =>{
        if(user)
          if(user.cls == 'electronic') electronic = true;
        res.render('./classes/electronic', {
          uname: req.user.uname,
          email: req.user.email,
          electronic: electronic
        });
      })
      .catch(err => console.log(err));
  }
});

router.post('/robotic', function(req, res){
  const {uname, email, day, hour} = req.body;
  const fullname = req.user.fullname;
  const cls = 'robotic';
  let errors = [];
  User.findOne({ uname: uname})
      .then(user =>{
        if(user && user.uname === req.user.uname){
          const newClass = new Class({fullname, uname, email, day, hour, cls});
          newClass.save()
              .then(user => {
                req.flash('success_msg', 'ثبت نام با موفقیت انجام شد.');
                res.redirect('/classes/robotic');
              })
              .catch(err => console.log(err));
        }
        else{
          errors.push({msg: 'نام کاربری یافت نشد!'});
          res.render('./classes/robotic', { errors, uname, email, day, hour});
        }
      });
});

router.post('/robotic/remove', function(req,res){
  Class.deleteOne({ uname: req.user.uname, cls: 'robotic'}, err => console.log(err));
  res.redirect('/classes/robotic');
});

router.post('/computer', function(req, res){
  const {uname, email, day, hour} = req.body;
  const fullname = req.user.fullname;
  const cls = 'computer';
  let errors = [];
  User.findOne({ uname: uname})
      .then(user =>{
        if(user && user.uname === req.user.uname){
          const newClass = new Class({fullname, uname, email, day, hour, cls});
          newClass.save()
              .then(user => {
                req.flash('success_msg', 'ثبت نام با موفقیت انجام شد.');
                res.redirect('/classes/computer');
              })
              .catch(err => console.log(err));
        }
        else{
          errors.push({msg: 'نام کاربری یافت نشد!'});
          res.render('./classes/computer', { errors, uname, email, day, hour});
        }
      });
});

router.post('/computer/remove', function(req,res){
  Class.deleteOne({ uname: req.user.uname, cls: 'computer'}, err => console.log(err));
  res.redirect('/classes/computer');
});

router.post('/electronic', function(req, res){
  const {uname, email, day, hour} = req.body;
  const fullname = req.user.fullname;
  const cls = 'electronic';
  let errors = [];
  User.findOne({ uname: uname})
      .then(user =>{
        if(user && user.uname === req.user.uname){
          const newClass = new Class({fullname, uname, email, day, hour, cls});
          newClass.save()
              .then(user => {
                req.flash('success_msg', 'ثبت نام با موفقیت انجام شد.');
                res.redirect('/classes/electronic');
              })
              .catch(err => console.log(err));
        }
        else{
          errors.push({msg: 'نام کاربری یافت نشد!'});
          res.render('./classes/electronic', { errors, uname, email, day, hour});
        }
      });
});

router.post('/electronic/remove', function(req,res){
  Class.deleteOne({ uname: req.user.uname, cls: 'electronic'}, err => console.log(err));
  res.redirect('/classes/electronic');
});


module.exports = router;
