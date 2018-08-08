const express = require('express');
const authRoutes = express.Router();

const passport = require('passport');
const bcrypt = require('bcryptjs');

// Our user model
const User = require('../models/user');

// Get all users
authRoutes.get('/', (req, res, next) => {
  User.find()
    .then(usersFromDb => res.status(200).json(usersFromDb))
    .catch(err => res.status(412).json(err));
});

//Signup
authRoutes.post('/signup', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  console.log("inside signup route==============", req.body) //borrar

  if (!username || !password) {
    res.status(400).json({
      message: 'Provide username and password'
    });
    return;
  }

  User.findOne({
    username
  }, '_id', (err, foundUser) => {
    if (foundUser) {
      res.status(400).json({
        message: 'The username already exists'
      });
      return;
    }

    const salt = bcrypt.genSaltSync(10);
    const hashPass = bcrypt.hashSync(password, salt);

    const theUser = new User({
      username,
      password: hashPass
    });

    theUser.save((err) => {
      if (err) {
        res.status(400).json({
          message: 'Something went wrong'
        });
        return;
      }

      req.login(theUser, (err) => {
        if (err) {
          res.status(500).json({
            message: 'Something went wrong'
          });
          return;
        }

        res.status(200).json(req.user);
      });
    });
  });
});

// Login
authRoutes.post('/login', (req, res, next) => {

  console.log("===================reached login route", req.body)

  passport.authenticate('local', (err, theUser, failureDetails) => {
    if (err) {
      res.status(500).json({
        message: 'Something went wrong'
      });
      return;
    }

    if (!theUser) {
      res.status(401).json(failureDetails);
      return;
    }

    req.login(theUser, (err) => {
      if (err) {
        res.status(500).json({
          message: 'Something went wrong'
        });
        return;
      }

      // We are now logged in (notice req.user)
      res.status(200).json(req.user);
    });
  })(req, res, next);
});


// Logout
authRoutes.post('/logout', (req, res, next) => {
  req.logout();
  res.status(200).json({ message: 'Success' });
});


// Check in loggedin
authRoutes.get('/loggedin', (req, res, next) => {
  if (req.isAuthenticated()) {
    res.status(200).json(req.user);
    return;
  }
  res.status(403).json({ message: 'Unauthorized' });
});


// Toggle user status
authRoutes.put('/changeStatus/:id', (req, res, next) => {
  let userId = req.params.id;
  User.findById(userId)
    .then(userFromDb => {
      User.findByIdAndUpdate(userId, { status: !userFromDb.status })
        .then(userFromDb => res.status(200).json({ message: "se cambio el estado correctamente", userFromDb }))
        .catch(err => res.status(415).json(err))
    })
    .catch(err => res.status(416).json(err));
});


authRoutes.put('/addCompany/:id', (req, res, next) => {
  let userId = req.params.id;
  let compId = req.body.compId;
  User.findById(userId)
    .then(userFromDb => {
      console.log(compId) // tengo que arreglar que no deje agregar nulos
      if (userFromDb.comps.indexOf(compId) === -1 && compId !== null && compId !== 'undefined') {
        userFromDb.comps.push(compId)
      };
      User.findByIdAndUpdate(userId, userFromDb)
        .then(userFromDb => res.status(200).json({ message: "se agrego la compania correctamente", userFromDb }))
        .catch(err => res.status(415).json(err))
    })
    .catch(err => res.status(416).json(err));
});


authRoutes.put('/selectCompany/:id', (req, res, next) => {
  let userId = req.params.id;
  let compId = req.body.compId;
  User.findById(userId)
    .then(userFromDb => {
      console.log(compId)
      if (userFromDb.comps.indexOf(compId) > -1) { userFromDb.activeComp = compId };
      User.findByIdAndUpdate(userId, userFromDb)
        .then(userFromDb => res.status(200).json({ message: "se selecciono la compania correctamente", userFromDb }))
        .catch(err => res.status(415).json(err))
    })
    .catch(err => res.status(416).json(err));
});


module.exports = authRoutes;