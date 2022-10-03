const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const app = express();
const path = require("path");
const helmet = require('helmet');
app.use(helmet());
const cookieParser = require('cookie-parser');
const session = require("express-session");

//DB connect 
const { sequelize } = require('./models');
sequelize.sync({ force: false })
    .then(() => {
        console.log('connection success');
    })
    .catch((err) => {
        console.error(`connection fail - ${err}`);
    });

// Session
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'secret'
}));

//passport 
const passport = require("./config/passport");

app.use(passport.initialize());
app.use(passport.session());

//모든 라우트에서 실행되는 미들웨어 
app.use((req, res, next) => {
    res.locals.isAuthenticated = req.isAuthenticated();  //locals에 저장하면 view에서 바로 사용가능 / isAuthenticated() : 현재 로그인이 되어있는지 확인하는 함수
    res.locals.currentUser = req.user;
    next();
})

// Other settings
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// Routes
app.use('/', require('./routes/user'));
// app.use('/', require('./routes/menu'));

const port = 5000;
app.listen(port, function () {
    console.log('server on! http://localhost:' + port);
});