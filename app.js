var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
  function(username, password, done) {
  Account.findOne({ username: username })
  .then(function (user){
  if (err) { return done(err); }
  if (!user) {
  return done(null, false, { message: 'Incorrect username.' });
  }
  if (!user.validPassword(password)) {
  return done(null, false, { message: 'Incorrect password.' });
  }
  return done(null, user);
  })
  .catch(function(err){
  return done(err)
  })
  })
  )
  
  

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var ballsRouter = require('./routes/Balls');
var gridRouter = require('./routes/grid');
var pickRouter = require('./routes/pick');
var Balls = require('./models/Balls');
var resourceRouter= require('./routes/resource');

const connectionString = "mongodb+srv://bhargavsvs2001:govindrakodu14@cluster0.qa3ysaz.mongodb.net/"
mongoose = require('mongoose');
mongoose.connect(connectionString);
mongoose.set('strictQuery', false);

//Get the default connection
var db = mongoose.connection;
//Bind connection to error event
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once("open", function(){
console.log("Connection to DB succeeded")});



// We can seed the collection if needed on server start
async function recreateDB(){
  // Delete everything
  await Balls.deleteMany();
  let instance1 = new
  Balls({ball_type:"Cricket Ball", cost:10,
  material:"Cork"});
  instance1.save().then(doc=>{
  console.log("First object saved")}
  ).catch(err=>{
    console.error(err)
  });
   
  let instance2 = new
  Balls({ball_type:"Tennis Ball", cost:8,
  material:"Rubber"});
  instance2.save().then(doc=>{
  console.log("Second object saved")}
  ).catch(err=>{
    console.error(err)
  });
   
  let instance3 = new
  Balls({ball_type:"Football", cost:50,
  material:"Cowhide leather"});
  instance3.save().then(doc=>{
  console.log("Third object saved")}
  ).catch(err=>{
  console.error(err)
  });
  }
  let reseed = true;
  if (reseed) {recreateDB();}





var app = express();

app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
  }));
  app.use(passport.initialize());
  app.use(passport.session());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/Balls',ballsRouter);
app.use('/grid',gridRouter);
app.use('/pick', pickRouter);
app.use('/resource',resourceRouter);



  // passport config
// Use the existing connection
// The Account model
var Account =require('./models/account');
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

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
