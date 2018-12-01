var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var http = require('http');

var session = require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var serviceRouter = require('./routes/service');

var recetaRouter = require('./routes/receta');

var ventaRouter = require('./routes/venta');

var app = express();

app.use(session({
    secret: 'mysupersecret',
    resave: false,
    saveUninitialized: false
}));

app.use(function(req, res, next) {
//  res.locals.login = req.isAuthenticated();
  res.locals.session = req.session;
  next();
});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/services', serviceRouter);
app.use('/recetas', recetaRouter);
app.use('/ventas', ventaRouter);

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

var port = 8080;
app.locals.title="myapp: ";
app.listen(port, () => {
  console.log(app.locals.title  + port);
});


module.exports = app;
