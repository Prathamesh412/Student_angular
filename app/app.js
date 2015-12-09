var express = require('express');
var mongoose = require('mongoose');
var session = require('express-session');
var bodyParser = require('body-parser');
var passport = require('passport');
//var passportConf = require('./config/passport');
var cookieParser = require('cookie-parser');
var MongoStore = require('connect-mongo')(session);
var app = express();

mongoose.connect("mongodb://localhost:27017/student");
mongoose.connection.on('error',function(){
  console.log("Mongo Error in connection");
});

app.set('views',__dirname+"/views");
app.set('view engine','jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser());
app.use(express.static(__dirname+'/public'));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req, res, next){
  res.locals.currentUser= req.user;
  next();
});

var studentController = require('./controllers/student')

app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: "2hjkeydwjfhusdifsb",
  store: new MongoStore({
    url:"mongodb://localhost:27017/student",
    autoReconnect: true
  })
}));

//routes

app.get('/students/:id',studentController.getStudentById);
app.get('/students',studentController.getStudents);
app.put('/students/:id',studentController.putStudentById);
app.post('/students',studentController.postStudent);
app.delete('/students/:id',studentController.deleteStudent);

app.listen('3000', function(){
  console.log("Server at port 3000");
});

module.exports = app;