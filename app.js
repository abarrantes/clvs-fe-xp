require('dotenv').config();

const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
const favicon      = require('serve-favicon');
const hbs          = require('hbs');
const mongoose     = require('mongoose');
const logger       = require('morgan');
const path         = require('path');

// needed for serializing and deserializing passwords
const passport        = require("passport");

// required because password requires it. I think.
const LocalStrategy   = require("passport-local").Strategy;
const bcrypt          = require("bcryptjs");
const session         = require("express-session");
const MongoStore      = require("connect-mongo")(session);

//flash is used to communicate error when redirected to login.get from login.post
const flash           = require("connect-flash");

// needed for serializing and deserializing passwords
const User            = require ("./models/user");

mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URI, {useMongoClient: true})
  .then(() => {
    console.log('Connected to Mongo!')
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });

const app_name = require('./package.json').name;

//todo: need to find out what debug is for
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express View engine setup

app.use(require('node-sass-middleware')({
  src:  path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));
      

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));

//todo: need to figure how this works
app.use(
  session({
    secret: "our-passport-local-strategy-app",
    resave: true,
    saveUninitialized: true
  })
);

//todo: need to figure how this works
// default value for title local
app.locals.title = 'not defined';

passport.serializeUser((user, cb) => {
  cb(null, user._id);
});

passport.deserializeUser((id, cb) => {
  User.findById(id, (err, user) => {
    if (err) {
      return cb(err);
    }
    cb(null, user);
  });
});

app.use(flash());

passport.use(
  new LocalStrategy((username, password, next) => {
    User.findOne({ username }, (err, user) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return next(null, false, { message: "Incorrect username" });
      }
      if (!bcrypt.compareSync(password, user.password)) {
        return next(null, false, { message: "Incorrect password" });
      }
      return next(null, user);
    });
  })
);

app.use(passport.initialize());
app.use(passport.session());


//Routes

const customerRoutes = require('./routes/customers');
app.use('/api/cust', customerRoutes);

const companyRoutes = require('./routes/companies');
app.use('/api/comps', companyRoutes);

const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);


module.exports = app;
