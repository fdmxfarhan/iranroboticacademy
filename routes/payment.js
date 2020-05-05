var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var request = require('request');
const { ensureAuthenticated } = require('../config/auth');
const Payment = require('../models/Payment');
const User = require('../models/User');

router.post('/add', ensureAuthenticated, (req, res, nex)=> {
    const {uname, amount, description} = req.body;
    if(req.user.role == 'admin'){
        User.findOne({uname: uname}, (err, doc)=>{
            if(doc){
                newPayment = new Payment({
                    fullname: doc.fullname,
                    uname: doc.uname,
                    email: doc.email,
                    phone: doc.phone,
                    amount: amount,
                    description: description,
                    date: Date.now(),
                    payed: false
                });
                newPayment.save()
                    .then(()=>{
                        res.redirect('/payments');
                    }).catch((err)=> console.log(err));
            }
        });
    }
});
router.get('/remove', ensureAuthenticated, (req, res, nex)=> {
  const id = req.query.id;
  if(req.user.role == 'admin'){
    Payment.deleteOne({_id: id}).then(()=>{
      res.redirect('/payments');
    });
  }
});

router.post('/pay', function(req,res, next){
  var options2 = {
    method: 'POST',
    url: 'https://api.idpay.ir/v1.1/payment/verify',
    headers: {
      'Content-Type': 'application/json',
      'X-API-KEY': '233d166c-7bf4-416f-8c16-228e7b1e9a1d',
      'X-SANDBOX': 1,
    },
    body: {
      'id': 'd2e353189823079e1e4181772cff5292',
      'order_id': '101',
    },
    json: true,
  };
  
  options2.body.id = req.body.id;
  options2.body.order_id = req.body.order_id;
  request(options2, function (error, response, body) {
    if (error) throw new Error(error);
    console.log(body);
  });
  console.log(req.body);
  res.send("Done !!");
});

router.get('/pay', function(req, res, next){
  Payment.findOne({_id: req.query.id}, function(err, payment){
    var options = {
      method: 'POST',
      url: 'https://api.idpay.ir/v1.1/payment',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': '233d166c-7bf4-416f-8c16-228e7b1e9a1d',
        'X-SANDBOX': 1,
      },
      body: {
        'order_id': '101',
        'amount': payment.amount,
        'name': payment.fullname,
        'uname': payment.uname,
        'id': payment._id,
        'phone': payment.phone,
        'mail': payment.email,
        'desc': payment.description,
        'callback': 'http://iranroboticacademy.com/payment/pay',
        'reseller': null,
      },
      json: true,
    };
    request(options, function (error, response, body) {
      if (error) console.log(error);
      res.redirect(body.link);
    });  
  });
});
module.exports = router;