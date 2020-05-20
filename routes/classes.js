var express = require('express');
var router = express.Router();
var User = require('../models/User');
var Class = require('../models/Class');
const { ensureAuthenticated } = require('../config/auth');

// const nodemailer = require("nodemailer");

// var transporter = nodemailer.createTransport({
//   service: 'yahoo',
//   auth: {
//     user: 'fdmxfarhan@yahoo.com',
//     pass: '2240fdmx'
//   }
// });

var classNamesEn = ['scratch', 'c++', 'python', 'web', 'robotic', 'pathfinder', 'soccorLW', 'soccorOW', '@work', 'tizhooshan1', 'tizhooshan2'];
var classNamesFa = ['برنامه نویسی مقدماتی Scratch', 'برنامه نویسی C++', 'برنامه نویسی python', 'برنامه نویسی web', 'رباتیک مقدماتی', 'رباتیک مسیریاب', 'رباتیک فوتبالیست سبک وزن', 'رباتیک فوتبالیست وزن آزاد', 'ربات های صنعتی @Work', 'تیزهوشان پایه ششم', 'تیزهوشان پایه نهم'];

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
    uname: false,
    user: false
  });
  else{ 
    Class.findOne({uname: req.user.uname, cls: 'robotic'})
      .then(user =>{
        if(user)
          if(user.cls == 'robotic') robotic = true;
        res.render('./classes/robotic', {
          uname: req.user.uname,
          email: req.user.email,
          robotic: robotic,
          user: req.user
        });
      })
      .catch(err => console.log(err));
  }
});

router.get('/computer', function(req, res, next) {
  var computer = false;
  if(!req.user) res.render('./classes/computer', {
    uname: false,
    user: false
  });
  else{ 
    Class.findOne({uname: req.user.uname, cls: 'computer'})
      .then(user =>{
        if(user)
          if(user.cls == 'computer') computer = true;
        res.render('./classes/computer', {
          uname: req.user.uname,
          email: req.user.email,
          computer: computer,
          user: req.user
        });
      })
      .catch(err => console.log(err));
  }
});

router.get('/programming', function(req, res, next) {
  res.redirect('/classes/computer');
});

router.get('/electronic', function(req, res, next) {
  var electronic = false;
  if(!req.user) res.render('./classes/electronic', {
    uname: false,
    user: false
  });
  else{ 
    Class.findOne({uname: req.user.uname, cls: 'electronic'})
      .then(user =>{
        if(user)
          if(user.cls == 'electronic') electronic = true;
        res.render('./classes/electronic', {
          uname: req.user.uname,
          email: req.user.email,
          electronic: electronic,
          user: req.user
        });
      })
      .catch(err => console.log(err));
  }
});

router.post('/register', ensureAuthenticated, function(req, res){
  Class.findOne({ uname: req.user.uname, className: req.body.className})
    .then(cls =>{
      if(cls){
        res.render('./classes/fail-register', {
          uname: req.user.uname,
          user: req.user,
          cls: cls
        });
      }
      else{
        var classNameFa = classNamesFa[classNamesEn.indexOf(req.body.className)];
        const newClass = new Class({
          fullname: req.body.fullname,
          uname: req.user.uname,
          email: req.user.email,
          term: req.body.term,
          className: req.body.className,
          className2: classNameFa,
          price: 250000,
          state: 'در انتظار شروع',
          attend: req.body.attend
        });
        newClass.save()
          .then(() => {
            // var mailOptions = {
            //   from: 'fdmxfarhan@yahoo.com',
            //   to: 'fdmxfarhan@yahoo.com',
            //   subject: 'ثبت نام کلاس جدید',
            //   text: `نام: ${req.body.fullname} \nنام کاربری: ${req.user.uname} \n کلاس: ${classNameFa}`
            // };
            // transporter.sendMail(mailOptions, function(error, info){
            //   if (error) {
            //     console.log(error);
            //   } else {
            //     console.log('Email sent: ' + info.response);
            //   }
            // });
            res.render('./classes/success-register', {
              uname: req.user.uname,
              user: req.user,
              fullname: newClass.fullname, 
              className: newClass.className, 
              term: newClass.term, 
              price: newClass.price
            });
          })
          .catch(err => console.log(err));
      }
    });
});

router.get('/success', (req, res, next)=>{
  res.render('./classes/success-register', {
    uname: req.user.uname,
    user: req.user,
    fullname: 'newClass.fullname', 
    className: 'newClass.className', 
    term: 'newClass.term', 
    price: 'newClass.price'
  });
});
router.get('/fail', (req, res, next)=>{
  cls = {
    fullname: 'fullname',
    className: 'className',
    term: 'term',
    price: 'price'
  };
  res.render('./classes/fail-register', {
    uname: req.user.uname,
    user: req.user,
    fullname: 'newClass.fullname', 
    className: 'newClass.className', 
    term: 'newClass.term', 
    price: 'newClass.price',
    cls: cls
  });
});

router.post('/robotic/remove', function(req,res){
  Class.deleteOne({ uname: req.user.uname, cls: 'robotic'}, err => console.log(err));
  res.redirect('/classes/robotic');
});


module.exports = router;
