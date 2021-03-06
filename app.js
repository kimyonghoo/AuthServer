const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');

//Authorizaion
const session = require('express-session');
const passport = require('passport');
const flash = require("connect-flash");
const authRouter = require('./routes/authRouter');
const userRouter = require('./routes/userRouter');
require('./config/passport')(passport);
require('dotenv').config();

const connect = require('./schemas'); // 파일명이 index.js 면 /index 생략 가능하다.
require('dotenv').config();

const app = express();
// connection before middle wares
connect();

// middle wares....
const cors = require('cors');
app.use(
    cors({
      origin: "http://localhost:8081", // server의 url이 아닌, 요청하는 client의 url
      credentials: true
    })
  );

app.use(logger('dev'));
app.use('/static', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

//Authorization
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
}));
app.use(flash());   
app.use(passport.initialize());
app.use(passport.session());
app.use('/auth', authRouter);
app.use('/user', userRouter);

app.use((req, res, next) => {
    res.send('404 Not found');
})
app.listen(process.env.APP_PORT, () => {
    console.log('server is running on', process.env.APP_PORT);
})