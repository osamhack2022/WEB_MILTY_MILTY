const express = require('express');

const router = express.Router();
const passport = require('passport');
const { join } = require('../controllers/user');
const { duty } = require('../controllers/make_duty');

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


// 회원가입 진행
router.post('/register', join); // register 데이터 받는 곳
//근무 생성
router.post('/api/make_duty', duty); //근무 생성 데이터 받는 곳



module.exports = router;