// it was needed because app.js is not related to this seeds.js file, we run it independently with node bin/seeds.js
const mongoose = require('mongoose');
const Item = require('../models/item');

// it was needed because app.js is not related to this seeds.js file, we run it independently with node bin/seeds.js
// mongoose.connect('mongodb://localhost/clvs-invoice');
mongoose.connect(process.env.MONGODB_URI);

const items = [
  {
    itemCode: "I0001",
    itemName: "Item 1",
  },
  {
    itemCode: "I0002",
    itemName: "Item 2",
  },
  {
    itemCode: "I0003",
    itemName: "Item 3",
  },
  {
    itemCode: "I0004",
    itemName: "Item 4",
  },
  {
    itemCode: "I0005",
    itemName: "Item 5",
  }
]

Item.create(items)
.then((result)=>{
    console.log(`created ${result.length} items`);
    mongoose.disconnect();
})
.catch((err)=>{
    console.log(err)
})