const express = require('express');

const router = express.Router();
const passport = require('passport');
const { join } = require('../controllers/user');

// login 데이터 받는 곳(<form action="/api/login" method="post">)
router.post(
  '/login',
  passport.authenticate('local', {
    failureMessage: false,
  }),
  function (req, res) {
    res.status(200).json('login done');
  },
);

// 로그아웃
router.get('/logout', function (req, res) {
  console.log("LOGOUT TRY");
  req.logout();
  res.status(200).json('logout');
});

/*
// 마이 페이지
router.get('/mypage', (req, res) => {
  const user = res.locals.currentUser;
  if (user === undefined) {
    // 로그인X
    res.render('user/login'); // [views 에 있는 login.ejs 실행(이 부분을 수정해서 Front단 페이지와 연결하면 됨)]
  } else {
    res.render('user/mypage'); // [views 에 있는 mypage.ejs 실행(이 부분을 수정해서 Front단 페이지와 연결하면 됨)]
  }
});
*/


// 회원가입 진행
router.post('/register', join); // register 데이터 받는 곳

module.exports = router;