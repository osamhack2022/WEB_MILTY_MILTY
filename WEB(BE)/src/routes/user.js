const express = require('express');
const router = express.Router();
const { join } = require('../controllers/user');
const passport = require('passport');

// Login(login 화면을 차라리 첫 화면으로 잡기 위해 주소를 '/'로 설정했습니다.)
router.get('/', function (req, res) {       // localhost:3000
    res.render('user/login');               // [views 에 있는 login.ejs 실행(이 부분을 수정해서 Front단 페이지와 연결하면 됨)]
})

router.post('/api/login',                   // login 데이터 받는 곳(<form action="/api/login" method="post">)
    // authenticate : /config/passport.js 의 passport.use 호출
    passport.authenticate('local', {
        successRedirect: "/mypage",         // 만약 admin이면 '/admin'으로 redirect 해야하므로 나중에 조건식 사용할 것
        failureRedirect: "/",
    })
);

//마이 페이지 
router.get('/mypage', (req, res) => {
    const user = res.locals.currentUser
    if (user === undefined) { //로그인X 
        res.render('user/login');           // [views 에 있는 login.ejs 실행(이 부분을 수정해서 Front단 페이지와 연결하면 됨)]
    } else {
        res.render('user/mypage');          // [views 에 있는 mypage.ejs 실행(이 부분을 수정해서 Front단 페이지와 연결하면 됨)]
    }
});

//로그아웃 
router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');                      // 다시 로그인창으로
});

//회원가입 페이지
router.get('/register', (req, res) => {         // localhost:3000/register
    res.render('user/join');                    // [views 에 있는 join.ejs 실행(이 부분을 수정해서 Front단 페이지와 연결하면 됨)]
})

//회원가입 진행
router.post('/api/register', join);             // register 데이터 받는 곳(<form action="/api/register" method="post">)

module.exports = router;