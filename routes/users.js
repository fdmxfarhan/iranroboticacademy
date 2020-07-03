var express = require('express');
var router = express.Router();
var User = require('../models/User');
const bcrypt = require('bcryptjs');
const passport = require('passport');
var nodemailer = require('nodemailer');
var fs = require('fs');

var wellcomeEmail = '<div style="width: 100%; padding: 3vw 0; background-color: rgb(198, 245, 198); margin: 0; overflow: hidden; min-height: 100vw;"><img style="display:block; width: 70%; margin: auto;" src="http://iranroboticacademy.com/images/logo.jpg" alt=""><h1 style="color: rgb(75, 7, 75); font-size: 5vw; text-align: center;">به آکادمی رباتیک ایران خوش آمدید</h1><p style="color: rgb(29, 29, 29); font-size: 3vw; width: 90%; margin: auto; text-align: justify; direction: rtl;">    برای ثبت نام در کلاس ها می توانید به بخش کلاس ها رفته و کلاس مورد نظر خود را انتخاب کنید. در بخش آموزش مجازی می توانید از فایل های ویدئویی و PDFهای آموزشی استفاده نماید.</p><a style="text-decoration: none; text-align: center; color: white; background-color: rgb(62, 12, 85); display: block; margin: 3vw auto; width: 70%; padding: 2vw 4vw; border-radius: 3vw;" href="http://iranroboticacademy.com">رفتن به سایت</a></div>';

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'fdmxfarhan@gmail.com',
    pass: 'llolqibvcnwvzhjp'
    // user: 'eroboshop@gmail.com',
    // pass: 'asjvadthyaokzgce'
  }
});


router.get('/login', function(req, res, next) {
  if(req.user)
    res.redirect('/dashboard');
  res.render('login');
});

router.get('/register', function(req, res, next) {
  if(req.user)
    res.redirect('/dashboard');
  res.render('register');
});


// Register handle
router.post('/register',function(req, res){
  const { uname, email , phone, education, fullname, psw, configpsw} = req.body;
  const role = 'student', card = 0;
  let errors = [];
  /// check required
  if(!uname || !email || !phone || !education || !fullname || !psw || !configpsw){
    errors.push({msg: 'لطفا موارد خواسته شده را کامل کنید!'});
  }
  
  /// check password match
  if(psw !== configpsw){
    errors.push({msg: 'تایید رمز عبور صحیح نمیباشد!'});
  }
  /// check password length
  if(psw.length < 4){
    errors.push({msg: 'رمز عبور شما بسیار ضعیف میباشد!'});
  }
  ///////////send evreything 
  if(errors.length > 0 ){
    res.render('register', { errors, uname, email, phone, education, fullname, psw, configpsw});
  }
  else{
    // validation passed
    User.findOne({ uname: uname})
      .then(user =>{
        if(user){
          // user exist
          errors.push({msg: 'از این آدرس ایمیل یان نام کاربری قبلا استفاده شده!'});
          res.render('register', { errors, uname, email, phone, education, fullname, psw, configpsw});
        }
        else {
          const newUser = new User({uname, email, phone, education, fullname, psw, role, card});
          console.log(newUser);
          // Hash password
          bcrypt.genSalt(10, (err, salt) => bcrypt.hash(newUser.psw, salt, (err, hash) => {
            if(err) throw err;
            newUser.psw = hash;
            newUser.save()
              .then(user => {
                req.flash('success_msg', 'ثبت نام با موفقیت انجام شد. اکنون میتوانید وارد شوید.');
                res.redirect('/users/login');
                var mailOptions = {
                  from: 'eroboshop@gmail.com',
                  to: user.email,
                  subject: 'خوش آمدید',
                  html: wellcomeEmail
                };
                
                transporter.sendMail(mailOptions, function(error, info){
                  if (error) {
                    console.log(error);
                  } else {
                    console.log('Email sent: ' + info.response);
                  }
                });                
              })
              .catch(err => console.log(err));
          }));
          console.log(newUser);
        }
      });
    
  }  
});

// Login handle
router.post('/login', function(req, res, next){
  const { uname, email , phone, education, fullname, psw, configpsw} = req.body;
  let errors = [];
  /// check required
  if(!uname || !psw){
    errors.push({msg: 'لطفا موارد خواسته شده را کامل کنید!'});
  }
  if(errors.length > 0 ){
    res.render('login', { errors, uname, psw});
  }
  passport.authenticate('local', {
    successRedirect: '/dashboard?login=true',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
});

// Logout handle
router.get('/logout', function(req, res, next){
  req.logOut();
  req.flash('success_msg', 'شما با موفقیت خارج شدید');
  res.redirect('/users/login');
});

module.exports = router;
