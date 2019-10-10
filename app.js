var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose')
const session = require('express-session')
var methodOverride = require('method-override')
const passport = require('passport')
const expressEjsLayouts = require('express-ejs-layouts')
require('./app/auth/local')(passport)

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'ejs');
app.set('layout extractScripts', true)
app.set('layout extractStyles', true)

app.use(expressEjsLayouts)
app.set('layout', 'layouts/base');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(methodOverride('_method'))
app.use(session({
  secret: '!2@FOJIOFDJIOJDFO@!#JOFJO#$%%$#@',
  resave: false,
  saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())


mongoose.connect("mongodb://localhost:27017/alunos", {useNewUrlParser: true, useUnifiedTopology: true})
mongoose.Promise = global.Promise

require('./app/index')(app, passport)

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'bower_components')));


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
