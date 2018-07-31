const express           = require('express');
const customerRouter        = express.Router();
const Customer              = require('../models/customer');

//Get customers START
customerRouter.get('/customers/list', (req, res, next) => {
    Customer.find({})
    .then((resultFromDB) => {
        res.render('customers/listCustomer', {customers: resultFromDB});
      })
      .catch((err) => {
        next(err);
      });    
  })


//Create users START
customerRouter.get('/customers/create', (req, res, next) => {
    res.render('customers/createCustomer');
  })

customerRouter.post('/customers/create', (req, res, next) => {

    const newCustomer  = new Customer(req.body);
    
    newCustomer.save()
    .then(() => {
        res.redirect('/customers/list');
      })
      .catch((err) => {
        next(err);
      });

  }); //ends the route

  //Create users END

module.exports = customerRouter;