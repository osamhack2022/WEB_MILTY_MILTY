const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const app = express();
const path = require('path');
const helmet = require('helmet');

app.use(helmet());
const cookieParser = require('cookie-parser');
const session = require('express-session');

// #region SEQULIZE
const { sequelize } = require('./config/database');

(async () => {
  await sequelize
    .sync({ alter: true })
    .then(() => {
      console.log(sequelize);
      console.log('connection success');
    })
    .catch(err => {
      console.error(`connection fail - ${err}`);
    });
})();
// #endregion

// #region Session
app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET,
  }),
);

// passport
const passport = require('./config/passport');

app.use(passport.initialize());
app.use(passport.session());
// #endregion

// // #region VIEW TESTING
// // 모든 라우트에서 실행되는 미들웨어
// app.use((req, res, next) => {
//   res.locals.isAuthenticated = req.isAuthenticated(); // locals에 저장하면 view에서 바로 사용가능 / isAuthenticated() : 현재 로그인이 되어있는지 확인하는 함수
//   res.locals.currentUser = req.user;
//   next();
// });

// #region OTHER OPTIONS
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
// #endregion

// #region ROUTES
app.use(express.static(path.join(__dirname, '../../WEB(FE)/build')));
app.get('/', function (res, req) {
  req.sendFile(path.join(__dirname, '../../WEB(FE)/build/index.html'));
});
app.use('/', require('./routes'));
// #endregion

// #region SERVER OPERATION
const port = 5000;
app.listen(port, function () {
  console.log(`server on! http://localhost:${port}`);
});

// #region ROUTES(Bottom)
app.get('*', function (res, req) {
  req.sendFile(path.join(__dirname, '../../WEB(FE)/build/index.html'));
});
// #endregion
