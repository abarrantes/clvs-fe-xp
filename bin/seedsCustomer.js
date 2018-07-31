// it was needed because app.js is not related to this seeds.js file, we run it independently with node bin/seeds.js
const mongoose = require('mongoose');
const Customer = require('../models/customer');

// it was needed because app.js is not related to this seeds.js file, we run it independently with node bin/seeds.js
// mongoose.connect('mongodb://localhost/clvs-invoice');
mongoose.connect(process.env.MONGODB_URI);

const customers = [
  {
    cardCode: "C0001",
    cardName: "Customer 1 S.A.",
  },
  {
    cardCode: "C0002",
    cardName: "Customer 2 S.A.",
  },
  {
    cardCode: "C0003",
    cardName: "Customer 3 S.A.",
  },
  {
    cardCode: "C0004",
    cardName: "Customer 4 S.A.",
  },
  {
    cardCode: "C0005",
    cardName: "Customer 5 S.A.",
  },
  {
    cardCode: "C0006",
    cardName: "Customer 6 S.A.",
  },
  {
    cardCode: "C0007",
    cardName: "Customer 7 S.A.",
  }
]

Customer.create(customers)
.then((result)=>{
    console.log(`created ${result.length} customers`);
    mongoose.disconnect();
})
.catch((err)=>{
    console.log(err)
})