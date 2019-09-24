var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose')

var app = express();

const productRoutes = require("./routes/products");

const URL = 'mongodb+srv://omer:omer12345@cluster0-9yaut.mongodb.net/test?retryWrites=true&w=majority'
mongoose.connect(URL, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true}).catch(err => console.log(err))
  const db = mongoose.connection;
  db.on("error", () => {
      console.log("> error occurred from the database");
  });
  db.once("open", () => {
      console.log("> successfully opened the database");
  });
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes which should handle requests
app.use("/products", productRoutes);

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
