const express     = require('express');
const apiRouter   = express.Router();
const Item        = require('../models/item');
const Customer    = require('../models/customer');


apiRouter.get('/api/items', (req, res, next) => {
  Item.find({active:true}).sort({itemCode:1})
  .then((responseFromDB)=>{
    res.json(responseFromDB);
  })
  .catch((err)=>{
    next(err);
  })
});

apiRouter.get('/api/itemName', (req, res, next) => {
  let code = req.query.itemCode;
  Item.find({itemCode:code})
  .then((responseFromDB)=>{
    res.json(responseFromDB);
  })
  .catch((err)=>{
    next(err);
  })
});

apiRouter.get('/api/customers', (req, res, next) => {
  Customer.find({active:true}).sort({cardCode:1})
  .then((responseFromDB)=>{
    res.json(responseFromDB);
  })
  .catch((err)=>{
    next(err);
  })
});

apiRouter.get('/api/cardName', (req, res, next) => {
  let code = req.query.cardCode;
  Customer.find({cardCode:code})
  .then((responseFromDB)=>{
    res.json(responseFromDB);
  })
  .catch((err)=>{
    next(err);
  })
});

apiRouter.patch('/api/deactivateItem', (req, res, next) => {
  let code = req.body.params.itemCode;
  Item.findOneAndUpdate({itemCode:code},{active:false})
  .then((response)=>{
    console.log("-----------response from update:",response);
  })
  .catch((err)=>{
    next(err);
  })
});

apiRouter.patch('/api/activateItem', (req, res, next) => {
  let code = req.body.params.itemCode;
  Item.findOneAndUpdate({itemCode:code},{active:true})
  .then((response)=>{
    console.log("-----------response from update:",response);
  })
  .catch((err)=>{
    next(err);
  })
});

apiRouter.patch('/api/deactivateCustomer', (req, res, next) => {
  let code = req.body.params.cardCode;
  console.log("----------code: ",code);
  Customer.findOneAndUpdate({cardCode:code},{active:false})
  .then((response)=>{
    console.log("-----------response from update:",response);
  })
  .catch((err)=>{
    next(err);
  })
});

apiRouter.patch('/api/activateCustomer', (req, res, next) => {
  let code = req.body.params.cardCode;
  Customer.findOneAndUpdate({cardCode:code},{active:true})
  .then((response)=>{
    console.log("-----------response from update:",response);
  })
  .catch((err)=>{
    next(err);
  })
});

module.exports = apiRouter;
