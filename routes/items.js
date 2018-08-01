const express = require('express');
const customerRouter = express.Router();
const Customer = require('../models/customer');


// Create a customer
customerRouter.post('/create', (req, res, next) => {
  const newCustomer = new Customer(req.body);
  newCustomer.save()
    .then((responseFromDb) => res.status(200).json(responseFromDb))
    .catch(err => res.status(411).json(err));
});

// Get all customers
customerRouter.get('/', (req, res, next) => {
  Customer.find()
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


//Get items START
itemRouter.get('/items/list', (req, res, next) => {
    Item.find({})
    .then((resultFromDB) => {
        res.render('items/listItem', {items: resultFromDB});
      })
      .catch((err) => {
        next(err);
      });    
  })


//Create items START
itemRouter.get('/items/create', (req, res, next) => {
    res.render('items/createItem');
  })

itemRouter.post('/items/create', (req, res, next) => {

  const newItem  = new Item(req.body);
  
  newItem.save()
  .then(() => {
      res.redirect('/items/list');
    })
    .catch((err) => {
     next(err) //TODO: I want to figure out how to manage the error and send it to user.
    });

}); //ends the route

  //Create items END

module.exports = itemRouter;