var express = require('express');
var router = express.Router();
var User = require('../models/User');
const bcrypt = require('bcryptjs');
const passport = require('passport');


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
    successRedirect: '/dashboard',
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
