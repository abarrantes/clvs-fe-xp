const express           = require('express');
const itemRouter        = express.Router();
const Item              = require('../models/item');

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