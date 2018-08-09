// it was needed because app.js is not related to this seeds.js file, we run it independently with node bin/seeds.js
const mongoose = require('mongoose');
const User = require('../models/user');

// it was needed because app.js is not related to this seeds.js file, we run it independently with node bin/seeds.js
mongoose.connect(process.env.MONGODB_URI);


//DOES NOT WORK BECAUSE THERE IS NO HASHING OF PASSWORD, LOGIN WILL NOT WORK.

const users = [
  {
    name: "a",
    username: "a",
    password: "abc",
  }
]


User.create(users)
.then((result)=>{
    console.log(`created ${result.length} items`);
    mongoose.disconnect();
})
.catch((err)=>{
    console.log(err)
})