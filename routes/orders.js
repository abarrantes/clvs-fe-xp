const express           = require('express');
const orderRouter       = express.Router();
const Order             = require('../models/order');


//Get orders START
orderRouter.get('/orders/list', (req, res, next) => {
  Order.find({})
  .then((resultFromDB) => {
      res.render('orders/listOrder', {orders: resultFromDB});
    })
    .catch((err) => {
      next(err);
    });    
})

//Create orders START
orderRouter.get('/orders/create', (req, res, next) => {

    Order.find().sort({orderNumber:-1}).limit(1)
    .then((resultFromDB)=>{
      let nextOrderNumber = 1;
      if(resultFromDB.length>0){
        maxOrderNumberInDB = Number(resultFromDB[0].orderNumber);
        nextOrderNumber = maxOrderNumberInDB+1
      }
      res.render('orders/createOrder',{nextOrderNumber});
    })
    .catch((err)=>{
      next(err);
    });
  });

  orderRouter.post('/orders/create', (req, res, next) => {

    console.log(req.body);

    const order = {
      orderNumber: req.body.orderNumber,
      cardCode: req.body.cardCode,
      cardName: req.body.cardName,
      total: req.body.total,
      lines: []
    };

    for( let i = 0; i < req.body.numberOfLines; i++){
      let line = {}
      line.itemCode = req.body.itemCode[i];
      line.itemName = req.body.itemName[i];
      line.itemQuantity = req.body.itemQuantity[i];
      line.itemPrice = req.body.itemPrice[i];
      line.lineTotal = req.body.lineTotal[i];
      order.lines.push(line);
    }

    console.log(order);

  const newOrder  = new Order(order);

  newOrder.save()
  .then(() => {
      res.redirect('/orders/list');
    })
    .catch((err) => {
     next(err) 
    });

}); //ends the route

  module.exports = orderRouter;