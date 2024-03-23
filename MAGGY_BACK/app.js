require("dotenv").config()
require("./models/connexion")

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');





const Pusher = require("pusher");

const pusher = new Pusher({
  appId: "1770059",
  key: "ebf3a2cca566dfc72216",
  secret: "26d66ea077027bd9ec89",
  cluster: "eu",
  useTLS: true
});

pusher.trigger("my-channel", "my-event", {
  message: "hello world"
});





var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var quizzRouter = require('./routes/quizz');
var messageRouter= require('./routes/message')
var app = express();
const fileUpload = require('express-fileupload');
app.use(fileUpload());


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/', quizzRouter); // si je ne veux pas ajouter de prefixe je laisse '/'
app.use('/users', messageRouter);

module.exports = app;
