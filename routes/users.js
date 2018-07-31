const express           = require('express');
const userRouter        = express.Router();
const User              = require('../models/user');
const passport          = require("passport");
const bcrypt            = require('bcryptjs');


//Create users
userRouter.get('/users/signup', (req, res, next) => {
  res.render('users/signup');
})


userRouter.post('/users/signup', (req, res, next) => {
  
  const name      = req.body.name;
  const username     = req.body.username;
  const password  = req.body.password;
  
  if (name === "" || username === "" || password === "") {
    res.render('users/signup', { message: "Fill all fields to sign up"});
    return;
  }
  User.findOne({ 'username': username })
  .then((responseFromBD) => {
    if (responseFromBD !== null) {
      res.render('users/signup', { message: `Sorry ${username} is taken` });
      return;
    } //ends the if statement
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    User.create({ name: name, username:username, password: hashedPassword })
    .then((response) => {
      res.redirect('/users/login');
    })
    .catch((err) => {
      next(err);
    });
  }); //end the .then form the user.findone
}); //ends the route


//Login users
userRouter.get('/users/login',(req,res,next)=>{
  res.render('users/login',{ "message": req.flash("error")});
});

userRouter.post("/users/login", passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/users/login",
  failureFlash: true,
  passReqToCallback: true
}));

//Logout users
userRouter.get('/users/logout',(req,res,next)=>{
  req.logout();
  res.redirect("/users/login")
});

module.exports = userRouter;