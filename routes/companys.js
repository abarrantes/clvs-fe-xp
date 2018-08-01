const express           = require('express');
const companyRouter        = express.Router();
const Company              = require('../models/company');


//create company
customerRouter.get('/companies/create', (req, res, next) => {
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

 });

 //Create company end



module.exports = companyRouter;