const express = require('express');
const router = express.Router();
const { join } = require('../controllers/user');
var passport = require('passport');

//로그인 
router.get('/api/login', function (req, res) {
    res.render('user/login');
})

router.post('/loginProc',
    // authenticate : /config/passport.js 의 passport.use 호출
    passport.authenticate('local', {
        successRedirect: "/user/mypage",
        failureRedirect: "/user/login",
        failureFlash: true
    })
);

//마이 페이지 
router.get('/mypage', (req, res) => {
    const user = res.locals.currentUser
    if (user === undefined) { //로그인X 
        res.render('user/login');
    } else {
        res.render('user/mypage');
    }
});

//로그아웃 
router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});

//회원가입 페이지
router.get('/api/register', (req, res) => {
    res.render('user/join');
})

//회원가입 진행
router.post('/joinProc', join);

module.exports = router;