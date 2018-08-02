const express = require('express');
const itemRouter = express.Router();
const Item = require('../models/item');


// Create a item
itemRouter.post('/create', (req, res, next) => {
  const newItem = new Item(req.body);
  newItem.save()
    .then((responseFromDb) => res.status(200).json(responseFromDb))
    .catch(err => res.status(411).json(err));
});

// Get all items
itemRouter.get('/', (req, res, next) => {
  Item.find()
    .then(itemsFromDb => res.status(200).json(itemsFromDb))
    .catch(err => res.status(412).json(err));
});

// Get one item
itemRouter.get('/:id', (req, res, next) => {
  let itemId = req.params.id;
  Item.findById(itemId)
    .then(itemFromDb => res.status(200).json(itemFromDb))
    .catch(err => res.status(413).json(err));
});

// Edit one item
itemRouter.put('/edit/:id', (req, res, next) => {
  let itemId = req.params.id;
  let updatedItem = req.body;
  Item.findByIdAndUpdate(itemId,updatedItem)
    .then(responseFromDb => res.status(200).json({message:"editado correctamente",responseFromDb}))
    .catch(err => res.status(414).json(err));
});

// Toggle item status
itemRouter.put('/changeStatus/:id', (req, res, next) => {
  let itemId = req.params.id;
  Item.findById(itemId)
    .then(itemFromDb =>{
      Item.findByIdAndUpdate(itemId,{status:!itemFromDb.status})
        .then(itemFromDb => res.status(200).json({message:"se cambio el estado correctamente",itemFromDb}))
        .catch(err => res.status(415).json(err))
    })
    .catch(err => res.status(416).json(err));
});

module.exports = itemRouter;