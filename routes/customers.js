const express = require('express');
const customerRouter = express.Router();
const Customer = require('../models/customer');


// Create a customer
customerRouter.post('/create', (req, res, next) => {
  const newCustomer = new Customer(req.body);
  const theCompany = req.user.activeComp;
  newCustomer.ownerComp = theCompany;
  newCustomer.save()
    .then((responseFromDb) => res.status(200).json(responseFromDb))
    .catch(err => res.status(411).json(err));
});

// Get all customers
customerRouter.get('/:id', (req, res, next) => {
  activeComp = req.params.id;
  Customer.find({ownerComp:activeComp})
    .then(customersFromDb => res.status(200).json(customersFromDb))
    .catch(err => res.status(412).json(err));
});

// Get one customer
customerRouter.get('/:id', (req, res, next) => {
  let custId = req.params.id;
  Customer.findById(custId)
    .then(customerFromDb => res.status(200).json(customerFromDb))
    .catch(err => res.status(413).json(err));
});

// Edit one customer
customerRouter.put('/edit/:id', (req, res, next) => {
  let custId = req.params.id;
  let updatedCust = req.body;
  Customer.findByIdAndUpdate(custId,updatedCust)
    .then(responseFromDb => res.status(200).json({message:"editado correctamente",responseFromDb}))
    .catch(err => res.status(414).json(err));
});

// Toggle customer status
customerRouter.put('/changeStatus/:id', (req, res, next) => {
  let custId = req.params.id;
  Customer.findById(custId)
    .then(customerFromDb =>{
      Customer.findByIdAndUpdate(custId,{status:!customerFromDb.status})
        .then(customerFromDb => res.status(200).json({message:"se cambio el estado correctamente",customerFromDb}))
        .catch(err => res.status(415).json(err))
    })
    .catch(err => res.status(416).json(err));
});

module.exports = customerRouter;